<template>
  <div class="login-page" id="register-layout">
    <RegisterElement></RegisterElement>
  </div>
</template>

<script>
import RegisterElement from '../components/element-ui/RegisterElement'

export default {
  name: 'LoginPage',
  layout: 'none',
  components: { RegisterElement },
  data() {
    return {
      windowWidth: 0
    }
  },
  middleware: 'guest'
}
</script>
