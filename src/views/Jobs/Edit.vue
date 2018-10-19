<template lang="pug">
  .jobs-edit
    app-header(pageTitle="Edit Job")
    .content
      .error(v-if="error")
        i.feather-alert-triangle
        |  {{error}}
      template(v-if="job && !error")
        job-form(
          :isNew="false"
          :job="job"
          :style="{ marginBottom: formMargin }"
          @errorsCountUpdate="updateFormErrorsCount"
        )
        .job-preview
          .hidden-notification(v-if="!job.published")
            i.feather-info
            |  This Job will be hidden
          job(:job="job", :clickable="false")
            template(slot="button")
              .button(
                @click.stop="onSubmit"
                :disabled="submitDisabled"
              ) Update
</template>

<script>
  import jwtDecode, { InvalidTokenError } from 'jwt-decode'
  import { getJob, updateJob } from '@/services/api'
  import AppHeader from '@/components/Header.vue'
  import JobForm from '@/components/JobForm.vue'
  import Job from '@/components/Job.vue'

  export default {
    components: {
      AppHeader,
      JobForm,
      Job
    },
    data () {
      return {
        job: null,
        initialJob: null,
        token: null,
        error: null,
        formErrorsCount: 0
      }
    },
    computed: {
      formMargin () {
        if (this.job.published) return '5rem'
        else return '8.35rem'
      },
      submitDisabled () {
        return this.formErrorsCount > 0 || JSON.stringify(this.job) === JSON.stringify(this.initialJob)
      }
    },
    mounted () {
      this.token = this.$route.query.token

      if (!this.token) {
        this.error = 'Token required to edit the Job'
        return
      }

      let jwt

      try {
        jwt = jwtDecode(this.token)
      } catch (error) {
        if (error instanceof InvalidTokenError) {
          this.error = 'Invalid token'
          return
        } else {
          throw error
        }
      }

      if (!(jwt.job && jwt.job.id)) {
        this.error = 'Invalid token'
        return
      }

      getJob(jwt.job.id, this.token).then((job) => {
        this.job = job
        this.initialJob = Object.assign({}, job)
      }).catch((error) => {
        alert(error.message)
      })
    },
    methods: {
      onSubmit () {
        if (this.submitDisabled) return

        updateJob(this.job, this.token).then(() => {
          alert('Success!')
          this.initialJob = Object.assign({}, this.job)
        }).catch((error) => {
          alert(JSON.stringify(error))
        })
      },
      updateFormErrorsCount (value) {
        this.formErrorsCount = value
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "@/assets/styles/variables.sass"

  .content
    display: flex
    flex-direction: column
    align-items: center
    width: 100%
    padding: 1rem

  .error
    padding: 1rem
    color: white
    font-weight: bold
    background-color: red

  .job-form
    width: 100%

  .job-preview
    position: fixed
    bottom: 0
    display: flex
    flex-direction: column
    align-items: center
    width: 100%
    background-color: white
    border-top: $border

    .hidden-notification
      display: block
      width: 100%
      padding: 1rem
      text-align: center
      border-bottom: $border

    .job
      width: 100%
      max-width: 50rem
      margin-top: 0
      border-top: none
</style>
