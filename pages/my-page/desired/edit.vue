<template>
  <div class="cv-page">
    <TitlePageElement class="show-pc"></TitlePageElement>
    <BannerElement :banner="$t('page.web_cv')"></BannerElement>
    <div class="cv-content">
      <MenuLeftElement menu-active="desired-condition"></MenuLeftElement>
      <div class="right-content-element">
        <div class="edit-cv-element">
          <div class="edit-cv-title">{{ $t('desired_condition.edit') }}</div>
          <div class="edit-cv-content edit-form-content">
            <div class="card-text-title card-title-mobile"> {{ $t('desired_condition.edit') }}</div>
            <el-form
              ref="accountForm"
              :model="accountForm"
              :rules="accountRules"
              autocomplete="off"
              label-position="left"
            >
              <div class="edit-form-input">
                <BorderElement :middle="true"></BorderElement>
                <el-row class="d-flex form-label-input">
                  <el-col :md="6" :sm="10" :xs="12" class="col-label">
                    <div class="label"><span>{{ $t('desired_condition.location') }}</span></div>
                  </el-col>
                  <el-col :md="18" :sm="24">
                    <div class="content-input">
                      <el-row class="d-flex">
                        <el-col :md="20" :sm="24">
                          <el-form-item label="" prop="province_ids" :error="(error.key === 'province_ids') ? error.value : ''">
                            <el-select v-model="accountForm.province_ids" multiple :placeholder="$t('desired_condition.enter_location')">
                              <el-option
                                v-for="item in listProvince"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <BorderElement :middle="true"></BorderElement>
                <el-row class="d-flex form-label-input">
                  <el-col :md="6" :sm="10" :xs="12" class="col-label">
                    <div class="label"><span>{{ $t('desired_condition.type') }}</span></div>
                  </el-col>
                  <el-col :md="18" :sm="24">
                    <div class="content-input">
                      <el-row class="d-flex">
                        <el-col :md="20" :sm="24">
                          <el-form-item label="" prop="work_type_ids" :error="(error.key === 'work_type_ids') ? error.value : ''">
                            <el-select v-model="accountForm.work_type_ids" clearable multiple :placeholder="$t('desired_condition.enter_type')">
                              <el-option
                                v-for="item in ListWorkType"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <BorderElement :middle="true"></BorderElement>
                <el-row class="d-flex form-label-input">
                  <el-col :md="6" :sm="10" :xs="12" class="col-label">
                    <div class="label"><span>{{ $t('desired_condition.age') }}</span></div>
                  </el-col>
                  <el-col :md="9" :sm="24">
                    <div class="content-input">
                      <el-row class="d-flex">
                        <el-col :md="20" :sm="24">
                          <el-form-item label="" prop="age_id" :error="(error.key === 'age_id') ? error.value : ''">
                            <el-select v-model="accountForm.age_id" clearable :placeholder="$t('desired_condition.enter_age')">
                              <el-option
                                v-for="item in listAge"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <BorderElement :middle="true"></BorderElement>
                <el-row class="d-flex form-label-input">
                  <el-col :md="6" :sm="10" :xs="12" class="col-label">
                    <div class="label"><span>{{ $t('desired_condition.salary') }}</span></div>
                  </el-col>
                  <el-col :md="18" :sm="24">
                    <div class="content-input">
                      <el-row class="d-flex">
                        <el-col :md="7" :sm="24">
                          <el-form-item class="salary-select" label="" prop="salary_type_id" :error="(error.key === 'salary_type_id') ? error.value : ''">
                            <el-select v-model="accountForm.salary_type_id" clearable :placeholder="$t('desired_condition.enter_salary')">
                              <el-option
                                v-for="item in listSalary"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :md="5" :sm="15" :xs="15">
                          <el-form-item class="salary-start" label="" prop="salary_min" :error="(error.key === 'salary_min') ? error.value : ''">
                            <el-input
                              ref="salary_min"
                              v-model="accountForm.salary_min"
                              :placeholder="$t('desired_condition.enter_salary')"
                              name="salary_min"
                              type="text"
                              tabindex="2"
                              maxlength="8"
                              oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                              pattern="[0-9]*"
                              inputmode="numeric"
                            />
                          </el-form-item>
                        </el-col>
                        <span class="salary-range">~</span>
                        <el-col :md="5" :sm="15" :xs="15">
                          <el-form-item label="" prop="salary_max" :error="(error.key === 'salary_max') ? error.value : ''">
                            <el-input
                              ref="salary_max"
                              v-model="accountForm.salary_max"
                              :placeholder="$t('desired_condition.enter_salary')"
                              name="salary_max"
                              type="text"
                              tabindex="2"
                              maxlength="8"
                              oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                              pattern="[0-9]*"
                              inputmode="numeric"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <BorderElement :middle="true"></BorderElement>
                <el-row class="d-flex form-label-input">
                  <el-col :md="6" :sm="10" :xs="12" class="col-label">
                    <div class="label"><span>{{ $t('desired_condition.position') }}</span></div>
                  </el-col>
                  <el-col :md="18" :sm="24">
                    <div class="content-input">
                      <el-row class="d-flex">
                        <el-col :md="20" :sm="24">
                          <el-form-item label="" prop="job_type_ids" :error="(error.key === 'job_type_ids') ? error.value : ''">
                            <el-select v-model="accountForm.job_type_ids" clearable multiple :placeholder="$t('desired_condition.enter_position')">
                              <el-option
                                v-for="item in ListJobType"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <BorderElement :middle="true"></BorderElement>
                <el-row class="d-flex form-label-input">
                  <el-col :md="6" :sm="10" :xs="12" class="col-label">
                    <div class="label"><span>{{ $t('desired_condition.experience') }}</span></div>
                  </el-col>
                  <el-col :md="18" :sm="24">
                    <div class="content-input">
                      <el-row class="d-flex">
                        <el-col :md="20" :sm="24">
                          <el-form-item label="" prop="job_experience_ids" :error="(error.key === 'job_experience_ids') ? error.value : ''">
                            <el-select v-model="accountForm.job_experience_ids" clearable multiple :placeholder="$t('desired_condition.enter_experience')">
                              <el-option
                                v-for="item in listJobExperience"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <BorderElement :middle="true"></BorderElement>
                <el-row class="d-flex form-label-input">
                  <el-col :md="6" :sm="10" :xs="12" class="col-label">
                    <div class="label"><span>{{ $t('desired_condition.working_day') }}</span></div>
                  </el-col>
                  <el-col :md="18" :sm="24">
                    <div class="content-input">
                      <el-row class="">
                        <el-form-item label="" prop="working_days" :error="(error.key === 'working_days') ? error.value : ''">
                          <el-checkbox-group v-model="accountForm.working_days">
                            <div class="checkbox-days">
                              <div v-for="(feature, index) in listDays" :key="index" class="checkbox-item">
                                <el-checkbox :label="feature.id">{{ feature.name }}</el-checkbox>
                              </div>
                            </div>
                          </el-checkbox-group>
                        </el-form-item>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <BorderElement :middle="true"></BorderElement>
                <el-row class="d-flex form-label-input">
                  <el-col :md="6" :sm="10" class="col-label">
                    <div class="label"><span>{{ $t('desired_condition.working_day') }}</span></div>
                  </el-col>
                  <el-col :md="18" :sm="24">
                    <div class="content-input content-datetime-edu">
                      <el-row class="d-flex period-desired">
                        <el-col :md="12" :sm="24" class="start-time">
                          <el-form-item label="" prop="start_working_time" :error="(error.key === 'start_working_time') ? error.value : ''">
                            <el-row class="d-flex">
                              <span class="text-normal birthday">{{ $t('desired_condition.start_time') }}</span>
                              <el-col :sm="7" :xs="9" class="birth-year">
                                <el-select
                                  v-model="accountForm.working_hours.start_hours"
                                  clearable
                                  :placeholder="''"
                                  @focus="resetValidate('start_working_time')"
                                  @blur="validate('start_working_time')"
                                >
                                  <el-option
                                    v-for="item in linksHours"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </el-col>
                              <span class="text-normal birthday">:</span>
                              <el-col :sm="7" :xs="9" class="birth-month">
                                <el-select
                                  v-model="accountForm.working_hours.start_minutes"
                                  clearable
                                  :placeholder="''"
                                  @focus="resetValidate('start_working_time')"
                                  @blur="validate('start_working_time')"
                                >
                                  <el-option
                                    v-for="item in linksMinutes"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </el-col>
                            </el-row>
                          </el-form-item>
                        </el-col>
                        <el-col :md="12" :sm="24" class="birth-year">
                          <el-form-item label="" prop="end_working_time" :error="(error.key === 'end_working_time') ? error.value : ''">
                            <el-row class="d-flex">
                              <span class="text-normal birthday">{{ $t('desired_condition.end_time') }}</span>
                              <el-col  :sm="7" :xs="9" class="birth-year">
                                <el-select
                                  v-model="accountForm.working_hours.end_hours"
                                  clearable
                                  :placeholder="''"
                                  @focus="resetValidate('end_working_time')"
                                  @blur="validate('end_working_time')"
                                >
                                  <el-option
                                    v-for="item in linksHours"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </el-col>
                              <span class="text-normal birthday">:</span>
                              <el-col  :sm="7" :xs="9" class="birth-month">
                                <el-select
                                  v-model="accountForm.working_hours.end_minutes"
                                  clearable
                                  :placeholder="''"
                                  @focus="resetValidate('end_working_time')"
                                  @blur="validate('end_working_time')"
                                >
                                  <el-option
                                    v-for="item in linksMinutes"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </el-col>
                            </el-row>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <BorderElement :middle="true"></BorderElement>
                <el-row class="d-flex form-label-input">
                  <el-col :md="6" :sm="10" :xs="12" class="col-label">
                    <div class="label"><span>{{ $t('desired_condition.features') }}</span></div>
                  </el-col>
                  <el-col :md="18" :sm="24">
                    <div class="content-input">
                      <el-row class="">
                        <el-form-item label="" prop="job_features_ids" :error="(error.key === 'job_features_ids') ? error.value : ''">
                          <el-checkbox-group v-model="accountForm.job_feature_ids">
                            <div class="feature-group">
                              <div class="feature-title">※{{ $t('condition.recruitment_feature') }}</div>
                              <div class="checkbox-group">
                                <div v-for="(feature, index) in listRecruitmentFeatures" :key="index" class="checkbox-item">
                                  <el-checkbox :label="feature.id">{{ feature.name }}</el-checkbox>
                                </div>
                              </div>
                            </div>
                            <div class="feature-group">
                              <div class="feature-title">※{{ $t('condition.company_feature') }}</div>
                              <div class="checkbox-group">
                                <div v-for="(feature, index) in listCompanyFeatures" :key="index" class="checkbox-item">
                                  <el-checkbox :label="feature.id">{{ feature.name }}</el-checkbox>
                                </div>
                              </div>
                            </div>
                            <div class="feature-group">
                              <div class="feature-title">※{{ $t('condition.store_feature') }}</div>
                              <div class="checkbox-group">
                                <div v-for="(feature, index) in listStoreFeatures" :key="index" class="checkbox-item">
                                  <el-checkbox :label="feature.id">{{ feature.name }}</el-checkbox>
                                </div>
                              </div>
                            </div>
                          </el-checkbox-group>
                        </el-form-item>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <BorderElement :middle="true"></BorderElement>
              </div>
            </el-form>
          </div>
        </div>
        <div id="btn-center" class="text-center">
          <el-button class="card-button" @click="handleRouter('/my-page/desired-condition')">{{ $t('my_page.back') }}</el-button>
          <el-button class="card-button btn-right" type="danger" @click.native="handleUpdate" >{{ $t('my_page.edit') }}</el-button>
        </div>
        <ConfirmModal
          v-show="confirmModal"
          :text="$t('confirm_modal.back_confirm')"
          @close="closeConfirmModal"
          @handleRouter="handleRouter('/my-page/desired-condition')">
        </ConfirmModal>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import BannerElement from '~/components/layout/BannerElement'
