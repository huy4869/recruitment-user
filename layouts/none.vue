<template>
  <div>
    <div class="home">
      <nuxt />
    </div>
    <LoadingBar></LoadingBar>
  </div>
</template>

<script>
import LoadingBar from '../components/LoadingBar'

export default {
  name: 'NoneLayout',
  components: {
    LoadingBar
  },
  data() {
    return {
      categories: [
        {
          name: '',
          link: '',
          active: true,
          children: []
        }
      ],
      windowWidth: 0,
      showPhoneAni: true
    }
  }
}
</script>
