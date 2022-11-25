<template>
  <div>
    <client-only>
      <HeaderCommon />
      <NotificationBlock />
      <div class="home">
        <nuxt />
      </div>
      <div v-if="!showDetailMessage">
        <FooterCommon />
      </div>
      <LoadingBar />
    </client-only>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LoadingBar from '../components/LoadingBar'
import HeaderCommon from '../components/layout/HeaderCommon'
import FooterCommon from '../components/layout/FooterCommon'
import NotificationBlock from '@/components/NotificationBlock'

export default {
  name: 'DefaultLayout',
  components: { FooterCommon, HeaderCommon, LoadingBar, NotificationBlock },
  computed: {
    ...mapState({
      showDetailMessage: state => state.my_page.showDetailMessage
    })
  }
}
</script>