import TitlePageElement from '~/components/layout/TitlePageElement'
import MenuLeftElement from '~/components/my-page/MenuLeftElement'
import {
  DESIRED_DETAIL,
  DESIRED_UPDATE, INDEX_SET_ERROR,
  INDEX_SET_LOADING, INDEX_SET_SUCCESS,
  INDEX_SET_TITLE_MENU,
  MASTER_GET_DATA
} from '~/store/store.const'
import BorderElement from '@/components/my-page/BorderElement'
import { LINKS_HOURS, LINKS_MINUTES } from '@/utils/handleDate'

export default {
  name: 'EditDesiredPage',
  components: { BorderElement, TitlePageElement, BannerElement, MenuLeftElement },
  beforeRouteLeave(to, from, next) {
    const dataClone = this.clonedAccountForm
    const data = _.cloneDeep(this.accountForm)
    dataClone.errors = {}
    data.errors = {}
    if (!_.isEqual(data, dataClone)) {
      this.$confirm(this.$t('content.CON_002'), {
        confirmButtonText: this.$t('confirm_modal.yes'),
        cancelButtonText: this.$t('confirm_modal.no'),
        type: 'warning'
      })
        .then(function() {
          next()
        })
        .catch(function() {
          next(false)
        })
    } else {
      next()
    }
  },
  middleware: 'auth',
  data() {
    return {
      listProvince: [],
      listWorkTypes: [],
      listJobTypes: [],
      listSalary: [],
      listJobExperience: [],
      listJobFeatures: [],
      listAge: [],
      listDays: [],
      desired: {},
      accountForm: {
        province_ids: [],
        work_type_ids: [],
        age_id: '',
        salary_type_id: '',
        job_type_ids: [],
        job_experience_ids: [],
        job_feature_ids: [],
        salary_min: '',
        salary_max: '',
        working_days: [],
        working_hours: {
          start_hours: '',
          start_minutes: '',
          end_hours: '',
          end_minutes: '',
          working_hours_format: ''
        },
        start_working_time: '',
        end_working_time: '',
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      accountRules: {
      },
      listRecruitmentFeatures: [],
      listCompanyFeatures: [],
      listStoreFeatures: [],
      confirmModal: false,
      ListWorkType: [],
      ListJobType: [],
      linksMinutes: [],
      linksHours: [],
      clonedAccountForm: {}
    }
  },
  computed: {
    start_working_time() {
      return this.accountForm.working_hours.start_hours && this.accountForm.working_hours.start_minutes
    },
    end_working_time() {
      return this.accountForm.working_hours.end_hours && this.accountForm.working_hours.end_minutes
    },
    working_day() {
      return this.accountForm.working_days
    }
  },
  watch: {
    listWorkTypes() {
      this.ListWorkType = this.listWorkTypes
    },
    listJobTypes() {
      this.ListJobType = this.listJobTypes
    },
    listJobFeatures() {
      this.listRecruitmentFeatures = this.listJobFeatures[0].feature
      this.listCompanyFeatures = this.listJobFeatures[1].feature
      this.listStoreFeatures = this.listJobFeatures[2].feature
    },
    async desired() {
      await this.getDesiredInfo()
      this.clonedAccountForm = _.cloneDeep(this.accountForm)
    },
    'accountForm.salary_min'() {
      if (!this.accountForm.min && !this.accountForm) {
        this.accountForm.salary_type_id = ''
      }
    },
    'accountForm.working_hours.start_hours'() {
      this.checkStartTime()
    },
    'accountForm.working_hours.start_minutes'() {
      this.checkStartTime()
    },
    'accountForm.working_hours.end_hours'() {
      this.checkEndTime()
    },
    'accountForm.working_hours.end_minutes'() {
      this.checkEndTime()
    }
  },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.my_page'), route: '/my-page/top-page' },
      { name: this.$t('page.web_cv'), route: '/my-page/web-cv' }
    ])
    this.getMasterData()
    this.getDesired()
    this.linksMinutes = LINKS_MINUTES
    this.linksHours = LINKS_HOURS
  },
  methods: {
    async getMasterData() {
      const dataResources = [
        'resources[m_job_types]={"model": "MJobType"}',
        'resources[m_provinces]={"model": "MProvince"}',
        'resources[m_work_types]={"model": "MWorkType"}',
        'resources[m_salary_types]={}',
        'resources[m_job_experiences]={"model": "MJobExperience"}',
        'resources[m_job_features]={}',
        'resources[age]={}',
        'resources[days_of_week]={}'
      ]
      const dataMasterData = await this.$store.dispatch(MASTER_GET_DATA, dataResources.join('&'))
      this.listJobTypes = dataMasterData.data.m_job_types
      this.listWorkTypes = dataMasterData.data.m_work_types
      this.listProvince = dataMasterData.data.m_provinces
      this.listSalary = dataMasterData.data.m_salary_types
      this.listJobExperience = dataMasterData.data.m_job_experiences
      this.listJobFeatures = dataMasterData.data.m_job_features
      this.listAge = dataMasterData.data.age
      this.listDays = dataMasterData.data.days_of_week
    },
    async getDesired() {
      this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const response = await this.$store.dispatch(DESIRED_DETAIL)
        const { data, status_code } = response
        if (status_code === 200) {
          this.desired = data
        }
      } catch (e) {
        this.$store.commit(INDEX_SET_LOADING, false)
      }
      this.$store.commit(INDEX_SET_LOADING, false)
    },
    validate(ref) {
      this.$refs.accountForm.validateField(ref)
    },
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.accountForm.fields.find((f) => f.prop === ref).clearValidate()
      this.accountForm.errors[ref] = ''
    },
    handleRouter(route) {
      this.$router.push(route)
    },
    showConfirmModal() {
      this.confirmModal = true
    },
    closeConfirmModal() {
      this.confirmModal = false
    },
    handleUpdate() {
      this.error = { key: null, value: '' }
      this.$refs.accountForm.validate(async valid => {
        if (valid) {
          try {
            await this.$store.commit(INDEX_SET_LOADING, true)
            const dto = this.accountForm
            if (!(this.accountForm.salary_min && this.accountForm.salary_max && this.accountForm.salary_type_id)) {
              dto.salary_max = ''
              dto.salary_min = ''
              dto.salary_type_id = ''
            }
            this.computedTime()
            const response = await this.$store.dispatch(DESIRED_UPDATE, dto)
            switch (response.status_code) {
              case 200:
                await this.$store.commit(INDEX_SET_SUCCESS, {
                  show: true,
                  text: response.messages
                })
                this.accountForm = this.clonedAccountForm
                this.$router.push('/my-page/desired-condition')
                break
              case 422:
                for (const [key] of Object.entries(response.data)) {
                  this.error = { key, value: response.data[key][0] }
                }
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
            }
            await this.$store.commit(INDEX_SET_LOADING, false)
          } catch (err) {
            await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
          }
          await this.$store.commit(INDEX_SET_LOADING, false)
        }
      })
    },
    computedTime() {
      if (this.accountForm.working_hours.end_hours && this.accountForm.working_hours.end_minutes) {
        this.accountForm.end_working_time = this.accountForm.working_hours.end_hours + '' + this.accountForm.working_hours.end_minutes
      } else if (this.accountForm.working_hours.end_hours && !this.accountForm.working_hours.end_minutes) {
        this.accountForm.end_working_time = this.accountForm.working_hours.end_hours + '00'
      } else {
        this.accountForm.end_working_time = ''
      }
      if (this.accountForm.working_hours.start_hours && this.accountForm.working_hours.start_minutes) {
        this.accountForm.start_working_time = this.accountForm.working_hours.start_hours + '' + this.accountForm.working_hours.start_minutes
      } else if (this.accountForm.working_hours.start_hours && !this.accountForm.working_hours.start_minutes) {
        this.accountForm.start_working_time = this.accountForm.working_hours.start_hours + '00'
      } else {
        this.accountForm.start_working_time = ''
      }
    },
    checkEndTime() {
      const data = this.checkTimeEnd()
      if (data) {
        this.accountRules.end_working_time = [{ required: true, message: data, trigger: 'blur' }]
        this.$refs.accountForm.validateField('end_working_time')
      } else {
        delete this.accountRules.end_working_time
        this.resetValidate('end_working_time')
      }
      this.resetValidateTime()
    },
    checkStartTime() {
      const data = this.checkTime()
      if (data) {
        this.accountRules.start_working_time = [{ required: true, message: data, trigger: 'blur' }]
        this.$refs.accountForm.validateField('start_working_time')
      } else {
        delete this.accountRules.start_working_time
        this.resetValidate('start_working_time')
      }
      this.resetValidateTime()
    },
    getDesiredInfo() {
      for (const item in this.desired) {
        this.accountForm[item] = this.desired[item]
      }
      if (!this.desired.age_id) {
        this.accountForm.age_id = 1
      }
      if (!this.desired.salary_type_id) {
        this.accountForm.salary_type_id = 3
      }
      if (!this.desired.salary_max) {
        this.accountForm.salary_max = 2000
      }
      if (!this.desired.salary_min) {
        this.accountForm.salary_min = 1000
      }
      if (!this.desired.working_hours.start_hours) {
        this.accountForm.working_hours.start_hours = '09'
      }
      if (!this.desired.working_hours.start_minutes) {
        this.accountForm.working_hours.start_minutes = '00'
      }
      if (!this.desired.working_hours.end_hours) {
        this.accountForm.working_hours.end_hours = '15'
      }
      if (!this.desired.working_hours.end_minutes) {
        this.accountForm.working_hours.end_minutes = '00'
      }
    },
    checkTime() {
      const end_hour = this.accountForm.working_hours.end_hours
      const end_min = this.accountForm.working_hours.end_minutes
      const start_hour = this.accountForm.working_hours.start_hours
      const start_min = this.accountForm.working_hours.start_minutes
      if (start_hour && start_min && !end_hour) {
        return this.$t('validation.com023')
      }
      if ((!start_hour && start_min) || (!end_hour && end_min)) {
        return this.$t('validation.com024')
      }
      if (!start_hour && end_hour && end_min) {
        return this.$t('validation.com022')
      }
      if (start_hour && end_hour && Number(start_hour) > Number(end_hour)) {
        return this.$t('validation.com021')
      } else if (start_hour && end_hour && Number(start_hour) === Number(end_hour) && Number(start_min) > Number(end_min)) {
        return this.$t('validation.com021')
      }
    },
    checkTimeEnd() {
      const end_hour = this.accountForm.working_hours.end_hours
      const end_min = this.accountForm.working_hours.end_minutes
      const start_hour = this.accountForm.working_hours.start_hours
      const start_min = this.accountForm.working_hours.start_minutes
      if (start_hour && start_min && !end_hour) {
        return this.$t('validation.com023')
      }
      if ((!start_hour && start_min) || (!end_hour && end_min)) {
        return this.$t('validation.com024')
      }
      if (!start_hour && end_hour && end_min) {
        return this.$t('validation.com022')
      }
      if (start_hour && end_hour && Number(start_hour) > Number(end_hour)) {
        return this.$t('validation.com021')
      } else if (start_hour && end_hour && Number(start_hour) === Number(end_hour) && Number(start_min) > Number(end_min)) {
        return this.$t('validation.com021')
      }
    },
    resetValidateTime() {
      const end_hour = this.accountForm.working_hours.end_hours
      const end_min = this.accountForm.working_hours.end_minutes
      const start_hour = this.accountForm.working_hours.start_hours
      const start_min = this.accountForm.working_hours.start_minutes
      if (!start_min && !start_hour && !end_hour && !end_min) {
        delete this.accountRules.end_working_time
        this.resetValidate('end_working_time')
        delete this.accountRules.start_working_time
        this.resetValidate('start_working_time')
      }
      if (start_hour && end_hour) {
        delete this.accountRules.end_working_time
        this.resetValidate('end_working_time')
        delete this.accountRules.start_working_time
        this.resetValidate('start_working_time')
      }
    }
  }
}
</script>
