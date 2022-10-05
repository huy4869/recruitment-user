<template>
  <div class="favorite-job-page-element">
    <div>
      <div class="favorite-job-page-title">
        <span>{{ $t('my_page.application_history') }}</span>
      </div>
      <div v-if="listJobs.length" class="favorite-job-page-content">
        <div v-for="(schedule, index) in listJobs" :key="index">
          <JobElement :schedule="schedule" :show-status="true"></JobElement>
        </div>
      </div>
      <div v-else>
        <NoDataElement :text="$t('common.no_data')"></NoDataElement>
      </div>
    </div>
  </div>
</template>

<script>
import NoDataElement from '../element-ui/NoDataElement'
import JobElement from './JobElement'
export default {
  name: 'FavoriteJobElement',
  components: { JobElement, NoDataElement },
  data() {
    return {
      listJobs: [],
      page: 1,
      lastPage: 10
    }
  },
  created() {
    this.getDataJob()
  },
  methods: {
    changePage(page) {
      this.page = page
    },
    getDataJob() {
      for (let x = 0; x <= 5; x++) {
        this.listJobs.push({
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
