<template>
  <div class="job-not-found-page">
    <div class="title-page-element show-pc">
      <div class="d-flex">
        <router-link class="title-link" :to="'/'" tag="button">
          <img src="/assets/icon/icon_home.svg"/>
          <span>{{ $t('page.home') }}</span>
        </router-link>
        <span class="icon-between">/</span>
      </div>
      <div class="d-flex">
        <div class="title-not-link">
          <span> {{ $t('common.job_not_found') }}</span>
        </div>
      </div>
    </div>
    <div class="text-center job-nodata">{{ $t('common.job_not_found') }}</div>
  </div>

</template>

<script>
export default {
  name: 'JobNotFoundPage'
}
</script>
