<template>
  <div class="job-detail-page">
    <TitlePageElement></TitlePageElement>
    <div class="job-detail-header">
      <div class="job-detail-title">{{ job.name }}</div>
      <div class="job-detail-store-name">
        <div>{{ job.store_name }}
          <span v-if="job.company_name" class="job-list__name">({{ job.company_name }})</span>
        </div>
        <div class="last-updated">{{ job.updated_at }}</div>
      </div>
    </div>
    <div class="job-detail-content">
      <div class="button-pickup">
        <div class="show-sp">
          <div v-if="loggedIn" class="about-job" @click="openAboutDialog">
            <img src="/assets/icon/icon_email.svg" alt="">
            <span>{{ $t('job.about_job') }}</span>
          </div>
        </div>
        <div class="show-pc">
          <el-button class="pick-up-point" type="danger">{{ $t('job.pick_up_point') }}</el-button>
        </div>
        <div class="show-sp pick-up-sp">
          <div class="d-flex">
            <el-button class="pick-up-point" type="danger">
            <span class="pick-up-text">
              {{ $t('job.pick_up_point1') }}<br>
              {{ $t('job.pick_up_point2') }}
            </span>
            </el-button>
            <div class="sub-detail-title-sp" v-html="job.pick_up_point"></div>
          </div>
        </div>
        <div v-if="loggedIn" class="about-job show-pc text-blue-hover" @click="openAboutDialog">
          <img src="/assets/icon/icon_email.svg" alt="">
          <span>{{ $t('job.about_job') }}</span>
        </div>
      </div>
      <div class="sub-detail-title" v-html="job.pick_up_point">
      </div>
      <div class="show-sp">
        <div class="detail-job-image">
          <div v-if="job.banner_image" class="job-avatar">
            <el-image
              :src="job.banner_image"
              :preview-src-list="[job.banner_image]">
            </el-image>
          </div>
          <div class="job-detail">
            <div v-for="(image, index) in job.detail_images" :key="index" class="image-detail">
              <el-image
                :src="image.url"
                :preview-src-list="[image.url]">
              </el-image>
            </div>
          </div>
        </div>
      </div>
      <div class="show-pc">
        <div class="detail-job-image-pc">
          <div v-if="job.banner_image" class="job-avatar">
            <el-image
              :src="job.banner_image"
              :preview-src-list="[job.banner_image]">
            </el-image>
          </div>
          <div class="job-detail">
            <div v-for="(image, index) in job.detail_images" :key="index" class="image-detail">
              <el-image
                :src="image.url"
                :preview-src-list="[image.url]">
              </el-image>
            </div>
          </div>
        </div>
      </div>
      <div class="job-button-detail">
        <div v-if="job.is_favorite" class="button-dislike el-button el-button--danger" @click="removeFavoriteJob">
          <img src="/assets/icon/icon_dislike.svg" alt="">
          <span>{{ $t('home.job_favorite') }}</span>
        </div>
        <div v-else class="button-like el-button el-button--default" @click="addFavoriteJob">
          <img class="show-active" src="/assets/icon/icon_like.svg" alt="">
          <img class="hide-active" src="/assets/icon/icon_dislike.svg" alt="">
          <span>{{ $t('home.job_favorite') }}</span>
        </div>
        <div v-if="!job.is_apply" class="button-detail el-button el-button--primary" @click="openApplyDialog">
          {{ $t('button.apply') }}
        </div>
        <div v-else class="button-detail el-button el-disabled el-button--primary">
          {{ $t('button.applied') }}
        </div>
      </div>
      <div v-if="job.application ? job.application.id : false" class="form-application">
        <div class="form-application-content">
          <div class="form-application-title">{{ $t('job.application.title') }}</div>
          <div class="form-application-detail">
            <div class="application-item">
              <div class="application-item-left">
                <span>{{ $t('job.application.date') }}</span>
              </div>
              <div class="application-item-right">
                <span>{{ job.application.date }}</span>
              </div>
            </div>
            <div class="application-item">
              <div class="application-item-left">
                <span>{{ $t('job.application.method') }}</span>
              </div>
              <div class="application-item-right">
                <span>{{ job.application.interview_approaches.method }}</span>
              </div>
            </div>
            <div class="application-item">
              <div class="application-item-left">
                <span>{{ job.application.interview_approaches.approach_label }}</span>
              </div>
              <div class="application-item-right">
                <span v-if="job.application.interview_approaches" class="show-pc">
                  <a v-if="job.application.interview_approaches.id === 1" class="application-schedule-url text-blue-hover" :href="job.application.interview_approaches.approach" target="_blank">{{ job.application.interview_approaches.approach }}</a>
                  <span v-else>{{ job.application.interview_approaches.approach }}</span>
                </span>
                <span v-if="job.application.interview_approaches" class="show-sp">
                  <a v-if="job.application.interview_approaches.id === 1" class="application-schedule-url text-blue-hover" :href="job.application.interview_approaches.approach" target="_blank">{{ job.application.interview_approaches.approach }}</a>
                  <span v-else-if="job.application.interview_approaches.id === 2">{{ job.application.interview_approaches.approach }}</span>
                  <a v-else :href="'tel:' + job.application.interview_approaches.approach" @click.stop="">{{ job.application.interview_approaches.approach }}</a>
                </span>
              </div>
            </div>
            <div class="application-item">
              <div class="application-item-left">
                <span>{{ $t('job.application.status') }}</span>
              </div>
              <div class="application-item-right">
                <span :class="'schedule-button-status status-' + job.application.status.id">{{ job.application.status.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="job.id" class="application-requirement">
        <div class="application-requirement-title title-component">
          <span>{{ $t('job.application_requirement') }}</span>
        </div>
        <div class="application-requirement-item first-input">
          <div class="application-requirement-left">
            <span>{{ $t('job.recruitment_type') }}</span>
          </div>
          <div class="application-requirement-right">
            <div>{{ showTextList('job_types', 'name') }}</div>
          </div>
        </div>
        <div class="application-requirement-item">
          <div class="application-requirement-left">
            <span>{{ $t('job.description') }}</span>
          </div>
          <div class="application-requirement-right">
            <div class="break-space">{{ job.description }}</div>
          </div>
        </div>
        <div class="application-requirement-item">
          <div class="application-requirement-left">
            <span>{{ $t('job.employment_status') }}</span>
          </div>
          <div class="application-requirement-right">
            <div v-for="(work, index) in job.work_types" :key="index" class="employment-status-item">
              <span>{{ work.name }}</span>
            </div>
          </div>
        </div>
        <div class="application-requirement-item">
          <div class="application-requirement-left">
            <span>{{ $t('job.salary') }}</span>
          </div>
          <div class="application-requirement-right">
            <div class="show-salary">{{ showSalary }}</div>
            <div class="break-space">{{ job.salary.description }}</div>
          </div>
        </div>
        <div class="application-requirement-item">
          <div class="application-requirement-left">
            <span>{{ $t('job.working_hours') }}</span>
          </div>
          <div class="application-requirement-right">
            <div>{{ showDate }}</div>
          </div>
        </div>
        <div class="application-requirement-item">
          <div class="application-requirement-left">
            <span>{{ $t('job.age') }}</span>
          </div>
          <div class="application-requirement-right">
            <div>{{ showAge }}</div>
          </div>
        </div>
        <div class="application-requirement-item">
          <div class="application-requirement-left">
            <span>{{ $t('job.gender') }}</span>
          </div>
          <div class="application-requirement-right">
            <div>{{ showTextList('genders', 'name') }}</div>
          </div>
        </div>
        <div class="application-requirement-item">
          <div class="application-requirement-left">
            <span>{{ $t('job.experience') }}</span>
          </div>
          <div class="application-requirement-right">
            <div>{{ showTextList('experience_types', 'name') }}</div>
          </div>
        </div>
        <div class="application-requirement-item">
          <div class="application-requirement-left">
            <span>{{ $t('job.work_place') }}</span>
          </div>
          <div class="application-requirement-right">
            <div class="break-word">{{ showAddress }}</div>
            <a v-if="job.address.address" :href="'https://www.google.com/maps/place/' + showAddress" class="show-button-google-map text-blue-hover" target="_blank">
              <img src="/assets/icon/icon_google_map.svg" alt="">
              <span>{{ $t('schedule.open_google_map') }}</span>
            </a>
          </div>
        </div>
        <div class="application-requirement-item">
          <div class="application-requirement-left">
            <span>{{ $t('job.station') }}</span>
          </div>
          <div class="application-requirement-right">
            <div>
              <div v-for="(station, index) in job.stations" :key="index">
                {{ station.province_name + station.railway_name + station.station_name }}
              </div>
            </div>
          </div>
        </div>
        <div class="application-requirement-item">
          <div class="application-requirement-left">
            <span>{{ $t('job.welfare_treatment') }}</span>
          </div>
          <div class="application-requirement-right">
            <div class="break-space">{{ job.welfare_treatment_description }}</div>
          </div>
        </div>
        <div class="application-requirement-item">
          <div class="application-requirement-left">
            <span>{{ $t('job.feature') }}</span>
          </div>
          <div class="application-requirement-right">
            <div v-for="(feature, index) in job.feature_types" :key="index" class="form-list-feature">
              <div>{{ feature.category_name }}</div>
              <div>{{ feature.features }}</div>
            </div>
          </div>
        </div>
        <div class="application-requirement-item">
          <div class="application-requirement-left">
            <span>{{ $t('job.sns_social') }}</span>
          </div>
          <div class="application-requirement-right">
            <div class="social-media">
              <a v-if="job.sns.facebook" :href="job.sns.facebook" target="_blank">
                <img src="/assets/icon/fb.svg" alt="fb">
              </a>
              <a v-else class="disable-item" disabled>
                <img src="/assets/icon/fb_disable.svg" alt="fb">
              </a>
              <a v-if="job.sns.twitter" :href="job.sns.twitter" target="_blank">
                <img src="/assets/icon/ebay.svg" alt="ebay">
              </a>
              <a v-else class="disable-item" disabled>
                <img src="/assets/icon/ebay_disable.svg" alt="fb">
              </a>
              <a v-if="job.sns.instagram" :href="job.sns.instagram" target="_blank">
                <img src="/assets/icon/ig.svg" alt="ig">
              </a>
              <a v-else class="disable-item" disabled>
                <img src="/assets/icon/ig_disable.svg" alt="fb">
              </a>
              <a v-if="job.sns.line" :href="job.sns.line" target="_blank">
                <img src="/assets/icon/line.svg" alt="line">
              </a>
              <a v-else class="disable-item" disabled>
                <img src="/assets/icon/line_disable.svg" alt="fb">
              </a>
            </div>
          </div>
        </div>
        <div class="job-button-detail">
          <div v-if="job.is_favorite" class="button-dislike el-button el-button--danger" @click="removeFavoriteJob">
            <img src="/assets/icon/icon_dislike.svg" alt="">
            <span>{{ $t('home.job_favorite') }}</span>
          </div>
          <div v-else class="button-like el-button el-button--default" @click="addFavoriteJob">
            <img class="show-active" src="/assets/icon/icon_like.svg" alt="">
            <img class="hide-active" src="/assets/icon/icon_dislike.svg" alt="">
            <span>{{ $t('home.job_favorite') }}</span>
          </div>
          <div v-if="!job.is_apply" class="button-detail el-button el-button--primary" @click="openApplyDialog">
            {{ $t('button.apply') }}
          </div>
          <div v-else class="button-detail el-button el-disabled el-button--primary">
            {{ $t('button.applied') }}
          </div>
        </div>
      </div>
      <div class="recently-viewed-job">
        <div class="view-job-title title-component">{{ $t('job.recently_viewed_job') }}</div>
        <div v-if="listJobs.length" class="view-job-content">
          <div class="show-pc">
            <VueSlickCarousel v-bind="settings">
              <div v-for="(job, index) in listJobs" :key="index">
                <HomeJobElement :job="job" :show-type="true"></HomeJobElement>
              </div>
            </VueSlickCarousel>
          </div>
          <div class="show-sp">
            <div v-for="(job, index) in listJobs" :key="index">
              <RecentJobMobileElement :job="job" :show-type="true"></RecentJobMobileElement>
            </div>
          </div>
        </div>
        <div v-else>
          <NoDataElement :text="$t('common.message_no_data.recent_job')"></NoDataElement>
        </div>
      </div>
      <div class="jobs-similar-job">
        <div class="jobs-similar-job-title title-component">
          <div>{{ $t('job.jobs_similar') }}</div>
          <div class="button-see-all" @click="$router.push(changeToSearch)">
              <span>{{ $t('home.see_all_job') }}</span>
              <img src="/assets/icon/icon_arrow.svg" alt="">
          </div>
        </div>
        <div v-if="listSuggestJobs.length" class="jobs-similar-job-content">
          <div v-for="(job, index) in listSuggestJobs" :key="index">
            <RecommendJobElement :job="job"></RecommendJobElement>
          </div>
        </div>
        <div v-else>
          <NoDataElement :text="$t('common.message_no_data.similar_job')"></NoDataElement>
        </div>
      </div>
      <div class="find-other-job">
        <div class="find-other-job-title">
          <div class="title-component">{{ $t('job.find_other_jobs') }}</div>
        </div>
        <div class="find-other-job-content">
          <div class="find-other-job-item">
            <a class="text-blue-hover" v-for="(search, key) in listJobTypes" :key="key" :href="changeToSearchWork(search)">
              {{ search.name }}
            </a>
          </div>
        </div>
      </div>
      <el-dialog
        class="form-dialog-apply form-dialog-about"
        :title="$t('job.about_job')"
        :visible.sync="aboutDialog"
        width="84%"
        top="5vh"
        :before-close="closeAboutDialog"
      >
        <div>
          <div class="interview-time">
            {{ $t('job.text_about_note') }}
          </div>
          <el-form
            ref="formAbout"
            :model="formAbout"
            :rules="formAboutRules"
            autocomplete="off"
            label-position="left"
          >
            <div class="form-change-method">
            <div class="title-form">
              <span>{{ $t('job.inquiry_content_selection') }}</span>
            </div>
            <div class="method-content">
              <el-checkbox-group v-model="formAbout.feedback_type_ids">
                <el-checkbox :key="1" label="1">{{ $t('job.about_annual_monthly') }}</el-checkbox>
                <el-checkbox :key="2" label="2">{{ $t('job.about_benefit') }}</el-checkbox>
                <el-checkbox :key="3" label="3">{{ $t('job.about_education') }}</el-checkbox>
                <el-checkbox :key="4" label="4">{{ $t('job.about_overtime') }}</el-checkbox>
                <el-checkbox :key="5" label="5">{{ $t('job.about_other') }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
            <div class="form-question">
            <div class="title-form">
              <span>{{ $t('job.inquiry_details') }}</span>
            </div>
            <div class="question-content">
              <el-form-item label="" prop="content">
                <el-input
                  ref="content"
                  v-model="formAbout.content"
                  type="textarea"
                  :rows="6"
                  maxlength="1000"
                  :placeholder="$t('job.enter_inquiry_details')"
                  @focus="resetValidate('content')"
                >
                </el-input>
              </el-form-item>
            </div>
          </div>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" plain @click="closeAboutDialog">
            {{ $t('button.close_up') }}
          </el-button>
          <el-button type="danger" @click="createFeedback">
            {{ $t('my_page.send') }}
          </el-button>
        </div>
      </el-dialog>
    </div>
    <FormApplyJobElement :apply-dialog="applyDialog" :job="job" :is-edit="false" @closeDialog="applyDialog = !applyDialog" @changeApply="getDetailJob"></FormApplyJobElement>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import _ from 'lodash'
import FormApplyJobElement from '../../components/element-ui/FormApplyJobElement'
import NoDataElement from '../../components/element-ui/NoDataElement'
import HomeJobElement from '../../components/home/HomeJobElement'
import RecommendJobElement from '../../components/home/RecommendJobElement'
import RecentJobMobileElement from '../../components/home/RecentJobMobileElement'
import TitlePageElement from '../../components/layout/TitlePageElement'
import {
  JOB_GET_DETAIL_JOB,
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  INDEX_SET_TITLE_MENU,
  JOB_LIST_RECENT_JOBS,
  JOB_LIST_SUGGEST_JOBS,
  MASTER_GET_DATA,
  JOB_ADD_FAVORITE_JOB,
  JOB_REMOVE_FAVORITE_JOB,
  INDEX_SET_SUCCESS,
  JOB_CREATE_FEEDBACK,
  SET_JOB_ERROR
} from '../../store/store.const'

export default {
  name: 'JobDetailPage',
  components: { TitlePageElement, VueSlickCarousel, HomeJobElement, RecommendJobElement, RecentJobMobileElement, FormApplyJobElement, NoDataElement },
  data() {
    const validAreaLength = (rule, value, callback, message) => {
      if (value && value.length > 1000) {
        callback(new Error(this.$t('validation.short_area_length', { _field_: message })))
      } else {
        callback()
      }
    }
    return {
      user: this.$auth.user,
      id: this.$route.params.slug,
      applyDialog: false,
      aboutDialog: false,
      jobStatus: true,
      formApply: {
        date: '',
        time: '',
        method: '',
        question: ''
      },
      formAbout: {
        feedback_type_ids: [],
        content: '',
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      listDate: [],
      listTime: [],
      listMethod: [
        { id: 1, value: 'オンライン面接（2営業日以内にZoomURLをメールにて送付いたします）' },
        { id: 2, value: '対面（東京都港区虎ノ門１－２－３)' },
        { id: 3, value: '電話面接' }
      ],
      job: {},
      listJobs: [],
      listSuggestJobs: [],
      listJobTypes: [],
      settings: {
        'arrows': true,
        'dots': true,
        'focusOnSelect': true,
        'infinite': false,
        'speed': 500,
        'slidesToShow': 4,
        'slidesToScroll': 4,
        'touchThreshold': 5
      },
      mobileSettings: {
        'arrows': true,
        'dots': false,
        'focusOnSelect': true,
        'infinite': false,
        'speed': 500,
        'slidesToShow': 1,
        'slidesToScroll': 1,
        'touchThreshold': 5
      },
      clonedformAbout: {},
      formAboutRules: {
        content: [
          { validator: validAreaLength, message: this.$t('validation.area_length_2', { _field_: this.$t('job.inquiry_details') }), trigger: 'blur' }
        ]
      },
      isValid: false,
      loggedIn: this.$auth.loggedIn
    }
  },
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
      return this.job.salary.min + ' ～ ' + this.job.salary.max + this.job.salary.type
    },
    showAge() {
      if (this.job.age === undefined) {
        return ''
      }
      if (this.job.age.min && this.job.age.max) {
        return this.job.age.min + ' ～ ' + this.job.age.max + this.$t('common.age')
      }
      return ''
    },
    showAddress() {
      if (this.job.address === undefined) {
        return ''
      }
      return (this.job.postal_code ? ('〒' + this.job.postal_code) : '') + this.job.address.province + this.job.address.province_city + this.job.address.address + (this.job.address.building || '')
    },
    showStation() {
      if (this.job.stations === undefined) {
        return ''
      }
      if (this.job.stations.length) {
        return this.job.stations[0].province_name + this.job.stations[0].railway_name + this.job.stations[0].station_name
      }
      return ''
    },
    changeToSearch() {
      const condition = []
      if (this.job.address) {
        condition.push('province_id=' + this.job.address.province_id)
      }
      if (this.job.job_types) {
        const type = []
        this.job.job_types.forEach(jobType => {
          type.push(jobType.id)
        })
        condition.push('job_type_ids=' + type.join(','))
      }
      return '/search?' + condition.join('&')
    }
  },
  async created() {
    await this.$store.commit(INDEX_SET_LOADING, true)
    await this.getDetailJob()
    await this.getDataJob()
    await this.getSuggestJob()
    await this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.job.name, route: '/' }
    ])
    await this.$store.commit(INDEX_SET_LOADING, false)
    this.clonedformAbout = _.cloneDeep(this.formAbout)
  },
  mounted() {
    if (this.$route.query.notification === '9') {
      if (!this.job.is_apply) {
        this.openApplyDialog()
      }
    }
  },
  methods: {
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.formAbout.fields.find((f) => f.prop === ref).clearValidate()
      this.formAbout.errors[ref] = ''
    },
    async getDetailJob() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const dataResponse = await this.$store.dispatch(JOB_GET_DETAIL_JOB, this.$route.params.slug)
      if (dataResponse.status_code === 200) {
        this.job = dataResponse.data
      } else if (dataResponse.status_code === 400) {
        await this.$store.commit(SET_JOB_ERROR, dataResponse.messages)
        this.$router.push('/404-not-found?error=job')
      } else {
        this.$router.push('/404-not-found')
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    showTextList(key, index) {
      if (this.job[key] === undefined) {
        return ''
      }
      return this.job[key].map((item) => item[index]).join('、')
    },
    async getDataJob() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const dataResponse = await this.$store.dispatch(JOB_LIST_RECENT_JOBS, '')
      this.listJobs = dataResponse.data
      const dataResources = [
        'resources[m_job_types]={"model": "MJobType"}'
      ]
      const dataMasterData = await this.$store.dispatch(MASTER_GET_DATA, dataResources.join('&'))
      if (dataMasterData.status_code === 200) {
        this.listJobTypes = dataMasterData.data.m_job_types
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    async getSuggestJob() {
      const dataResponse = await this.$store.dispatch(JOB_LIST_SUGGEST_JOBS, this.id)
      this.listSuggestJobs = dataResponse.data
    },
    async addFavoriteJob() {
      if (!this.$auth.loggedIn) {
        this.$cookies.set('auth.redirect', this.$route.fullPath)
        await this.$router.push('/login')
        return
      }
      await this.$store.commit(INDEX_SET_LOADING, true)
      const dataMessage = {
        job_posting_id: this.job.id
      }
      const dataResponse = await this.$store.dispatch(JOB_ADD_FAVORITE_JOB, dataMessage)
      await this.changeStatusJob(dataResponse, true)
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    async removeFavoriteJob() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const response = await this.$store.dispatch(JOB_REMOVE_FAVORITE_JOB, this.job.id)
      await this.changeStatusJob(response, false)
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    async changeStatusJob(response, state) {
      switch (response.status_code) {
        case 200:
          await this.$store.commit(INDEX_SET_SUCCESS, {
            show: true,
            text: response.messages
          })
          this.job.is_favorite = state
          break
        case 500:
          await this.$store.commit(INDEX_SET_ERROR, {
            show: true,
            text: this.$t('content.EXC_001')
          })
          break
        default:
          await this.$store.commit(INDEX_SET_ERROR, {
            show: true,
            text: response.messages
          })
          break
      }
    },
    async createFeedback() {
      this.validateFormAbout()
      if (!this.isValid) {
        return
      }
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const dto = this.formAbout
        const response = await this.$store.dispatch(JOB_CREATE_FEEDBACK, {
          id: this.id,
          data: dto
        })
        switch (response.status_code) {
          case 200:
            await this.$store.commit(INDEX_SET_SUCCESS, {
              show: true,
              text: response.messages
            })
            this.aboutDialog = false
            this.formAbout = { feedback_type_ids: [], content: '', errors: {}}
            break
          case 422:
            for (const [key] of Object.entries(response.data)) {
              this.error = { key, value: response.data[key][0] }
            }
            await this.$store.commit(INDEX_SET_ERROR, {
              show: true,
              text: this.$t('job.enter_AboutForm')
            })
            break
          case 500:
            await this.$store.commit(INDEX_SET_ERROR, {
              show: true,
              text: this.$t('content.EXC_001')
            })
            break
          default:
            await this.$store.commit(INDEX_SET_ERROR, {
              show: true,
              text: response.messages
            })
            break
        }
        await this.$store.commit(INDEX_SET_LOADING, false)
      } catch (err) {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    changeToSearchWork(search) {
      return '/search?job_type_ids=' + search.id
    },
    handleApplyForm() {
      this.$confirm(this.$t('content.CON_018'), {
        confirmButtonText: this.$t('confirm_modal.yes'),
        cancelButtonText: this.$t('confirm_modal.no'),
        type: 'warning'
      })
        .then(_ => {
          this.$router.push('/my-page/web-cv')
        })
        .catch(_ => {})
    },
    handleClose() {
      this.$confirm(this.$t('content.CON_002'), {
        confirmButtonText: this.$t('confirm_modal.yes'),
        cancelButtonText: this.$t('confirm_modal.no'),
        type: 'warning'
      })
        .then(_ => {
          this.aboutDialog = false
          this.resetDataForm()
        })
        .catch(_ => {})
    },
    closeAboutDialog() {
      this.formAbout.errors = {}
      if (_.isEqual(this.formAbout, this.clonedformAbout)) {
        this.aboutDialog = false
        this.resetDataForm()
      } else {
        this.handleClose()
      }
    },
    openAboutDialog() {
      this.aboutDialog = true
      this.formAbout = {
        feedback_type_ids: [],
        content: '',
        errors: {}
      }
    },
    validateFormAbout() {
      this.$refs.formAbout.validate(valid => {
        this.isValid = valid
      })
    },
    openApplyDialog() {
      if (this.loggedIn) {
        let check = false
        for (const index in this.user) {
          if (index === 'first_name' || index === 'last_name' || index === 'furi_first_name' || index === 'furi_last_name' ||
          index === 'birthday' || index === 'gender_id' || index === 'tel' || index === 'province_city_id' || index === 'province_id' || index === 'address') {
            if (['', null].includes(this.user[index])) {
              check = true
            }
          }
        }
        if (check) {
          this.handleApplyForm()
        } else {
          this.applyDialog = !this.applyDialog
        }
      } else {
        this.$router.push('/login')
      }
    },
    resetDataForm() {
      if (this.$refs.formAbout) {
        this.$refs.formAbout.resetFields()
      }
      this.error = { key: null, value: '' }
    }
  }
}
</script>
