<template>
  <div class="my-page-top-element">
    <div class="schedule-interview">
      <div class="top-page-title">
        <img src="/assets/icon/icon_title_calendar.svg" alt="">
        <span>{{ $t('my_page.schedule_interview') }}</span>
      </div>
      <div v-if="listSchedule.length" class="top-page-content">
        <div v-for="(schedule, index) in listSchedule" :key="index">
          <ScheduleElement :schedule="schedule"></ScheduleElement>
        </div>
        <div v-if="showViewAllSchedule" class="button-view-all" @click="getDataSchedule">
          <img src="/assets/icon/icon_add.svg" alt="">
          <span>{{ $t('button.view_all') }}</span>
        </div>
      </div>
      <div v-else>
        <NoDataElement :text="$t('common.no_data')"></NoDataElement>
      </div>
    </div>
    <div class="application-history">
      <div class="top-page-title">
        <img src="/assets/icon/icon_title_calendar.svg" alt="">
        <span>{{ $t('my_page.application_history') }}</span>
      </div>
      <div v-if="listScheduleHistory.length" class="top-page-content">
        <div v-for="(schedule, index) in listScheduleHistory" :key="index">
          <ScheduleHistoryElement :schedule="schedule"></ScheduleHistoryElement>
        </div>
        <div v-if="showViewAllScheduleHistory" class="button-view-all" @click="getDataScheduleHistory">
          <img src="/assets/icon/icon_add.svg" alt="">
          <span>{{ $t('button.view_all') }}</span>
        </div>
      </div>
      <div v-else>
        <NoDataElement :text="$t('common.no_data')"></NoDataElement>
      </div>
    </div>
    <div class="button-footer">
      <div class="button-item">
        <div class="d-flex">
          <img src="/assets/icon/icon_history.svg" alt="">
          <span>{{ $t('my_page.history') }}</span>
        </div>
        <img class="icon-arrow" src="/assets/icon/icon_arrow_active.svg" alt="">
      </div>
      <div class="button-item">
        <div class="d-flex">
          <img src="/assets/icon/icon_heart.svg" alt="">
          <span>{{ $t('my_page.favorite_job') }}</span>
        </div>
        <img class="icon-arrow" src="/assets/icon/icon_arrow_active.svg" alt="">
      </div>
      <div class="button-item">
        <div class="d-flex">
          <img src="/assets/icon/icon_user.svg" alt="">
          <span>{{ $t('my_page.web_cv') }}</span>
        </div>
        <img class="icon-arrow" src="/assets/icon/icon_arrow_active.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import NoDataElement from '../element-ui/NoDataElement'
import ScheduleElement from './ScheduleElement'
import ScheduleHistoryElement from './ScheduleHistoryElement'
export default {
  name: 'TopPageElement',
  components: { ScheduleElement, ScheduleHistoryElement, NoDataElement },
  data() {
    return {
      listSchedule: [],
      listScheduleHistory: [],
      showViewAllSchedule: true,
      showViewAllScheduleHistory: true
    }
  },
  created() {
    // this.getDataSchedule()
    // this.getDataScheduleHistory()
  },
  methods: {
    getDataSchedule() {
      for (let x = 0; x <= 0; x++) {
        this.listSchedule.push({
          image: '/assets/icon/schedule_image_default.svg',
          job_name: ['☆新規のお客様多数来店☆お仕事もプライベートも充実したい方、大歓迎♪', '美容を楽しみながらそれぞれのプライベートを大切にしています☆', '【働き方改革】オリジナルコミッションシステム始動！！'][Math.floor(Math.random() * 3)],
          store_name: '虎ノ門店舗 (デモ美容室)',
          date: ['2022年08月01日（月）11:00', '2022年08月04日（木）   08:00', '2022年08月10日（日）  14:30'][Math.floor(Math.random() * 3)],
          date_state: ['今日', '明日', '明後日'][Math.floor(Math.random() * 3)],
          method: ['対面', 'オンライン面接', '電話面接'][Math.floor(Math.random() * 3)],
          place: ['https://meet.google.com/gpg-ftjc-demo', '〒1000001 東京都千代田区千代田１－２－４', '01234567890'][Math.floor(Math.random() * 3)],
          change_date_state: [true, false][Math.floor(Math.random() * 2)]
        })
      }
    },
    getDataScheduleHistory() {
      for (let x = 0; x <= 0; x++) {
        this.listScheduleHistory.push({
          created_at: ['2022年08月01日（月）11:00', '2022年07月29日（金）13:23', '2022年07月22日（金）23:11'][Math.floor(Math.random() * 3)],
          image: '/assets/icon/schedule_image_default.svg',
          job_name: ['☆新規のお客様多数来店☆お仕事もプライベートも充実したい方、大歓迎♪', '美容を楽しみながらそれぞれのプライベートを大切にしています☆', '【働き方改革】オリジナルコミッションシステム始動！！'][Math.floor(Math.random() * 3)],
          store_name: '虎ノ門店舗 (デモ美容室)',
          date: ['2022年08月01日（月）11:00', '2022年08月04日（木）   08:00', '2022年08月10日（日）  14:30'][Math.floor(Math.random() * 3)],
          method: ['対面', 'オンライン面接', '電話面接'][Math.floor(Math.random() * 3)],
          place: ['https://meet.google.com/gpg-ftjc-demo', '〒1000001 東京都千代田区千代田１－２－４', '01234567890'][Math.floor(Math.random() * 3)],
          change_date_state: [true, false][Math.floor(Math.random() * 2)]
        })
      }
    }
  }
}
</script>
