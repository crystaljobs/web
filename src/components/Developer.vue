<template lang="pug">
  .developer
    a.avatar(:href="'https://github.com/' + developer.github.username")
      img(:src="developer.github.data.avatar_url")
    .information
      .name {{developer.github.data.name || 'Unnamed'}}&nbsp;
      .about
        template(v-if="developer.about")
          | {{developer.about}}
        i(v-else) No description
      .contacts
        .contact
          i.feather.feather-github
          a(:href="githubURL") @{{developer.github.username}}
        template(v-if="developer.website")
          .contact
            i.feather.feather-external-link
            a(:href="developer.website") {{developer.website}}
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
    },
    computed: {
      githubURL () {
        return 'https://github.com/' + this.developer.github.username
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "@/assets/styles/mixins/media.sass"

  .developer
    display: grid
    grid-template-columns: 6rem auto
    grid-column-gap: 0.75rem

    +tablet
      grid-template-columns: 4rem auto

  .avatar
    line-height: 0

  img
    height: 6rem
    border-radius: 3px

    +tablet
      height: 4rem

  .information
    display: flex
    flex-direction: column
    justify-content: center

  .name
    font-weight: bold
    font-size: 1.3rem

  .about
    margin-top: 0.1rem

    +non-tablet
      font-size: 1.1rem

  .contacts
    display: flex
    margin-top: 0.25rem

    +tablet
      flex-direction: column

  .contact
    i
      margin-right: 0.15rem
      opacity: 0.75

    &:not(:first-of-type)
      +tablet
        margin-top: 0.25rem

      +non-tablet
        margin-left: 0.5rem
</style>
