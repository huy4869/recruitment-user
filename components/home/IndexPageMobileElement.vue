<template>
  <div class="index-home-page">
    <div class="index-banner">
      <div class="banner-page-element">
        <div class="banner-title" v-html="$t('home.banner_title')"></div>
        <div class="form-search-banner">
          <div class="all-job">
            <span>{{ $t('home.all_job_opening') }}</span>
            <span class="all-subject">{{ totalJob }}{{ $t('common.subject') }}</span>
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
                      :value="item.province_id"
                      :disabled="item.disabled"
                    >
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
                      :value="item.id"
                      :disabled="item.disabled"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="button-filter">
                <button type="button" class="el-button el-button--primary" @click="changeToSearch(true)">
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
            <img src="/assets/icon/icon_place_primary.svg" alt="">
            <div>{{ $t('home.search_from_popular') }}</div>
          </div>
          <div class="button-more-info" @click="dialogEmployment = true">
            <img src="/assets/icon/icon_save_primary.svg" alt="">
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
              <div class="all-job">{{ totalNewJob }}{{ $t('common.subject') }}</div>
            </div>
            <div class="button-see-all" @click="changeToSearch(false)">
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
          <div v-else>
            <NoDataElement :text="$t('common.message_no_data.new_job_posting')"></NoDataElement>
          </div>
        </div>
        <div class="recommended-job">
          <div class="recommended-job-title">
            <div class="title">
              {{ $t('home.recommended_job') }}
            </div>
            <div class="button-see-all" @click="changeToSearch(false)">
              <span>{{ $t('home.see_all_job') }}</span>
              <img src="/assets/icon/icon_arrow.svg" alt="">
            </div>
          </div>
          <div v-if="listRecommendJobs.length" class="recommended-job-content">
            <div v-for="(job, index) in listRecommendJobs" :key="index">
              <RecommendJobElement :job="job"></RecommendJobElement>
            </div>
          </div>
          <div v-else>
            <NoDataElement :text="$t('common.message_no_data.recommend_job')"></NoDataElement>
          </div>
        </div>
      </div>
      <div class="form-list-new">
        <div class="form-list-new-social">
        <a :href="listSocial.facebook" target="_blank"><img src="/assets/icon/icon_facebook.svg" alt=""></a>
        <a :href="listSocial.twitter" target="_blank"><img src="/assets/icon/icon_twitter.svg" alt=""></a>
        <a :href="listSocial.instagram" target="_blank"><img src="/assets/icon/icon_instagram.svg" alt=""></a>
        <a :href="listSocial.line" target="_blank"><img src="/assets/icon/icon_line.svg" alt=""></a>
        </div>
      </div>
    </div>
    <el-drawer :title="$t('home.search_from_popular')" :visible.sync="dialogPopular" size="100%" direction="ttb">
      <div class="form-popular">
        <div v-for="(item, index) in listSearch" :key="index" class="form-popular-item">
          <div class="form-item-title" @click="showDetailPopular(index)">
            <span>{{ index }}</span>
            <img :class="{ 'show-detail': openPopular.includes(index) }" src="/assets/icon/icon_dropdown_full_active.svg" alt="">
          </div>
          <div v-show="openPopular.includes(index)" class="form-item-content">
            <a v-for="(detail, key) in item" :key="key" class="form-detail" :href="changeToSearchLink(detail)">
              <span>{{ detail.name }}</span>
            </a>
          </div>
        </div>
      </div>
    </el-drawer>
    <el-drawer :title="$t('home.search_by_employment')" :visible.sync="dialogEmployment" size="100%" direction="ttb">
      <div class="form-popular">
        <div v-for="(item, index) in listSearchEmployment" :key="index" class="form-popular-item">
          <a class="form-item-title" :href="changeToSearchWork(item)">
            <span>{{ item.name }}</span>
          </a>
        </div>
      </div>
    </el-drawer>
    <el-drawer :title="$t('home.most_popular_job')" :visible.sync="dialogMost" size="100%" direction="ttb">
      <div v-if="listMostViewJobs.length" class="form-popular form-most-popular">
        <div v-for="(job, index) in listMostViewJobs" :key="index" class="form-popular-item new-item" @click="changeToLink('/job/' + job.id)">
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
        <div class="button-see-all" @click="changeToSearch(false)">
          <span>{{ $t('home.see_all_job') }}</span>
          <img src="/assets/icon/icon_arrow_secondary.svg" alt="">
        </div>
      </div>
      <div v-else>
        <NoDataElement :text="$t('common.message_no_data.popular_job')"></NoDataElement>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import NoDataElement from '../element-ui/NoDataElement'
import HomeJobElement from './HomeJobElement'
import RecommendJobElement from './RecommendJobElement'

export default {
  name: 'IndexPageMobileElement',
  components: { HomeJobElement, VueSlickCarousel, RecommendJobElement, NoDataElement },
  props: [
    'totalJob',
    'totalNewJob',
    'listJobs',
    'listMostViewJobs',
    'listRecommendJobs',
    'listSearchEmployment',
    'listSearch',
    'listJobTypes',
    'listProvinceCities',
    'listSocial'
  ],
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
        delete this.openPopular[index]
        const key = this.openPopular.indexOf(index)
        if (key > -1) {
          this.openPopular.splice(key, 1)
        }
      } else {
        this.openPopular.push(index)
      }
    },
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
    },
    changeToLink(link) {
      this.$router.push(link)
    },
    changeToSearchLink(search) {
      const condition = []
      if (search.is_city) {
        condition.push('province_city_id=' + search.id)
      } else {
        condition.push('province_id=' + search.id)
      }
      return '/search?' + condition.join('&')
    },
    changeToSearchWork(search) {
      return '/search?work_type_ids=' + search.id
    }
  }
}
</script>
