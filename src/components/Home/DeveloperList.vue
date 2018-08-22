<template lang="pug">
  .developer-list
    template(v-if="developers.length > 0")
      template(v-for="developer in fetched(developers)")
        developer(:developer="developer")
    spinner(v-else)
</template>

<script>
  import Developer from '@/components/Home/Developer.vue'
  import Spinner from 'vue-simple-spinner'

  import axios from 'axios'
  import { url as apiUrl } from '@/api'
  import GitHub from 'github-api'

  export default {
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
      axios.get(apiUrl + '/developers').then((response) => {
        this.developers = response.data.developers

        const gh = new GitHub()

        for (let i = 0; i < this.developers.length; i++) {
          let developer = this.developers[i]
          let user = gh.getUser(developer.github.username)

          user.getProfile().then((response) => {
            developer.gitHubData = response.data
            this.$set(this.developers, i, developer)
          }).catch((error) => {
            console.error(error)
          })
        }
      })
    },
    methods: {
      fetched (developers) {
        return developers.filter((developer) => {
          return developer.gitHubData
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
