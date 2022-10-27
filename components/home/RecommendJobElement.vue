<template>
  <div class="recommend-job-element">
    <div class="job-title">
      <div class="title-main">{{ job.name }}</div>
      <div class="sub-title">{{ job.store_name }}</div>
    </div>
    <div class="job-content">
      <div class="job-image">
        <img :src="job.banner_image" alt="">
      </div>
      <div class="job-description">
        <div class="job-info">
          <img src="/assets/icon/icon_place.svg" alt="">
          <span>{{ job.address }}</span>
        </div>
        <div class="job-info">
          <img src="/assets/icon/icon_save.svg" alt="">
          <span>{{ showJobType }}</span>
        </div>
        <div class="job-info">
          <img src="/assets/icon/icon_yen.svg" alt="">
          <span>{{ showSalary }}</span>
        </div>
        <div class="job-info">
          <img src="/assets/icon/icon_time.svg" alt="">
          <span>{{ showDate }}</span>
        </div>
        <div>
          <div v-for="(work, index) in job.work_types" :key="index" class="feature-item">
            {{ work.name }}
          </div>
        </div>
        <div class="job-button">
          <div class="button-like">
            <img src="/assets/icon/icon_like.svg" alt="">
            <span>{{ $t('home.job_favorite') }}</span>
          </div>
          <div class="button-detail">
            <div class="el-button" @click="changeToLink('/job/' + job.id)">
              {{ $t('home.view_job_detail') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'RecommendJobElement',
  props: ['job'],
  computed: {
    showJobType() {
      if (this.job.job_types === undefined) {
        return ''
      }
      return this.job.job_types.map((list) => list.name).join('、')
    },
    showDate() {
      return this.job.start_work_time + '〜' + this.job.end_work_time
    },
    showSalary() {
      return this.job.salary_min + '~' + this.job.salary_max + this.job.salary_type
    }
  },
  methods: {
    changeToLink(link) {
      this.$router.push(link)
    }
  }
}
</script>
