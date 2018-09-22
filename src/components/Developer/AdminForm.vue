<template lang="pug">
  form.admin-form(@submit.prevent="onSubmit")
    select(v-model="developer.status")
      option(value="pending") Pending
      option(value="approved") Approved
      option(value="declined") Declined
    input(
      type="submit"
      value="Update"
      ref="submit"
      :disabled="initialStatus === developer.status"
    )
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
        initialStatus: null
      }
    },
    mounted () {
      this.initialStatus = this.developer.status
    },
    methods: {
      onSubmit () {
        axios.patch(apiUrl + '/developers/' + this.developer.id, {
          status: this.developer.status
        }, {
          headers: {
            'Authorization': 'Token ' + this.jwt
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
          }, 1000)
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
    padding-top: 0.25rem

    > *
      display: inline-block

      &:not(:first-child)
        margin-left: 0.5rem

    > input, select
      font-size: 0.8rem
      border-radius: 4px
      border: 1px solid rgba(0, 0, 0, 0.15)
      font-family: inherit

    select
      padding: 0.675rem 0rem 0.675rem 0.7rem
      background: transparent
      cursor: pointer

    input[type="submit"]
      padding: 0.75rem
      border: none
      width: inherit
      font-weight: bold
      background-color: #4caf50
      color: white
      cursor: pointer

      &:disabled
        background-color: rgba(0, 0, 0, 0.2)
        cursor: inherit
</style>
