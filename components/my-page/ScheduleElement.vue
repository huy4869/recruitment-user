<template>
  <div class="my-page-schedule-element" @click="changeToDetail(schedule.job_id)">
    <div class="schedule-title">
      <div class="title-main">{{ schedule.job_name }}</div>
      <div class="sub-title">{{ schedule.store_name }}
        <span v-if="schedule.company_name" class="job-list__name">({{ schedule.company_name }})</span>
      </div>
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
          <div v-if="schedule.interview_approach" class="d-flex">
            <span class="bold approach-label">{{ schedule.interview_approach.approach_label }}</span>
            <span v-if="schedule.interview_approach" class="show-pc-schedule">
            <div v-if="schedule.interview_approach.id === 1">
              <a v-if="schedule.interview_approach.is_link" class="schedule-url text-blue-hover" :href="schedule.interview_approach.approach" target="_blank">{{ schedule.interview_approach.approach }}</a>
              <span v-else>{{ schedule.interview_approach.approach }}</span>
            </div>
            <span v-else>{{ schedule.interview_approach.approach }}</span>
          </span>
            <span v-if="schedule.interview_approach" class="show-sp-schedule">
            <div v-if="schedule.interview_approach.id === 1">
              <a v-if="schedule.interview_approach.is_link" class="schedule-url text-blue-hover" :href="schedule.interview_approach.approach" target="_blank">{{ schedule.interview_approach.approach }}</a>
              <span v-else>{{ schedule.interview_approach.approach }}</span>
            </div>
            <span v-else-if="schedule.interview_approach.id === 2">{{ schedule.interview_approach.approach }}</span>
            <a class="schedule-url text-blue-hover" v-else :href="'tel:' + schedule.interview_approach.approach" @click.stop="">{{ schedule.interview_approach.approach }}</a>
          </span>
            <div v-if="showStatus" class="open-google-map">
              <a v-if="schedule.interview_approach.is_direct_interview" :href="'http://maps.google.com/?q=' + schedule.interview_approach.approach" class="show-button-google-map text-blue-hover" target="_blank" @click.stop="openGoogleMap">
                <img src="/assets/icon/icon_google_map.svg" alt="">
                <span>{{ $t('schedule.open_google_map') }}</span>
              </a>
            </div>
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
    },
    changeToDetail(id) {
      this.$router.push('/job/' + id)
    }
  }
}
</script>
