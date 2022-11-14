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
        <div v-if="jobActive.is_favorite" class="button-dislike" @click="removeFavoriteJob">
          <img src="/assets/icon/icon_dislike.svg" alt="">
          <span>{{ $t('home.job_favorite') }}</span>
        </div>
        <div v-else class="button-like" @click="addFavoriteJob">
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

import {
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  JOB_ADD_FAVORITE_JOB,
  JOB_REMOVE_FAVORITE_JOB
} from '../../store/store.const'

export default {
  name: 'HomeJobElement',
  props: ['job'],
  data() {
    return {
      jobActive: {}
    }
  },
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
  created() {
    this.jobActive = this.job
  },
  methods: {
    changeToLink(link) {
      this.$router.push(link)
    },
    async addFavoriteJob() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const dataMessage = {
        job_posting_id: this.jobActive.id
      }
      const dataResponse = await this.$store.dispatch(JOB_ADD_FAVORITE_JOB, dataMessage)
      await this.changeStatusJob(dataResponse, true)
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    async removeFavoriteJob() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const response = await this.$store.dispatch(JOB_REMOVE_FAVORITE_JOB, this.jobActive.id)
      await this.changeStatusJob(response, false)
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    async changeStatusJob(response, state) {
      if (response.status_code === 200) {
        await this.$store.commit(INDEX_SET_SUCCESS, {
          show: true,
          text: response.messages
        })
        this.jobActive.is_favorite = state
      } else {
        await this.$store.commit(INDEX_SET_ERROR, {
          show: true,
          text: response.messages
        })
      }
    }
  }
}
</script>
