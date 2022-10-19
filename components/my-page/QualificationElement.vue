<template>
  <div class="career-job-page-element">
    <div>
      <div v-if="listJobs.length" class="favorite-job-page-content">
        <div id="career-mobile" class="d-flex justify-between">
          <el-button type="danger" class="card-button" @click="handleRouter('qualification/create/'+ (listJobs.length + 1))">
            <img src="/assets/icon/add-white.svg" alt="">
            {{ $t('my_page.add_experience') }}
          </el-button>
          <el-button class="card-button btn-right" @click="handleRouter('/my-page#web_cv')">{{ $t('my_page.back') }}</el-button>
        </div>
        <div v-for="(job, index) in listJobs" :key="index">
          <QualifyElement :job="job" :index="index + 1" :show-status="true"></QualifyElement>
        </div>
        <div id="career" class="d-flex justify-between">
          <el-button type="danger"  class="card-button" @click="handleRouter('qualification/create/'+ (listJobs.length + 1))">
            <img src="/assets/icon/add-white.svg" alt="">
            {{ $t('my_page.add_experience') }}
          </el-button>
          <el-button class="card-button btn-right" @click="handleRouter('/my-page#web_cv')">{{ $t('my_page.back') }}</el-button>
        </div>
      </div>
      <div v-else>
        <div id="career-mobile" class="d-flex justify-between">
          <el-button type="danger" class="card-button" @click="handleRouter('qualification/create/'+ (listJobs.length + 1))">
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
import QualifyElement from './QualifyElement'
export default {
  name: 'FavoriteJobElement',
  components: { QualifyElement, NoDataElement },
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
          name: '美容師国家資格',
          date: '2022年09月'
        })
      }
    },
    handleRouter(route) {
      this.$router.push(route)
    }
  }
}
</script>
