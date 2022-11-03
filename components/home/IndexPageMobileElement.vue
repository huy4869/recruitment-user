<template>
  <div class="index-home-page">
    <div class="index-banner">
      <div class="banner-page-element">
        <div class="banner-title" v-html="$t('home.banner_title_mobile')"></div>
        <div class="form-search-banner">
          <div class="all-job">
            <span>{{ $t('home.all_job_opening') }}</span>
            <span class="all-subject">158,798{{ $t('common.subject') }}</span>
          </div>
          <div class="form-select-search">
            <div class="select-title">
              <div>{{ $t('home.find_a_job') }}</div>
              <div class="choose-job">{{ $t('home.search_by_condition') }}</div>
            </div>
            <div class="form-select">
              <div class="d-flex">
                <div class="form-condition">
                  <el-select v-model="provinceCity" :placeholder="$t('home.search_by_prefecture')">
                    <el-option
                      v-for="item in listProvinceCities"
                      :key="item.province_id"
                      :label="item.name"
                      :value="item.province_id">
                    </el-option>
                    <img slot="suffix" src="/assets/icon/icon_dropdown_full.svg" alt="">
                  </el-select>
                </div>
                <div class="form-prefecture">
                  <el-select v-model="jobType" :placeholder="$t('home.choose_a_job')">
                    <el-option
                      v-for="item in listJobTypes"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="button-filter">
                <button type="button" class="el-button el-button--danger">
                  <img src="/assets/icon/icon_search_button.svg" alt="">
                  <span>{{ $t('common.search') }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="index-home-content">
      <div class="form-more-info">
        <div class="d-flex justify-between">
          <div class="button-more-info" @click="dialogPopular = true">
            <img src="/assets/icon/icon_place.svg" alt="">
            <div>{{ $t('home.search_from_popular') }}</div>
          </div>
          <div class="button-more-info" @click="dialogEmployment = true">
            <img src="/assets/icon/icon_save.svg" alt="">
            <div>{{ $t('home.search_by_employment') }}</div>
          </div>
        </div>
        <div>
          <div class="button-more-info button-most-popular" @click="dialogMost = true">
            <img src="/assets/icon/icon_most_popular.svg" alt="">
            <div>{{ $t('home.most_popular_job') }}</div>
          </div>
        </div>
      </div>
      <div class="form-list-job">
        <div class="new-job-posting">
          <div class="new-job-title">
            <div class="title">
              {{ $t('home.new_job_posting') }}
              <div class="total-new-job">
                {{ $t('home.new_job') }}
              </div>
              <div class="all-job">{{ totalJob }}{{ $t('common.subject') }}</div>
            </div>
            <div class="button-see-all">
              <span>{{ $t('home.see_all_job') }}</span>
              <img src="/assets/icon/icon_arrow.svg" alt="">
            </div>
          </div>
          <div v-if="listJobs.length"  class="new-job-content">
            <VueSlickCarousel v-bind="settings">
              <div v-for="(job, index) in listJobs" :key="index">
                <HomeJobElement :job="job"></HomeJobElement>
              </div>
            </VueSlickCarousel>
          </div>
        </div>
        <div class="recommended-job">
          <div class="recommended-job-title">
            <div class="title">
              {{ $t('home.recommended_job') }}
            </div>
            <div class="button-see-all">
              <span>{{ $t('home.see_all_job') }}</span>
              <img src="/assets/icon/icon_arrow.svg" alt="">
            </div>
          </div>
          <div class="recommended-job-content">
            <div v-for="(job, index) in listRecommendJobs" :key="index">
              <RecommendJobElement :job="job"></RecommendJobElement>
            </div>
          </div>
        </div>
      </div>
      <div class="form-list-new">
        <div class="form-list-new-social">
        <a href="https://www.facebook.com/" target="_blank"><img src="/assets/icon/icon_facebook.svg" alt=""></a>
        <a href="https://twitter.com/" target="_blank"><img src="/assets/icon/icon_twitter.svg" alt=""></a>
        <a href="https://www.instagram.com/" target="_blank"><img src="/assets/icon/icon_instagram.svg" alt=""></a>
        <a href="https://line.me/" target="_blank"><img src="/assets/icon/icon_line.svg" alt=""></a>
        </div>
      </div>
    </div>
    <el-drawer :title="$t('home.search_from_popular')" :visible.sync="dialogPopular" size="100%" direction="ttb">
      <div class="form-popular">
        <div v-for="(item, index) in listSearch" :key="index" class="form-popular-item">
          <div class="form-item-title" @click="showDetailPopular(index)">
            <span>{{ item.name }}</span>
            <img :class="{ 'show-detail': openPopular.includes(index) }" src="/assets/icon/icon_dropdown_full_active.svg" alt="">
          </div>
          <div v-show="openPopular.includes(index)" class="form-item-content">
            <div v-for="(detail, key) in item.detail" :key="key" class="form-detail">
              <span>{{ detail }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
    <el-drawer :title="$t('home.search_by_employment')" :visible.sync="dialogEmployment" size="100%" direction="ttb">
      <div class="form-popular">
        <div v-for="(item, index) in listSearchEmployment" :key="index" class="form-popular-item">
          <div class="form-item-title">
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
    </el-drawer>
    <el-drawer :title="$t('home.most_popular_job')" :visible.sync="dialogMost" size="100%" direction="ttb">
      <div class="form-popular form-most-popular">
        <div v-for="(job, index) in listMostViewJobs" :key="index" class="form-popular-item new-item">
          <div class="new-item-image">
            <img :src="job.banner_image" alt="">
          </div>
          <div class="new-item-content">
            <div class="job-name">{{ job.name }}</div>
            <div class="store-name">{{ job.store_name }}</div>
            <div class="job-info">
              <img src="/assets/icon/icon_place.svg" alt="">
              <span>{{ job.address.address }}</span>
            </div>
          </div>
        </div>
        <div class="button-see-all">
          <span>{{ $t('home.see_all_job') }}</span>
          <img src="/assets/icon/icon_arrow_secondary.svg" alt="">
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import HomeJobElement from './HomeJobElement'
import RecommendJobElement from './RecommendJobElement'

export default {
  name: 'IndexPageMobileElement',
  components: { HomeJobElement, VueSlickCarousel, RecommendJobElement },
  props: ['totalJob', 'listJobs', 'listMostViewJobs', 'listRecommendJobs', 'listSearchEmployment', 'listSearch', 'listJobTypes', 'listProvinceCities'],
  data() {
    return {
      dialogPopular: false,
      dialogEmployment: false,
      dialogMost: false,
      openPopular: [],
      provinceCity: '',
      jobType: '',
      settings: {
        'arrows': true,
        'dots': false,
        'focusOnSelect': true,
        'infinite': false,
        'speed': 500,
        'slidesToShow': 1,
        'slidesToScroll': 1,
        'touchThreshold': 5
      }
    }
  },
  methods: {
    showDetailPopular(index) {
      if (this.openPopular.includes(index)) {
        const key = this.openPopular.indexOf(index)
        if (index > -1) {
          this.openPopular.splice(key, 1)
        }
      } else {
        this.openPopular.push(index)
      }
    }
  }
}
</script>
