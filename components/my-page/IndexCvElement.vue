<template>
  <div class="index-cv-element">
    <div class="index-cv-title">
      <div class="title-page">{{ $t('page.web_cv') }}</div>
      <div class="last-updated">{{ $t('my_page.last_updated') }}：{{lastUpdated }}</div>
    </div>
    <div class="index-cv-content">
      <div class="index-percent">
        <div class="percent-circle circle-wrap">
          <div class="skill">
            <div class="outer">
              <div class="inner">
                <div class="number">{{ percentage }}%</div>
              </div>
            </div>
            <svg class="image-percent" xmlns="http://www.w3.org/2000/svg" version="1.1" width="162px" height="162px">
              <defs>
                <linearGradient id="GradientColor">
                  <stop offset="0%" stop-color="#DDA2DE" />
                  <stop offset="100%" stop-color="#E739EB" />
                </linearGradient>
              </defs>
              <circle cx="80" cy="80" r="70" stroke-linecap="round" :style="{'stroke-dashoffset': percent}" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="162px" height="162px">
              <defs>
                <linearGradient id="GradientColorBlack">
                  <stop offset="0%" stop-color="#EEEEEE" />
                  <stop offset="100%" stop-color="#EEEEEE" />
                </linearGradient>
              </defs>
              <circle class="image-default" cx="80" cy="80" r="70" stroke-linecap="round" />
            </svg>
          </div>
        </div>
        <div class="complete-status">
          <div class="complete-item">{{ $t('my_page.complete_each_item') }}</div>
          <div class="result-item">
            <span class="item-success">{{ success }}</span>
            <span class="total-item">/6</span>
            <span class="item-completed">{{ $t('my_page.item_completed') }}</span>
          </div>
        </div>
      </div>
      <div class="index-page">
        <el-row>
          <el-col v-for="(tab, key) in listTab" :key="key" :span="12">
            <div class="tab-index menu-hover" @click="handleRouter(tab.link)">
              <img :src="tab.icon" alt="">
              <div>{{ tab.name }}</div>
              <img v-if="tab.state" class="icon-done" src="/assets/icon/mypage_done.svg" alt="">
            </div>
          </el-col>
          <el-col :span="12">
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>

import {
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  MY_PAGE_GET_PERCENTAGE
} from '../../store/store.const'

export default {
  name: 'IndexCvElement',
  data() {
    return {
      lastUpdated: '',
      success: 0,
      percentage: 0,
      listTab: {
        baseInfo: {
          icon: '/assets/icon/001-mypage.svg',
          link: '/my-page/info',
          name: this.$t('my_page.basic_information'),
          state: false
        },
        qualification: {
          icon: '/assets/icon/002-mypage.svg',
          link: '/my-page/qualification',
          name: this.$t('my_page.qualification'),
          state: false
        },
        workHistory: {
          icon: '/assets/icon/003-mypage.svg',
          link: '/my-page/job-career',
          name: this.$t('my_page.job_career'),
          state: false
        },
        percentageUserLearning: {
          icon: '/assets/icon/004-mypage.svg',
          link: '/my-page/education',
          name: this.$t('my_page.education_background'),
          state: false
        },
        selfPr: {
          icon: '/assets/icon/005-mypage.svg',
          link: '/my-page/self-pr',
          name: this.$t('my_page.self_pr'),
          state: false
        },
        motivation: {
          icon: '/assets/icon/006-mypage.svg',
          link: '/my-page/motivation',
          name: this.$t('my_page.motivation'),
          state: false
        }
      }
    }
  },
  computed: {
    percent() {
      return 500 * (1 - this.percentage / 100)
    }
  },
  async created() {
    await this.getDataProfile()
  },
  methods: {
    handleRouter(route) {
      this.$router.push(route)
    },
    async getDataProfile() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const dataResponse = await this.$store.dispatch(MY_PAGE_GET_PERCENTAGE)
      if (dataResponse.status_code === 200) {
        let total = 0
        let success = 0
        for (const tab in this.listTab) {
          total += (dataResponse.data[tab].percent ? dataResponse.data[tab].percent : 0)
          if (dataResponse.data[tab].percent === dataResponse.data[tab].total) {
            success++
            this.listTab[tab].state = true
          } else {
            this.listTab[tab].state = false
          }
        }
        this.percentage = total
        this.success = success
        this.lastUpdated = dataResponse.data.updateDateNew
      }
      if (dataResponse.status_code === 500) {
        await this.$store.commit(INDEX_SET_ERROR, {
          show: true,
          text: this.$t('content.EXC_001')
        })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    }
  }
}
</script>
