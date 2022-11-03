<template>
  <div class="home-job-element">
    <div class="job-image">
      <img :src="job.banner_image" alt="favorite-job">
      <div class="background-new"></div>
      <div class="show-new">NEW</div>
    </div>
    <div class="job-content">
      <div class="job-name">{{ job.name }}</div>
      <div class="store-name">{{ job.store_name }}</div>
      <div class="job-info">
        <img src="/assets/icon/icon_place.svg" alt="">
        <span>{{ job.address ? job.address.address : '' }}</span>
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
      <div class="">
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
</template>

<script>

export default {
  name: 'HomeJobElement',
  props: ['job'],
  computed: {
    showJobType() {
      if (this.job.job_types === undefined) {
        return ''
      }
      return this.job.job_types.map((list) => list.name).join('、')
    },
    showDate() {
      if (this.job.work_time === undefined) {
        return ''
      }
      return this.job.work_time.start + '〜' + this.job.work_time.end
    },
    showSalary() {
      if (this.job.salary === undefined) {
        return ''
      }
      return this.job.salary.min + '~' + this.job.salary.max + this.job.salary.type
    }
  },
  methods: {
    changeToLink(link) {
      this.$router.push(link)
    }
  }
}
</script>
