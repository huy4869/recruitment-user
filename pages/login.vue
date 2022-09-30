<template>
  <div class="login-page">
      <LoginElement></LoginElement>
  </div>
</template>

<script>
import LoginElement from '../components/element-ui/LoginElement'

export default {
  name: 'LoginPage',
  layout: 'none',
  components: { LoginElement },
  data() {
    return {
      windowWidth: 0
    }
  }
}
</script>
