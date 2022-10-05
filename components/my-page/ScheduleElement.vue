<template>
  <div class="my-page-schedule-element">
    <div class="schedule-title">
      <div class="title-main">{{ schedule.job_name }}</div>
      <div class="sub-title">{{ schedule.store_name }}</div>
    </div>
    <div class="schedule-content">
      <div class="schedule-image">
        <img :src="schedule.image" alt="">
      </div>
      <div class="schedule-description">
        <div>
          <span class="bold">{{ $t('schedule.date') }}</span>
          <span class="desc-date">{{ schedule.date }}</span><span class="desc-state">{{ schedule.date_state }}</span>
        </div>
        <div>
          <span class="bold">{{ $t('schedule.method') }}</span><span>{{ schedule.method }}</span>
        </div>
        <div>
          <span class="bold">{{ $t('schedule.place') }}</span><span>{{ schedule.place }}</span>
        </div>
        <div class="schedule-button">
          <el-button :loading="loading" :disabled="schedule.change_date_state" type="danger">{{ $t('schedule.change') }}</el-button>
          <el-button :loading="loading">{{ $t('button.cancel') }}</el-button>
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
  }
}
</script>
