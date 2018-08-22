<template lang="pug">
  #app
    //- .bar
    router-view
</template>

<style lang="sass">
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700')
  @import '~pretty-checkbox/src/pretty-checkbox.scss'

  $main-color: #0a83d8
  $bar-height: 5px

  html, body
    padding: 0
    margin: 0
    height: 100%
    min-height: 100vh

  body
    font-family: 'Roboto', sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    color: rgba(0, 0, 0, 0.85)

  #app
    height: 100%
    min-height: 100%

  a
    text-decoration: none

    &, &:visited
      color: $main-color
</style>
