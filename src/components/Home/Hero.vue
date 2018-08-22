<template lang="pug">
  .hero
    h1 Crystal Jobs
    h2 The place to find a Crystal developer
    p
      a(href="https://crystal-lang.org/") Crystal
      |  is a programming language with friendly syntax, static type checking and modern stdlib. It compiles into efficient and easy-to-distribute native code.
    ul
      li
        | Source code:&nbsp;
        a(href="https://github.com/crystaljobs") github.com/crystaljobs
    ul
      template(v-if="jwt")
        li
          router-link(to="/dashboard") Edit your listing
        li
          a(href="#", @click="logOut") Log Out
      li(v-else)
        a(:href="signInUrl") Sign in via GitHub
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { url as apiUrl } from '@/api'

  export default {
    computed: {
      ...mapState(['jwt']),
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
  h1, h2, p
    margin: 0

  h1
    font-size: 2rem

  h2
    font-size: 1.3rem

  p
    margin: 0.5rem 0

  ul
    margin: 0
    padding: 0
    display: block

    &:not(:first-of-type)
      margin-top: 0.5rem

    li
      display: inline

      &:not(:first-of-type)
        margin-left: 1rem
</style>
