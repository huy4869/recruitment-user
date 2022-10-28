<template>
  <div class="career-job-page-element">
    <div>
      <div v-if="listJobs.length" class="favorite-job-page-content">
        <div id="career-mobile" class="d-flex justify-between">
          <el-button type="danger" class="card-button" @click="handleRouter('job-career/create/' + (listJobs.length + 1))">
            <img src="/assets/icon/add-white.svg" alt="">
            {{ $t('my_page.add_experience') }}
          </el-button>
          <el-button class="card-button btn-right" @click="handleRouter('/my-page#web_cv')">{{ $t('my_page.back') }}</el-button>
        </div>
        <div v-for="(job, index) in listJobs" :key="index">
          <CareerElement :job="job" :index="index + 1" :show-status="true" @reloadList="getDataJob"></CareerElement>
        </div>
        <div id="career" class="d-flex justify-between">
          <el-button type="danger"  class="card-button" @click="handleRouter('job-career/create/' + (listJobs.length + 1))">
            <img src="/assets/icon/add-white.svg" alt="">
            {{ $t('my_page.add_experience') }}
          </el-button>
          <el-button class="card-button btn-right" @click="handleRouter('/my-page#web_cv')">{{ $t('my_page.back') }}</el-button>
        </div>
      </div>
      <div v-else>
        <div id="career-mobile" class="d-flex justify-between">
          <el-button type="danger" class="card-button" @click="handleRouter('job-career/create/' + (listJobs.length + 1))">
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
import {
  INDEX_SET_LOADING,
  WORK_HISTORY_LIST
} from '@/store/store.const'
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
    async getDataJob() {
      this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const response = await this.$store.dispatch(WORK_HISTORY_LIST)
        const { data, status_code } = response
        if (status_code === 200) {
          this.listJobs = data
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
