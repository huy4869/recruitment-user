<template>
  <div class="inquiry-page">
    <TitlePageElement class="show-pc"></TitlePageElement>
    <BannerElement :banner="$t('page.inquiry')"></BannerElement>
    <div v-if="loggedIn">
      <InquiryElement></InquiryElement>
    </div>
    <div v-else>
      <InquiryNoLoginElement></InquiryNoLoginElement>
    </div>
  </div>
</template>

<script>
import InquiryElement from '../components/element-ui/InquiryElement'
import InquiryNoLoginElement from '../components/element-ui/InquiryNoLoginElement'
import BannerElement from '~/components/layout/BannerElement'
import TitlePageElement from '~/components/layout/TitlePageElement'
import {
  INDEX_SET_TITLE_MENU
} from '~/store/store.const'

export default {
  name: 'InquiryPage',
  components: { InquiryNoLoginElement, TitlePageElement, BannerElement, InquiryElement },
  data() {
    return {
      loggedIn: this.$auth.loggedIn
    }
  },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.inquiry'), route: '/my-page' }
    ])
  }
}
</script>
