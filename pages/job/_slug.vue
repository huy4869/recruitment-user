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
        <div class="show-sp">
          <div class="last-updated">{{ job.updated_at }}</div>
          <div class="form-list-new-social">
            <div><img src="/assets/icon/icon_facebook.svg" alt=""></div>
            <div><img src="/assets/icon/icon_twitter.svg" alt=""></div>
            <div><img src="/assets/icon/icon_instagram.svg" alt=""></div>
            <div><img src="/assets/icon/icon_line.svg" alt=""></div>
          </div>
        </div>
      </div>
    </div>
    <div class="job-detail-content">
      <div class="button-pickup">
        <div class="show-sp">
          <div v-if="jobStatus" class="about-job" @click="aboutDialog = true">
            <img src="/assets/icon/icon_headphone.svg" alt="">
            <span>{{ $t('job.about_job') }}</span>
          </div>
        </div>
        <el-button type="danger">{{ $t('job.pick_up_point') }}</el-button>
        <div class="about-job show-pc" @click="aboutDialog = true">
          <img src="/assets/icon/icon_email.svg" alt="">
          <span>{{ $t('job.about_job') }}</span>
        </div>
      </div>
      <div class="sub-detail-title">{{ job.sub_title }}</div>
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
      <div class="job-button-detail">
        <div v-if="jobStatus" class="form-list-new-social">
          <div><img src="/assets/icon/icon_facebook.svg" alt=""></div>
          <div><img src="/assets/icon/icon_twitter.svg" alt=""></div>
          <div><img src="/assets/icon/icon_instagram.svg" alt=""></div>
          <div><img src="/assets/icon/icon_line.svg" alt=""></div>
        </div>
        <div v-if="job.is_favorite" class="button-dislike" @click="removeFavoriteJob">
          <img src="/assets/icon/icon_dislike.svg" alt="">
          <span>{{ $t('home.job_favorite') }}</span>
        </div>
        <div v-else class="button-like" @click="addFavoriteJob">
          <img src="/assets/icon/icon_like.svg" alt="">
          <span>{{ $t('home.job_favorite') }}</span>
        </div>
        <div class="button-detail">
          <div v-if="!job.is_apply" class="el-button" @click="applyDialog = true">
            {{ $t('button.apply') }}
          </div>
          <div v-else class="el-button el-disabled">
            {{ $t('button.applied') }}
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
            <div>{{ job.genders ? job.genders.join('、') : '' }}</div>
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
            <div v-if="job.google_map" class="show-button-google-map">
              <img src="/assets/icon/icon_arrow_secondary.svg" alt="">
              <span>{{ $t('schedule.open_google_map') }}</span>
            </div>
          </div>
        </div>
        <div class="application-requirement-item">
          <div class="application-requirement-left">
            <span>{{ $t('job.station1') }}</span>
          </div>
          <div class="application-requirement-right">
            <div>{{ showStation }}</div>
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
            <div v-if="!job.is_apply" class="el-button" @click="applyDialog = true">
              {{ $t('button.apply') }}
            </div>
            <div v-else class="el-button el-disabled">
              {{ $t('button.applied') }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="listJobs.length" class="recently-viewed-job">
        <div class="view-job-title title-component">{{ $t('job.recently_viewed_job') }}</div>
        <div class="view-job-content">
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
      </div>
      <div class="jobs-similar-job">
        <div class="jobs-similar-job-title">
          <div class="title-component">{{ $t('job.jobs_similar') }}</div>
          <div class="button-see-all" @click="changeToLink('/search')">
            <span>{{ $t('home.see_all_job') }}</span>
          </div>
        </div>
        <div class="jobs-similar-job-content">
          <div v-for="(job, index) in listSuggestJobs" :key="index">
            <RecommendJobElement :job="job"></RecommendJobElement>
          </div>
        </div>
      </div>
      <div class="find-other-job">
        <div class="find-other-job-title">
          <div class="title-component">{{ $t('job.find_other_jobs') }}</div>
        </div>
        <div class="find-other-job-content">
          <div class="find-other-job-item">
            <div v-for="(type, key) in listJobTypes" :key="key">
              {{ type.name }}
            </div>
          </div>
        </div>
      </div>
      <el-dialog class="form-dialog-apply form-dialog-about" :title="$t('job.about_job')" :visible.sync="aboutDialog" width="84%" top="5vh">
        <div>
          <div class="interview-time">
            {{ $t('job.text_about_note') }}
          </div>
          <div class="form-change-method">
            <div class="title-form">
              <span>{{ $t('job.inquiry_content_selection') }}</span>
            </div>
            <div class="method-content">
              <el-checkbox-group v-model="formAbout.feedback_type_ids">
                <el-checkbox :key="1" label="1">{{ $t('job.about_annual_monthly') }}</el-checkbox>
                <el-input
                  :disabled="disabledInput"
                  type="text"
                  :rows="4"
                  :placeholder="$t('job.enter_annual_monthly')"
                  v-model="formAbout.desired_salary">
                </el-input>
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
              <el-input
                type="textarea"
                :rows="4"
                :placeholder="$t('job.enter_inquiry_details')"
                v-model="formAbout.content">
              </el-input>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="aboutDialog = false" type="primary" plain>
            {{ $t('button.close_up') }}
          </el-button>
          <el-button @click="createFeedback" type="danger">
            {{ $t('button.confirm') }}
          </el-button>
        </div>
      </el-dialog>
    </div>
    <FormApplyJobElement :apply-dialog="applyDialog" @closeDialog="applyDialog = false" :job="job" :is-edit="false" @changeApply="getDetailJob"></FormApplyJobElement>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import FormApplyJobElement from '../../components/element-ui/FormApplyJobElement'
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
  components: { TitlePageElement, VueSlickCarousel, HomeJobElement, RecommendJobElement, RecentJobMobileElement, FormApplyJobElement },
  data() {
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
        desired_salary: '',
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
      return '〒' + this.job.postal_code + this.job.address.province + this.job.address.district + this.job.address.city + this.job.address.address
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
            break
          case 422:
            for (const [key] of Object.entries(response.data)) {
              this.error = { key, value: response.data[key][0] }
            }
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
    }
  }
}
</script>
