<template>
  <div class="application-history-element">
    <div>
      <div class="application-history-title">
        <span>{{ $t('my_page.application_history') }}</span>
      </div>
      <div v-if="listScheduleHistory.length" class="application-history-content">
        <div v-for="(schedule, index) in listScheduleHistory" :key="index">
          <ScheduleHistoryElement
            :schedule="schedule"
            :show-status="true"
            @cancelSchedule="(id) => { cancelSchedule(id, true) }"
            @editApply="editApply">
          </ScheduleHistoryElement>
        </div>
      </div>
      <div v-else>
        <NoDataElement :text="$t('common.message_no_data.application_history')"></NoDataElement>
      </div>
      <el-dialog class="popup-confirm" :visible.sync="dialogCancel" width="570px">
        <div class="image-confirm text-center">
          <img src="/assets/icon/Cancel.svg" alt="">
        </div>
        <div class="content-confirm text-center">
          {{ $t('content.CON_005') }}
        </div>
        <div slot="footer" class="dialog-footer text-center">
          <el-button @click="dialogCancel = false">{{ $t('confirm_modal.no') }}</el-button>
          <el-button type="danger" @click="cancelSchedulePost(applyActive, dialogHistory)">{{ $t('confirm_modal.yes') }}</el-button>
        </div>
      </el-dialog>
      <FormApplyJobElement @getListHistory="getDataScheduleHistory" :apply-dialog="applyDialog" @closeDialog="applyDialog = !applyDialog" :is-edit="true" :apply="applyActive"></FormApplyJobElement>
    </div>
  </div>
</template>

<script>
import {
  APPLICATION_CANCEL_APPLICATION,
  APPLICATION_LIST, INDEX_SET_ERROR,
  INDEX_SET_LOADING, INDEX_SET_SUCCESS
} from '../../store/store.const'
import NoDataElement from '../element-ui/NoDataElement'
import FormApplyJobElement from '../element-ui/FormApplyJobElement'
import ScheduleHistoryElement from './ScheduleHistoryElement'
export default {
  name: 'ApplicationHistoryElement',
  components: { ScheduleHistoryElement, NoDataElement, FormApplyJobElement },
  data() {
    return {
      listScheduleHistory: [],
      page: 1,
      lastPage: 1,
      applyDialog: false,
      applyActive: '',
      dialogCancel: false,
      dialogHistory: false
    }
  },
  async created() {
    await this.getDataScheduleHistory()
  },
  methods: {
    changePage(page) {
      this.page = page
    },
    async getDataScheduleHistory() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const dataResponse = await this.$store.dispatch(APPLICATION_LIST, '')
      if (dataResponse.status_code === 200) {
        this.listScheduleHistory = dataResponse.data
      }
      if (dataResponse.status_code === 500) {
        await this.$store.commit(INDEX_SET_ERROR, {
          show: true,
          text: this.$t('content.EXC_001')
        })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    cancelSchedule(id, history) {
      this.dialogCancel = true
      this.applyActive = id
      this.dialogHistory = history
    },
    async cancelSchedulePost(id, history) {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const response = await this.$store.dispatch(APPLICATION_CANCEL_APPLICATION, id)
      switch (response.status_code) {
        case 200:
          await this.$store.commit(INDEX_SET_SUCCESS, {
            show: true,
            text: response.messages
          })
          break
        case 400:
          await this.$router.push('/job-not-found')
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
      }
      await this.getDataScheduleHistory()
      this.dialogCancel = false
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    editApply(value) {
      this.applyDialog = !this.applyDialog
      this.applyActive = value
    }
  }
}
</script>
