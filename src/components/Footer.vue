<template lang="pug">
  footer.footer
    span
      | Created by&nbsp;
      a(href="https://vladfaust.com") Vlad Faust
    span
      | Source code available at&nbsp;
      a(href="https://github.com/crystaljobs") github.com/crystaljobs
    span Published under MIT License
    span All rights reserved © 2018
</template>

<script>
  export default {

  }
</script>

<style lang="sass" scoped>
  @import "@/assets/styles/variables.sass"
  @import "@/assets/styles/mixins/media.sass"

  .footer
    position: absolute
    bottom: 0
    display: flex
    justify-content: center
    align-items: center

    width: calc(100% - 2rem)
    padding: 2rem 1rem

    text-align: center
    background-color: white

    +tablet
      flex-direction: column
      height: calc(#{$footer-height-tablet} - 4rem)

      > *:not(:first-child)
        margin-top: 0.75rem

    +non-tablet
      height: calc(#{$footer-height} - 4rem)

      > *:not(:first-child)
        margin-left: 1.5rem
</style>
