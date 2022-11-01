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
            @editApply="editApply(schedule)">
          </ScheduleHistoryElement>
        </div>
      </div>
      <div v-else>
        <NoDataElement :text="$t('common.no_data')"></NoDataElement>
      </div>
      <FormApplyJobElement :apply-dialog="applyDialog" @closeDialog="applyDialog = false" :is-edit="true" :apply="applyActive"></FormApplyJobElement>
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
      applyActive: {}
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
      this.listScheduleHistory = dataResponse.data
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    async cancelSchedule(id, history) {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const response = await this.$store.dispatch(APPLICATION_CANCEL_APPLICATION, id)
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
      await this.getDataScheduleHistory()
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    editApply(value) {
      this.applyDialog = true
      this.applyActive = value
    }
  }
}
</script>
