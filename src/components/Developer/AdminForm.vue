<template lang="pug">
  form.admin-form(@submit.prevent="onSubmit")
    select(v-model="developer.status")
      option(value="pending") Pending
      option(value="approved") Approved
      option(value="declined") Declined
    button.button.success.small(
      :disabled="initialStatus === developer.status"
      :class="{progress: loading}"
    ) Update
</template>

<script>
  import axios from 'axios'
  import { mapState } from 'vuex'
  import { url as apiUrl } from '@/api'

  export default {
    props: {
      developer: Object
    },
    data () {
      return {
        initialStatus: null,
        loading: false
      }
    },
    mounted () {
      this.initialStatus = this.developer.status
    },
    methods: {
      onSubmit () {
        this.loading = true

        axios.patch(apiUrl + '/developers/' + this.developer.id, {
          status: this.developer.status
        }, {
          headers: {
            'Authorization': 'Bearer ' + this.jwt
          }
        }).then((response) => {
          console.info('Successfully updated the developer!')
          this.initialStatus = this.developer.status
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
      ...mapState(['jwt'])
    }
  }
</script>

<style lang="sass" scoped>
  form
    margin-top: 0.5rem
    padding-top: 0.5rem
    border-top: 1px solid rgba(0, 0, 0, 0.1)

    > *
      display: inline-block

      &:not(:first-child)
        margin-left: 0.5rem

    select
      padding: 0.3rem

      font-size: 0.9rem
      font-family: inherit

      background: transparent
      border: 1px solid rgba(0, 0, 0, 0.15)
      border-radius: 4px

      cursor: pointer
</style>
