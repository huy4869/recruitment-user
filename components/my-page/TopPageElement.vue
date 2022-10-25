<template>
  <div class="my-page-top-element">
    <div class="schedule-interview">
      <div class="top-page-title">
        <img src="/assets/icon/icon_title_calendar.svg" alt="">
        <span>{{ $t('my_page.schedule_interview') }}</span>
      </div>
      <div v-if="listSchedule.length" class="top-page-content">
        <div v-for="(schedule, index) in listSchedule" :key="index">
          <ScheduleElement :schedule="schedule"></ScheduleElement>
        </div>
        <div v-if="showViewAllSchedule" class="button-view-all" @click="getDataSchedule(true)">
          <img src="/assets/icon/icon_add.svg" alt="">
          <span>{{ $t('button.view_all') }}</span>
        </div>
      </div>
      <div v-else>
        <NoDataElement :text="$t('common.no_data')"></NoDataElement>
      </div>
    </div>
    <div class="application-history">
      <div class="top-page-title">
        <img src="/assets/icon/icon_title_calendar.svg" alt="">
        <span>{{ $t('my_page.application_history') }}</span>
      </div>
      <div v-if="listScheduleHistory.length" class="top-page-content">
        <div v-for="(schedule, index) in listScheduleHistory" :key="index">
          <ScheduleHistoryElement :schedule="schedule"></ScheduleHistoryElement>
        </div>
        <div v-if="showViewAllScheduleHistory" class="button-view-all" @click="getDataScheduleHistory(true)">
          <img src="/assets/icon/icon_add.svg" alt="">
          <span>{{ $t('button.view_all') }}</span>
        </div>
      </div>
      <div v-else>
        <NoDataElement :text="$t('common.no_data')"></NoDataElement>
      </div>
    </div>
    <div class="button-footer">
      <div class="button-item">
        <div class="d-flex">
          <img src="/assets/icon/icon_history.svg" alt="">
          <span>{{ $t('my_page.history') }}</span>
        </div>
        <img class="icon-arrow" src="/assets/icon/icon_arrow_active.svg" alt="">
      </div>
      <div class="button-item">
        <div class="d-flex">
          <img src="/assets/icon/icon_heart.svg" alt="">
          <span>{{ $t('my_page.favorite_job') }}</span>
        </div>
        <img class="icon-arrow" src="/assets/icon/icon_arrow_active.svg" alt="">
      </div>
      <div class="button-item">
        <div class="d-flex">
          <img src="/assets/icon/icon_user.svg" alt="">
          <span>{{ $t('my_page.web_cv') }}</span>
        </div>
        <img class="icon-arrow" src="/assets/icon/icon_arrow_active.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { APPLICATION_LIST_WAITING_INTERVIEW, APPLICATION_LIST_APPLIED } from '../../store/store.const'
import NoDataElement from '../element-ui/NoDataElement'
import ScheduleElement from './ScheduleElement'
import ScheduleHistoryElement from './ScheduleHistoryElement'
export default {
  name: 'TopPageElement',
  components: { ScheduleElement, ScheduleHistoryElement, NoDataElement },
  data() {
    return {
      listSchedule: [],
      listScheduleHistory: [],
      showViewAllSchedule: true,
      showViewAllScheduleHistory: true
    }
  },
  async created() {
    await this.getDataSchedule()
    await this.getDataScheduleHistory()
  },
  methods: {
    async getDataSchedule(all) {
      let dataResponse
      if (all) {
        dataResponse = await this.$store.dispatch(APPLICATION_LIST_WAITING_INTERVIEW, 'all=1')
      } else {
        dataResponse = await this.$store.dispatch(APPLICATION_LIST_WAITING_INTERVIEW, '')
      }
      this.listSchedule = dataResponse.data
    },
    async getDataScheduleHistory(all) {
      let dataResponse
      if (all) {
        dataResponse = await this.$store.dispatch(APPLICATION_LIST_APPLIED, 'all=1')
      } else {
        dataResponse = await this.$store.dispatch(APPLICATION_LIST_APPLIED, '')
      }
      this.listScheduleHistory = dataResponse.data
    }
  }
}
</script>
