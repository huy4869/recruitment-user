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
import { JOB_LIST_FAVORITE } from '../../store/store.const'
import NoDataElement from '../element-ui/NoDataElement'
import JobElement from './JobElement'
export default {
  name: 'FavoriteJobElement',
  components: { JobElement, NoDataElement },
  data() {
    return {
      total: 0,
      listJobs: [],
      showViewAllJob: true,
      lastUpdated: '2022年09月26日更新'
    }
  },
  async created() {
    await this.getDataJob()
  },
  methods: {
    changePage(page) {
      this.page = page
    },
    async getDataJob() {
      const dataResponse = await this.$store.dispatch(JOB_LIST_FAVORITE, '')
      this.listJobs = dataResponse.data.favoriteJob
      this.total = dataResponse.data.paginate.totalPage
    }
  }
}
</script>
