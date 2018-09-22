<template lang="pug">
  .developer
    a.avatar(:href="'https://github.com/' + developer.github.username")
      img(:src="developer.github.data.avatar_url")
    .information
      .name {{developer.github.data.name || 'Unnamed'}}&nbsp;
      a.github-link(:href="'https://github.com/' + developer.github.username") @{{developer.github.username}}
      .about
        template(v-if="developer.about")
          | {{developer.about}}
        i(v-else) No description
      .website
        a(v-if="developer.website", :href="developer.website") {{developer.website}}
        i(v-else) No website
      template(v-if="displayAdminForm")
        admin-form(:developer="developer")
</template>

<script>
  import AdminForm from '@/components/Developer/AdminForm.vue'

  export default {
    components: {
      AdminForm
    },
    props: {
      developer: Object,
      displayAdminForm: {
        type: Boolean,
        default: false
      }
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
    margin-top: 0.25rem

    a
      text-transform: lowercase
</style>
