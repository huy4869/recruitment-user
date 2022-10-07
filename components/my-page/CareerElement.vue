<template>
  <div class="favorite-job-element job-element">
    <div class="">
      <div class="job-title d-flex justify-between card-title-mobile">
          <div class="card-primary-title">{{ this.$t('my_page.job_career') }}</div>
          <div class="btn-option d-flex">
            <el-button class="btn-edit"><img src="/assets/icon/edit.svg" alt="img-edit">{{ this.$t('my_page.edit') }}</el-button>
            <el-button class="btn-remove"><img src="/assets/icon/remove.svg" alt="img-edit">{{ this.$t('my_page.remove') }}</el-button>
          </div>
      </div>
      <div class="job-box items-center">
        <div class="left-item"><p class="card-text-primary">{{ $t('career.store_name') }}</p></div>
        <div class="right-item first-right-item"><p class="card-text-normal">{{ job.address }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('career.company_name') }}</p></div>
        <div class="right-item"><p class="card-text-normal">{{ job.work_type }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('career.period_start') }}</p></div>
        <div class="right-item"><p class="card-text-normal">{{ job.salary }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('career.occupation') }}</p></div>
        <div class="right-item"><p class="card-text-normal">{{ job.work_time }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('career.position_offices') }}</p></div>
        <div class="right-item"><p class="card-text-normal">{{ job.shifs }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('career.period_end') }}</p></div>
        <div class="right-item"><p class="card-text-normal text-ellipsis">{{ job.welfare_treatment_description }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('career.business_content') }}</p></div>
        <div class="right-item"><p class="card-text-normal text-ellipsis">{{ job.welfare_treatment_description }}</p></div>
        <div class="left-item"><p class="card-text-primary">
          {{ $t('career.experience_accumulation1') }}<br>
          {{ $t('career.experience_accumulation2') }}<br>
          {{ $t('career.experience_accumulation3') }}</p>
        </div>
        <div class="right-item">
          <div class="">
            <p v-for="(feature, index) in job.features" :key="index" class="text-status">
              {{ feature }}
            </p>
          </div>
        </div>
      </div>
      <div class="btn-option-mobile d-flex">
        <el-button class="btn-edit"><img src="/assets/icon/edit.svg" alt="img-edit">{{ this.$t('my_page.edit') }}</el-button>
        <el-button class="btn-remove"><img src="/assets/icon/remove.svg" alt="img-edit">{{ this.$t('my_page.remove') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'JobElement',
  props: ['job']
}
</script>
