<template>
  <div class="index-home-page">
    <div class="index-banner">
      <div class="banner-page-element">
        <div class="banner-title" v-html="$t('home.banner_title')"></div>
        <div class="form-search-banner">
          <div class="all-job">
            <span>{{ $t('home.all_job_opening') }}</span>
            <span class="all-subject">158,798{{ $t('common.subject') }}</span>
          </div>
          <div class="form-select-search">
            <div class="select-title">
              <div>{{ $t('home.find_a_job') }}</div>
              <div class="choose-job" @click="changeToSearch(false)">{{ $t('home.search_by_condition') }}</div>
            </div>
            <div class="form-select">
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
              <div class="image-form-search">
                <img src="/assets/icon/icon_add_primary.svg" alt="">
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
              <div class="button-filter">
                <button type="button" class="el-button el-button--danger" @click="changeToSearch(true)">
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
      <div class="form-list-job">
        <div class="new-job-posting">
          <div class="new-job-title">
            <div class="title">
              <img src="/assets/images/icon_home_sub_title.svg" alt="">
              {{ $t('home.new_job_posting') }}
              <div class="total-new-job">
                {{ $t('home.new_job') }}
              </div>
              <div class="all-job">{{ totalJob }}{{ $t('common.subject') }}</div>
            </div>
            <div class="button-see-all" @click="changeToSearch(false)">
              <span>{{ $t('home.see_all_job') }}</span>
              <img src="/assets/icon/icon_arrow.svg" alt="">
            </div>
          </div>
          <div v-if="listJobs.length" class="new-job-content">
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
              <img src="/assets/images/icon_home_sub_title1.svg" alt="">
              {{ $t('home.recommended_job') }}
            </div>
            <div class="button-see-all" @click="changeToSearch(false)">
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
        <div class="search-from-popular">
          <div class="search-from-popular-title">
            <div class="title">
              <img src="/assets/images/icon_home_sub_title2.svg" alt="">
              {{ $t('home.search_from_popular') }}
            </div>
          </div>
          <div class="search-from-popular-content">
            <div v-for="(search, index) in listSearch" :key="index" class="search-from-popular-item">
              <div class="search-from-popular-button">{{ index + $t('home.text_form_search') }}</div>
              <div class="search-next">
                <img src="/assets/icon/icon_next_search.svg" alt="">
              </div>
              <div class="search-list-category">
                <div v-for="(name, key) in search" :key="key">
                  {{ name.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="search-by-employment">
          <div class="search-by-employment-title">
            <div class="title">
              <img src="/assets/images/icon_home_sub_title3.svg" alt="">
              {{ $t('home.search_from_popular') }}
            </div>
          </div>
          <div class="search-by-employment-content">
            <div class="search-by-employment-category">
              <div v-for="(search, key) in listSearchEmployment" :key="key">
                {{ search.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-list-new">
        <div class="form-list-new-title">
          <div>{{ $t('home.most_popular_job') }}</div>
        </div>
        <div class="form-list-new-content">
          <div v-for="(job, index) in listMostViewJobs" :key="index" class="new-item">
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
        </div>
        <div class="form-list-new-see-all" @click="changeToSearch(false)">
          <div class="button-see-all">
            <span>{{ $t('home.see_all_job') }}</span>
            <img src="/assets/icon/icon_arrow_secondary.svg" alt="">
          </div>
        </div>
        <div class="form-list-new-social">
          <div><img src="/assets/icon/icon_facebook.svg" alt=""></div>
          <div><img src="/assets/icon/icon_twitter.svg" alt=""></div>
          <div><img src="/assets/icon/icon_instagram.svg" alt=""></div>
          <div><img src="/assets/icon/icon_line.svg" alt=""></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import HomeJobElement from './HomeJobElement'
import RecommendJobElement from './RecommendJobElement'

export default {
  name: 'IndexPageElement',
  components: { HomeJobElement, VueSlickCarousel, RecommendJobElement },
  props: ['totalJob', 'listJobs', 'listMostViewJobs', 'listRecommendJobs', 'listSearchEmployment', 'listSearch', 'listJobTypes', 'listProvinceCities'],
  data() {
    return {
      provinceCity: '',
      jobType: '',
      settings: {
        'arrows': false,
        'dots': true,
        'focusOnSelect': true,
        'infinite': false,
        'speed': 500,
        'slidesToShow': 3,
        'slidesToScroll': 3,
        'touchThreshold': 5
      }
    }
  },
  methods: {
    changeToSearch(filter) {
      if (filter) {
        const condition = []
        if (this.provinceCity) {
          condition.push('province_city=' + this.provinceCity)
        }
        if (this.jobType) {
          condition.push('job_type=' + this.jobType)
        }
        this.$router.push('/search?' + condition.join('&'))
      } else {
        this.$router.push('/search')
      }
    }
  }
}
</script>
