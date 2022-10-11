<template>
  <div class="career-job-page-element">
    <div>
      <div v-if="listJobs.length" class="favorite-job-page-content">
        <div id="career-mobile" class="d-flex justify-between">
          <el-button type="danger" class="card-button" @click="handleRouter('/my-page')">
            <img src="/assets/icon/add-white.svg" alt="">
            {{ $t('my_page.add_experience') }}
          </el-button>
          <el-button class="card-button btn-right" @click="handleRouter('/my-page#web_cv')">{{ $t('my_page.back') }}</el-button>
        </div>
        <div v-for="(job, index) in listJobs" :key="index">
          <CareerElement :job="job" :index="index + 1" :show-status="true"></CareerElement>
        </div>
        <div id="career" class="d-flex justify-between">
          <el-button type="danger"  class="card-button" @click="handleRouter('/my-page')">
            <img src="/assets/icon/add-white.svg" alt="">
            {{ $t('my_page.add_experience') }}
          </el-button>
          <el-button class="card-button btn-right" @click="handleRouter('/my-page#web_cv')">{{ $t('my_page.back') }}</el-button>
        </div>
      </div>
      <div v-else>
        <div id="career-mobile" class="d-flex justify-between">
          <el-button type="danger" class="card-button" @click="handleRouter('/my-page')">
            <img src="/assets/icon/add-white.svg" alt="">
            {{ $t('my_page.add_experience') }}
          </el-button>
          <el-button class="card-button btn-right" @click="handleRouter('/my-page#web_cv')">{{ $t('my_page.back') }}</el-button>
        </div>
        <NoDataElement :text="$t('common.no_data')" :type="'career'"></NoDataElement>
      </div>
    </div>
  </div>
</template>

<script>
import NoDataElement from '../element-ui/NoDataElement'
import CareerElement from './CareerElement'
export default {
  name: 'FavoriteJobElement',
  components: { CareerElement, NoDataElement },
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
      for (let x = 0; x <= 1; x++) {
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
    },
    handleRouter(route) {
      this.$router.push(route)
    }
  }
}
</script>
