<template lang="pug">
  #app
    app-header
    router-view
    app-footer
</template>

<script>
  import Header from '@/components/Header'
  import Footer from '@/components/Footer'

  export default {
    components: {
      AppHeader: Header,
      AppFooter: Footer
    }
  }
</script>

<style lang="sass">
  @import '~pretty-checkbox/src/pretty-checkbox.scss'
  @import "@/assets/styles/index.sass"
  @import "@/assets/styles/mixins/media.sass"
  @import "@/assets/styles/variables.sass"

  html, body
    min-height: 100vh
    margin: 0
    padding: 0

  body
    background-color: rgba(0, 0, 0, 0.03)

  #app
    position: relative
    min-height: 100vh

    +tablet
      padding-bottom: calc(#{$footer-height-tablet})

    +non-tablet
      padding-bottom: calc(#{$footer-height})
</style>
