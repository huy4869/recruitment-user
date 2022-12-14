<template>
  <div class="search-page">
    <TitlePageElement class="show-pc"></TitlePageElement>
    <div class="search-content">
      <div class="search-form-condition">
        <div class="header-search">
          <div class="search-occupation">
            <div class="header-search-left">
              <span>{{ $t('condition.occupation') }}</span>
            </div>
            <div class="header-search-right">
              <el-button type="default" class="form-search" @click="jobDialog = true">
                <img src="/assets/icon/icon_add_blue.svg" alt="">
                {{ $t('condition.enter_occupation') }}
              </el-button>
              <div v-if="showJobType" class="show-result-condition">
                {{ showJobType }}
              </div>
            </div>
          </div>
          <div class="search-work-location">
            <div class="header-search-left">
              <span>{{ $t('condition.work_location') }}</span>
            </div>
            <div class="header-search-right">
              <el-button type="default" class="form-search" @click="occupationDialog = true">
                <img src="/assets/icon/icon_add_blue.svg" alt="">
                {{ $t('condition.enter_work_location') }}
              </el-button>
              <div v-if="showProvince.length" class="show-result-condition">
                <div v-for="(item, index) in showProvince" :key="index" class="show-result-item">
                  <div v-if="item.key === 'district'">
                    <div class="district-item">{{ item.value }}</div>
                  </div>
                  <div v-else>
                    <div class="province-item">{{ item.value }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="all-condition">
          <div v-if="showAll" class="form-all-condition">
            <div class="form-condition-item">
              <div class="header-search-left">
                <span>{{ $t('condition.keyword') }}</span>
              </div>
              <div class="header-search-right">
                <el-input
                  v-model.trim="search"
                  class="input-keyword"
                  :placeholder="$t('condition.keyword')"
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
                <el-checkbox-group v-model="condition.work_type_ids">
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
                <el-checkbox-group v-model="condition.experience_ids">
                  <div v-for="(experience, index) in listExperiences" :key="index" class="checkbox-item">
                    <el-checkbox :label="experience.id">{{ experience.name }}</el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>
            </div>
            <div class="form-condition-item form-item-50">
              <div class="header-search-left header-search-sort">
                <span>{{ $t('condition.sort_by') }}</span>
              </div>
              <div class="header-search-right">
                <el-checkbox-group v-model="sort_by">
                  <div v-for="(sort, index) in listSortBy" :key="index" class="checkbox-item">
                    <el-checkbox :label="sort.id" @change="(value) => { changeSortBy(value, sort.id) }">{{ sort.name }}</el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>
            </div>
            <div class="form-condition-item form-item-50">
              <div class="header-search-left">
                <span>{{ $t('condition.feature') }}</span>
              </div>
              <div class="header-search-right">
                <el-checkbox-group v-model="condition.feature_ids">
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
          <div class="d-flex justify-end">
            <div class="button-see-all text-blue-hover" @click="showAll = !showAll">
              <span>{{ $t('condition.specify_detailed_conditions') }}</span>
              <img :class="{ 'hide-show-all':showAll }" src="/assets/icon/icon_double_next.svg" alt="">
            </div>
          </div>
        </div>
        <div class="button-search">
          <el-button type="danger" @click="searchJob">
            {{ $t('button.search_again') }}
          </el-button>
        </div>
        <el-dialog class="form-dialog-select" :title="$t('condition.select_work_location')" :visible.sync="occupationDialog" width="84%">
          <div class="show-pc">
            <el-checkbox-group v-model="districts">
              <div class="form-filter-location">
                <div v-for="(district, index) in listProvinceDistricts" :key="index" class="district-item">
                  <div class="district-name">
                    <el-checkbox :label="district.id" @change="changeDistrict(district)">{{ district.name }}</el-checkbox>
                  </div>
                  <div class="list-province">
                    <el-checkbox-group v-model="workLocation">
                      <div v-for="(province, key) in convertListProvince(district.provinces)" :key="key" :class="(province.status === 'province') ? 'province-item' : 'city-item'">
                        <div v-if="province.status === 'province'" class="d-flex">
                          <el-checkbox :label="province.data.id" @change="changeProvince(province.data)" :indeterminate="listProvinceIndeterminate.includes(province.data.id)">
                            {{ province.data.name }} <span class="total-record" @click.stop="changeFilterProvince(province.data)"> ({{ province.data.record + $t('common.subject') }}) </span>
                          </el-checkbox>
                          <div class="form-show-city" @click.stop="changeActiveProvince(province.data.id)">
                            <img v-if="provinceActive.includes(province.data.id)" class="image-hide-city" src="/assets/icon/icon_remove_province.svg" alt="">
                            <img v-else class="image-show-city" src="/assets/icon/icon_add_province.svg" alt="">
                          </div>
                        </div>
                        <div v-if="(province.status === 'city')">
                          <div v-for="(cities, index) in province.data" :key="index">
                            <div v-if="provinceActive.includes(cities.id)" class="list-city">
                              <div :class="'show-province-active position-' + index"></div>
                              <el-checkbox-group v-model="cityLocation" @change="changeCity">
                                <div v-for="city in cities.province_city" :key="city.id" class="province-city-item">
                                  <div class="city-item">
                                    <div class="d-flex">
                                      <el-checkbox :label="city.id">{{ city.name }}</el-checkbox>
                                    </div>
                                  </div>
                                </div>
                              </el-checkbox-group>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-checkbox-group>
                  </div>
                </div>
              </div>
            </el-checkbox-group>
          </div>
          <div class="show-sp">
            <el-checkbox-group v-model="districts">
              <div class="form-filter-location">
                <div v-for="(district, index) in listProvinceDistricts" :key="index" class="district-item">
                  <div class="district-name" @click.stop="showDetailDistrict(district.id)">
                    <el-checkbox :label="district.id" :indeterminate="listDistrictIndeterminate.includes(district.id)" @change="changeDistrict(district)">{{ district.name }}</el-checkbox>
                    <img :class="{ 'img-dropdown': true, 'show-detail': showDistrictModal === district.id }" src="/assets/icon/icon_drop_more.svg" alt="">
                  </div>
                  <div v-show="showDistrictModal === district.id" class="list-province">
                    <el-checkbox-group v-model="workLocation">
                      <div v-for="(province, key) in district.provinces" :key="key" class="province-item">
                        <div class="province-name">
                          <el-checkbox :label="province.id" @change="changeProvince(province)" :indeterminate="listProvinceIndeterminate.includes(province.id)">
                            {{ province.name }} <span class="total-record" @click.stop="changeFilterProvince(province)"> ({{ province.record + $t('common.subject') }}) </span>
                          </el-checkbox>
                          <div class="form-show-city" @click.stop="changeActiveProvince(province.id)">
                            <img v-if="provinceActive.includes(province.id)" class="image-hide-city" src="/assets/icon/icon_remove_province.svg" alt="">
                            <img v-else class="image-show-city" src="/assets/icon/icon_add_province.svg" alt="">
                          </div>
                        </div>
                        <div class="list-select-city">
                          <div v-if="provinceActive.includes(province.id)" class="list-city">
                            <div :class="'show-province-active position-' + index"></div>
                            <el-checkbox-group v-model="cityLocation" @change="changeCity">
                              <div v-for="city in province.province_city" :key="city.id" class="province-city-item">
                                <div class="city-item">
                                  <div class="d-flex">
                                    <el-checkbox :label="city.id">{{ city.name }}</el-checkbox>
                                  </div>
                                </div>
                              </div>
                            </el-checkbox-group>
                          </div>
                        </div>
                      </div>
                    </el-checkbox-group>
                  </div>
                </div>
              </div>
            </el-checkbox-group>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger" @click="changeCondition('province_city_id', cityLocation)">
              {{ $t('button.decide') }}
            </el-button>
          </div>
        </el-dialog>
        <el-dialog class="form-dialog-select form-work-dialog" :title="$t('condition.select_a_job')" :visible.sync="jobDialog" width="84%">
          <div class="form-filter-location">
            <div class="district-item">
              <div class="district-name">
                <el-checkbox v-model="jobTypeSelectAll" @change="changeJobType">{{ $t('common.select_all') }}</el-checkbox>
              </div>
              <div class="list-province">
                <el-checkbox-group v-model="jobType">
                  <div v-for="(type, key) in listJobType" :key="key" class="province-item form-work">
                    <el-checkbox :label="type.id">{{ type.name }} <span class="total-record" @click.stop="changeFilter('job_type_ids', [type.id])">({{ type.amount + $t('common.subject') }})</span></el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger" @click="changeCondition('job_type_ids', jobType)">
              {{ $t('button.decide') }}
            </el-button>
          </div>
        </el-dialog>
      </div>
      <div class="search-result d-flex justify-between">
        <div>
          <span>{{ $t('page.search') }}</span>
          <span class="total-record">{{ total + $t('common.subject') }}</span>
          <span v-if="total">{{ $t('common.display_item', { min: this.per_page * (this.page - 1) + 1, max: (this.total > (this.per_page * this.page)) ? (this.per_page * this.page) : this.total }) }}</span>
        </div>
        <div v-if="listJobs.length" class="show-pc">
          <PaginationElement :current-page="page" :last-page="lastPage" @change="changePage"></PaginationElement>
        </div>
      </div>
      <div v-if="listJobs.length" class="search-list-job">
        <div v-for="(job, index) in listJobs" :key="index">
          <RecommendJobElement :job="job" @editApply="editApply(job)"></RecommendJobElement>
        </div>
      </div>
      <div v-else class="search-list-job">
        <NoDataElement :text="$t('common.message_no_data.specified_criteria')"></NoDataElement>
      </div>
      <div v-if="listJobs.length">
        <PaginationElement :current-page="page" :last-page="lastPage" @change="changePage"></PaginationElement>
      </div>
    </div>
    <FormApplyJobElement :apply-dialog="applyDialog" @closeDialog="applyDialog = !applyDialog" :job="jobActive" :is-edit="false"></FormApplyJobElement>
  </div>
</template>

<script>
import _ from 'lodash'
import {
  INDEX_SET_TITLE_MENU,
  JOB_LIST_JOBS,
  MASTER_GET_DATA,
  LOCATION_LIST_AMOUNT,
  INDEX_SET_LOADING,
  INDEX_SET_ERROR, JOB_TYPE_AMOUNT
} from '../store/store.const'
import TitlePageElement from '../components/layout/TitlePageElement'
import PaginationElement from '../components/element-ui/PaginationElement'
import NoDataElement from '../components/element-ui/NoDataElement'
import FormApplyJobElement from '../components/element-ui/FormApplyJobElement'
import RecommendJobElement from '../components/home/RecommendJobElement'

export default {
  name: 'SearchPage',
  components: { TitlePageElement, PaginationElement, RecommendJobElement, NoDataElement, FormApplyJobElement },
  data() {
    return {
      jobDialog: false,
      occupationDialog: false,
      showAll: false,
      listJobs: [],
      total: 0,
      per_page: 10,
      page: 1,
      lastPage: 1,
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
      listProvinceDistricts: [
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
      listJobType: [],
      jobType: [],
      jobTypeSelectAll: false,
      workLocation: [],
      cityLocation: [],
      districts: [],
      condition: {
        work_type_ids: [],
        job_type_ids: [],
        experience_ids: [],
        feature_ids: [],
        province_id: [],
        province_city_id: []
      },
      search: '',
      sort_by: [],
      query: this.$route.query,
      applyDialog: false,
      jobActive: {},
      provinceActive: [],
      showDistrictModal: '',
      listProvinceIndeterminate: [],
      listDistrictIndeterminate: []
    }
  },
  computed: {
    showProvince() {
      const dataShow = []
      if (this.condition.province_city_id.length) {
        this.listProvinceDistricts.forEach(district => {
          if (this.districts.includes(district.id)) {
            dataShow.push({ key: 'district', value: district.name })
          }
        })
        this.listProvinceDistricts.forEach(district => {
          if (!this.districts.includes(district.id)) {
            if (this.listDistrictIndeterminate.includes(district.id)) {
              dataShow.push({ key: 'district', value: district.name + ':' })
            }
            district.provinces.forEach(province => {
              const listCity = []
              if (province.province_city) {
                province.province_city.forEach(city => {
                  if (this.cityLocation.includes(city.id)) {
                    listCity.push(city.name)
                  }
                })
              }
              if (listCity.length) {
                dataShow.push({ key: 'province', value: province.name + ': ' + listCity.join('、') })
              }
            })
          }
        })
      }
      return dataShow
    },
    showJobType() {
      const text = []
      this.listJobType.forEach(type => {
        if (this.condition.job_type_ids.includes(type.id)) {
          text.push(type.name)
        }
      })
      return text.join('、')
    }
  },
  async created() {
    await this.getMasterData()
    await this.getJobs()
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.search'), route: '/search' }
    ])
  },
  watch: {
    occupationDialog() {
      this.workLocation = _.cloneDeep(this.condition.province_id)
      this.cityLocation = _.cloneDeep(this.condition.province_city_id)
    },
    jobDialog() {
      this.jobType = _.cloneDeep(this.condition.job_type_ids)
    },
    jobType() {
      let check = true
      this.listJobType.forEach(job => {
        if (!this.jobType.includes(job.id)) {
          check = false
        }
      })
      this.jobTypeSelectAll = check
    }
  },
  methods: {
    async changePage(page) {
      this.page = page
      await this.getJobs()
    },
    async getMasterData() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const dataResources = [
        'resources[m_work_types]={"model": "MWorkType"}',
        'resources[m_job_experiences]={"model": "MJobExperience"}',
        'resources[m_job_types]={"model": "MJobType"}',
        'resources[m_job_features]={}',
        'resources[province_districts]={}'
      ]
      const dataMasterData = await this.$store.dispatch(MASTER_GET_DATA, dataResources.join('&'))
      if (dataMasterData.status_code === 200) {
        this.listWorkTypes = dataMasterData.data.m_work_types
        this.listJobFeatures = dataMasterData.data.m_job_features
        this.listExperiences = dataMasterData.data.m_job_experiences
        this.listProvinceDistricts = dataMasterData.data.province_districts
      }
      const dataResponse = await this.$store.dispatch(LOCATION_LIST_AMOUNT, '')
      if (dataResponse.status_code === 200) {
        const dataProvince = {}
        dataResponse.data.forEach(res => {
          dataProvince[res.province_id] = res.amount_job
        })
        const dataListProvince = []
        dataMasterData.data.province_districts.forEach(district => {
          dataListProvince.push({
            id: district.id,
            name: district.name,
            provinces: district.provinces.map(province => {
              return {
                id: province.id,
                name: province.name,
                record: dataProvince[province.id],
                province_city: province.province_city
              }
            })
          })
        })
        this.listProvinceDistricts = dataListProvince
      }
      const dataJobTypeAmount = await this.$store.dispatch(JOB_TYPE_AMOUNT)
      if (dataJobTypeAmount.status_code === 200) {
        this.listJobType = dataJobTypeAmount.data
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    getDataSearch() {
      const dataSearch = []
      let key = 0
      for (const query in this.query) {
        if (this.query[query].length) {
          if (query === 'list_type') {
            dataSearch.push(`filters[${key}][key]=${query}&filters[${key}][data]=${this.query[query]}`)
          } else {
            dataSearch.push(`filters[${key}][key]=${query}&filters[${key}][data]=[${this.query[query]}]`)
            if ((this.condition[query] !== undefined)) {
              let data = this.query[query].split(',')
              data = data.map(item => {
                return Number(item)
              })
              this.condition[query] = data
            }
          }
          key++
        }
      }
      dataSearch.push(`per_page=${this.per_page}`)
      if (this.search) {
        dataSearch.push(`search=${this.search}`)
      }
      if (this.page) {
        dataSearch.push(`page=${this.page}`)
      }
      if (key === 0) {
        for (const index in this.condition) {
          if (this.condition[index].length) {
            dataSearch.push(`filters[${key}][key]=${index}&filters[${key}][data]=[${this.condition[index].join(',')}]`)
            key++
          }
        }
      }
      if (this.sort_by.length) {
        dataSearch.push(`filters[${key}][key]=order_by_id&filters[${key}][data]=${this.sort_by[0]}`)
      }
      return dataSearch
    },
    async searchJob() {
      this.showAll = false
      await this.$router.push('/search')
      this.query = []
      await this.getJobs()
    },
    async getJobs() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const dataSearch = this.getDataSearch()
      const dataResponse = await this.$store.dispatch(JOB_LIST_JOBS, dataSearch.join('&'))
      if (dataResponse.status_code === 200) {
        this.listJobs = dataResponse.data.data
        this.total = dataResponse.data.total
        this.lastPage = dataResponse.data.total_page
      } else if (dataResponse.status_code === 500) {
        await this.$store.commit(INDEX_SET_ERROR, {
          show: true,
          text: this.$t('content.EXC_001')
        })
      } else {
        await this.$store.commit(INDEX_SET_ERROR, {
          show: true,
          text: dataResponse.messages
        })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    changeDistrict(district) {
      if (this.occupationDialog) {
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
      }
    },
    changeProvince(province) {
      if (this.occupationDialog) {
        if (!this.workLocation.includes(province.id)) {
          province.province_city.forEach((city) => {
            const key = this.cityLocation.indexOf(city.id)
            if (key > -1) {
              this.cityLocation.splice(key, 1)
            }
          })
        } else {
          province.province_city.forEach((city) => {
            if (!this.cityLocation.includes(city.id)) {
              this.cityLocation.push(city.id)
            }
          })
        }
      }
      this.changeProvinceModal()
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
      this.jobDialog = false
      if (key === 'province_city_id') {
        this.condition.province_id = this.workLocation
      }
    },
    changeFilter(key, value) {
      this.condition = {
        work_type_ids: [],
        job_type_ids: [],
        experience_ids: [],
        feature_ids: [],
        province_id: [],
        province_city_id: []
      }
      this.search = ''
      this.sort_by = []
      this.changeCondition(key, value)
      this.searchJob()
      this.showAll = false
    },
    changeFilterProvince(province) {
      this.search = ''
      this.sort_by = []
      const data = []
      province.province_city.forEach(city => {
        data.push(city.id)
      })
      this.cityLocation = data
      this.workLocation = [province.id]
      this.condition = {
        work_type_ids: [],
        job_type_ids: [],
        experience_ids: [],
        feature_ids: [],
        province_id: [province.id],
        province_city_id: data
      }
      this.occupationDialog = false
      this.jobDialog = false
      this.searchJob()
      this.showAll = false
    },
    changeSortBy(value, type) {
      if (value) {
        this.sort_by = [type]
      }
    },
    editApply(value) {
      this.applyDialog = !this.applyDialog
      this.jobActive = value
    },
    convertListProvince(provinces) {
      const data = []
      let listCity = []
      provinces.forEach((province, key) => {
        data.push({
          status: 'province',
          data: province
        })
        if (province.province_city) {
          if ([3, 7, 11].includes(key)) {
            listCity.push(province)
            data.push({
              status: 'city',
              data: listCity
            })
            listCity = []
          } else {
            listCity.push(province)
          }
        }
      })
      if (listCity.length) {
        data.push({
          status: 'city',
          data: listCity
        })
      }
      return data
    },
    changeActiveProvince(province) {
      const array = this.provinceActive
      if (array.includes(province)) {
        const index = array.indexOf(province)
        if (index > -1) {
          array.splice(index, 1)
        }
        this.provinceActive = []
      } else {
        array.push(province)
        this.provinceActive = [province]
      }
    },
    changeCity() {
      const listProvinces = []
      const listProvinceIndeterminate = []
      this.listProvinceDistricts.forEach(district => {
        district.provinces.forEach(province => {
          let check = true
          let isIndeterminate = false
          province.province_city.forEach(city => {
            if (!this.cityLocation.includes(city.id)) {
              check = false
            } else {
              isIndeterminate = true
            }
          })
          if (check) {
            listProvinces.push(province.id)
          } else if (isIndeterminate) {
            listProvinceIndeterminate.push(province.id)
          }
        })
      })
      this.workLocation = listProvinces
      this.listProvinceIndeterminate = listProvinceIndeterminate
    },
    changeProvinceModal() {
      const listDistricts = []
      const listDistrictIndeterminate = []
      let listData = this.condition.province_id
      if (this.occupationDialog) {
        listData = this.workLocation
      }
      this.listProvinceDistricts.forEach(district => {
        let check = true
        let isIndeterminate = false
        district.provinces.forEach(province => {
          if (!listData.includes(province.id)) {
            check = false
          } else {
            isIndeterminate = true
          }
        })
        if (check) {
          listDistricts.push(district.id)
        } else if (isIndeterminate) {
          listDistrictIndeterminate.push(district.id)
        }
      })
      this.districts = listDistricts
      this.listDistrictIndeterminate = listDistrictIndeterminate
    },
    showDetailDistrict(index) {
      if (this.showDistrictModal === index) {
        this.showDistrictModal = ''
      } else {
        this.showDistrictModal = index
      }
    }
  }
}
</script>
