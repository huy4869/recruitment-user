<template>
  <div class="application-history-element">
    <div>
      <div class="application-history-title">
        <span>{{ $t('my_page.application_history') }}</span>
      </div>
      <div v-if="listScheduleHistory.length" class="application-history-content">
        <div v-for="(schedule, index) in listScheduleHistory" :key="index">
          <ScheduleHistoryElement :schedule="schedule" :show-status="true"></ScheduleHistoryElement>
        </div>
      </div>
      <div v-else>
        <NoDataElement :text="$t('common.no_data')"></NoDataElement>
      </div>
    </div>
    <PaginationElement :current-page="page" :last-page="lastPage" @change="changePage" ></PaginationElement>
  </div>
</template>

<script>
import NoDataElement from '../element-ui/NoDataElement'
import PaginationElement from '../element-ui/PaginationElement'
import ScheduleHistoryElement from './ScheduleHistoryElement'
export default {
  name: 'ApplicationHistoryElement',
  components: { ScheduleHistoryElement, NoDataElement, PaginationElement },
  data() {
    return {
      listScheduleHistory: [],
      page: 1,
      lastPage: 10
    }
  },
  created() {
    this.getDataScheduleHistory()
  },
  methods: {
    changePage(page) {
      this.page = page
    },
    getDataScheduleHistory() {
      for (let x = 0; x <= 5; x++) {
        this.listScheduleHistory.push({
          created_at: ['2022年08月01日（月）11:00', '2022年07月29日（金）13:23', '2022年07月22日（金）23:11'][Math.floor(Math.random() * 3)],
          image: '/assets/icon/schedule_image_default.svg',
          job_name: ['☆新規のお客様多数来店☆お仕事もプライベートも充実したい方、大歓迎♪', '美容を楽しみながらそれぞれのプライベートを大切にしています☆', '【働き方改革】オリジナルコミッションシステム始動！！'][Math.floor(Math.random() * 3)],
          store_name: '虎ノ門店舗 (デモ美容室)',
          date: ['2022年08月01日（月）11:00', '2022年08月04日（木）   08:00', '2022年08月10日（日）  14:30'][Math.floor(Math.random() * 3)],
          method: ['対面', 'オンライン面接', '電話面接'][Math.floor(Math.random() * 3)],
          place: ['https://meet.google.com/gpg-ftjc-demo', '〒1000001 東京都千代田区千代田１－２－４', '01234567890'][Math.floor(Math.random() * 3)],
          change_date_state: [true, false][Math.floor(Math.random() * 2)],
          google_map: [true, false][Math.floor(Math.random() * 2)],
          status: ['waiting_interview', 'waiting_result', 'not_adopted', 'adoption', 'cancel'][Math.floor(Math.random() * 2)]
        })
      }
    }
  }
}
</script>
