<template>
  <div class="my-page-schedule-element schedule-history">
    <div class="title-create">
      {{ $t('schedule.created_at') }}:{{ schedule.created_at }}
    </div>
    <div class="schedule-title">
      <div class="title-main">
        <span v-if="showStatus" class="show-interview">{{ $t('schedule.interview') }}</span>
        {{ schedule.job_name }}
      </div>
      <div class="sub-title">{{ schedule.store_name }}</div>
    </div>
    <div class="schedule-content">
      <div class="schedule-image">
        <img :src="schedule.image" alt="">
      </div>
      <div v-if="(schedule.status !== undefined) && showStatus" class="schedule-status">
        <div :class="['schedule-button-status', 'status-' + schedule.status]">
          {{ $t('schedule.status.' + schedule.status) }}
        </div>
      </div>
      <div class="schedule-description">
        <div>
          <span class="bold">{{ $t('schedule.date') }}</span><span>{{ schedule.date }}</span>
        </div>
        <div>
          <span class="bold">{{ $t('schedule.method') }}</span><span>{{ schedule.method }}</span>
        </div>
        <div>
          <span class="bold">{{ $t('schedule.place') }}</span><span>{{ schedule.place }}</span>
          <div v-if="showStatus" class="open-google-map">
            <div v-if="schedule.google_map" class="show-button-google-map">
              <img src="/assets/icon/icon_arrow_secondary.svg" alt="">
              <span>{{ $t('schedule.open_google_map') }}</span>
            </div>
          </div>
        </div>
        <div class="schedule-button">
          <el-button v-if="schedule.change_date_state" :loading="loading" :disabled="schedule.change_date_state" type="danger">{{ $t('schedule.change') }}</el-button>
          <el-button :loading="loading">{{ $t('button.cancel') }}</el-button>
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
  }
}
</script>
