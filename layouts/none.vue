<template>
  <div>
    <client-only>
    <NotificationBlock />
    <div class="home">
      <nuxt />
    </div>
    <LoadingBar></LoadingBar>
    </client-only>
  </div>
</template>

<script>
import LoadingBar from '../components/LoadingBar'
import NotificationBlock from '../components/NotificationBlock'

export default {
  name: 'NoneLayout',
  components: {
    LoadingBar,
    NotificationBlock
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
