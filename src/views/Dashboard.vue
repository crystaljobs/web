<template lang="pug">
  .dashboard
    router-link(to="/").back
      .arrow ←
      .text Back to the list
    template(v-if="developer")
      .developer
        img.avatar(:src="developer.github.data.avatar_url")
        .information
          .name {{developer.github.data.name}}&nbsp;
          a.github-username(:href="'https://github.com/' + developer.github.username") @{{developer.github.username}}
          form(@submit.prevent="onSubmit")
            textarea.about(
              rows="10"
              cols="50"
              name="about"
              maxlength="300"
              placeholder="Tell about yourself"
              v-model="developer.about"
            )
            input.website(
              type="text"
              name="website"
              maxlength="256"
              placeholder="Website, e.g. https://example.com"
              v-model="developer.website"
            )
            pretty-check.p-curve.p-fill.p-svg(
              color="success"
              name="display"
              :value="developer.display ? 'checked' : 'false'"
              v-model="developer.display"
            )
              svg(slot="extra", class="svg svg-icon", viewBox="0 0 20 20")
                path(
                  d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                  style="stroke: white;fill:white"
                )
              | Display yourself in the list
            input(
              type="submit"
              value="Save changes"
              ref="submit"
            )
    spinner(v-else)
</template>

<script>
  import Spinner from 'vue-simple-spinner'
  import axios from 'axios'
  import GitHub from 'github-api'
  import PrettyCheck from 'pretty-checkbox-vue/check'
  import { mapState } from 'vuex'

  import { url as apiUrl } from '@/api'

  export default {
    components: {
      Spinner,
      PrettyCheck
    },
    data () {
      return {
        developer: null
      }
    },
    mounted () {
      axios.get(apiUrl + '/developers/' + this.id, {
        headers: {
          'Authorization': 'Token ' + this.jwt
        }
      }).then((response) => {
        let developer = response.data.developer
        let user = new GitHub().getUser(developer.github.username)

        user.getProfile().then((response) => {
          developer.github.data = response.data
          this.developer = developer
        }).catch((error) => {
          console.error(error)
        })
      })
    },
    methods: {
      onSubmit () {
        this.$refs.submit.disabled = true

        axios.patch(apiUrl + '/developers/' + this.developer.id, {
          about: (this.developer.about && this.developer.about.length > 0) ? this.developer.about : 'null',
          website: (this.developer.website && this.developer.website.length > 0) ? this.developer.website : 'null',
          display: this.developer.display
        }, {
          headers: {
            'Authorization': 'Token ' + window.localStorage.getItem('jwt')
          }
        }).then((response) => {
          console.info('Successfully updated the developer!')
        }).catch((error) => {
          // 400 means "no changes"
          // TODO: Improve
          if (!error || error.response.status !== 400) {
            console.error(error)
          }
        }).then((response) => {
          setTimeout(() => {
            this.$refs.submit.disabled = false
          }, 1000)
        })
      }
    },
    computed: {
      ...mapState(['id', 'jwt'])
    }
  }
</script>

<style lang="sass" scoped>
  .dashboard
    @media (min-width: 768px)
      height: calc(100% - 2rem)

    @media (max-width: 768px)
      height: calc(100vh - 2rem)

    width: 100wh
    padding: 1rem
    display: flex
    justify-content: center
    align-items: center

  .back
    position: absolute
    top: 0
    left: 0
    padding: 1rem

    .arrow, .text
      display: inline-block
      vertical-align: middle

    .arrow
      font-size: 2rem
      margin-bottom: 0.15rem

  .developer
    @media (max-width: 768px)
      display: flex
      align-items: center
      justify-content: center

  .avatar
    height: 7rem
    width: 7rem
    border-radius: 3px

  .avatar, .information
    display: inline-block
    vertical-align: top

  .avatar
    @media (max-width: 768px)
      display: none

  .information
    max-width: calc(100% - 2rem)

    @media (min-width: 768px)
      margin-top: -0.25rem
      margin-left: 0.75rem

  .name
    font-size: 1.3rem
    font-weight: bold
    margin-bottom: 0.25rem
    display: inline-block

  form
    padding-top: 0.25rem
    max-width: 100%

    > input, .pretty
      display: block

    > *:not(:first-child)
      margin-top: 0.75rem

    > textarea, input[type="text"], input[type="submit"]
      padding: 0.75rem
      font-size: 1rem
      border-radius: 4px
      border: 1px solid rgba(0, 0, 0, 0.15)
      font-family: inherit
      width: 20rem
      max-width: calc(100% - 1.5rem)

    .about
      height: 5rem
      resize: none

    .website
      margin-top: 0.5rem !important

    input[type="submit"]
      border: none
      width: inherit
      font-weight: bold
      background-color: #4caf50
      color: white
      cursor: pointer

      &:disabled
        background-color: rgba(0, 0, 0, 0.2)
        cursor: inherit

    .pretty
      line-height: 1.01
</style>
