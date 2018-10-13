<template lang="pug">
  .wait
    spinner
</template>

<script>
  import jwtDecode from 'jwt-decode'
  import Spinner from 'vue-simple-spinner'
  import axios from 'axios'
  import { mapMutations } from 'vuex'
  import { url as apiUrl } from '@/api'

  export default {
    components: {
      Spinner
    },
    data () {
      return {
        code: null,
        state: null
      }
    },
    created () {
      // Cannot use `this.$route.query` here because
      // GitHub redirects to `url?code=foo&state=bar#path`, so `query` is always null
      let params = (new URL(window.location)).searchParams

      this.code = params.get('code')
      this.state = params.get('state')

      // TODO: To remove `code` and `state` from the query
      window.history.replaceState({}, document.title, '/')
    },
    mounted () {
      console.debug(this.params)
      axios.get(apiUrl + '/oauth/github/callback', {
        params: {
          code: this.code,
          state: this.state
        }
      }).then((response) => {
        this.setID(jwtDecode(response.data.jwt).developer.id)
        this.setJWT(response.data.jwt)

        this.$router.push({ path: '/profile' })
      })
    },
    methods: {
      ...mapMutations(['setID', 'setJWT'])
    }
  }
</script>

<style lang="sass" scoped>
  .wait
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center
</style>
