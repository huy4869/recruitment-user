<template>
  <div>
    <div class="show-pc">
      <IndexPageElement
        :total-job="totalJob"
        :list-jobs="listJobs"
        :list-most-view-jobs="listMostViewJobs"
        :list-recommend-jobs="listRecommendJobs"
        :list-search-employment="listSearchEmployment"
        :list-search="listSearch"
        :list-job-types="listJobTypes"
        :list-province-cities="listProvinceCities"
      ></IndexPageElement>
    </div>
    <div class="show-sp">
      <IndexPageMobileElement
        :total-job="totalJob"
        :list-jobs="listJobs"
        :list-most-view-jobs="listMostViewJobs"
        :list-recommend-jobs="listRecommendJobs"
        :list-search-employment="listSearchEmployment"
        :list-search="listSearch"
        :list-job-types="listJobTypes"
        :list-province-cities="listProvinceCities"
      ></IndexPageMobileElement>
    </div>
  </div>
</template>

<script>
import IndexPageElement from '../components/home/IndexPageElement'
import IndexPageMobileElement from '../components/home/IndexPageMobileElement'
import { MASTER_GET_DATA, JOB_LIST_NEW_JOBS, JOB_LIST_MOST_VIEW_JOBS, JOB_LIST_RECOMMEND_JOBS } from '../store/store.const'
import { formatInteger } from '../utils/format'

export default {
  name: 'IndexPage',
  components: { IndexPageMobileElement, IndexPageElement },
  data() {
    return {
      listJobTypes: [],
      listProvinceCities: [],
      totalJob: 0,
      listJobs: [],
      listMostViewJobs: [],
      listRecommendJobs: [],
      listSearchEmployment: ['正社員', '派遣社員', '契約社員', ' アルバイト', ' その他'],
      listSearch: [
        {
          'name': 'ヘアの人気エリアで検索',
          'detail': ['東京', '鹿児島', '千葉', '長崎', '和歌山県', '広島県', '大分県']
        },
        {
          'name': 'ネイル・マツゲの人気エリアで検索',
          'detail': ['東京', '鹿児島', '千葉', '長崎', '和歌山県', '広島県', '大分県']
        },
        {
          'name': '整体・カイロ・酸素・温浴の人気エリアで検索 ',
          'detail': ['東京', '鹿児島', '千葉', '長崎', '和歌山県', '広島県', '大分県']
        },
        {
          'name': '美容クリニックの人気エリアで検索',
          'detail': ['東京', '鹿児島 ', '長崎県', '和歌山県', '広島県', '大分県']
        },
        {
          'name': 'その他の人気エリアで検索',
          'detail': ['東京', '鹿児島', '千葉', '長崎', '長崎県', '和歌山県', '広島県', '大分県']
        }
      ]
    }
  },
  async created() {
    await this.getMasterData()
    await this.getDataJob()
    await this.getRecommendJob()
    await this.getMostPopularJob()
  },
  methods: {
    async getMasterData() {
      const dataResources = [
        'resources[m_job_types]={"model": "MJobType"}',
        'resources[m_provinces_cities]={}'
      ]
      const dataResponse = await this.$store.dispatch(MASTER_GET_DATA, dataResources.join('&'))
      this.listJobTypes = dataResponse.data.m_job_types
      this.listProvinceCities = dataResponse.data.m_provinces_cities
    },
    async getDataJob() {
      const dataResponse = await this.$store.dispatch(JOB_LIST_NEW_JOBS, '')
      this.listJobs = dataResponse.data.data
      this.totalJob = formatInteger(dataResponse.data.total_jobs)
    },
    async getRecommendJob() {
      const dataResponse = await this.$store.dispatch(JOB_LIST_RECOMMEND_JOBS, '')
      this.listRecommendJobs = dataResponse.data
    },
    async getMostPopularJob() {
      const dataResponse = await this.$store.dispatch(JOB_LIST_MOST_VIEW_JOBS, '')
      this.listMostViewJobs = dataResponse.data
    }
  }
}
</script>
