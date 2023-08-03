<template>
  <div class="login-page">
    <ForgotPassElement></ForgotPassElement>
  </div>
</template>

<script>
import ForgotPassElement from '../components/element-ui/ForgotPassElement'

export default {
  name: 'ForgotPassPage',
  components: { ForgotPassElement },
  layout: 'none',
  data() {
    return {
      windowWidth: 0
    }
  },
  middleware: 'guest'
}
</script>
