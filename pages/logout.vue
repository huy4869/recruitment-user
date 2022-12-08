<template>
  <div>
  </div>
</template>

<script>
import {
  INDEX_SET_LOADING
} from '../store/store.const'
export default {
  name: 'LogoutPage',
  async created() {
    await this.logout()
  },
  methods: {
    async logout() {
      this.$store.commit(INDEX_SET_LOADING, true)
      await this.$auth.logout()
      await this.$router.push('/login')
      this.$store.commit(INDEX_SET_LOADING, false)
    }
  }
}
</script>
