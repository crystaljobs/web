<template lang="pug">
  .jobs-activate
    app-header(pageTitle="Job activation")
    .content
      .error(v-if="error")
        i.feather-alert-triangle
        |  {{error}}
      spinner(v-else-if="inProgress")
      .success(v-else-if="jobID")
        div
          i.feather-check-circle
          |  Success! The Job has been activated.
        p You'll receive a email when moderators approve it.
      router-link.button(v-if="displayEditButton", :to="'/jobs/edit?token=' + token") Edit the Job
</template>

<script>
  import jwtDecode, { InvalidTokenError } from 'jwt-decode'
  import AppHeader from '@/components/Header.vue'
  import Spinner from '@/components/Spinners/Simple.vue'
  import { activateJob } from '@/services/api'

  export default {
    components: {
      AppHeader,
      Spinner
    },
    data () {
      return {
        error: null,
        inProgress: false,
        jobID: 42,
        displayEditButton: false
      }
    },
    computed: {
      token () {
        return this.$route.query.token
      }
    },
    mounted () {
      if (!this.token) this.$router.push('/')
      try {
        let jwt = jwtDecode(this.token)

        if (!(jwt.job && jwt.job.id)) {
          this.error = 'The token you provided is not a valid JWT.'
          return
        }

        this.inProgress = true
        this.jobID = jwt.job.id

        activateJob(this.jobID, this.token).then((response) => {
          this.displayEditButton = true
        }).catch((error) => {
          this.error = error.data.error.message

          switch (error.status) {
          case 409:
            this.displayEditButton = true
            break
          }
        }).then(() => {
          this.inProgress = false
        })
      } catch (error) {
        if (error instanceof InvalidTokenError) {
          this.error = 'The token you provided is not a valid JWT.'
        } else {
          throw error
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  .content
    display: flex
    flex-direction: column
    align-items: center
    padding: 1rem

    > *:not(:first-child)
      margin-top: 1rem

  p
    margin: 0

  .error
    padding: 1rem
    color: white
    font-weight: bold
    background-color: red

  .success
    display: flex
    flex-direction: column
    align-items: center

    > div
      padding: 1rem
      color: white
      font-weight: bold
      background-color: green
</style>
