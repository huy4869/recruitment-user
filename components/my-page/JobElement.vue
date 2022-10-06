<template>
  <div class="favorite-job-element job-element">
    <div class="show-pc">
      <div class="job-title d-flex">
        <img src="/assets/images/favorite-job.png" alt="favorite-job">
        <div class="title-left">
          <div class="card-title">{{ job.name }}</div>
          <div class="card-subtitle">{{ job.store_name }}</div>
          <div :class="['schedule-button-status', 'status-' + job.status]">
            {{ $t('schedule.status.' + job.status) }}
          </div>
        </div>
      </div>
      <div class="job-box items-center">
        <div class="left-item"><p class="card-text-primary">{{ $t('favorite_job.place') }}</p></div>
        <div class="right-item first-right-item"><p class="card-text-normal">{{ job.address }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('favorite_job.recruitment_type') }}</p></div>
        <div class="right-item"><p class="card-text-normal">{{ job.work_type }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('favorite_job.salary') }}</p></div>
        <div class="right-item"><p class="card-text-normal">{{ job.salary }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('favorite_job.working_hours') }}</p></div>
        <div class="right-item"><p class="card-text-normal">{{ job.work_time }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('favorite_job.holiday') }}</p></div>
        <div class="right-item"><p class="card-text-normal">{{ job.shifs }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('favorite_job.description') }}</p></div>
        <div class="right-item"><p class="card-text-normal text-ellipsis">{{ job.welfare_treatment_description }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('favorite_job.status') }}</p></div>
        <div class="right-item"><div class="item-status">
          <p v-for="(feature, index) in job.features" :key="index" class="text-status">
            {{ feature }}
          </p>
        </div>
        </div>
      </div>
      <div class="d-flex justify-between cursor-pointer">
        <div class="text-last-updated"><span>{{ job.last_updated }}</span></div>
        <div class="d-flex">
          <img class="union-icon" src="/assets/icon/union.svg" alt="union">
          <p class="text-primary-blue">{{ $t('favorite_job.remove') }}</p>
        </div>
      </div>
    </div>
    <div class="show-sp">
      <div class="job-title">
        <div class="title-left">
          <div class="card-title">{{ job.name }}</div>
          <div class="card-subtitle">{{ job.store_name }}</div>
        </div>
        <div class="job-image">
          <img src="/assets/images/favorite-job.png" alt="favorite-job">
        </div>
        <div class="d-flex justify-between">
          <div :class="['schedule-button-status', 'status-' + job.status]">
            {{ $t('schedule.status.' + job.status) }}
          </div>
          <div class="text-last-updated"><span>{{ job.last_updated }}</span></div>
        </div>
      </div>
      <div class="job-box items-center">
        <div class="left-item"><p class="card-text-primary">{{ $t('favorite_job.place') }}:</p></div>
        <div class="right-item first-right-item"><p class="card-text-normal">{{ job.address }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('favorite_job.recruitment_type') }}:</p></div>
        <div class="right-item"><p class="card-text-normal">{{ job.work_type }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('favorite_job.salary') }}:</p></div>
        <div class="right-item"><p class="card-text-normal">{{ job.salary }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('favorite_job.working_hours') }}:</p></div>
        <div class="right-item"><p class="card-text-normal">{{ job.work_time }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('favorite_job.holiday') }}:</p></div>
        <div class="right-item"><p class="card-text-normal">{{ job.shifs }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('favorite_job.description') }}:</p></div>
        <div class="right-item"><p class="card-text-normal text-ellipsis">{{ job.welfare_treatment_description }}</p></div>
      </div>
      <div class="right-item">
        <div class="item-status">
          <p v-for="(feature, index) in job.features" :key="index" class="text-status">
            {{ feature }}
          </p>
        </div>
      </div>
      <div class="d-flex">
        <img class="union-icon" src="/assets/icon/union.svg" alt="union">
        <p class="text-primary-blue">{{ $t('favorite_job.remove') }}</p>
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
