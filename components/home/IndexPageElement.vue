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
              <div class="choose-job" @click="changeToSearch(false)">{{ $t('home.search_by_condition') }}</div>
            </div>
            <div class="form-select">
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
              <div class="image-form-search">
                <img src="/assets/icon/icon_add_search.svg" alt="">
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
      <div class="form-list-job">
        <div class="new-job-posting">
          <div class="new-job-title">
            <div class="title">
              <span>{{ $t('home.new_job_posting') }}</span>
              <div class="total-new-job">
                {{ $t('home.new_job') }}
              </div>
              <div class="all-job">{{ totalNewJob }}{{ $t('common.subject') }}</div>
            </div>
            <div class="button-see-all" @click="changeToSearch(false, 'new')">
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
          <div v-else>
            <NoDataElement :text="$t('common.message_no_data.new_job_posting')"></NoDataElement>
          </div>
        </div>
        <div class="recommended-job">
          <div class="recommended-job-title">
            <div class="title">
              {{ $t('home.recommended_job') }}
            </div>
            <div class="button-see-all" @click="changeToSearch(false, 'recommend')">
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
        <div class="search-from-popular">
          <div class="search-from-popular-title">
            <div class="title">
              {{ $t('home.search_from_popular') }}
            </div>
          </div>
          <div v-if="Object.keys(listSearch).length" class="search-from-popular-content">
            <div v-for="(search, index) in listSearch" :key="index" class="search-from-popular-item">
              <div class="form-button">
                <div class="search-from-popular-button">{{ index }}</div>
              </div>
              <div class="search-next">
                <img src="/assets/icon/icon_next_search.svg" alt="">
              </div>
              <div class="search-list-category">
                <a class="text-blue-hover" v-for="(name, key) in search" :key="key" :href="changeToSearchLink(name)">
                  {{ name.name }}
                </a>
              </div>
            </div>
          </div>
          <div v-else>
            <NoDataElement :text="$t('common.message_no_data.popular_area')"></NoDataElement>
          </div>
        </div>
        <div class="search-by-employment">
          <div class="search-by-employment-title">
            <div class="title">
              {{ $t('home.search_by_employment') }}
            </div>
          </div>
          <div v-if="listSearchEmployment.length" class="search-by-employment-content">
            <div class="search-by-employment-category">
              <a class="text-blue-hover" v-for="(search, key) in listSearchEmployment" :key="key" :href="changeToSearchWork(search)">
                {{ search.name }}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="form-list-new">
        <div class="form-list-new-title">
          <div>{{ $t('home.most_popular_job') }}</div>
        </div>
        <div class="form-list-new-content">
          <div v-if="listMostViewJobs.length">
            <div v-for="(job, index) in listMostViewJobs" :key="index" class="new-item cursor-pointer" @click="changeToLink('/job/' + job.id)">
              <div class="new-item-image">
                <img :src="job.banner_image" alt="">
              </div>
              <div class="new-item-content">
                <div class="job-name">{{ job.name }}</div>
                <div class="store-name">{{ job.store_name }}
                  <span v-if="job.company_name" class="job-list__name">({{ job.company_name }})</span>
                </div>
                <div class="job-info">
                  <img src="/assets/icon/icon_place.svg" alt="">
                  <span class="location">{{ showAddress(job) }}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <NoDataElement :text="$t('common.message_no_data.popular_job')"></NoDataElement>
          </div>
        </div>
        <div class="form-list-new-see-all" @click="changeToSearch(false, 'most_view')">
          <div class="button-see-all">
            <span>{{ $t('home.see_all_job') }}</span>
            <img src="/assets/icon/icon_arrow.svg" alt="">
          </div>
        </div>
        <div class="form-list-new-social">
          <a v-if="listSocial.facebook" :href="listSocial.facebook" target="_blank">
            <img src="/assets/icon/fb.svg" alt="fb">
          </a>
          <a v-else class="disable-item" disabled>
            <img src="/assets/icon/fb_disable.svg" alt="fb">
          </a>
          <a v-if="listSocial.twitter" :href="listSocial.twitter" target="_blank">
            <img src="/assets/icon/ebay.svg" alt="ebay">
          </a>
          <a v-else class="disable-item" disabled>
            <img src="/assets/icon/ebay_disable.svg" alt="fb">
          </a>
          <a v-if="listSocial.instagram" :href="listSocial.instagram" target="_blank">
            <img src="/assets/icon/ig.svg" alt="ig">
          </a>
          <a v-else class="disable-item" disabled>
            <img src="/assets/icon/ig_disable.svg" alt="fb">
          </a>
          <a v-if="listSocial.line" :href="listSocial.line" target="_blank">
            <img src="/assets/icon/line.svg" alt="line">
          </a>
          <a v-else class="disable-item" disabled>
            <img src="/assets/icon/line_disable.svg" alt="fb">
          </a>
        </div>
      </div>
    </div>
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
  name: 'IndexPageElement',
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
      provinceCity: '',
      jobType: '',
      settings: {
        'arrows': true,
        'dots': true,
        'focusOnSelect': true,
        'infinite': true,
        'speed': 1000,
        'slidesToShow': 3,
        'slidesToScroll': 3,
        'touchThreshold': 5,
        'autoplay': true,
        'autoplaySpeed': 5000
      }
    }
  },
  methods: {
    changeToSearch(filter, type) {
      if (filter) {
        const condition = []
        if (this.provinceCity) {
          condition.push('province_id=' + this.provinceCity)
        }
        if (this.jobType) {
          condition.push('job_type_ids=' + this.jobType)
        }
        this.$router.push('/search?' + condition.join('&'))
      } else if (type) {
        this.$router.push('/search?list_type=' + type)
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
    },
    showAddress(job) {
      if (job.address === undefined) {
        return ''
      }
      return (job.address.province + job.address.province_city + job.address.address)
    }
  }
}
</script>
