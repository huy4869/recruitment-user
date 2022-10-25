<template>
  <div class="application-history-element">
    <div>
      <div class="application-history-title">
        <span>{{ $t('my_page.application_history') }}</span>
      </div>
      <div v-if="listScheduleHistory.length" class="application-history-content">
        <div v-for="(schedule, index) in listScheduleHistory" :key="index">
          <ScheduleHistoryElement :schedule="schedule" :show-status="true"></ScheduleHistoryElement>
        </div>
      </div>
      <div v-else>
        <NoDataElement :text="$t('common.no_data')"></NoDataElement>
      </div>
    </div>
  </div>
</template>

<script>
import { APPLICATION_LIST } from '../../store/store.const'
import NoDataElement from '../element-ui/NoDataElement'
import ScheduleHistoryElement from './ScheduleHistoryElement'
export default {
  name: 'ApplicationHistoryElement',
  components: { ScheduleHistoryElement, NoDataElement },
  data() {
    return {
      listScheduleHistory: [],
      page: 1,
      lastPage: 10
    }
  },
  async created() {
    await this.getDataScheduleHistory()
  },
  methods: {
    changePage(page) {
      this.page = page
    },
    async getDataScheduleHistory(all) {
      let dataResponse
      if (all) {
        dataResponse = await this.$store.dispatch(APPLICATION_LIST, 'all=1')
      } else {
        dataResponse = await this.$store.dispatch(APPLICATION_LIST, '')
      }
      this.listScheduleHistory = dataResponse.data
    }
  }
}
</script>
