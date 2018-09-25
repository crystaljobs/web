<template lang="pug">
  .home
    .display-settings
      .entity-tabs
        .tab.selected Developers {{pDevelopersCount}}
        .tab.disabled Jobs
      .filters
        .filter
          .title Sort by:&nbsp;
          select(v-model="sortBy")
            option(value="crystalJobsRegistration") Crystal Jobs registration
            option(value="githubFollowers") GitHub followers
    developer-list(:sortBy="sortBy", @loadedDevelopers="loadedDevelopers")
</template>

<script>
  import DeveloperList from '@/components/DeveloperList.vue'

  export default {
    data () {
      return {
        sortBy: 'githubFollowers',
        developersCount: null
      }
    },
    components: {
      DeveloperList
    },
    mounted () {
      let sortBy = window.localStorage.getItem('developerSortBy')
      this.sortBy = sortBy || 'githubFollowers'
    },
    computed: {
      pDevelopersCount () {
        if (!this.developersCount) return ''
        return `(${this.developersCount})`
      }
    },
    methods: {
      loadedDevelopers (developers) {
        this.developersCount = developers.length
      }
    },
    watch: {
      sortBy (newValue) {
        window.localStorage.setItem('developerSortBy', newValue)
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "@/assets/styles/variables.sass"

  .home
    display: flex
    flex-direction: column
    align-items: center
    padding: 1rem

    > *
      width: 100%
      max-width: $appropriate-width
      background-color: white
      border-radius: 5px

      &:not(:first-child)
        margin-top: 1rem

  .entity-tabs
    padding: 0 1rem

    .tab
      display: inline-block
      width: calc(50% - 2rem)
      height: 100%
      padding: 1rem
      text-align: center
      cursor: pointer

      &.selected
        color: $color-primary
        font-weight: bold
        border-bottom: 2px solid $color-primary

      &.disabled
        cursor: not-allowed
        opacity: 0.5

  .filters
    padding: 1rem

    .filter
      > *
        display: inline-block

        &:not(:first-child)
          margin-left: 0.5rem

  select
    padding: 0.5rem 0.75rem
    font-size: 0.9rem

    background-color: white
    border: 1px solid rgba(0, 0, 0, 0.15)
    border-radius: 3px
</style>
