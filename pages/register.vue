<template>
  <div class="login-page">
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
  }
}
</script>
