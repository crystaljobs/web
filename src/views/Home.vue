<template lang="pug">
  .home
    aside
      hero
    developer-list
</template>

<script>
  import Hero from '@/components/Home/Hero.vue'
  import DeveloperList from '@/components/DeveloperList.vue'

  export default {
    components: {
      Hero,
      DeveloperList
    }
  }
</script>

<style lang="sass" scoped>
  $aside-width: 30%

  .home
    @media (min-width: 768px)
      height: 0
      min-height: 100%

      aside
        width: calc(#{$aside-width} - 2rem)
        height: calc(100% - 2rem)
        position: fixed
        display: flex
        align-items: center
        padding: 1rem
        border-right: 1px solid rgba(0, 0, 0, 0.05)

        .hero
          text-align: right
          margin-top: -0.5rem

      .developer-list
        margin-left: $aside-width
        width: calc(100% - #{$aside-width} - 2rem)

    @media (max-width: 768px)
      aside
        padding: 1rem
        border-bottom: 1px solid rgba(0, 0, 0, 0.05)
</style>
