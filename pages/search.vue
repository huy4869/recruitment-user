<template>
  <div class="search-page">
    <TitlePageElement class="show-pc"></TitlePageElement>
    <BannerElement :banner="$t('page.search')"></BannerElement>
    <div class="search-content">
      <div class="search-form-condition">
        <div class="header-search">
          <div class="search-occupation">
            <div class="header-search-left">
              <span>{{ $t('condition.occupation') }}</span>
            </div>
            <div class="header-search-right">
              <el-button type="danger" class="form-search" plain @click="occupationDialog = true">
                <img src="/assets/icon/icon_add_blue.svg" alt="">
                {{ $t('condition.enter_occupation') }}
              </el-button>
              <div v-if="showProvince" class="show-result-condition">
                {{ showProvince }}
              </div>
            </div>
          </div>
          <div class="search-work-location">
            <div class="header-search-left">
              <span>{{ $t('condition.work_location') }}</span>
            </div>
            <div class="header-search-right">
              <el-button type="danger" class="form-search" plain @click="workDialog = true">
                <img src="/assets/icon/icon_add_blue.svg" alt="">
                {{ $t('condition.enter_work_location') }}
              </el-button>
              <div v-if="showJobType" class="show-result-condition">
                {{ showJobType }}
              </div>
            </div>
          </div>
        </div>
        <div class="all-condition">
          <div v-if="showAll" class="form-all-condition">
            <div class="form-condition-item">
              <div class="header-search-left">
                <span>{{ $t('condition.occupation') }}</span>
              </div>
              <div class="header-search-right">
                <el-input
                  v-model.trim="condition.keyword"
                  class="input-keyword"
                  :placeholder="$t('common.search')"
                  name="search"
                  type="text"
                  tabindex="2"
                  show-word-limit
                >
                  <img slot="prefix" src="/assets/icon/icon_search_input.svg" alt="">
                </el-input>
              </div>
            </div>
            <div class="form-condition-item">
              <div class="header-search-left">
                <span>{{ $t('condition.employment_status') }}</span>
              </div>
              <div class="header-search-right">
                <el-checkbox-group v-model="condition.employment_status">
                  <div v-for="(employment, index) in listWorkTypes" :key="index" class="checkbox-item">
                    <el-checkbox :label="employment.id">{{ employment.name }}</el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>
            </div>
            <div class="form-condition-item form-item-50">
              <div class="header-search-left">
                <span>{{ $t('condition.experience') }}</span>
              </div>
              <div class="header-search-right">
                <el-checkbox-group v-model="condition.experience">
                  <div v-for="(experience, index) in listExperiences" :key="index" class="checkbox-item">
                    <el-checkbox :label="experience.id">{{ experience.name }}</el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>
            </div>
            <div class="form-condition-item form-item-50">
              <div class="header-search-left">
                <span>{{ $t('condition.sort_by') }}</span>
              </div>
              <div class="header-search-right">
                <el-checkbox-group v-model="condition.sort_by">
                  <div v-for="(sort, index) in listSortBy" :key="index" class="checkbox-item">
                    <el-checkbox :label="sort.id">{{ sort.name }}</el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>
            </div>
            <div class="form-condition-item form-item-50">
              <div class="header-search-left">
                <span>{{ $t('condition.feature') }}</span>
              </div>
              <div class="header-search-right">
                <el-checkbox-group v-model="condition.feature">
                  <div v-for="(list, key) in listJobFeatures" :key="key">
                    <div class="feature-title">※{{ list.category_name }}</div>
                    <div v-for="(feature, index) in list.feature" :key="index" class="checkbox-item">
                      <el-checkbox :label="feature.id">{{ feature.name }}</el-checkbox>
                    </div>
                  </div>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="button-see-all" @click="showAll = !showAll">
            <span>{{ $t('condition.specify_detailed_conditions') }}</span>
            <img :class="{ 'hide-show-all':showAll }" src="/assets/icon/icon_double_next.svg" alt="">
          </div>
        </div>
        <div class="button-search">
          <el-button type="danger">
            {{ $t('button.search_again') }}
          </el-button>
        </div>
        <el-dialog class="form-dialog-select" :title="$t('condition.select_work_location')" :visible.sync="occupationDialog" width="84%">
          <el-checkbox-group v-model="districts">
            <div class="form-filter-location">
              <div v-for="(district, index) in listProvinceDistrict" :key="index" class="district-item">
                <div class="district-name">
                  <el-checkbox :label="district.id" @change="changeDistrict(district)">{{ district.name }}</el-checkbox>
                </div>
                <div class="list-province">
                  <el-checkbox-group v-model="workLocation">
                    <div v-for="(province, key) in district.provinces" :key="key" class="province-item">
                      <el-checkbox :label="province.id">{{ province.name }} <span class="total-record">({{ province.record + $t('common.subject') }})</span></el-checkbox>
                    </div>
                  </el-checkbox-group>
                </div>
              </div>
            </div>
          </el-checkbox-group>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger" @click="changeCondition('provinces', workLocation)">
              {{ $t('button.decide') }}
            </el-button>
          </div>
        </el-dialog>
        <el-dialog class="form-dialog-select form-work-dialog" :title="$t('condition.select_a_job')" :visible.sync="workDialog" width="84%">
          <div class="form-filter-location">
            <div class="district-item">
              <div class="district-name">
                <el-checkbox v-model="jobTypeSelectAll" @change="changeJobType">{{ $t('common.select_all') }}</el-checkbox>
              </div>
              <div class="list-province">
                <el-checkbox-group v-model="jobType">
                  <div v-for="(type, key) in listJobType" :key="key" class="province-item form-work">
                    <el-checkbox :label="type.id">{{ type.name }} <span class="total-record">(12{{ $t('common.subject') }})</span></el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger" @click="changeCondition('jobTypes', jobType)">
              {{ $t('button.decide') }}
            </el-button>
          </div>
        </el-dialog>
      </div>
      <div class="search-result">
        <div>
          <span>{{ $t('page.search') }}</span>
          <span class="total-record">{{ total + $t('common.subject') }}</span>
          <span>{{ $t('common.display_item', { min: listJobs.length ? 1 : 0, max: listJobs.length }) }}</span>
        </div>
      </div>
      <div v-if="listJobs.length" class="search-list-job">
        <div v-for="(job, index) in listJobs" :key="index">
          <RecommendJobElement :job="job"></RecommendJobElement>
        </div>
      </div>
      <div v-else class="search-list-job">
        <NoDataElement :text="$t('common.no_data')"></NoDataElement>
      </div>
      <PaginationElement v-if="listJobs.length" :current-page="page" :last-page="lastPage" @change="changePage"></PaginationElement>
    </div>
  </div>
