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
  .admin
    padding: 1rem
    display: flex
    width: calc(100% - 2rem)
    align-items: center
    flex-direction: column
</style>
