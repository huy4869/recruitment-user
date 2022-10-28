<template>
  <div class="favorite-job-page-element">
    <div>
      <div class="favorite-job-page-title">
        <span>{{ $t('my_page.application_history') }}</span>
      </div>
      <div class="show-paginate-data">
        <div class="d-flex form-text-all">
          <span>{{ $t('common.all') }}</span>
          <span class="total-record">{{ total + $t('common.subject') }}</span>
          <span>{{ $t('common.display_item', { min: listJobs.length ? 1 : 0, max: listJobs.length }) }}</span>
        </div>
        <PaginationElement v-if="listJobs.length" :current-page="page" :last-page="lastPage" @change="changePage"></PaginationElement>
      </div>
      <div v-if="listJobs.length" class="favorite-job-page-content">
        <div v-for="(job, index) in listJobs" :key="index">
          <JobElement :job="job" :show-status="true" @removeFavoriteJob="removeFavoriteJob"></JobElement>
        </div>
        <PaginationElement v-if="listJobs.length" :current-page="page" :last-page="lastPage" @change="changePage"></PaginationElement>
      </div>
      <div v-else>
        <NoDataElement :text="$t('common.no_data')"></NoDataElement>
      </div>
    </div>
  </div>
</template>

<script>
import {
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  JOB_LIST_FAVORITE,
  JOB_REMOVE_FAVORITE_JOB
} from '../../store/store.const'
import NoDataElement from '../element-ui/NoDataElement'
import PaginationElement from '../element-ui/PaginationElement'
import JobElement from './JobElement'
export default {
  name: 'FavoriteJobElement',
  components: { JobElement, NoDataElement, PaginationElement },
  data() {
    return {
      total: 0,
      listJobs: [],
      page: 1,
      lastPage: 1,
      showViewAllJob: true,
      lastUpdated: '2022年09月26日更新'
    }
  },
  async created() {
    await this.getDataJob()
  },
  methods: {
    async changePage(page) {
      this.page = page
      await this.getDataJob()
    },
    async getDataJob() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const dataRequest = [
        'page=' + this.page,
        'limit=5'
      ]
      const dataResponse = await this.$store.dispatch(JOB_LIST_FAVORITE, dataRequest.join('&'))
      if (dataResponse.status_code === 200) {
        this.listJobs = dataResponse.data.favoriteJob
        this.total = dataResponse.data.paginate.total
        this.lastPage = dataResponse.data.paginate.totalPage
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    async removeFavoriteJob(id) {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const response = await this.$store.dispatch(JOB_REMOVE_FAVORITE_JOB, id)
      if (response.status_code === 200) {
        await this.$store.commit(INDEX_SET_SUCCESS, {
          show: true,
          text: response.messages
        })
      } else {
        await this.$store.commit(INDEX_SET_ERROR, {
          show: true,
          text: response.messages
        })
      }
      await this.getDataJob()
      await this.$store.commit(INDEX_SET_LOADING, false)
    }
  }
}
</script>
