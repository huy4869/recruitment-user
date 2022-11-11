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
          <span>{{ $t('common.display_item', { min: this.per_page * (this.page - 1) + 1, max: (this.total > (this.per_page * this.page)) ? (this.per_page * this.page) : this.total } ) }}</span>
        </div>
        <PaginationElement v-if="listJobs.length" :current-page="page" :last-page="lastPage" @change="changePage"></PaginationElement>
      </div>
      <div v-if="listJobs.length" class="favorite-job-page-content">
        <div v-for="(job, index) in listJobs" :key="index">
          <JobElement :job="job" :show-status="true" @removeFavoriteJob="removeFavoriteJobDialog"></JobElement>
        </div>
        <PaginationElement v-if="listJobs.length" :current-page="page" :last-page="lastPage" @change="changePage"></PaginationElement>
      </div>
      <div v-else>
        <NoDataElement :text="$t('common.message_no_data.favorite_job')"></NoDataElement>
      </div>
    </div>
    <el-dialog class="popup-confirm" :visible.sync="dialogCancel" width="570px">
      <div class="image-confirm text-center">
        <img src="/assets/icon/Cancel.svg" alt="">
      </div>
      <div class="content-confirm text-center">
        {{ $t('content.CON_004') }}
      </div>
      <div slot="footer" class="dialog-footer text-center">
        <el-button @click="dialogCancel = false">{{ $t('confirm_modal.no') }}</el-button>
        <el-button type="danger" @click="removeFavoriteJob(jobActive)">{{ $t('confirm_modal.yes') }}</el-button>
      </div>
    </el-dialog>
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
      per_page: 5,
      listJobs: [],
      page: 1,
      lastPage: 1,
      showViewAllJob: true,
      lastUpdated: '2022年09月26日更新',
      dialogCancel: false,
      jobActive: {}
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
        'limit=' + this.per_page
      ]
      const dataResponse = await this.$store.dispatch(JOB_LIST_FAVORITE, dataRequest.join('&'))
      if (dataResponse.status_code === 200) {
        this.listJobs = dataResponse.data.data
        this.total = dataResponse.data.total
        this.lastPage = dataResponse.data.total_page
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    removeFavoriteJobDialog(job) {
      this.dialogCancel = true
      this.jobActive = job
    },
    async removeFavoriteJob(job) {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const response = await this.$store.dispatch(JOB_REMOVE_FAVORITE_JOB, job.id)
      switch (response.status_code) {
        case 200:
          await this.$store.commit(INDEX_SET_SUCCESS, {
            show: true,
            text: response.messages
          })
          this.dialogCancel = false
          this.jobActive = {}
          break
        case 500:
          await this.$store.commit(INDEX_SET_ERROR, {
            show: true,
            text: this.$t('content.EXC_001')
          })
          break
        default:
          await this.$store.commit(INDEX_SET_ERROR, {
            show: true,
            text: response.messages
          })
          break
      }
      await this.getDataJob()
      await this.$store.commit(INDEX_SET_LOADING, false)
    }
  }
}
</script>
