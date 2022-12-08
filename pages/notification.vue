<template>
  <div class="notification-history-page">
    <TitlePageElement class="show-pc"></TitlePageElement>
    <BannerElement :banner="$t('page.notification_history')"></BannerElement>
    <div v-if="listNotifications.length" class="notification-history-content">
      <div class="notification-list">
        <div v-for="(notification, index) in listNotifications" :key="index" :class="['notification-item', { 'notification-unread': !notification.be_read }]">
          <div class="notification-form">
            <div v-if="!notification.be_read" class="show-status">{{ $t('common.unread') }}</div>
            <div class="notification-title cursor-pointer">
              <a @click="updateRead(notification)" :href="getLinkNotification(notification)">{{ notification.title }}</a>
              <div class="notification-date">{{ notification.created_at }}</div>
            </div>
            <div class="notification-detail">
              {{ notification.content }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="lastPage > 1">
        <PaginationElement :current-page="page" :last-page="lastPage" @change="changePage"></PaginationElement>
      </div>
    </div>
    <div v-else>
      <NoDataElement :text="$t('common.message_no_data.notification')"></NoDataElement>
    </div>
  </div>
</template>

<script>
import {
  INDEX_SET_ERROR, INDEX_SET_LOADING,
  INDEX_SET_TITLE_MENU,
  NOTIFICATION_LIST,
  NOTIFICATION_UPDATE_READ
} from '../store/store.const'
import TitlePageElement from '../components/layout/TitlePageElement'
import BannerElement from '../components/layout/BannerElement'
import PaginationElement from '../components/element-ui/PaginationElement'
import NoDataElement from '../components/element-ui/NoDataElement'

export default {
  name: 'NotificationHistoryPage',
  components: { TitlePageElement, BannerElement, PaginationElement, NoDataElement },
  middleware: 'auth',
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
      this.getDataNotifications()
    },
    getLinkNotification(notification) {
      if (notification.notice_type_id === 3) {
        return '/chat?store=' + notification.noti_object_ids.store_id
      }
      if ([1, 2, 4, 5].includes(notification.notice_type_id)) {
        return '/job/' + notification.noti_object_ids.job_id
      }
      if (notification.notice_type_id === 9) {
        return '/job/' + notification.noti_object_ids.job_id + '?notification=9'
      }
    },
    async getDataNotifications() {
      const dataResponse = await this.$store.dispatch(NOTIFICATION_LIST, '?page=' + this.page)
      if (dataResponse.status_code === 200) {
        this.listNotifications = dataResponse.data.data
        this.lastPage = dataResponse.data.total_page
      }
      if (dataResponse.status_code === 500) {
        await this.$store.commit(INDEX_SET_ERROR, {
          show: true,
          text: this.$t('content.EXC_001')
        })
      }
    },
    async updateRead(notification) {
      if (notification.be_read === 0) {
        try {
          await this.$store.commit(INDEX_SET_LOADING, true)
          const response = await this.$store.dispatch(NOTIFICATION_UPDATE_READ, notification.id)
          switch (response.status_code) {
            case 200:
              this.getDataNotifications()
              break
            case 500:
              await this.$store.commit(INDEX_SET_ERROR, {
                show: true,
                text: this.$t('content.EXC_001')
              })
              break
            default:
              await this.$store.commit(INDEX_SET_ERROR, {
                show: true,
                text: response.messages
              })
              break
          }
          await this.$store.commit(INDEX_SET_LOADING, false)
        } catch (err) {
          await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
        }
        await this.$store.commit(INDEX_SET_LOADING, false)
      }
    }
  }
}
</script>
