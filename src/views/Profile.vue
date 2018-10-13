<template lang="pug">
  .profile
    template(v-if="developer")
      .developer
        img.avatar(:src="developer.github.data.avatar_url")
        .name {{developer.github.data.name || 'Unnamed'}}&nbsp;
        hr
        form(@submit.prevent="onSubmit")
          textarea.about(
            rows="10"
            cols="50"
            name="about"
            maxlength="300"
            placeholder="Tell about yourself"
            v-model="developer.about"
          )
          .input-group
            input.website(
              type="text"
              name="website"
              maxlength="256"
              placeholder="Website, e.g. https://example.com"
              v-model="developer.website"
            )
            .append
              i.feather.feather-globe
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
            | Display in the developers list
          button.button.success(
            ref="submit"
            :disabled="!changed && !loading"
            :class="{progress: loading}"
          ) Save changes
        hr
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
        developer: null,
        initialAttributes: {},
        loading: false
      }
    },
    mounted () {
      axios.get(apiUrl + '/developers/' + this.id, {
        headers: {
          'Authorization': 'Bearer ' + this.jwt
        }
      }).then((response) => {
        let developer = response.data.developer

        this.initialAttributes = {
          about: developer.about,
          website: developer.website,
          display: developer.display
        }

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
        this.loading = true
        axios.patch(apiUrl + '/developers/' + this.developer.id, {
          about: (this.developer.about && this.developer.about.length > 0) ? this.developer.about : 'null',
          website: (this.developer.website && this.developer.website.length > 0) ? this.developer.website : 'null',
          display: this.developer.display
        }, {
          headers: {
            'Authorization': 'Bearer ' + this.jwt
          }
        }).then((response) => {
          console.info('Successfully updated the developer!')

          this.initialAttributes = {
            about: this.developer.about,
            website: this.developer.website,
            display: this.developer.display
          }
        }).catch((error) => {
          // 400 means "no changes"
          // TODO: Improve
          if (!error || error.response.status !== 400) {
            console.error(error)
          }
        }).then((response) => {
          setTimeout(() => {
            this.loading = false
          }, 500)
        })
      }
    },
    computed: {
      ...mapState(['id', 'jwt']),
      changed () {
        if (!this.developer) return false

        if ((this.developer.about !== this.initialAttributes.about) && !(this.developer.about === '' && this.initialAttributes.about === null)) return true
        if ((this.developer.website !== this.initialAttributes.website) && !(this.developer.website === '' && this.initialAttributes.website === null)) return true
        if (this.developer.display !== this.initialAttributes.display) return true

        return false
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "@/assets/styles/variables.sass"

  .profile
    display: flex
    flex-direction: column
    align-items: center
    padding: 1rem

    > *
      width: calc(100% - 2rem)
      max-width: $appropriate-width
      background-color: white
      border-radius: 5px

      &:not(:first-child)
        margin-top: 1rem

  .developer
    display: flex
    flex-direction: column
    align-items: center
    padding: 1rem
    padding-bottom: 0.5rem

    hr
      width: 15rem

    > *:not(:first-child):not(hr)
      margin-top: 0.5rem

  .avatar
    width: 8rem
    border-radius: 3px

  .name
    font-weight: bold
    font-size: 1.3rem

  form
    width: 100%
    max-width: 20rem

    margin-top: 0
    margin-bottom: 0.5rem

    > *
      display: block
      width: 100%

      &:not(:first-child)
        margin-top: 0.75rem

    textarea, input[type="text"]
      $padding: 0.75rem

      max-width: calc(100% - #{$padding * 2})
      padding: $padding

      font-size: 1rem
      font-family: inherit

      border: 1px solid rgba(0, 0, 0, 0.15)
      border-radius: 4px

    .input-group
      position: relative

      input, textarea
        width: 100%

      .append
        position: absolute
        right: 0
        bottom: 0

        margin: 0.1rem
        padding: 0.65rem

        color: rgba(0, 0, 0, 0.5)
        background-color: white

    .about
      height: 5rem
      resize: none

    .pretty
      line-height: 1.01
</style>
