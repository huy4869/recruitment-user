<template>
  <div class="favorite-job-page-element">
    <div>
      <div class="favorite-job-page-title">
        <span>{{ $t('my_page.application_history') }}</span>
      </div>
      <div class="show-paginate-data">
        <div>
          <span>{{ $t('common.all') }}</span>
          <span class="total-record">{{ total + $t('common.subject') }}</span>
          <span>{{ $t('common.display_item', { min: listJobs.length ? 1 : 0, max: listJobs.length }) }}</span>
        </div>
      </div>
      <div v-if="listJobs.length" class="favorite-job-page-content">
        <div v-for="(job, index) in listJobs" :key="index">
          <JobElement :job="job" :show-status="true"></JobElement>
        </div>
        <div v-if="listJobs.length < total" class="button-view-all" @click="getDataJob">
          <img src="/assets/icon/icon_add.svg" alt="">
          <span>{{ $t('button.view_all') }}</span>
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
      total: 3,
      listJobs: [],
      showViewAllJob: true,
      lastUpdated: '2022年09月26日更新'
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
      for (let x = 0; x <= 0; x++) {
        this.listJobs.push({
          name: ['★入社祝金100万円支給！/選べる保障/完週2日30万円★', 'オープニングスタッフ募集☆週休２日＋歩合６０％', '業務委託が初めての方でも<週休2日×35万円保障>で安心'][Math.floor(Math.random() * 3)],
          address: ['〒100-0001東京都千代田区大手町１－２－３', '東京都千代田区', '東京都千代田区'][Math.floor(Math.random() * 3)],
          store_name: ['虎ノ門店舗 (デモ美容室)', 'デモ美容室 - 虎ノ門店舗', 'デモ美容室 - 虎ノ門店舗'][Math.floor(Math.random() * 3)],
          status: ['waiting_interview', 'waiting_result', 'not_adopted', 'adoption', 'cancel'][Math.floor(Math.random() * 5)],
          work_type: ['ヘア、ネイル・マツゲ、整体・カイロ・酸素・温浴', 'ヘア、ネイル・マツゲ、整体・カイロ・酸素・温浴'][Math.floor(Math.random() * 2)],
          salary: ['10~20万/月収', '250~400万/収'][Math.floor(Math.random() * 2)],
          work_time: ['午前9時～午後', '6~10万円/月収 残業手当があります。'][Math.floor(Math.random() * 2)],
          shifs: ['休日・休暇', '休日・休暇'][Math.floor(Math.random() * 2)],
          features: ['正社員', '派遣社員', 'アルバイト', 'その他'],
          welfare_treatment_description: '・カット\n' +
          '全体のバランスを見ながらカットを行います。髪を塗らした状態だけではなく、乾かし...',
          last_updated: '2022年09月26日更新'
        })
      }
    }
  }
}
</script>
