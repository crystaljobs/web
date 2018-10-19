<template lang="pug">
  .jobs-new
    app-header(pageTitle="Post a new Job")
    .content
      job-form(
        ref="form"
        :isNew="true"
        :job="job"
        @errorsCountUpdate="updateFormErrorsCount"
      )
      .job-preview
        job(:job="job", :clickable="false")
          template(slot="button")
            .button(@click.stop="onSubmit") Submit
</template>

<script>
  import AppHeader from '@/components/Header.vue'
  import JobForm from '@/components/JobForm.vue'
  import JobComponent from '@/components/Job.vue'
  import Job from '@/objects/Job'
  import { createJob } from '@/services/api'

  export default {
    components: {
      AppHeader,
      JobForm,
      Job: JobComponent
    },
    data () {
      return {
        formErrorsCount: 0,
        job: new Job({
          oneOff: false,
          budget: null,
          title: '',
          location: '',
          description: '',
          salary: null,
          applyURL: '',
          applyEmail: '',
          employerName: '',
          employerEmail: '',
          employerImage: ''
        })
      }
    },
    methods: {
      updateFormErrorsCount (value) {
        this.formErrorsCount = value
      },
      async onSubmit () {
        await this.$refs.form.validate()

        if (this.formErrorsCount > 0) return

        createJob(this.job).then(() => {
          alert('Success, check your email!')
        }).catch((error) => {
          alert('Error: ' + JSON.stringify(error))
        })
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

  .job-form
    width: 100%
    margin-bottom: 5rem

  .job-preview
    position: fixed
    bottom: 0
    display: flex
    justify-content: center
    width: 100%
    background-color: white
    border-top: $border

    .job
      width: 100%
      max-width: 50rem
      margin-top: 0
      border-top: none
</style>
