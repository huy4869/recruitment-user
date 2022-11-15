<template>
  <div class="my-page-top-element">
    <div class="schedule-interview">
      <div class="top-page-title">
        <img src="/assets/icon/icon_title_calendar.svg" alt="">
        <span>{{ $t('my_page.schedule_interview') }}</span>
      </div>
      <div v-if="listSchedule.length" class="top-page-content">
        <div v-for="(schedule, index) in listSchedule" :key="index">
          <ScheduleElement :schedule="schedule" @cancelSchedule="(id) => { cancelSchedule(id, false) }" @editApply="editApply"></ScheduleElement>
        </div>
        <div v-if="showViewAllSchedule" class="button-view-all" @click="getDataSchedule(true)">
          <img src="/assets/icon/icon_add.svg" alt="">
          <span>{{ $t('button.view_all') }}</span>
        </div>
      </div>
      <div v-else>
        <NoDataElement :text="$t('common.message_no_data.interview_schedule')"></NoDataElement>
      </div>
    </div>
    <div class="application-history">
      <div class="top-page-title">
        <img src="/assets/icon/icon_title_calendar.svg" alt="">
        <span>{{ $t('my_page.application_history') }}</span>
      </div>
      <div v-if="listScheduleHistory.length" class="top-page-content">
        <div v-for="(schedule, index) in listScheduleHistory" :key="index">
          <ScheduleHistoryElement :schedule="schedule" @cancelSchedule="(id) => { cancelSchedule(id, true) }" @editApply="editApply"></ScheduleHistoryElement>
        </div>
        <div v-if="showViewAllScheduleHistory" class="button-view-all" @click="getDataScheduleHistory(true)">
          <img src="/assets/icon/icon_add.svg" alt="">
          <span>{{ $t('button.view_all') }}</span>
        </div>
      </div>
      <div v-else>
        <NoDataElement :text="$t('common.message_no_data.application_history')"></NoDataElement>
      </div>
    </div>
    <div class="button-footer">
      <div class="button-item">
        <div class="d-flex" @click="changeToPage('application_history')">
          <img src="/assets/icon/icon_history.svg" alt="">
          <span>{{ $t('my_page.history') }}</span>
        </div>
        <img class="icon-arrow" src="/assets/icon/icon_arrow_active.svg" alt="">
      </div>
      <div class="button-item" @click="changeToPage('favorite_job')">
        <div class="d-flex">
          <img src="/assets/icon/icon_heart.svg" alt="">
          <span>{{ $t('my_page.favorite_job') }}</span>
        </div>
        <img class="icon-arrow" src="/assets/icon/icon_arrow_active.svg" alt="">
      </div>
      <div class="button-item" @click="changeToPage('web_cv')">
        <div class="d-flex">
          <img src="/assets/icon/icon_user.svg" alt="">
          <span>{{ $t('my_page.web_cv') }}</span>
        </div>
        <img class="icon-arrow" src="/assets/icon/icon_arrow_active.svg" alt="">
      </div>
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
    <FormApplyJobElement :apply-dialog="applyDialog" @closeDialog="applyDialog = !applyDialog" :is-edit="true" :apply="applyActive"></FormApplyJobElement>
  </div>
</template>

<script>
import {
  APPLICATION_LIST_WAITING_INTERVIEW,
  APPLICATION_LIST_APPLIED,
  MY_PAGE_SET_STATE_PAGE,
  INDEX_SET_LOADING,
  INDEX_SET_ERROR,
  INDEX_SET_SUCCESS,
  APPLICATION_CANCEL_APPLICATION
} from '../../store/store.const'
import NoDataElement from '../element-ui/NoDataElement'
import FormApplyJobElement from '../element-ui/FormApplyJobElement'
import ScheduleElement from './ScheduleElement'
import ScheduleHistoryElement from './ScheduleHistoryElement'
export default {
  name: 'TopPageElement',
  components: { ScheduleElement, ScheduleHistoryElement, NoDataElement, FormApplyJobElement },
  data() {
    return {
      applyDialog: false,
      listSchedule: [],
      listScheduleHistory: [],
      showViewAllSchedule: false,
      showViewAllScheduleHistory: false,
      applyActive: '',
      dialogCancel: false,
      dialogHistory: false
    }
  },
  async created() {
    await this.getDataSchedule(false)
    await this.getDataScheduleHistory(false)
  },
  methods: {
    async getDataSchedule(all) {
      let dataResponse
      await this.$store.commit(INDEX_SET_LOADING, true)
      if (all) {
        dataResponse = await this.$store.dispatch(APPLICATION_LIST_WAITING_INTERVIEW, 'all=1')
      } else {
        dataResponse = await this.$store.dispatch(APPLICATION_LIST_WAITING_INTERVIEW, '')
      }
      if (dataResponse.status_code === 200) {
        this.listSchedule = dataResponse.data.data
        this.showViewAllSchedule = all ? false : dataResponse.data.view_all
      } else if (dataResponse.status_code === 500) {
        await this.$store.commit(INDEX_SET_ERROR, {
          show: true,
          text: this.$t('content.EXC_001')
        })
      } else {
        await this.$store.commit(INDEX_SET_ERROR, {
          show: true,
          text: dataResponse.messages
        })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    async getDataScheduleHistory(all) {
      let dataResponse
      await this.$store.commit(INDEX_SET_LOADING, true)
      if (all) {
        dataResponse = await this.$store.dispatch(APPLICATION_LIST_APPLIED, 'all=1')
      } else {
        dataResponse = await this.$store.dispatch(APPLICATION_LIST_APPLIED, '')
      }
      if (dataResponse.status_code === 200) {
        this.listScheduleHistory = dataResponse.data.data
        this.showViewAllScheduleHistory = all ? false : dataResponse.data.view_all
      } else if (dataResponse.status_code === 500) {
        await this.$store.commit(INDEX_SET_ERROR, {
          show: true,
          text: this.$t('content.EXC_001')
        })
      } else {
        await this.$store.commit(INDEX_SET_ERROR, {
          show: true,
          text: dataResponse.messages
        })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    changeToPage(page) {
      this.$store.commit(MY_PAGE_SET_STATE_PAGE, page)
      this.$router.push('/my-page#' + page)
    },
    cancelSchedule(id, history) {
      this.dialogCancel = true
      this.applyActive = id
      this.dialogHistory = history
    },
    async cancelSchedulePost(id, history) {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const response = await this.$store.dispatch(APPLICATION_CANCEL_APPLICATION, id)
      if (response.status_code === 200) {
        await this.$store.commit(INDEX_SET_SUCCESS, {
          show: true,
          text: response.messages
        })
      } else if (response.status_code === 500) {
        await this.$store.commit(INDEX_SET_ERROR, {
          show: true,
          text: this.$t('content.EXC_001')
        })
      } else {
        await this.$store.commit(INDEX_SET_ERROR, {
          show: true,
          text: response.messages
        })
      }
      if (history) {
        await this.getDataScheduleHistory(!this.showViewAllScheduleHistory)
      } else {
        await this.getDataSchedule(!this.showViewAllSchedule)
      }
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
