<template>
  <div class="cv-page">
    <TitlePageElement v-if="!showDetailMessage" class="show-pc"></TitlePageElement>
    <BannerElement v-if="!showDetailMessage" :banner="$t('page.my_page')" :sub-banner="$t('page.sub_web_cv')"></BannerElement>
    <div class="cv-content">
      <MenuLeftElement v-if="!showDetailMessage" menu-active="chat"></MenuLeftElement>
      <ChatElement></ChatElement>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TitlePageElement from '../components/layout/TitlePageElement'
import BannerElement from '../components/layout/BannerElement'
import MenuLeftElement from '../components/my-page/MenuLeftElement'
import ChatElement from '../components/my-page/ChatElement'
import { INDEX_SET_TITLE_MENU } from '../store/store.const'

export default {
  name: 'ChatPage',
  components: { TitlePageElement, BannerElement, ChatElement, MenuLeftElement },
  data() {
    return {
      listNotifications: [],
      page: 1,
      lastPage: 1
    }
  },
  computed: {
    ...mapState({
      statePage: state => state.my_page.statePage,
      showDetailMessage: state => state.my_page.showDetailMessage
    })
  },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.chat'), route: '/chat' }
    ])
  }
}
</script>
