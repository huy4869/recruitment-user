<template>
  <div class="my-page-schedule-element schedule-history" @click="changeToDetail(schedule.job_id)">
    <div class="title-create">
      {{ schedule.submission_date_label }}{{ schedule.created_at }}
    </div>
    <div class="schedule-title">
      <div class="title-main">
        <span v-if="showStatus && schedule.apply_or_interview" class="show-interview">{{ $t('schedule.interview') }}</span>
        {{ schedule.job_name }}
      </div>
      <div class="sub-title">{{ schedule.store_name }}</div>
    </div>
    <div class="schedule-content">
      <div class="schedule-image">
        <img :src="schedule.job_banner" alt="">
      </div>
      <div v-if="(schedule.interview_status_id !== undefined) && showStatus" class="schedule-status">
        <div :class="['schedule-button-status', 'status-' + schedule.interview_status_id]">
          {{ schedule.interview_status_name }}
        </div>
      </div>
      <div class="schedule-description">
        <div>
          <span class="bold">{{ $t('schedule.date') }}</span><span>{{ schedule.interview_date }}</span>
        </div>
        <div>
          <span class="bold">{{ $t('schedule.method') }}</span><span v-if="schedule.interview_approach">{{ schedule.interview_approach.method }}</span>
        </div>
        <div v-if="schedule.interview_approach">
          <span class="bold">{{ schedule.interview_approach.approach_label }}</span><span v-if="schedule.interview_approach">{{ schedule.interview_approach.approach }}</span>
          <div v-if="showStatus" class="open-google-map">
            <a v-if="schedule.interview_approach.is_direct_interview" :href="'https://www.google.com/maps/place/' + schedule.interview_approach.approach" class="show-button-google-map" target="_blank" @click.stop="openGoogleMap">
              <img src="/assets/icon/icon_google_map.svg" alt="">
              <span>{{ $t('schedule.open_google_map') }}</span>
            </a>
          </div>
        </div>
        <div class="schedule-button">
          <el-button v-if="schedule.allow_edit" :loading="loading" type="danger" @click.stop="editApply(schedule.id)">{{ $t('schedule.change') }}</el-button>
          <el-button v-if="schedule.allow_cancel" :loading="loading" @click.stop="cancelSchedule(schedule.id)">{{ $t('button.cancel') }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScheduleHistoryElement',
  props: ['schedule', 'showStatus'],
  data() {
    return {
      loading: false
    }
  },
  methods: {
    cancelSchedule(id) {
      this.$emit('cancelSchedule', id)
    },
    editApply(id) {
      this.$emit('editApply', id)
    },
    changeToDetail(id) {
      this.$router.push('/job/' + id)
    },
    openGoogleMap() {
      this.loading = false
    }
  }
}
</script>
