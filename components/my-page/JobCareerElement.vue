<template>
  <div class="career-job-page-element">
    <div>
      <div v-if="listJobs.length" class="favorite-job-page-content">
        <div id="career-mobile" class="d-flex justify-between">
          <el-button type="danger" class="card-button" @click="handleRouter('job-career/create/' + (listJobs.length + 1))">
            <span class="d-flex items-center">
              <img src="/assets/icon/add-white.svg" alt="">
              {{ $t('my_page.add_job_career') }}
            </span>
          </el-button>
          <el-button class="card-button btn-right" @click="handleRouter('/my-page/web-cv')">{{ $t('my_page.back') }}</el-button>
        </div>
        <div v-for="(job, index) in listJobs" :key="index">
          <CareerElement :job="job" :index="index + 1" :show-status="true" @reloadList="getDataJob"></CareerElement>
        </div>
        <div id="career" class="d-flex justify-between">
          <el-button type="danger"  class="card-button" @click="handleRouter('job-career/create/' + (listJobs.length + 1))">
            <span class="d-flex">
              <img src="/assets/icon/add-white.svg" alt="">
              {{ $t('my_page.add_job_career') }}
            </span>
          </el-button>
          <el-button class="card-button btn-right" @click="handleRouter('/my-page/web-cv')">{{ $t('my_page.back') }}</el-button>
        </div>
      </div>
      <div v-else>
        <div id="career-mobile" class="d-flex justify-between">
          <el-button type="danger" class="card-button" @click="handleRouter('job-career/create/' + (listJobs.length + 1))">
            <span class="d-flex items-center">
              <img src="/assets/icon/add-white.svg" alt="">
              {{ $t('my_page.add_job_career') }}
            </span>
          </el-button>
          <el-button class="card-button btn-right" @click="handleRouter('/my-page/web-cv')">{{ $t('my_page.back') }}</el-button>
        </div>
        <NoDataElement :text="$t('common.message_no_data.work_history')"></NoDataElement>
      </div>
    </div>
  </div>
</template>

<script>
import NoDataElement from '../element-ui/NoDataElement'
import CareerElement from './CareerElement'
import {
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  WORK_HISTORY_LIST
} from '@/store/store.const'
export default {
  name: 'FavoriteJobElement',
  components: { CareerElement, NoDataElement },
  data() {
    return {
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
    async getDataJob() {
      this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const response = await this.$store.dispatch(WORK_HISTORY_LIST)
        const { data, status_code } = response
        if (status_code === 200) {
          this.listJobs = data
        } else if (status_code === 500) {
          await this.$store.commit(INDEX_SET_ERROR, {
            show: true,
            text: this.$t('content.EXC_001')
          })
        }
      } catch (e) {
        this.$store.commit(INDEX_SET_LOADING, false)
      }
      this.$store.commit(INDEX_SET_LOADING, false)
    },
    handleRouter(route) {
      this.$router.push(route)
    }
  }
}
</script>
