<template lang="pug">
  form.job-form
    .group
      .group-title
        .content Job
      template(v-if="!isNew")
        label.inline Approval status:&nbsp;
        span.approval-status
          | {{job.status}}&nbsp;
          i(:class="'feather-' + vStatusIcon")
        small.message  {{vStatusMessage}}
        hr
        label(for="job-published")
          | Published&nbsp;
          small Disable to hide the job
        switches#job-published(
          v-model="job.published"
          theme="custom"
        )
      template(v-if="isNew")
        label(for="job-type") Type
        .tabs
          .tab(:class="{ 'selected': !job.oneOff }" @click="job.oneOff = false")
            |  Partial or Full-time
          .tab(:class="{ 'selected': job.oneOff }" @click="job.oneOff = true")
            |  One-Off
        .note
          i.feather-info
          |  You cannot change job type after posting
      label(for="job-title") Title
      input#job-title(
        type="text"
        required
        name="jobTitle"
        data-vv-as="Job Title"
        :placeholder="job.oneOff ? 'The job title, e.g. \"Develop a website\"' : 'The job title, e.g. \"Senior Programmer\"'"
        :class="{error: errors.has('jobTitle')}"
        v-model.trim="job.title"
        v-validate="{required: true, min: 3, max: 50}"
      )
      .error(v-show="errors.has('jobTitle')")
        i.feather-alert-circle
        |  {{errors.first('jobTitle')}}
      label(for="job-location")
        | Location&nbsp;
        small optional
      input#job-location(
        type="text"
        name="jobLocation"
        data-vv-as="Job Location"
        placeholder="The job location, if any, e.g. \"New York\""
        :class="{error: errors.has('jobLocation')}"
        v-model.trim="job.location"
        v-validate="{min: 2, max: 50}"
      )
      .error(v-show="errors.has('jobLocation')")
        i.feather-alert-circle
        |  {{errors.first('jobLocation')}}
      label(for="job-description") Description
      editor(
        name="jobDescription"
        data-vv-as="Job Description"
        :class="{error: errors.has('jobDescription')}"
        v-validate="{required: true, min: 100, max: 2000}"
        v-model.trim="job.description"
        :initialValue="job.description"
      )
      .error(v-show="errors.has('jobDescription')")
        i.feather-alert-circle
        |  {{errors.first('jobDescription')}}
      template(v-if="job.oneOff")
        label(for="job-budget")
          | Budget&nbsp;
          small optional
        input#job-budget(
          type="number"
          name="jobBudget"
          data-vv-as="Job Budget"
          placeholder="In USD"
          :class="{error: errors.has('jobBudget')}"
          key="budget-input"
          v-model.number="job.budget"
          v-validate="{min_value: 0, max_value: 1000000}"
        )
        .error(v-show="errors.has('jobBudget')")
          i.feather-alert-circle
          |  {{errors.first('jobBudget')}}
      template(v-else)
        label(for="job-salary")
          | Salary&nbsp;
          small optional
        input#job-salary(
          type="number"
          name="jobSalary"
          data-vv-as="Job Salary"
          placeholder="In USD"
          :class="{error: errors.has('jobSalary')}"
          key="salary-input"
          v-model.number="job.salary"
          v-validate="{min_value: 0, max_value: 1000000}"
        )
        .error(v-show="errors.has('jobSalary')")
          i.feather-alert-circle
          |  {{errors.first('jobSalary')}}
      label(for="job-apply-url") Apply URL
      input#job-apply-url(
        type="url"
        name="jobApplyURL"
        ref="applyURL"
        data-vv-as="Apply URL"
        placeholder="An URL the user will be redirected to after clicking \"Apply\""
        :class="{error: errors.has('jobApplyURL')}"
        v-model.trim="job.applyURL"
        v-validate="{url: true}"
      )
      .error(v-show="errors.has('jobApplyURL')")
        i.feather-alert-circle
        |  {{errors.first('jobApplyURL')}}
      label(for="job-apply-email") Apply email
      input#job-apply-email(
        type="email"
        name="jobApplyEmail"
        ref="applyEmail"
        data-vv-as="Apply Email"
        placeholder="An email the user will be prompted with after clicking \"Apply\""
        :class="{error: errors.has('jobApplyEmail')}"
        v-model.trim="job.applyEmail"
        v-validate="{min: 5, max: 50}"
      )
      .error(v-show="errors.has('jobApplyEmail')")
        i.feather-alert-circle
        |  {{errors.first('jobApplyEmail')}}
    .group
      .group-title
        .content {{job.oneOff ? 'Employer' : 'Company'}}
      label(for="job-employer-name") {{job.oneOff ? 'Employer' : 'Company'}} name
      input#job-employer-name(
        type="text"
        required
        name="jobEmployerName"
        :data-vv-as="(job.oneOff ? 'Employer' : 'Company') + ' name'"
        :placeholder="job.oneOff ? 'E.g. \"John Doe\"' : 'E.g. \"ACME Inc\"'"
        :class="{error: errors.has('jobEmployerName')}"
        v-model.trim="job.employerName"
        v-validate="{required: true, min: 3, max: 50}"
      )
      .error(v-show="errors.has('jobEmployerName')")
        i.feather-alert-circle
        |  {{errors.first('jobEmployerName')}}
      label(for="job-employer-email") {{job.oneOff ? 'Employer' : 'Company'}} email
      input#job-employer-email(
        type="email"
        required
        name="jobEmployerEmail"
        :data-vv-as="(job.oneOff ? 'Employer' : 'Company') + ' email'"
        placeholder="This email will not be public, a token will be sent to it for ability to edit the job"
        :class="{error: errors.has('jobEmployerEmail')}"
        v-model.trim="job.employerEmail"
        v-validate="{required: true, min: 5, max: 50}"
      )
      .error(v-show="errors.has('jobEmployerEmail')")
        i.feather-alert-circle
        |  {{errors.first('jobEmployerEmail')}}
      label(for="job-employer-image")
        | {{job.oneOff ? 'Employer' : 'Company'}} image URL&nbsp;
        small optional
      input#job-employer-image(
        type="text"
        name="jobEmployerImage"
        :data-vv-as="(job.oneOff ? 'Employer' : 'Company') + ' image'"
        placeholder="Any rectangular image format is supported"
        :class="{error: errors.has('jobEmployerImage')}"
        v-model.trim="job.employerImage"
        v-validate="{url: true}"
      )
      .error(v-show="errors.has('jobEmployerImage')")
        i.feather-alert-circle
        |  {{errors.first('jobEmployerImage')}}
