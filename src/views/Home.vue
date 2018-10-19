<template lang="pug">
  .home
    .hero
      vue-particles.particles(
        color="#ffffff"
        :particleOpacity="1"
        shapeType="edge"
        :hoverEffect="false"
        :clickEffect="false"
        :moveSpeed="2"
        :particleSize="3"
      )
      h1
        | Crystal Jobs
        sup β
      h2
        | The perfect place to find a&nbsp;
        a(href="https://crystal-lang.org") Crystal
        |  developer
    .cta
      .text Hire a Crystal developer.
      router-link(to='/jobs/new').button.post Post a Job
      .right
    .jobs(v-if="jobs.length > 0")
      job(
        v-for="job in jobs"
        :job="job"
        :key="job.id"
      )
    .no-jobs(v-else-if="loaded")
      p
        i.feather-slash
        |  No jobs available at the moment.&nbsp;
        router-link(to='/jobs/new') Add yours!
    spinner(v-else)
</template>

<script>
  import { indexJobs } from '@/services/api'
  import Job from '@/components/Job.vue'
  import Spinner from '@/components/Spinners/Simple.vue'

  export default {
    components: {
      Job,
      Spinner
    },
    data () {
      return {
        loaded: false,
        jobs: []
      }
    },
    mounted () {
      indexJobs().then((jobs) => {
        this.jobs = jobs
        this.loaded = true
      })
    }
  }
</script>

<style lang="sass" scoped>
  @import '@/assets/styles/variables.sass'

  .home
    display: flex
    flex-direction: column
    align-items: center

  .hero
    position: relative
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

    width: 100%
    height: 20rem

    color: white
    background-color: black

    .particles
      position: absolute
      z-index: 0
      width: 100%
      height: 100%

    a
      color: white
      text-decoration: underline

    h1, h2
      z-index: 1
      margin: 0
      font-weight: inherit
      background-color: black

    h1
      font-size: 4rem

  .cta
    display: flex
    align-items: center
    padding: 2rem

    .text
      margin-right: 1rem
      font-size: 1.1rem

  .jobs
    width: 100%
    max-width: 50rem
    padding: 1rem

  .no-jobs
    padding: 0 1rem
    border: $border
</style>
