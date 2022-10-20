<template>
  <div class="job-detail-page">
    <TitlePageElement></TitlePageElement>
    <div class="job-detail-header">
      <div class="job-detail-title">{{ job.title }}</div>
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
          <div v-if="jobStatus" class="about-job ">
            <img src="/assets/icon/icon_headphone.svg" alt="">
            <span>{{ $t('job.about_job') }}</span>
          </div>
        </div>
        <el-button type="danger">{{ $t('job.pick_up_point') }}</el-button>
        <div class="about-job show-pc">
          <img src="/assets/icon/icon_email.svg" alt="">
          <span>{{ $t('job.about_job') }}</span>
        </div>
      </div>
      <div class="sub-detail-title">{{ job.sub_title }}</div>
      <div class="detail-job-image">
        <div class="job-avatar">
          <img :src="job.avatar" alt="">
        </div>
        <div class="job-detail">
          <div v-for="(image, index) in job.imageDetail" :key="index" class="image-detail">
            <img :src="image" alt="">
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
        <div class="button-like">
          <img src="/assets/icon/icon_like.svg" alt="">
          <span>{{ $t('home.job_favorite') }}</span>
        </div>
        <div class="button-detail">
          <div class="el-button" @click="applyDialog = true">
            {{ $t('home.view_job_detail') }}
          </div>
        </div>
      </div>
      <div class="application-requirement">
        <div class="application-requirement-title title-component">
          <span>{{ $t('job.application_requirement') }}</span>
        </div>
        <div class="application-requirement-item">
          <div class="application-requirement-left">
            <span>{{ $t('job.recruitment_type') }}</span>
          </div>
          <div class="application-requirement-right">
            <div>{{ job.recruitment_type }}</div>
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
            <div v-for="(status, index) in job.employment_status" :key="index" class="employment-status-item">
              <span>{{ status }}</span>
            </div>
          </div>
        </div>
        <div class="application-requirement-item">
          <div class="application-requirement-left">
            <span>{{ $t('job.salary') }}</span>
          </div>
          <div class="application-requirement-right">
            <div>{{ job.salary }}</div>
          </div>
        </div>
        <div class="application-requirement-item">
          <div class="application-requirement-left">
            <span>{{ $t('job.working_hours') }}</span>
          </div>
          <div class="application-requirement-right">
            <div>{{ job.working_hours }}</div>
          </div>
        </div>
        <div class="application-requirement-item">
          <div class="application-requirement-left">
            <span>{{ $t('job.age') }}</span>
          </div>
          <div class="application-requirement-right">
            <div>{{ job.age }}</div>
          </div>
        </div>
        <div class="application-requirement-item">
          <div class="application-requirement-left">
            <span>{{ $t('job.gender') }}</span>
          </div>
          <div class="application-requirement-right">
            <div>{{ job.gender }}</div>
          </div>
        </div>
        <div class="application-requirement-item">
          <div class="application-requirement-left">
            <span>{{ $t('job.experience') }}</span>
          </div>
          <div class="application-requirement-right">
            <div>{{ job.experience }}</div>
          </div>
        </div>
        <div class="application-requirement-item">
          <div class="application-requirement-left">
            <span>{{ $t('job.work_type') }}</span>
          </div>
          <div class="application-requirement-right">
            <div>{{ job.work_type }}</div>
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
            <div>{{ job.station1 }}</div>
          </div>
        </div>
        <div class="application-requirement-item">
          <div class="application-requirement-left">
            <span>{{ $t('job.welfare_treatment') }}</span>
          </div>
          <div class="application-requirement-right">
            <div>{{ job.welfare_treatment }}</div>
          </div>
        </div>
        <div class="job-button-detail">
          <div class="button-like">
            <img src="/assets/icon/icon_like.svg" alt="">
            <span>{{ $t('home.job_favorite') }}</span>
          </div>
          <div class="button-detail">
            <div class="el-button" @click="applyDialog = true">
              {{ $t('home.view_job_detail') }}
            </div>
          </div>
        </div>
      </div>
      <div class="recently-viewed-job">
        <div class="view-job-title title-component">{{ $t('job.recently_viewed_job') }}</div>
        <div class="view-job-content">
          <div class="show-pc">
            <VueSlickCarousel v-bind="settings">
              <div v-for="(job, index) in listJobs" :key="index">
                <HomeJobElement :job="job"></HomeJobElement>
              </div>
            </VueSlickCarousel>
          </div>
          <div class="show-sp">
            <div v-for="(job, index) in listJobs" :key="index">
              <RecentJobMobileElement :job="job"></RecentJobMobileElement>
            </div>
          </div>
        </div>
      </div>
      <div class="jobs-similar-job">
        <div class="jobs-similar-job-title">
          <div class="title-component">{{ $t('job.jobs_similar') }}</div>
          <div class="button-see-all">
            <span>{{ $t('home.see_all_job') }}</span>
            <img src="/assets/icon/icon_arrow.svg" alt="">
          </div>
        </div>
        <div class="jobs-similar-job-content">
          <div v-for="(job, index) in listSimilarJobs" :key="index">
            <RecommendJobElement :job="job"></RecommendJobElement>
          </div>
        </div>
      </div>
      <div class="find-other-job">
        <div class="find-other-job-title">
          <div class="title-component">{{ $t('job.find_other_jobs') }}</div>
        </div>
        <div class="find-other-job-content">
          <div class="find-other-job-item" v-html="listFindOtherJobs.join('<span>|</span>')"></div>
        </div>
      </div>
      <el-dialog class="form-dialog-apply" :title="$t('job.set_date_time_interview')" :visible.sync="applyDialog" width="84%" top="5vh">
        <div>
          <div class="header-search">
            <div class="search-apply">
              <div class="header-search-left">
                <span>{{ $t('job.preferred_date') }}</span>
              </div>
              <div class="header-search-right">
                <el-select v-model="formApply.date" placeholder="Select">
                  <el-option
                    v-for="item in listDate"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="search-work-location">
              <div class="header-search-left">
                <span>{{ $t('job.desired_time') }}</span>
              </div>
              <div class="header-search-right">
                <el-select v-model="formApply.time" placeholder="Select">
                  <el-option
                    v-for="item in listTime"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="interview-time">
            {{ $t('job.interview_time') }}: {{ formApply.date + ' ' + formApply.time }}
          </div>
          <div class="form-change-method">
            <div class="title-form">
              <span>{{ $t('job.choose_preferred_method') }}</span>
            </div>
            <div class="method-content">
              <el-radio-group v-model="formApply.method">
                <el-radio v-for="(method, index) in listMethod" :key="index" :label="method.id">{{ method.value }}</el-radio>
              </el-radio-group>
            </div>
            <div class="method-note">
              <span class="danger">※</span><span>{{ $t('job.note_choose_method') }}</span>
            </div>
          </div>
          <div class="form-question">
            <div class="title-form">
              <span>{{ $t('job.question_request') }}</span>
            </div>
            <div class="question-note">({{ $t('job.question_request_note') }})</div>
            <div class="question-content">
              <el-input
                type="textarea"
                :rows="4"
                :placeholder="$t('job.enter_your_question')"
                v-model="formApply.question">
              </el-input>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" plain>
            {{ $t('button.close_up') }}
          </el-button>
          <el-button type="danger">
            {{ $t('button.confirm') }}
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import HomeJobElement from '../../components/home/HomeJobElement'
import RecommendJobElement from '../../components/home/RecommendJobElement'
import RecentJobMobileElement from '../../components/home/RecentJobMobileElement'
import TitlePageElement from '../../components/layout/TitlePageElement'
import { INDEX_SET_TITLE_MENU } from '../../store/store.const'

