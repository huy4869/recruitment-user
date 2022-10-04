<template>
  <div class="login-page">
    <ResetPassElement></ResetPassElement>
  </div>
</template>

<script>
import ResetPassElement from '../components/element-ui/ResetPassElement'

export default {
  name: 'ForgotPassPage',
  components: { ResetPassElement },
  layout: 'none',
  data() {
    return {
      windowWidth: 0
    }
  }
}
</script>
