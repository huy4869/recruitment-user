<template>
  <div>
    <div class="show-pc">
      <IndexPageElement
        :total-job="totalJob"
        :total-new-job="totalNewJob"
        :list-jobs="listJobs"
        :list-most-view-jobs="listMostViewJobs"
        :list-recommend-jobs="listRecommendJobs"
        :list-search-employment="listSearchEmployment"
        :list-search="listSearch"
        :list-job-types="listJobTypes"
        :list-province-cities="listProvinceCities"
        :list-social="listSocial"
      ></IndexPageElement>
    </div>
    <div class="show-sp">
      <IndexPageMobileElement
        :total-job="totalJob"
        :total-new-job="totalNewJob"
        :list-jobs="listJobs"
        :list-most-view-jobs="listMostViewJobs"
        :list-recommend-jobs="listRecommendJobs"
        :list-search-employment="listSearchEmployment"
        :list-search="listSearch"
        :list-job-types="listJobTypes"
        :list-province-cities="listProvinceCities"
        :list-social="listSocial"
      ></IndexPageMobileElement>
    </div>
  </div>
</template>

<script>
import IndexPageElement from '../components/home/IndexPageElement'
import IndexPageMobileElement from '../components/home/IndexPageMobileElement'
import {
  MASTER_GET_DATA,
  JOB_LIST_NEW_JOBS,
  JOB_LIST_MOST_VIEW_JOBS,
  JOB_LIST_RECOMMEND_JOBS,
  LOCATION_LIST_MOST_APPLY,
  JOB_GET_TOTAL_JOB, INDEX_SET_ERROR
} from '../store/store.const'
import { formatInteger } from '../utils/format'

export default {
  name: 'IndexPage',
  components: { IndexPageMobileElement, IndexPageElement },
  data() {
    return {
      listJobTypes: [
        {
          name: this.$t('home.choose_a_job'),
          disabled: true
        }
      ],
      listProvinceCities: [
        {
          name: this.$t('home.search_by_prefecture'),
          disabled: true
        }
      ],
      totalJob: 0,
      totalNewJob: 0,
      listJobs: [],
      listMostViewJobs: [],
      listRecommendJobs: [],
      listSearchEmployment: [],
      listSearch: {},
      listSocial: {}
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
        'resources[m_provinces_cities]={}',
        'resources[m_work_types]={"model": "MWorkType"}',
        'resources[m_social_links]={}'
      ]
      const dataMasterData = await this.$store.dispatch(MASTER_GET_DATA, dataResources.join('&'))
      if (dataMasterData.status_code === 200) {
        this.listJobTypes = dataMasterData.data.m_job_types.length ? dataMasterData.data.m_job_types : [{ name: this.$t('home.choose_a_job'), disabled: true }]
        this.listSearchEmployment = dataMasterData.data.m_work_types
        this.listProvinceCities = dataMasterData.data.m_provinces_cities.length ? dataMasterData.data.m_provinces_cities : [{ name: this.$t('home.search_by_prefecture'), disabled: true }]
        this.listSocial = dataMasterData.data.m_social_links
      }
      const dataLocation = await this.$store.dispatch(LOCATION_LIST_MOST_APPLY)
      if (dataLocation.status_code === 200) {
        this.listSearch = dataLocation.data
      }
      const dataTotalJob = await this.$store.dispatch(JOB_GET_TOTAL_JOB)
      if (dataTotalJob.status_code === 200) {
        this.totalJob = formatInteger(dataTotalJob.data)
      }
    },
    async getDataJob() {
      const dataResponse = await this.$store.dispatch(JOB_LIST_NEW_JOBS, '')
      if (dataResponse.status_code === 200) {
        this.listJobs = dataResponse.data.data
        this.totalNewJob = formatInteger(dataResponse.data.total_jobs)
      }
      if (dataResponse.status_code === 500) {
        await this.$store.commit(INDEX_SET_ERROR, {
          show: true,
          text: this.$t('content.EXC_001')
        })
      }
    },
    async getRecommendJob() {
      const dataResponse = await this.$store.dispatch(JOB_LIST_RECOMMEND_JOBS, '')
      if (dataResponse.status_code === 200) {
        this.listRecommendJobs = dataResponse.data
      }
      if (dataResponse.status_code === 500) {
        await this.$store.commit(INDEX_SET_ERROR, {
          show: true,
          text: this.$t('content.EXC_001')
        })
      }
    },
    async getMostPopularJob() {
      const dataResponse = await this.$store.dispatch(JOB_LIST_MOST_VIEW_JOBS, '')
      if (dataResponse.status_code === 200) {
        this.listMostViewJobs = dataResponse.data
      }
      if (dataResponse.status_code === 500) {
        await this.$store.commit(INDEX_SET_ERROR, {
          show: true,
          text: this.$t('content.EXC_001')
        })
      }
    }
  }
}
</script>
