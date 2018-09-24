<template lang="pug">
  .admin
    developer-list(:authorize="true", :displayAdminForm="true")
</template>

<script>
  import DeveloperList from '@/components/DeveloperList.vue'
  import { mapState } from 'vuex'

  export default {
    components: {
      DeveloperList
    },
    computed: {
      ...mapState(['jwt'])
    },
    created () {
      if (!this.jwt) {
        this.$router.replace('/')
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "@/assets/styles/variables.sass"

  .admin
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
</style>