export default {
  name: 'JobDetailPage',
  components: { TitlePageElement, VueSlickCarousel, HomeJobElement, RecommendJobElement, RecentJobMobileElement },
  data() {
    return {
      applyDialog: false,
      jobStatus: true,
      formApply: {
        date: '',
        time: '',
        method: '',
        question: ''
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
      job: {
        title: 'オープニングスタッフ募集☆週休２日＋歩合６０％',
        sub_title: 'スタッフ向け、美容イベントを開催',
        store_name: '虎ノ門店舗 (デモ美容室)',
        updated_at: '2022年09月26日更新',
        recruitment_type: 'ヘア、ネイル・マツゲ、整体・カイロ・酸素・温浴',
        description: '・カット\n' +
          '全体のバランスを見ながらカットを行います。髪を塗らした状態だけではなく、乾かし...',
        employment_status: ['正社員', '派遣社員'],
        salary: '400~500万/年\n' +
          '・給料が月末で支払い\n' +
          '・銀行振込、現金が払い可能\n' +
          '・祝日や残業の給与が10％アップ',
        working_hours: '始業時間  09：00\n' +
          '遅番時間  22：00\n' +
          '早番9：00～19：00\n' +
          '遅番11：00～22：00',
        age: '20 ~ 40歳',
        gender: '男性、女性、その他',
        experience: 'ブランク、管理美容師免許歓迎',
        work_type: '〒105-0001 東京都虎ノ門一丁目１２−３ 〇〇マンション１０１号',
        google_map: '〒105-0001 東京都虎ノ門一丁目１２−３ 〇〇マンション１０１号',
        station1: '山形県 JR奥羽本線(新庄～青森) 新庄駅',
        welfare_treatment: '社員旅行、海外研修、皆勤手当、精勤手当、住宅手当、残業手当、家族手当、資格手当、店販手当、役職手当、技術手当、報奨金',
        avatar: '/assets/images/detail1.svg',
        imageDetail: [
          '/assets/images/detail2.svg',
          '/assets/images/detail3.svg',
          '/assets/images/detail4.svg'
        ]
      },
      listJobs: [],
      listSimilarJobs: [],
      listFindOtherJobs: ['ヘア', 'ネイル・マツゲ', '整体・カイロ・酸素・温浴', ' フェイシャル・ボディ・脱毛', '美容クリニック', 'その他'],
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
  created() {
    this.getDataJob()
    this.getSimilarJob()
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.job.title, route: '/' }
    ])
  },
  methods: {
    getDataJob() {
      for (let x = 0; x <= 12; x++) {
        this.listJobs.push({
          image: '/assets/images/home_job_default.svg',
          name: ['★入社祝金100万円支給！/選べる保障/完週2日30万円★', 'オープニングスタッフ募集☆週休２日＋歩合６０％', '業務委託が初めての方でも<週休2日×35万円保障>で安心'][Math.floor(Math.random() * 3)],
          address: ['〒100-0001東京都千代田区大手町１－２－３', '東京都千代田区', '東京都千代田区'][Math.floor(Math.random() * 3)],
          store_name: ['虎ノ門店舗 (デモ美容室)', 'デモ美容室 - 虎ノ門店舗', 'デモ美容室 - 虎ノ門店舗'][Math.floor(Math.random() * 3)],
          salary: ['10~20万/月収', '250~400万/収'][Math.floor(Math.random() * 2)],
          features: ['正社員', '派遣社員', 'アルバイト', 'その他'],
          date: '午前9時〜午後5時',
          work_type: ['ヘア、ネイル・マツゲ、整体・カイロ・酸素・温浴', 'ヘア、ネイル・マツゲ、整体・カイロ・酸素・温浴'][Math.floor(Math.random() * 2)],
          place: ['https://meet.google.com/gpg-ftjc-demo', '〒1000001 東京都千代田区千代田１－２－４', '01234567890'][Math.floor(Math.random() * 3)]
        })
      }
    },
    getSimilarJob() {
      for (let x = 0; x <= 4; x++) {
        this.listSimilarJobs.push({
          image: '/assets/images/home_job_default.svg',
          name: ['★入社祝金100万円支給！/選べる保障/完週2日30万円★', 'オープニングスタッフ募集☆週休２日＋歩合６０％', '業務委託が初めての方でも<週休2日×35万円保障>で安心'][Math.floor(Math.random() * 3)],
          address: ['〒100-0001東京都千代田区大手町１－２－３', '東京都千代田区', '東京都千代田区'][Math.floor(Math.random() * 3)],
          store_name: ['虎ノ門店舗 (デモ美容室)', 'デモ美容室 - 虎ノ門店舗', 'デモ美容室 - 虎ノ門店舗'][Math.floor(Math.random() * 3)],
          salary: ['10~20万/月収', '250~400万/収'][Math.floor(Math.random() * 2)],
          features: ['正社員', '派遣社員', 'アルバイト', 'その他'],
          date: '午前9時〜午後5時',
          work_type: ['ヘア、ネイル・マツゲ、整体・カイロ・酸素・温浴', 'ヘア、ネイル・マツゲ、整体・カイロ・酸素・温浴'][Math.floor(Math.random() * 2)],
          place: ['https://meet.google.com/gpg-ftjc-demo', '〒1000001 東京都千代田区千代田１－２－４', '01234567890'][Math.floor(Math.random() * 3)]
        })
      }
    }
  }
}
</script>