</template>

<script>
  import Switches from 'vue-switches'
  import Editor from '@/components/Editor.vue'

  export default {
    components: {
      Editor,
      Switches
    },
    props: {
      job: {
        type: Object,
        required: true
      },
      isNew: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      vStatusIcon () {
        switch (this.job.status.toLowerCase()) {
        case 'pending':
          return 'clock'
        case 'approved':
          return 'thumbs-up'
        default:
          return 'x'
        }
      },
      vStatusMessage () {
        switch (this.job.status.toLowerCase()) {
        case 'pending':
          return 'Moderators are reviewing the Job'
        case 'declined':
          return 'For some reason the Job has been declined'
        default:
          return ''
        }
      }
    },
    watch: {
      errors: {
        handler (newValue) {
          this.errorsCount = newValue.items.length
          this.$emit('errorsCountUpdate', this.errorsCount)
        },
        deep: true
      },
      job: {
        handler (newValue) {
          this.checkForEitherApply()
        },
        deep: true
      }
    },
    methods: {
      async validate () {
        await this.$validator.validate()
        this.checkForEitherApply()
      },
      checkForEitherApply () {
        if (!(this.job.applyEmail && this.job.applyEmail.length > 0) && !(this.job.applyURL && this.job.applyURL.length > 0)) {
          this.errors.add({
            field: 'jobApplyEmail',
            msg: 'Either Apply URL or Apply email is required.',
            id: 'jobApplyEmailEitherId'
          })
          this.errors.add({
            field: 'jobApplyURL',
            msg: 'Either Apply URL or Apply email is required.',
            id: 'jobApplyURLEitherId'
          })
        } else {
          this.errors.removeById('jobApplyEmailEitherId')
          this.errors.removeById('jobApplyURLEitherId')
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "@/assets/styles/variables.sass"

  .tabs
    display: flex
    margin-top: 0.5rem
    margin-bottom: 0.75rem

  .tab
    width: 50%
    padding: 1rem
    text-align: center
    border: $border
    cursor: pointer
    user-select: none

    &:not(:first-of-type)
      border-left: none

    &.selected
      color: white
      font-weight: bold
      background-color: black
      border: none

  form
    width: 100%
    max-width: 50rem
    padding: 1rem

  input
    width: 100%
    padding: 1rem
    font-size: 1rem
    font-family: inherit
    background-color: rgba(0, 0, 0, 0.02)
    border: $border
    outline: none

    &.error
      border-color: red

  .note
    margin-top: 1rem
    margin-bottom: 0.75rem

    &:last-child
      margin-bottom: 0

  div.error
    margin-top: 0.5rem
    color: red

  .approval-status
    font-weight: bold
    font-size: 1.1rem

  label
    display: inline-block
    margin-bottom: 0.75rem
    font-size: 1.1rem

    &:not(.inline)
      display: block

    small
      opacity: 0.5

    &:not(:first-of-type)
      margin-top: 0.75rem

  hr
    height: 1px
    margin: 0
    border: none
    border-top: $border

  .group
    position: relative
    padding: 1rem
    border: $border

    &:not(:first-of-type)
      margin-top: 2rem

  .group-title
    position: absolute
    top: -0.6rem
    display: flex
    justify-content: center
    width: calc(100% - (1rem) * 2)

    .content
      padding: 0 1rem
      font-weight: bold
      font-size: 1.2rem
      background-color: white

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

<style lang="sass">
  .vue-switcher-theme--custom
    &.vue-switcher-color--default
      div
        background-color: lighten(black, 20%)

        &:after
          background-color: black

    &.vue-switcher--unchecked
      div
        background-color: lighten(black, 50%)

        &:after
          background-color: lighten(black, 40%)
</style>
