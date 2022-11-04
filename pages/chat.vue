<template>
  <div class="notification-history-page">
    <TitlePageElement class="show-pc"></TitlePageElement>
    <BannerElement :banner="$t('page.chat')"></BannerElement>
    <ChatElement></ChatElement>
  </div>
</template>

<script>
import TitlePageElement from '../components/layout/TitlePageElement'
import BannerElement from '../components/layout/BannerElement'
import ChatElement from '../components/my-page/ChatElement'
import { INDEX_SET_TITLE_MENU } from '../store/store.const'

export default {
  name: 'ChatPage',
  components: { TitlePageElement, BannerElement, ChatElement },
  data() {
    return {
      listNotifications: [],
      page: 1,
      lastPage: 1
    }
  },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.chat'), route: '/chat' }
    ])
  }
}
</script>
