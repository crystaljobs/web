<template lang="pug">
  .job(@click="toggleDescription", :class="{clickable: clickable}")
    .preview
      img.image(:src="job.employerImage" v-if="job.employerImage")
      .image(v-else)
      .brief(v-if="job.title")
        .title {{job.title}}
        span(v-if="job.location") , {{job.location}}
      .employer(v-if="job.employerName")
        .name {{job.employerName}}
      .details
        template(v-if="job.oneOff")
          span(v-if="job.budget")  ${{job.budget.toLocaleString()}}
        template(v-else)
          span(v-if="job.salary") ${{job.salary.toLocaleString()}}/yr
      .button-slot
        slot(name="button")
          a.apply.button(:href="applyURL", @click.stop) Apply
    .description(v-show="displayDescription", @click.stop)
      editor(:initialValue="job.description", :editable="false")
      .apply-container
        a.apply.button(v-if="!emailOnly", :href="applyURL", @click.stop="revealEmail") Apply for this job
        .email(v-if="job.applyEmail") {{emailOnly ? 'Contact' : 'Or contact'}} {{job.employerName}} via email:&nbsp;
          u {{job.applyEmail}}
</template>

<script>
  import Editor from '@/components/Editor.vue'

  export default {
    components: {
      Editor
    },
    props: {
      job: {
        type: Object,
        required: true
      },
      clickable: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        displayDescription: false
      }
    },
    computed: {
      emailOnly () {
        return !this.job.applyURL
      },
      applyURL () {
        if (this.job.applyURL) {
          if (/^https?:\/\//.test(this.job.applyURL)) {
            return this.job.applyURL
          } else {
            return 'https://' + this.job.applyURL
          }
        } else {
          return `mailto:${this.job.applyEmail}`
        }
      }
    },
    methods: {
      toggleDescription () {
        if (!this.clickable) return
        this.displayDescription = !this.displayDescription
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '@/assets/styles/variables.sass'

  .job
    width: 100%

    &:first-of-type
      margin-top: -1rem
      border-top: $border

  .preview
    display: grid
    grid-template-columns: 6rem 20rem auto 10rem
    grid-template-rows: repeat(2, 50%)

    width: 100%
    height: 6rem

    border-bottom: $border

    user-select: none

    &.clickable
      cursor: pointer

    &:hover
      background-color: rgba(0, 0, 0, 0.025)

    .image
      grid-column: 1 / 2
      grid-row: 1 / 3
      justify-self: center
      align-self: center

      box-sizing: content-box

      width: 4rem
      height: 4rem

      background-color: rgba(black, 0.05)
      border: $border

    .brief
      grid-column: 2 / 3
      grid-row: 1 / 2
      justify-self: start
      align-self: end

      .title
        display: inline-block
        font-weight: bold

    .employer
      grid-column: 2 / 3
      grid-row: 2 / 3
      justify-self: start
      align-self: start

      .name
        display: inline-block

    .details
      grid-column: 3 / 4
      grid-row: 1 / 3
      justify-self: end
      align-self: center

    .button-slot
      grid-column: 4 / 5
      grid-row: 1 / 3
      justify-self: center
      align-self: center

  .description
    width: 100%
    border-bottom: $border

    .apply-container
      display: flex
      flex-direction: column
      align-items: center
      padding: 1rem
      border-top: $border

      > *:not(:first-child)
        margin-top: 1rem
</style>
