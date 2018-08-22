<template lang="pug">
  .developer
    a.avatar(:href="'https://github.com/' + developer.github.username")
      img(:src="developer.gitHubData.avatar_url")
    .information
      .name {{developer.gitHubData.name}}&nbsp;
      a.github-link(:href="'https://github.com/' + developer.github.username") @{{developer.github.username}}
      //- router-link.edit(to="/dashboard", v-if="id == developer.id") edit
      .about {{developer.about}}
      .website
        a(:href="developer.website") {{developer.website}}
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    props: {
      developer: Object
    },
    computed: {
      ...mapState(['id'])
    }
  }
</script>

<style lang="sass" scoped>
  .developer
    display: flex
    align-items: center
    width: 100%

  .avatar, .information
    display: inline-block

  .avatar
    line-height: 0

  img
    @media (min-width: 768px)
      height: 7rem
    @media (max-width: 768px)
      height: 4rem

    border-radius: 3px

  .information
    margin-left: 1rem

  .name
    font-weight: bold
    font-size: 1.3rem
    display: inline-block

  .edit
    background-color: #4caf50
    color: white
    padding: 0.15rem 0.3rem
    border-radius: 3px
    font-weight: bold
    margin-left: 0.5rem

  .about
    @media (min-width: 768px)
      font-size: 1.1rem
    @media (max-width: 768px)
      font-size: 0.9rem

    margin-top: 0.1rem
    display: block

  .website
    display: inline-block
    margin-top: 0.3rem
    text-transform: lowercase
</style>
