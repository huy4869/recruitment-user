<template>
  <div>
    <HeaderCommon></HeaderCommon>
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
export default {
  name: 'DefaultLayout',
  components: { FooterCommon, HeaderCommon, LoadingBar },
  computed: {
    ...mapState({
      showDetailMessage: state => state.my_page.showDetailMessage
    })
  }
}
</script>
