<template>
  <div>
    <HeaderCommon></HeaderCommon>
    <NotificationBlock />
    <div class="home">
      <nuxt />
    </div>
    <FooterCommon v-if="!showDetailMessage"></FooterCommon>
    <LoadingBar></LoadingBar>
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
