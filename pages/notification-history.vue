<template>
  <div class="notification-history-page">
    <TitlePageElement class="show-pc"></TitlePageElement>
    <BannerElement :banner="$t('page.notification_history')"></BannerElement>
    <div class="notification-history-content">
      <div class="notification-list">
        <div v-for="(notification, index) in listNotifications" :key="index" class="notification-item">
          <div class="notification-form">
            <div v-if="notification.status" class="show-status"></div>
            <div class="notification-title">
              {{ notification.title }}
            </div>
            <div class="notification-detail">
              {{ notification.detail }}
            </div>
          </div>
          <div class="notification-date">
            {{ notification.date }}
          </div>
        </div>
      </div>
      <PaginationElement :current-page="page" :last-page="lastPage" @change="changePage"></PaginationElement>
    </div>
  </div>
</template>

<script>
import { INDEX_SET_TITLE_MENU } from '../store/store.const'
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
      lastPage: 10
    }
  },
  created() {
    this.getDataNotifications()
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.notification_history'), route: '/notification-history' }
    ])
  },
  methods: {
    changePage(page) {
      this.page = page
    },
    getDataNotifications() {
      for (let x = 0; x <= 5; x++) {
        this.listNotifications.push({
          title: ['明日「面談」の予定があります。', '虎ノ門店舗 (デモ美容室)からメッセージが届いていました。', '虎ノ門店舗 (デモ美容室)から書類選考のステータスが面接待ちになります。'][Math.floor(Math.random() * 3)],
          detail: ['明日面談の予定があります。 変更があればマイページの応募履歴欄より変更をしましょう。 頑張ってください！', '虎ノ門店舗 (デモ美容室)から書類の選考されましたので、次はご面接をお待ちになります。', '虎ノ門店舗 (デモ美容室)から書類の選考されましたので、次はご面接をお待ちになります。'][Math.floor(Math.random() * 3)],
          date: ['今日  11:00', '今日  10:30', '2022年08月01日（日）23:00', '2022年08月01日（日）11:00'][Math.floor(Math.random() * 4)],
          status: [true, false][Math.floor(Math.random() * 2)]
        })
      }
    }
  }
}
</script>
