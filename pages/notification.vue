<template>
  <div class="notification-history-page">
    <TitlePageElement class="show-pc"></TitlePageElement>
    <BannerElement :banner="$t('page.notification_history')"></BannerElement>
    <div class="notification-history-content">
      <div class="notification-list">
        <div v-for="(notification, index) in listNotifications" :key="index" class="notification-item">
          <div class="notification-form">
            <div v-if="!notification.be_read" class="show-status"></div>
            <div class="notification-title">
              {{ notification.title }}
            </div>
            <div class="notification-detail">
              {{ notification.content }}
            </div>
          </div>
          <div class="notification-date">
            {{ notification.created_at }}
          </div>
        </div>
      </div>
      <PaginationElement v-if="listNotifications.length" :current-page="page" :last-page="lastPage" @change="changePage"></PaginationElement>
    </div>
  </div>
</template>

<script>
import { INDEX_SET_TITLE_MENU, NOTIFICATION_LIST } from '../store/store.const'
import TitlePageElement from '../components/layout/TitlePageElement'
import BannerElement from '../components/layout/BannerElement'
import PaginationElement from '../components/element-ui/PaginationElement'

export default {
  name: 'NotificationHistoryPage',
  components: { TitlePageElement, BannerElement, PaginationElement },
  data() {
    return {
      listNotifications: [],
      page: 1,
      lastPage: 1
    }
  },
  async created() {
    await this.getDataNotifications()
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.notification_history'), route: '/notification' }
    ])
  },
  methods: {
    changePage(page) {
      this.page = page
    },
    async getDataNotifications() {
      const dataResponse = await this.$store.dispatch(NOTIFICATION_LIST, '')
      if (dataResponse.data) {
        this.listNotifications = dataResponse.data.data
        this.page = dataResponse.data.current_page
        this.lastPage = dataResponse.data.total_page
      }
    }
  }
}
</script>
