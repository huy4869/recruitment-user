<template>
  <div class="home-job-element">
    <div class="job-image">
      <img :src="job.image" alt="favorite-job">
      <div class="background-new"></div>
      <div class="show-new">NEW</div>
    </div>
    <div class="job-content">
      <div class="job-name">{{ job.name }}</div>
      <div class="store-name">{{ job.store_name }}</div>
      <div class="job-info">
        <img src="/assets/icon/icon_place.svg" alt="">
        <span>{{ job.address }}</span>
      </div>
      <div class="job-info">
        <img src="/assets/icon/icon_yen.svg" alt="">
        <span>{{ job.salary }}</span>
      </div>
      <div class="job-info">
        <img src="/assets/icon/icon_time.svg" alt="">
        <span>{{ job.date }}</span>
      </div>
      <div class="">
        <div v-for="(feature, index) in job.features" :key="index" class="feature-item">
          {{ feature }}
        </div>
      </div>
      <div class="job-button">
        <div class="button-like">
          <img src="/assets/icon/icon_like.svg" alt="">
          <span>{{ $t('home.job_favorite') }}</span>
        </div>
        <div class="button-detail">
          <div class="el-button">
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
  props: ['job']
}
</script>