</template>

<script>
import {
  INDEX_SET_TITLE_MENU,
  JOB_LIST_RECOMMEND_JOBS,
  MASTER_GET_DATA
} from '../store/store.const'
import TitlePageElement from '../components/layout/TitlePageElement'
import BannerElement from '../components/layout/BannerElement'
import PaginationElement from '../components/element-ui/PaginationElement'
import NoDataElement from '../components/element-ui/NoDataElement'
import RecommendJobElement from '../components/home/RecommendJobElement'

export default {
  name: 'SearchPage',
  components: { TitlePageElement, BannerElement, PaginationElement, RecommendJobElement, NoDataElement },
  data() {
    return {
      workDialog: false,
      occupationDialog: false,
      showAll: false,
      listJobs: [],
      total: 2500,
      page: 1,
      lastPage: 10,
      listWorkTypes: [
        { id: 1, name: '正社員' },
        { id: 2, name: '派遣社員' },
        { id: 3, name: '契約社員' },
        { id: 4, name: 'アルバイト' },
        { id: 5, name: 'その他' }
      ],
      listExperiences: [
        { id: 1, name: 'ブランク' },
        { id: 2, name: '未経験者可' },
        { id: 3, name: '管理美容師免許歓迎' },
        { id: 4, name: '美容師歓迎' },
        { id: 5, name: '免許・資格不問' },
        { id: 6, name: '通信生（見習い）相談可' },
        { id: 7, name: '幹部・店長候補歓迎' }
      ],
      listSortBy: [
        { id: 1, name: '新着順' },
        { id: 2, name: '更新順' }
      ],
      listJobFeatures: [],
      listRecruitmentFeatures: [
        { id: 1, name: '急募' },
        { id: 2, name: '10人以上募集' },
        { id: 3, name: '未経験者歓迎' },
        { id: 4, name: '経験者優遇' },
        { id: 5, name: '学歴不問' },
        { id: 6, name: '第二新卒歓迎' },
        { id: 7, name: 'フリーター歓迎' },
        { id: 8, name: '障がい者積極採用' },
        { id: 9, name: '女性活躍中' },
        { id: 10, name: '男性活躍中' },
        { id: 11, name: '年齢不問' },
        { id: 12, name: '20代以下活躍中' },
        { id: 13, name: '30代活躍中' },
        { id: 14, name: '40代以上活躍中' }
      ],
      listCompanyFeatures: [
        { id: 15, name: '転勤なし' },
        { id: 16, name: '海外勤務/出張あり' },
        { id: 17, name: '残業月10時間以内' },
        { id: 18, name: '残業月20時間以内' },
        { id: 19, name: '原則定時退社' },
        { id: 20, name: 'フレックスタイム制あり' },
        { id: 21, name: 'オフィスワーク' },
        { id: 22, name: '在宅勤務可' },
        { id: 23, name: '時短勤務可' },
        { id: 24, name: '英語を使う仕事' },
        { id: 25, name: '中国語を使う仕事' },
        { id: 26, name: 'その他の言語を使う仕事' },
        { id: 27, name: '短期/期間限定' },
        { id: 28, name: '賞与あり/インセンティブあり' },
        { id: 29, name: '実力主義/歩合制' },
        { id: 30, name: '月給25万円以上' }
      ],
      listStoreFeatures: [
        { id: 31, name: '服装自由' },
        { id: 32, name: '年間休日120日以上' },
        { id: 33, name: '完全週休2日制' },
        { id: 34, name: '土日休み' },
        { id: 35, name: '5日以上連続休暇取得可能' },
        { id: 36, name: 'マイカー通勤可' },
        { id: 37, name: 'オフィス内禁煙/分煙' },
        { id: 38, name: '社宅/家賃補助制度あり' },
        { id: 39, name: '交通費全額支給' },
        { id: 40, name: '産休/育休/介護休暇あり' },
        { id: 41, name: '資格取得支援あり' },
        { id: 42, name: '独立/開業支援' }
      ],
      listProvinceDistrict: [
        {
          id: 1, name: '北海道・東北',
          provinces: [
            { id: 1, name: '北海道', record: 12 },
            { id: 2, name: '青森県', record: 12 },
            { id: 3, name: '秋田県', record: 12 },
            { id: 4, name: '岩手県', record: 12 },
            { id: 5, name: '山形県', record: 12 },
            { id: 6, name: '宮城県', record: 12 },
            { id: 7, name: '福島県', record: 12 }
          ]
        },
        {
          id: 2, name: '関東',
          provinces: [
            { id: 8, name: '茨城県', record: 12 },
            { id: 9, name: '栃木県', record: 12 },
            { id: 10, name: '群馬県', record: 12 },
            { id: 11, name: '埼玉県', record: 12 },
            { id: 12, name: '千葉県', record: 12 },
            { id: 13, name: '東京都', record: 12 },
            { id: 14, name: '神奈川県', record: 12 }
          ]
        },
        {
          id: 3, name: '甲信越・北陸',
          provinces: [
            { id: 15, name: '山梨県', record: 12 },
            { id: 16, name: '新潟県', record: 12 },
            { id: 17, name: '長野県', record: 12 },
            { id: 18, name: '石川県', record: 12 },
            { id: 19, name: '富山県', record: 12 },
            { id: 20, name: '福井県', record: 12 }
          ]
        },
        {
          id: 4, name: '東海',
          provinces: [
            { id: 21, name: '静岡県', record: 12 },
            { id: 22, name: '愛知県', record: 12 },
            { id: 23, name: '岐阜県', record: 12 },
            { id: 24, name: '三重県', record: 12 }
          ]
        },
        {
          id: 5, name: '関西',
          provinces: [
            { id: 25, name: '和歌山県', record: 12 },
            { id: 26, name: '奈良県', record: 12 },
            { id: 27, name: '滋賀県', record: 12 },
            { id: 28, name: '京都府', record: 12 },
            { id: 29, name: '大阪府', record: 12 },
            { id: 30, name: '兵庫県', record: 12 }
          ]
        },
        {
          id: 6, name: '中国・四国',
          provinces: [
            { id: 31, name: '岡山県', record: 12 },
            { id: 32, name: '広島県', record: 12 },
            { id: 33, name: '鳥取県', record: 12 },
            { id: 34, name: '島根県', record: 12 },
            { id: 35, name: '山口県', record: 12 },
            { id: 36, name: '香川県', record: 12 },
            { id: 37, name: '高知県', record: 12 },
            { id: 38, name: '徳島県', record: 12 },
            { id: 39, name: '愛媛県', record: 12 }
          ]
        },
        {
          id: 7, name: '九州・沖縄',
          provinces: [
            { id: 40, name: '福岡県', record: 12 },
            { id: 41, name: '長崎県', record: 12 },
            { id: 42, name: '佐賀県', record: 12 },
            { id: 43, name: '大分県', record: 12 },
            { id: 44, name: '熊本県', record: 12 },
            { id: 45, name: '宮﨑県', record: 12 },
            { id: 46, name: '鹿児島県', record: 12 },
            { id: 47, name: '沖縄県', record: 12 },
            { id: 48, name: '愛媛県', record: 12 }
          ]
        }
      ],
      listJobType: [
        { id: 1, name: 'ヘア', record: 12 },
        { id: 2, name: 'ネイル・マツゲ ', record: 12 },
        { id: 3, name: '美容クリニック', record: 12 },
        { id: 4, name: '整体・カイロ・酸素・温浴', record: 12 },
        { id: 5, name: 'フェイシャル・ボディ・脱毛', record: 12 },
        { id: 6, name: 'その他', record: 12 }
      ],
      jobType: [],
      jobTypeSelectAll: false,
      workLocation: [],
      districts: [],
      condition: {
        keyword: '',
        provinces: [],
        jobTypes: [],
        employment_status: [],
        experience: [],
        sort_by: [],
        feature: []
      }
    }
  },
  computed: {
    showProvince() {
      const text = []
      this.listProvinceDistrict.forEach(district => {
        district.provinces.forEach(province => {
          if (this.condition.provinces.includes(province.id)) {
            text.push(province.name)
          }
        })
      })
      return text.join('、')
    },
    showJobType() {
      const text = []
      this.listJobType.forEach(type => {
        if (this.condition.jobTypes.includes(type.id)) {
          text.push(type.name)
        }
      })
      return text.join('、')
    }
  },
  async created() {
    await this.getJobs()
    this.getMasterData()
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.search'), route: '/search' }
    ])
  },
  methods: {
    changePage(page) {
      this.page = page
    },
    getMasterData() {
      const dataResources = [
        'resources[m_work_types]={"model": "MWorkType"}',
        'resources[m_job_experiences]={"model": "MJobExperience"}',
        'resources[m_job_types]={"model": "MJobType"}',
        'resources[m_job_features]={}',
        'resources[m_province_districts]={"model": "MProvinceDistrict"}'
      ]
      this.$store.dispatch(MASTER_GET_DATA, dataResources.join('&')).then(res => {
        this.listWorkTypes = res.data.m_work_types
        this.listJobFeatures = res.data.m_job_features
        this.listExperiences = res.data.m_job_experiences
      })
    },
    async getJobs() {
      const dataResponse = await this.$store.dispatch(JOB_LIST_RECOMMEND_JOBS, '')
      this.listJobs = dataResponse.data
    },
    changeDistrict(district) {
      if (!this.districts.includes(district.id)) {
        district.provinces.forEach((province) => {
          const key = this.workLocation.indexOf(province.id)
          if (key > -1) {
            this.workLocation.splice(key, 1)
          }
        })
      } else {
        district.provinces.forEach((province) => {
          if (!this.workLocation.includes(province.id)) {
            this.workLocation.push(province.id)
          }
        })
      }
    },
    changeJobType() {
      if (this.jobTypeSelectAll) {
        this.listJobType.forEach((type) => {
          if (!this.jobType.includes(type.id)) {
            this.jobType.push(type.id)
          }
        })
      } else {
        this.jobType = []
      }
    },
    changeCondition(key, value) {
      this.condition[key] = value
      this.occupationDialog = false
      this.workDialog = false
    }
  }
}
</script>
