<template lang="pug">
  header
    h1.logo
      router-link(to='/') Crystal Jobs
    .page-title {{pageTitle}}
    .right
</template>

<script>
  export default {
    props: {
      pageTitle: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "@/assets/styles/variables.sass"

  header
    display: flex
    justify-content: space-between
    align-items: center

    height: 5rem
    padding: 0 1rem

    border-bottom: $border
    border-left: 5px solid black

  .logo
    font-size: 1.5rem

    a
      text-decoration: none

  h1, .right
    width: 10rem

  .page-title
    font-size: 1.1rem
</style>
