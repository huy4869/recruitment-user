<template>
  <div class="recommend-job-element cursor-pointer" @click="changeToLink('/job/' + jobActive.id)">
    <div class="job-title">
      <div class="title-main">{{ jobActive.name }}</div>
      <div class="sub-title">{{ jobActive.store_name }}
        <span v-if="jobActive.company_name" class="job-list__name">({{ jobActive.company_name }})</span>
      </div>
    </div>
    <div class="job-content">
      <div class="job-image">
        <img
          :src="jobActive.banner_image"
        />
      </div>
      <div class="job-description">
        <div class="job-info">
          <img src="/assets/icon/icon_place.svg" alt="">
          <span>{{ showAddress }}</span>
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
          <div v-for="(work, index) in jobActive.work_types" :key="index" class="feature-item">
            {{ work.name }}
          </div>
        </div>
        <div class="job-button">
          <div v-if="jobActive.is_favorite" class="button-dislike el-button el-button--danger" @click.stop="removeFavoriteJob">
            <img src="/assets/icon/icon_dislike.svg" alt="">
            <span>{{ $t('home.job_favorite') }}</span>
          </div>
          <div v-else class="button-like el-button el-button--default" @click.stop="addFavoriteJob">
            <img class="show-active" src="/assets/icon/icon_like.svg" alt="">
            <img class="hide-active" src="/assets/icon/icon_dislike.svg" alt="">
            <span>{{ $t('home.job_favorite') }}</span>
          </div>
          <div class="button-detail el-button el-button--primary" @click="changeToLink('/job/' + jobActive.id)">
            {{ $t('home.view_job_detail') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {
  JOB_ADD_FAVORITE_JOB,
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  JOB_REMOVE_FAVORITE_JOB
} from '../../store/store.const'

export default {
  name: 'RecommendJobElement',
  props: ['job'],
  data() {
    return {
      jobActive: {}
    }
  },
  computed: {
    showJobType() {
      if (this.jobActive.job_types === undefined) {
        return ''
      }
      return this.jobActive.job_types.map((list) => list.name).join('、')
    },
    showDate() {
      if (this.jobActive.work_time === undefined) {
        return ''
      }
      return this.jobActive.work_time.start + '〜' + this.jobActive.work_time.end
    },
    showSalary() {
      if (this.jobActive.salary === undefined) {
        return ''
      }
      return this.jobActive.salary.min + '～' + this.jobActive.salary.max + this.jobActive.salary.type
    },
    showAddress() {
      if (this.jobActive.address === undefined) {
        return ''
      }
      return (this.jobActive.address.province + this.jobActive.address.province_city + this.jobActive.address.address)
    }
  },
  created() {
    this.jobActive = this.job
  },
  watch: {
    job: {
      handler(newValue) {
        this.jobActive = newValue
      },
      deep: true
    }
  },
  methods: {
    changeToLink(link) {
      this.$router.push(link)
    },
    async addFavoriteJob() {
      if (!this.$auth.loggedIn) {
        this.$cookies.set('auth.redirect', this.$route.fullPath)
        await this.$router.push('/login')
        return
      }
      await this.$store.commit(INDEX_SET_LOADING, true)
      const dataMessage = {
        job_posting_id: this.jobActive.id
      }
      const dataResponse = await this.$store.dispatch(JOB_ADD_FAVORITE_JOB, dataMessage)
      await this.changeStatusJob(dataResponse, true)
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    async removeFavoriteJob() {
      if (!this.$auth.loggedIn) {
        this.$cookies.set('auth.redirect', this.$route.fullPath)
        await this.$router.push('/login')
        return
      }
      await this.$store.commit(INDEX_SET_LOADING, true)
      const response = await this.$store.dispatch(JOB_REMOVE_FAVORITE_JOB, this.jobActive.id)
      await this.changeStatusJob(response, false)
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    async changeStatusJob(response, state) {
      if (state) {
        if (response.status_code === 400) {
          this.$router.push('/job-not-found')
          return
        }
      }
      if (response.status_code === 200) {
        await this.$store.commit(INDEX_SET_SUCCESS, {
          show: true,
          text: response.messages
        })
        this.jobActive.is_favorite = state
      } else if (response.status_code === 500) {
        await this.$store.commit(INDEX_SET_ERROR, {
          show: true,
          text: this.$t('content.EXC_001')
        })
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
