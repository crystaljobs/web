<template lang="pug">
  .developer-list
    template(v-if="preloadedDevelopers.length > 0")
      template(v-for="developer in preloadedDevelopers")
        developer(:developer="developer", :displayAdminForm="displayAdminForm")
    spinner(v-else)
</template>

<script>
  import Spinner from 'vue-simple-spinner'
  import axios from 'axios'
  import GitHub from 'github-api'
  import { mapState } from 'vuex'

  import { url as apiUrl } from '@/api'
  import Developer from '@/components/Developer.vue'

  const github = new GitHub()

  export default {
    props: {
      authorize: {
        type: Boolean,
        default: false
      },
      displayAdminForm: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        developers: []
      }
    },
    components: {
      Developer,
      Spinner
    },
    mounted () {
      let headers = {}

      if (this.authorize) {
        headers['Authorization'] = 'Token ' + this.jwt
      }

      axios.get(apiUrl + '/developers', { headers }).then((response) => {
        this.developers = response.data.developers

        for (let i = 0; i < this.developers.length; i++) {
          let developer = this.developers[i]
          let user = github.getUser(developer.github.username)

          user.getProfile().then((response) => {
            developer.github.data = response.data
            this.$set(this.developers, i, developer)
          }).catch((error) => {
            console.error(error)
          })
        }
      })
    },
    computed: {
      ...mapState(['jwt']),
      preloadedDevelopers () {
        return this.developers.filter((developer) => {
          return developer.github.data
        })
      }
    }
  }
</script>

<style lang="sass" scoped>
  .developer-list
    padding: 1rem
    display: flex
    flex-direction: column
    justify-content: center

    min-height: calc(100% - 2rem)

  .developer
    &:not(:first-of-type)
      margin-top: 1rem
</style>
