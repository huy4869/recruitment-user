<template>
  <div class="my-page-schedule-element">
    <div class="schedule-title">
      <div class="title-main">{{ schedule.job_name }}</div>
      <div class="sub-title">{{ schedule.store_name }}</div>
    </div>
    <div class="schedule-content">
      <div class="schedule-image">
        <img :src="schedule.job_banner" alt="">
      </div>
      <div class="schedule-description">
        <div>
          <span class="bold">{{ $t('schedule.date') }}</span>
          <span class="desc-date">{{ schedule.interview_date }}</span><span v-if="schedule.interview_date_status" class="desc-state">{{ schedule.interview_date_status }}</span>
        </div>
        <div>
          <span class="bold">{{ $t('schedule.method') }}</span><span v-if="schedule.interview_approach">{{ schedule.interview_approach.method }}</span>
        </div>
        <div>
          <span v-if="schedule.interview_approach" class="bold">{{ schedule.interview_approach.approach_label }}</span><span v-if="schedule.interview_approach">{{ schedule.interview_approach.approach }}</span>
        </div>
        <div class="schedule-button">
          <el-button :loading="loading" :disabled="!schedule.allow_edit" type="danger" @click="editApply(schedule.id)">{{ $t('schedule.change') }}</el-button>
          <el-button :loading="loading" :disabled="!schedule.allow_cancel" @click="cancelSchedule(schedule.id)">{{ $t('button.cancel') }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ScheduleElement',
  props: ['schedule'],
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
    }
  }
}
</script>
