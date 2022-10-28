<template>
  <div class="favorite-job-element job-element">
    <div class="show-pc">
      <div class="job-title d-flex">
        <img src="/assets/images/favorite-job.png" alt="favorite-job">
        <div class="title-left">
          <div class="card-title">{{ job.name }}</div>
          <div class="card-subtitle">{{ job.store_name }}</div>
          <div v-if="job.interview_status" :class="['schedule-button-status', 'status-1']">
            {{ job.interview_status }}
          </div>
        </div>
      </div>
      <div class="job-box items-center">
        <div class="left-item"><p class="card-text-primary">{{ $t('favorite_job.place') }}</p></div>
        <div class="right-item first-right-item"><p class="card-text-normal">{{ showAddress }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('favorite_job.recruitment_type') }}</p></div>
        <div class="right-item"><p class="card-text-normal">{{ showTextList('job_types', 'name') }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('favorite_job.salary') }}</p></div>
        <div class="right-item"><p class="card-text-normal">{{ showSalary }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('favorite_job.working_hours') }}</p></div>
        <div class="right-item"><p class="card-text-normal">{{ showDate }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('favorite_job.holiday') }}</p></div>
        <div class="right-item"><p class="card-text-normal">{{ job.holiday_description }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('favorite_job.description') }}</p></div>
        <div class="right-item"><p class="card-text-normal text-ellipsis">{{ job.description }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('favorite_job.status') }}</p></div>
        <div class="right-item"><div class="item-status">
          <p v-for="(type, index) in job.work_types" :key="index" class="text-status">
            {{ type.name }}
          </p>
        </div>
        </div>
      </div>
      <div class="d-flex justify-between cursor-pointer">
        <div class="text-last-updated"><span>{{ job.released_at }}</span></div>
        <div class="d-flex" @click="removeFavoriteJob">
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
          <div v-if="job.interview_status" :class="['schedule-button-status', 'status-1']">
            {{ job.interview_status }}
          </div>
          <div class="text-last-updated"><span>{{ job.released_at }}</span></div>
        </div>
      </div>
      <div class="job-box items-center">
        <div class="left-item"><p class="card-text-primary">{{ $t('favorite_job.place') }}:</p></div>
        <div class="right-item first-right-item"><p class="card-text-normal">{{ showAddress }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('favorite_job.recruitment_type') }}:</p></div>
        <div class="right-item"><p class="card-text-normal">{{ showTextList('job_types', 'name') }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('favorite_job.salary') }}:</p></div>
        <div class="right-item"><p class="card-text-normal">{{ showSalary }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('favorite_job.working_hours') }}:</p></div>
        <div class="right-item"><p class="card-text-normal">{{ showDate }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('favorite_job.holiday') }}:</p></div>
        <div class="right-item"><p class="card-text-normal">{{ job.holiday_description }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('favorite_job.description') }}:</p></div>
        <div class="right-item"><p class="card-text-normal text-ellipsis">{{ job.description }}</p></div>
      </div>
      <div class="right-item">
        <div class="item-status">
          <p v-for="(type, index) in job.work_types" :key="index" class="text-status">
            {{ type.name }}
          </p>
        </div>
      </div>
      <div class="d-flex" @click="removeFavoriteJob">
        <img class="union-icon" src="/assets/icon/union.svg" alt="union">
        <p class="text-primary-blue">{{ $t('favorite_job.remove') }}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'JobElement',
  props: ['job'],
  computed: {
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
    },
    showAge() {
      if (this.job.age === undefined) {
        return ''
      }
      return this.job.age.min + '~' + this.job.age.max + this.$t('common.age')
    },
    showAddress() {
      if (this.job.address === undefined) {
        return ''
      }
      return '〒' + this.job.postal_code + this.job.address.province + this.job.address.district + this.job.address.city + this.job.address.address
    },
    showStation() {
      if (this.job.stations === undefined) {
        return ''
      }
      if (this.job.stations.length) {
        return this.job.stations[0].province_name + this.job.stations[0].railway_name + this.job.stations[0].station_name
      }
      return ''
    }
  },
  methods: {
    showTextList(key, index) {
      if (this.job[key] === undefined) {
        return ''
      }
      return this.job[key].map((item) => item[index]).join('、')
    },
    removeFavoriteJob() {
      this.$emit('removeFavoriteJob', this.job.id)
    }
  }
}
</script>
