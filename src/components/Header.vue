<template lang="pug">
  header.header
    .intro
      router-link(to="/").title CrystalJobs.org
      .motto
        | A perfect place to find a&nbsp;
        a(href="https://crystal-lang.org") Crystal
        |  developer
    .actions
      template(v-if="loggedIn")
        router-link(to="/profile").button.link Profile
        button(@click="logOut").button.link Log Out
      a.button.link(v-else, :href="signInUrl")
        i.feather.feather-github
        |  Sign In
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { url as apiUrl } from '@/api'

  export default {
    computed: {
      ...mapGetters(['loggedIn']),
      signInUrl () {
        return apiUrl + '/oauth/github/init'
      }
    },
    methods: {
      ...mapActions(['logOut'])
    }
  }
</script>

<style lang="sass" scoped>
  @import "@/assets/styles/variables.sass"
  @import "@/assets/styles/mixins/media.sass"

  .header
    display: flex
    justify-content: space-between
    align-items: center

    height: calc(5rem - 2rem)
    padding: 1rem

    background-color: white

    border-left: 5px solid black

    a.router-link-exact-active:not(.title)
      border-bottom: 3px solid $color-primary

  .title, .motto
    display: inline-block

  .title
    color: black
    font-weight: bold
    font-size: 1.5rem

  .motto
    margin-left: 1rem

    +tablet
      display: none
</style>
