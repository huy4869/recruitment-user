<template>
  <div class="job-detail-page">
    <TitlePageElement></TitlePageElement>
    <div class="job-detail-header">
      <div class="job-detail-title">{{ job.name }}</div>
      <div class="job-detail-store-name">
        <div>{{ job.store_name }}</div>
        <div class="show-pc">
          <div class="last-updated">{{ job.updated_at }}</div>
        </div>
      </div>
    </div>
    <div class="job-detail-content">
      <div class="button-pickup">
        <div class="show-sp">
          <div v-if="jobStatus" class="about-job" @click="openAboutDialog">
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
            <div class="sub-detail-title-sp">{{ job.pick_up_point }}</div>
          </div>
        </div>
        <div class="about-job show-pc" @click="openAboutDialog">
          <img src="/assets/icon/icon_email.svg" alt="">
          <span>{{ $t('job.about_job') }}</span>
        </div>
      </div>
      <div class="sub-detail-title">{{ job.pick_up_point }}</div>
      <div class="show-sp">
        <div class="detail-job-image">
          <div class="job-avatar">
            <img :src="job.banner_image" alt="">
          </div>
          <div class="job-detail">
            <div v-for="(image, index) in job.detail_images" :key="index" class="image-detail">
              <img :src="image.url" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="show-pc">
        <div class="detail-job-image-pc">
          <div class="job-avatar">
            <img :src="job.banner_image" alt="">
          </div>
          <div class="job-detail">
            <div v-for="(image, index) in job.detail_images" :key="index" class="image-detail">
              <img :src="image.url" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="job-button-detail">
        <div v-if="job.is_favorite" class="button-dislike" @click="removeFavoriteJob">
          <img src="/assets/icon/icon_dislike.svg" alt="">
          <span>{{ $t('home.job_favorite') }}</span>
        </div>
        <div v-else class="button-like" @click="addFavoriteJob">
          <img src="/assets/icon/icon_like.svg" alt="">
          <span>{{ $t('home.job_favorite') }}</span>
        </div>
        <div class="button-detail">
          <div v-if="!job.is_apply" class="el-button" @click="applyDialog = !applyDialog">
            {{ $t('button.apply') }}
          </div>
          <div v-else class="el-button el-disabled">
            {{ $t('button.applied') }}
          </div>
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
                <span>{{ job.application.interview_approaches.approach }}</span>
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
        <div class="application-requirement-item">
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
            <div>{{ job.description }}</div>
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
            <div v-html="$t('job.salary_note')"></div>
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
            <a v-if="job.address.address" :href="'https://www.google.com/maps/place/' + job.address.address" class="show-button-google-map" target="_blank">
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
            <div>{{ job.welfare_treatment_description }}</div>
          </div>
        </div>
        <div class="application-requirement-item">
          <div class="application-requirement-left">
            <span>{{ $t('job.feature') }}</span>
          </div>
          <div class="application-requirement-right">
            <div>{{ job.welfare_treatment_description }}</div>
          </div>
        </div>
        <div class="application-requirement-item">
          <div class="application-requirement-left">
            <span>{{ $t('job.sns_social') }}</span>
          </div>
          <div class="application-requirement-right">
            <div v-if="jobStatus" class="form-list-new-social">
              <a href="https://www.facebook.com/" target="_blank"><img src="/assets/icon/icon_facebook.svg" alt=""></a>
              <a href="https://twitter.com/" target="_blank"><img src="/assets/icon/icon_twitter.svg" alt=""></a>
              <a href="https://www.instagram.com/" target="_blank"><img src="/assets/icon/icon_instagram.svg" alt=""></a>
              <a href="https://line.me/" target="_blank"><img src="/assets/icon/icon_line.svg" alt=""></a>
            </div>
          </div>
        </div>
        <div class="job-button-detail">
          <div v-if="job.is_favorite" class="button-dislike" @click="removeFavoriteJob">
            <img src="/assets/icon/icon_dislike.svg" alt="">
            <span>{{ $t('home.job_favorite') }}</span>
          </div>
          <div v-else class="button-like" @click="addFavoriteJob">
            <img src="/assets/icon/icon_like.svg" alt="">
            <span>{{ $t('home.job_favorite') }}</span>
          </div>
          <div class="button-detail">
            <div v-if="!job.is_apply" class="el-button" @click="applyDialog = !applyDialog">
              {{ $t('button.apply') }}
            </div>
            <div v-else class="el-button el-disabled">
              {{ $t('button.applied') }}
            </div>
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
        <div class="jobs-similar-job-title">
          <div class="title-component">{{ $t('job.jobs_similar') }}</div>
          <div class="button-see-all" @click="changeToLink('/search')">
            <span>{{ $t('home.see_all_job') }}</span>
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
            <a v-for="(search, key) in listJobTypes" :key="key" :href="changeToSearchWork(search)">
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
            ref="accountForm"
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
                  v-model="formAbout.content"
                  type="textarea"
                  :rows="4"
                  maxlength="1000"
                  :placeholder="$t('job.enter_inquiry_details')">
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
            {{ $t('button.confirm') }}
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
  JOB_CREATE_FEEDBACK
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
        content: ''
      },
      listDate: [
        '2022年09月02日（月）',
        '2022年09月03日（火）',
        '2022年09月04日（水）',
        '2022年09月05日（木）',
        '2022年09月06日（金) ',
        '2022年09月07日（土）',
        '2022年09月08日（日）'
      ],
      listTime: ['12:00', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30'],
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
        'arrows': false,
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
      }
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
      return '〒' + this.job.postal_code + this.job.address.province + this.job.address.district + this.job.address.address + (this.job.address.building || '')
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
    disabledInput() {
      return !this.formAbout.feedback_type_ids.includes('1')
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
  methods: {
    async getDetailJob() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const dataResponse = await this.$store.dispatch(JOB_GET_DETAIL_JOB, this.$route.params.slug)
      if (dataResponse.status_code === 200) {
        this.job = dataResponse.data
      } else {
        await this.$store.commit(INDEX_SET_ERROR, {
          show: true,
          text: dataResponse.messages
        })
        this.$router.push('/')
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
    changeToLink(link) {
      this.$router.push(link)
    },
    async addFavoriteJob() {
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
      if (response.status_code === 200) {
        await this.$store.commit(INDEX_SET_SUCCESS, {
          show: true,
          text: response.messages
        })
        this.job.is_favorite = state
      } else {
        await this.$store.commit(INDEX_SET_ERROR, {
          show: true,
          text: response.messages
        })
      }
    },
    async createFeedback() {
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
            this.formAbout = { feedback_type_ids: [], content: '' }
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
      return '/search?work_type_ids=' + search.id
    },
    handleClose() {
      this.$confirm(this.$t('content.CON_002'), {
        confirmButtonText: this.$t('confirm_modal.yes'),
        cancelButtonText: this.$t('confirm_modal.no'),
        type: 'warning'
      })
        .then(_ => {
          this.aboutDialog = false
        })
        .catch(_ => {})
    },
    closeAboutDialog() {
      if (_.isEqual(this.formAbout, this.clonedformAbout)) {
        this.aboutDialog = false
      } else {
        this.handleClose()
      }
    },
    openAboutDialog() {
      this.aboutDialog = true
      this.formAbout = {
        feedback_type_ids: [],
        content: ''
      }
    }
  }
}
</script>
