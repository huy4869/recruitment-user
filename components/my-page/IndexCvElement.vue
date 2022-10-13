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
                <div class="number">{{ (success / 6)*100 }}%</div>
              </div>
            </div>
            <svg class="image-percent" xmlns="http://www.w3.org/2000/svg" version="1.1" width="162px" height="162px">
              <defs>
                <linearGradient id="GradientColor">
                  <stop offset="0%" stop-color="#FFB0B2" />
                  <stop offset="100%" stop-color="#F8879C" />
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
            <div class="tab-index" @click="handleRouter(tab.link)">
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

export default {
  name: 'IndexCvElement',
  data() {
    return {
      lastUpdated: '2022年08月22日',
      success: 3,
      listTab: {
        basic: {
          icon: '/assets/icon/001-mypage.svg',
          link: '/my-page/info',
          name: this.$t('my_page.basic_information'),
          state: true
        },
        qualification: {
          icon: '/assets/icon/002-mypage.svg',
          link: '/my-page',
          name: this.$t('my_page.qualification'),
          state: true
        },
        job_career: {
          icon: '/assets/icon/003-mypage.svg',
          link: '/my-page/job-career',
          name: this.$t('my_page.job_career'),
          state: true
        },
        education_background: {
          icon: '/assets/icon/004-mypage.svg',
          link: '/my-page',
          name: this.$t('my_page.education_background'),
          state: false
        },
        self_pr: {
          icon: '/assets/icon/005-mypage.svg',
          link: '/my-page/self-pr',
          name: this.$t('my_page.self_pr'),
          state: false
        },
        motivation: {
          icon: '/assets/icon/006-mypage.svg',
          link: '/my-page',
          name: this.$t('my_page.motivation'),
          state: false
        }
      }
    }
  },
  computed: {
    percent() {
      return 500 * (1 - this.success / 6)
    }
  },
  methods: {
    handleRouter(route) {
      this.$router.push(route)
    }
  }
}
</script>
