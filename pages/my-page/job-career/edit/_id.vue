<template>
  <div class="cv-page">
    <BannerElement :banner="$t('page.my_page')" title="my page" :subBanner="$t('content.web_cv')"></BannerElement>
    <TitlePageElement class="show-pc"></TitlePageElement>
    <div class="cv-content">
      <MenuLeftElement menu-active="web-cv"></MenuLeftElement>
      <div class="right-content-element">
        <div class="edit-cv-element">
          <div class="edit-cv-title">{{ $t('my_page.job_career') }}<div class="text-count-career"><span>{{ index | toFullWidth(index) }}</span></div>{{ $t('my_page.edit') }}</div>
          <div class="edit-cv-content edit-form-content">
            <div class="card-text-title card-title-mobile"> {{ $t('my_page.job_career') }}{{ index | toFullWidth(index) }}{{ $t('my_page.edit') }}</div>
            <el-form
              ref="accountForm"
              :model="accountForm"
              :rules="accountRules"
              autocomplete="off"
              label-position="left"
            >
              <div class="edit-form-input">
                <el-row class="d-flex form-label-input">
                  <el-col :md="6" :sm="12" class="col-label">
                    <div class="label"><span>{{ $t('career.store_name') }}</span></div>
                    <div class="required">{{ $t('form.required') }}</div>
                  </el-col>
                  <el-col :md="18" :sm="24">
                    <div ref="store_name" class="content-input">
                      <el-row class="d-flex">
                        <el-col :md="20" :sm="24">
                          <el-form-item label="" prop="store_name" :error="(error.key === 'store_name') ? error.value : ''">
                            <el-input
                              v-model="accountForm.store_name"
                              :placeholder="$t('career.store_name')"
                              name="store_name"
                              type="text"
                              tabindex="2"
                              maxlength="255"
                              @focus="resetValidate('store_name')"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <BorderElement :middle="true"></BorderElement>
                <el-row class="d-flex form-label-input">
                  <el-col :md="6" :sm="12" class="col-label">
                    <div class="label"><span>{{ $t('career.company_name') }}</span></div>
                  </el-col>
                  <el-col :md="18" :sm="24">
                    <div ref="company_name" class="content-input">
                      <el-row class="d-flex">
                        <el-col :md="20" :sm="24">
                          <el-form-item label="" prop="company_name" :error="(error.key === 'company_name') ? error.value : ''">
                            <el-input
                              v-model="accountForm.company_name"
                              :placeholder="$t('career.enter_company_name')"
                              name="company_name"
                              type="text"
                              tabindex="2"
                              maxlength="255"
                              @focus="resetValidate('company_name')"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <BorderElement :middle="true"></BorderElement>
                <el-row class="d-flex form-label-input">
                  <el-col :md="6" :sm="12" class="col-label">
                    <div class="label">
                      <span>{{ $t('career.period_start') }}</span>
                    </div>
                    <div class="required">{{ $t('form.required') }}</div>
                  </el-col>
                  <el-col :md="18" :sm="24">
                    <div ref="period_end"></div>
                    <div ref="period_start" class="content-input content-datetime">
                      <el-row class="enroll-checkbox">
                        <el-checkbox v-model="accountForm.period_check">{{ $t('my_page.enroll') }}</el-checkbox>
                      </el-row>
                      <el-row class="d-flex period items-center">
                        <el-col :md="9" :sm="24" class="first-name">
                          <el-form-item label="" prop="period_start" :error="(error.key === 'period_start') ? error.value : ''">
                            <el-row class="d-flex">
                              <el-col  :sm="12" :xs="12" class="birth-year">
                                <el-select
                                  v-model="accountForm.period_year_start"
                                  name="period_start"
                                  :placeholder="$t('YYYY')"
                                  @focus="resetValidate('period_start')"
                                  @blur="validate('period_start')"
                                >
                                  <el-option
                                    v-for="item in linksYear"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </el-col>
                              <span class="text-normal birthday">{{ $t('form.year') }}</span>
                              <el-col :sm="12" :xs="10" class="birth-month">
                                <el-select
                                  v-model="accountForm.period_month_start"
                                  name="period_start"
                                  :placeholder="$t('MM')"
                                  @focus="resetValidate('period_start')"
                                  @blur="validate('period_start')"
                                >
                                  <el-option
                                    v-for="item in linksMonth"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value"
                                    :disabled="item.disabled"
                                  >
                                  </el-option>
                                </el-select>
                              </el-col>
                              <span class="text-normal birthday">{{ $t('form.month') }}</span>
                            </el-row>
                          </el-form-item>
                        </el-col>
                        <span class="date-space"> ～ </span>
                        <span v-show="accountForm.period_check" class="text-normal">{{ $t('career.current') }}</span>
                        <el-col v-show="!accountForm.period_check" :md="9" :sm="24" class="birth-year">
                          <el-form-item label="" prop="period_end" :error="(error.key === 'period_end') ? error.value : ''">
                            <el-row class="d-flex">
                              <el-col  :sm="12" :xs="12" class="birth-year">
                                <el-select
                                  v-model="accountForm.period_year_end"
                                  name="period_end"
                                  :placeholder="$t('YYYY')"
                                  @focus="resetValidate('period_end')"
                                  @blur="validate('period_end')"
                                >
                                  <el-option
                                    v-for="item in linksYear"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </el-col>
                              <span class="text-normal birthday">{{ $t('form.year') }}</span>
                              <el-col  :sm="12" :xs="10" class="birth-month">
                                <el-select
                                  v-model="accountForm.period_month_end"
                                  name="period_end"
                                  :placeholder="$t('MM')"
                                  @focus="resetValidate('period_end')"
                                  @blur="validate('period_end')"
                                >
                                  <el-option
                                    v-for="item in linksMonthEnd"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value"
                                    :disabled="item.disabled"
                                  >
                                  </el-option>
                                </el-select>
                              </el-col>
                              <span class="text-normal birthday">{{ $t('form.month') }}</span>
                            </el-row>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <BorderElement :middle="true"></BorderElement>
                <el-row class="d-flex form-label-input">
                  <el-col :md="6" :sm="12" class="col-label">
                    <div class="label"><span>{{ $t('career.occupation') }}</span></div>
                    <div class="required">{{ $t('form.required') }}</div>
                  </el-col>
                  <el-col :md="18" :sm="24">
                    <div ref="job_type_name" class="content-input">
                      <el-row class="">
                        <el-col :md="10" :sm="24">
                          <el-form-item label="" prop="job_type_name" :error="(error.key === 'job_type_name') ? error.value : ''">
                            <el-select
                              v-model="accountForm.job_type_name"
                              :placeholder="$t('career.enter_occupation')"
                              @blur="validate('job_type_name')"
                              @focus="resetValidate('job_type_name')"
                            >
                              <el-option
                                v-for="item in m_job_types"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col v-if="accountForm.job_type_name === 6" :md="20" :sm="24">
                          <div ref="other_occupation" class="text-bold">{{ $t('career.other_occupation') }}</div>
                          <el-form-item label="" prop="other_occupation" :error="(error.key === 'other_occupation') ? error.value : ''">
                            <el-autocomplete
                              v-model="accountForm.other_occupation"
                              :placeholder="$t('career.enter_other_occupation')"
                              :fetch-suggestions="queryOccupation"
                              name="other_occupation"
                              type="text"
                              tabindex="2"
                              :maxlength="255"
                              @focus="resetValidate('other_occupation')"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <BorderElement :middle="true"></BorderElement>
                <el-row class="d-flex form-label-input">
                  <el-col :md="6" :sm="12" class="col-label">
                    <div class="label"><span>{{ $t('career.position_offices') }}</span></div>
                    <div class="required">{{ $t('form.required') }}</div>
                  </el-col>
                  <el-col :md="18" :sm="24">
                    <div ref="position_offices" class="content-input">
                      <el-row class="d-flex">
                        <el-col :md="20" :sm="24">
                          <el-form-item label="" prop="position_offices" :error="(error.key === 'position_offices') ? error.value : ''">
                            <el-select
                              v-model="accountForm.position_offices"
                              :placeholder="$t('career.position_offices')"
                              size="large"
                              multiple
                              filterable
                              allow-create
                              default-first-option
                              @visible-change="validatePositionOffice"
                              @focus="resetValidate('position_offices')">
                              <el-option
                                v-for="item in m_position_offices"
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
                  <el-col :md="6" :sm="12" class="col-label">
                    <div class="label"><span>{{ $t('career.status') }}</span></div>
                    <div class="required">{{ $t('form.required') }}</div>
                  </el-col>
                  <el-col :md="18" :sm="24">
                    <div ref="work_type_name" class="content-input">
                      <el-row class="">
                        <el-col :md="10" :sm="24">
                          <el-form-item label="" prop="work_type_name" :error="(error.key === 'work_type_name') ? error.value : ''">
                            <el-select
                              v-model="accountForm.work_type_name"
                              :placeholder="$t('career.enter_emp_status')"
                              @blur="validate('work_type_name')"
                              @focus="resetValidate('work_type_name')"
                            >
                              <el-option
                                v-for="item in m_work_types"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col v-if="accountForm.work_type_name === 5" :md="20" :sm="24">
                          <div ref="other_status" class="text-bold">{{ $t('career.other_emp_status') }}</div>
                          <el-form-item label="" prop="other_status" :error="(error.key === 'other_status') ? error.value : ''">
                            <el-autocomplete
                              v-model="accountForm.other_status"
                              :placeholder="$t('career.enter_other_emp_status')"
                              :fetch-suggestions="queryStatus"
                              name="other_status"
                              type="text"
                              tabindex="2"
                              :maxlength="255"
                              @focus="resetValidate('other_status')"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <BorderElement :middle="true"></BorderElement>
                <el-row class="d-flex form-label-input">
                  <el-col :md="6" :sm="12" class="col-label">
                    <div class="label"><span>{{ $t('career.business_content') }}</span></div>
                  </el-col>
                  <el-col :md="18" :sm="24">
                    <div ref="business_content" class="content-input">
                      <el-row class="d-flex">
                        <el-col :md="20" :sm="24">
                          <el-form-item label="" prop="business_content" :error="(error.key === 'business_content') ? error.value : ''">
                            <el-input
                              v-model="accountForm.business_content"
                              :placeholder="$t('career.business_content')"
                              :autosize="{ minRows: 5, maxRows: 10}"
                              name="business_content"
                              type="textarea"
                              maxlength="2000"
                              tabindex="2"
                              @focus="resetValidate('business_content')"
                            />
                          </el-form-item>
                          <div class="sm-text">{{ $t('my_page.currently') }}{{ contentLength }}{{ $t('my_page.characters') }}</div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <BorderElement :middle="true"></BorderElement>
                <el-row class="d-flex form-label-input">
                  <el-col :md="6" :sm="12" class="col-label">
                    <div class="label show-pc">
                   <span>
                     {{ $t('career.experience_accumulation1') }}<br>
                     {{ $t('career.experience_accumulation2') }}<br>
                     {{ $t('career.experience_accumulation3') }}
                   </span>
                      <div class="show-sp">
                        {{ $t('career.experience') }}
                      </div>
                    </div>
                  </el-col>
                  <el-col :md="18" :sm="24">
                    <div ref="experience_accumulation" class="content-input">
                      <el-row class="d-flex">
                        <el-col :md="20" :sm="24">
                          <el-form-item label="" prop="experience_accumulation" :error="(error.key === 'experience_accumulation') ? error.value : ''">
                            <el-input
                              v-model="accountForm.experience_accumulation"
                              :placeholder="$t('career.experience')"
                              :autosize="{ minRows: 5, maxRows: 10}"
                              name="experience"
                              type="textarea"
                              maxlength="2000"
                              tabindex="2"
                              @focus="resetValidate('experience_accumulation')"
                            />
                          </el-form-item>
                          <div class="sm-text">{{ $t('my_page.currently') }}{{ experienceLength }}{{ $t('my_page.characters') }}</div>
                        </el-col>
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
          <el-button class="card-button triple-btn" @click="handleRouter('/my-page/job-career')">{{ $t('my_page.back') }}</el-button>
          <el-button class="card-button triple-btn" @click="showDeleteModal">{{ $t('my_page.remove') }}</el-button>
          <el-button class="card-button triple-btn" type="danger" @click.native="update" >{{ $t('my_page.save') }}</el-button>
        </div>
        <ConfirmModal
          v-show="confirmModal"
          :text="$t('confirm_modal.back_confirm')"
          @close="closeConfirmModal"
          @handleRouter="handleRouter('/my-page/job-career')">
        </ConfirmModal>
        <ConfirmModal
          v-show="deleteModal"
          :text="$t('confirm_modal.delete_confirm')"
          @close="closeDeleteModal"
          @handleRouter="handleDelete(job.id)"
        >
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
  INDEX_SET_ERROR,
  INDEX_SET_LOADING, INDEX_SET_SUCCESS,
  INDEX_SET_TITLE_MENU,
  MASTER_GET_DATA, MY_PAGE_SET_STATE_PAGE, WORK_HISTORY_DELETE,
  WORK_HISTORY_DETAIL,
  WORK_HISTORY_UPDATE
} from '~/store/store.const'
import BorderElement from '@/components/my-page/BorderElement'
import { getAllMonth } from '@/utils/handleDate'
export default {
  name: 'JobCareerPage',
  components: { BorderElement, TitlePageElement, BannerElement, MenuLeftElement },
  filters: {
    toFullWidth(value) {
      return value.toString().replace(/[A-Za-z0-9]/g, function(s) { return String.fromCharCode(s.charCodeAt(0) + 0xFEE0) })
    }
  },
  async beforeRouteLeave(to, from, next) {
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
      await this.$store.commit(MY_PAGE_SET_STATE_PAGE, 'web-cv')
    } else {
      next()
    }
  },
  middleware: 'auth',
  data() {
    const validFormLength = (rule, value, callback, message) => {
      if (value && value.length > 255) {
        callback(new Error(this.$t('validation.max_length', { _field_: message })))
      } else {
        callback()
      }
    }
    const validAreaLength = (rule, value, callback, message) => {
      if (value && value.length > 2000) {
        callback(new Error(this.$t('validation.area_length', { _field_: message })))
      } else {
        callback()
      }
    }
    const validRequired = (rule, value, callback, message) => {
      if (!value || value.trim() === '') {
        callback(new Error(message))
      } else {
        callback()
      }
    }
    const validDate = (rule, value, callback, message) => {
      const date = this.checkStartYear()
      if (date.start.length === 7 && date.end.length === 7 && date.start > date.end) {
        callback(new Error(this.$t('validation.err004')))
      } else if (date.start > date.current) {
        callback(new Error(this.$t('validation.err043')))
      } else if (date.end > date.current) {
        callback(new Error(this.$t('validation.err043')))
      } else {
        callback()
      }
    }
    return {
      job: {},
      m_job_types: [],
      m_position_offices: [],
      m_work_types: [],
      accountForm: {
        business_content: '',
        experience_accumulation: '',
        period_check: true,
        store_name: '',
        company_name: '',
        period_start: '',
        period_end: '',
        job_type_name: '',
        position_offices: [],
        position_full_offices: [],
        work_type_name: '',
        other_status: '',
        other_occupation: '',
        period_year_end: '',
        period_month_end: '',
        period_year_start: '',
        period_month_start: '',
        cloned: '',
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      accountRules: {
        store_name: [
          { validator: validRequired, message: this.$t('validation.required', { _field_: this.$t('career.store_name') }), trigger: 'blur' },
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('career.store_name') }), trigger: 'blur' }
        ],
        company_name: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('career.company_name') }), trigger: 'blur' }
        ],
        business_content: [
          { validator: validAreaLength, message: this.$t('validation.area_length', { _field_: this.$t('career.business_content') }), trigger: 'blur' }
        ],
        experience_accumulation: [
          { validator: validAreaLength, message: this.$t('validation.area_length', { _field_: this.$t('career.experience') }), trigger: 'blur' }
        ],
        other_occupation: [
          { validator: validRequired, message: this.$t('validation.required', { _field_: this.$t('career.other_occupation') }), trigger: 'blur' },
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('career.other_occupation') }), trigger: 'blur' }
        ],
        other_status: [
          { validator: validRequired, message: this.$t('validation.required', { _field_: this.$t('career.other_emp_status') }), trigger: 'blur' },
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('career.other_emp_status') }), trigger: 'blur' }
        ],
        period_start: [
          { required: true, message: this.$t('validation.required_select', { _field_: this.$t('career.period_start') }), trigger: 'change' },
          { validator: validDate, trigger: 'change' }
        ],
        period_end: [
          { validator: validDate, trigger: 'change' }
        ],
        work_type_name: [
          { required: true, message: this.$t('validation.required_select', { _field_: this.$t('career.status') }), trigger: 'change' }
        ],
        job_type_name: [
          { required: true, message: this.$t('validation.required_select', { _field_: this.$t('career.occupation') }), trigger: 'change' }
        ],
        position_offices: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('career.position_offices') }), trigger: 'change' }
        ]
      },
      confirmModal: false,
      linksStatus: [],
      linksOccupation: [],
      linksYear: [],
      linksMonth: [],
      linksMonthEnd: [],
      index: this.$route.params.id || '',
      clonedOccupation: [],
      deleteModal: false,
      clonedAccountForm: {}
    }
  },
  computed: {
    contentLength() {
      return this.accountForm.business_content ? this.accountForm.business_content.length : ''
    },
    experienceLength() {
      return this.accountForm.experience_accumulation ? this.accountForm.experience_accumulation.length : ''
    },
    period_start() {
      return this.accountForm.period_year_start && this.accountForm.period_month_start
    },
    period_end() {
      return this.accountForm.period_year_end && this.accountForm.period_month_end
    },
    disabledButton() {
      if (this.accountForm.job_type_name === 6 && this.accountForm.other_occupation === '') {
        return true
      }
      if (this.accountForm.work_type_name === 5 && this.accountForm.other_status === '') {
        return true
      }
      if (!this.accountForm.period_check && (this.accountForm.period_year_end === '' || this.accountForm.period_month_end === '')) {
        return true
      }
      return this.accountForm.store_name === '' || this.accountForm.period_month_start === '' ||
        this.accountForm.period_year_start === '' || this.accountForm.job_type_name === '' ||
        this.accountForm.position_offices.length === 0 || this.accountForm.work_type_name === ''
    }
  },
  watch: {
    period_start() {
      if (this.accountForm.period_year_start && this.accountForm.period_month_start) {
        this.accountForm.period_start = this.accountForm.period_year_start + '/' + this.accountForm.period_month_start
      }
    },
    period_end() {
      if (this.accountForm.period_year_end && this.accountForm.period_month_end) {
        this.accountForm.period_end = this.accountForm.period_year_end + '/' + this.accountForm.period_month_end
      }
    },
    'accountForm.period_check'() {
      if (!this.accountForm.period_check) {
        if (!this.accountForm.period_year_end) {
          this.accountForm.period_year_end = this.accountForm.period_year_start
        }
        if (!this.accountForm.period_month_end) {
          this.accountForm.period_month_end = this.accountForm.period_month_start
        }
        if (this.accountForm.period_year_end && this.accountForm.period_month_end) {
          this.resetValidate('period_end')
        }
        this.accountRules.period_end.push({
          required: true, message: this.$t('validation.required_select', { _field_: this.$t('career.period_start') }), trigger: 'change'
        })
      } else {
        delete this.accountRules.period_end[this.accountRules.period_end.length - 1]
        this.accountForm.period_year_end = ''
        this.accountForm.period_month_end = ''
      }
    },
    async job() {
      await this.getInfoJob()
      this.clonedAccountForm = _.cloneDeep(this.accountForm)
    },
    'accountForm.job_type_name'() {
      if (this.accountForm.job_type_name !== 6) {
        this.accountForm.other_occupation = ''
      }
    },
    'accountForm.work_type_name'() {
      if (this.accountForm.work_type_name !== 5) {
        this.accountForm.other_status = ''
      }
    },
    'accountForm.position_offices': {
      handler() {
        let check = false
        const data = []
        const dataTrim = []
        this.m_position_offices.forEach(office => {
          dataTrim.push(String(office.name).trim())
        })
        this.accountForm.position_offices.forEach(office => {
          if ((String(office).trim() === '') || dataTrim.includes(String(office).trim())) {
            check = true
          } else {
            data.push(office)
            dataTrim.push(String(office).trim())
          }
        })
        if (check) {
          this.accountForm.position_offices = data
        }
      },
      deep: true
    },
    m_job_types() {
      this.m_job_types.forEach(element => {
        if (!element.is_other) {
          this.linksOccupation.push({
            value: element.name
          })
        }
      })
    },
    m_work_types() {
      this.m_work_types.forEach(element => {
        if (!element.is_other) {
          this.linksStatus.push({
            value: element.name
          })
        }
      })
    },
    'accountForm.other_status'() {
      if (this.accountForm.other_status) {
        this.resetValidate('other_status')
      }
    },
    'accountForm.other_occupation'() {
      if (this.accountForm.other_occupation) {
        this.resetValidate('other_occupation')
      }
    },
    'accountForm.period_year_end'() {
      this.resetValidDate()
      const current_year = new Date().getFullYear().toString()
      let current_month = new Date().getMonth() + 1
      if (current_month < 10) {
        current_month = '0' + current_month
      }
      if (this.accountForm.period_year_end === current_year) {
        const index = this.linksMonthEnd.findIndex(element => element.value === current_month.toString())
        for (let i = index + 1; i < this.linksMonthEnd.length; i++) {
          this.linksMonthEnd[i].disabled = true
        }
      } else {
        this.linksMonthEnd = getAllMonth()
      }
    },
    'accountForm.period_month_end'() {
      this.resetValidDate()
    },
    'accountForm.period_year_start'() {
      this.resetValidDate()
      const current_year = new Date().getFullYear().toString()
      let current_month = new Date().getMonth() + 1
      if (current_month < 10) {
        current_month = '0' + current_month
      }
      if (this.accountForm.period_year_start === current_year) {
        const index = this.linksMonth.findIndex(element => element.value === current_month.toString())
        for (let i = index + 1; i < this.linksMonth.length; i++) {
          this.linksMonth[i].disabled = true
        }
      } else {
        this.linksMonth = getAllMonth()
      }
    },
    'accountForm.period_month_start'() {
      this.resetValidDate()
    }
  },
  mounted() {
    this.loadAllYear()
    this.loadAllMonth()
  },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.my_page'), route: '/my-page/top-page' },
      { name: this.$t('page.web_cv'), route: '/my-page/web-cv' },
      { name: this.$t('my_page.job_career'), route: '/my-page/job-career' },
      { name: (this.$t('my_page.job_career') + '<span class="text-count">' + this.$route.params.id + '</span>' + this.$t('my_page.edit')) }
    ])
    this.getDataJob()
    this.getMasterData()
    this.clonedAccountForm = _.cloneDeep(this.accountForm)
  },
  methods: {
    async getDataJob() {
      this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const response = await this.$store.dispatch(WORK_HISTORY_DETAIL, this.$route.query.id)
        const { data, status_code } = response
        if (status_code === 200) {
          this.job = data
        }
      } catch (e) {
        this.$store.commit(INDEX_SET_LOADING, false)
      }
      this.$store.commit(INDEX_SET_LOADING, false)
    },
    async getMasterData() {
      const dataResources = [
        'resources[m_job_types]={}',
        'resources[m_work_types]={}',
        'resources[m_position_offices]={"model": "MPositionOffice"}'
      ]
      await this.$store.dispatch(MASTER_GET_DATA, dataResources.join('&')).then(res => {
        this.m_job_types = res.data.m_job_types
        this.m_position_offices = res.data.m_position_offices
        this.m_work_types = res.data.m_work_types
      })
    },
    scrollToElement(key) {
      const el = this.$refs[key]
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    validatePositionOffice(val) {
      if (!val) {
        this.validate('position_offices')
      }
    },
    getInfoJob() {
      this.accountForm.job_type_name = this.job.job_types.id
      this.accountForm.work_type_name = this.job.work_types.id
      this.accountForm.other_occupation = this.job.job_types.name
      this.accountForm.other_status = this.job.work_types.name
      this.accountForm.period_check = !this.job.period_end
      for (const item in this.job) {
        this.accountForm[item] = this.job[item]
      }
      this.accountForm.position_offices = []
      this.job.position_offices.forEach((element) => {
        this.accountForm.position_offices.push(element.id)
      })
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
      if (_.isEqual(this.accountForm, this.clonedAccountForm)) {
        this.handleRouter('/my-page/job-career')
      } else {
        this.confirmModal = true
      }
    },
    closeConfirmModal() {
      this.confirmModal = false
    },
    showDeleteModal() {
      this.deleteModal = true
    },
    closeDeleteModal() {
      this.deleteModal = false
    },
    queryOccupation(queryString, cb) {
      const links = this.linksOccupation
      const results = queryString ? links.filter(this.createFilter(queryString)) : links
      // call callback function to return suggestions
      cb(results)
    },
    queryStatus(queryString, cb) {
      const links = this.linksStatus
      const results = queryString ? links.filter(this.createFilter(queryString)) : links
      // call callback function to return suggestions
      cb(results)
    },
    queryYear(queryString, cb) {
      const links = this.linksYear
      const results = queryString ? links.filter(this.createFilter(queryString)) : links
      // call callback function to return suggestions
      cb(results)
    },
    queryMonth(queryString, cb) {
      const links = this.linksMonth
      const results = queryString ? links.filter(this.createFilter(queryString)) : links
      // call callback function to return suggestions
      cb(results)
    },
    createFilter(queryString) {
      return (link) => {
        return (link.value.toString().indexOf(queryString.toString()) === 0)
      }
    },
    loadAllOccupation() {
      // const clonedOccupation = JSON.parse(JSON.stringify(this.m_job_types))
      return this.clonedOccupation.splice(0, (this.clonedOccupation.length - 1))
    },
    loadAllStatus() {
      const clonedStatus = JSON.parse(JSON.stringify(this.m_work_types))
      return clonedStatus.splice(0, (clonedStatus.length - 1))
    },
    loadAllYear() {
      for (let i = new Date().getFullYear(); i >= 1900; i--) {
        this.linksYear.push({ value: i.toString() })
      }
    },
    loadAllMonth() {
      this.linksMonth = getAllMonth()
      this.linksMonthEnd = getAllMonth()
    },
    update() {
      this.error = { key: null, value: '' }
      this.$refs.accountForm.validate(async(valid, key) => {
        if (valid) {
          try {
            await this.$store.commit(INDEX_SET_LOADING, true)
            const dto = this.accountForm
            dto.period_check = !this.accountForm.period_check ? 0 : 1
            dto.period_end = dto.period_check === 0 ? dto.period_end : ''
            if (this.accountForm.other_occupation) {
              dto.job_types.name = this.accountForm.other_occupation
            }
            if (this.accountForm.other_status) {
              dto.work_types.name = this.accountForm.other_status
            }
            if (this.accountForm.job_type_name !== 6) {
              this.accountForm.other_occupation = ''
              this.accountForm.job_types = {
                id: this.accountForm.job_type_name,
                name: this.m_job_types[this.accountForm.job_type_name - 1].name
              }
            }
            if (this.accountForm.work_type_name !== 5) {
              this.accountForm.other_status = ''
              this.accountForm.work_types = {
                id: this.accountForm.work_type_name,
                name: this.m_work_types[this.accountForm.work_type_name - 1].name
              }
            }
            this.accountForm.position_full_offices = []
            this.m_position_offices.forEach((element) => {
              if (this.accountForm.position_offices.includes(element.id)) {
                this.accountForm.position_full_offices.push({
                  id: element.id,
                  name: element.name
                })
              }
            })
            this.accountForm.position_offices.forEach((element) => {
              if (typeof element !== 'number') {
                this.accountForm.position_full_offices.push({
                  name: element
                })
              }
            })
            dto.position_offices = this.accountForm.position_full_offices
            const response = await this.$store.dispatch(WORK_HISTORY_UPDATE, {
              id: this.$route.query.id,
              data: dto
            })
            this.accountForm.period_check = dto.period_check === 1
            if (response.status_code === 200) {
              await this.$store.commit(INDEX_SET_SUCCESS, {
                show: true,
                text: response.messages
              })
              this.accountForm = this.clonedAccountForm
              this.$router.push('/my-page/job-career')
            } else if (response.status_code === 422) {
              for (const [key] of Object.entries(response.data)) {
                this.error = { key, value: response.data[key][0] }
              }
            } else if (response.status_code === 500) {
              await this.$store.commit(INDEX_SET_ERROR, {
                show: true,
                text: this.$t('content.EXC_001')
              })
            } else {
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
        } else {
          this.scrollToElement(Object.keys(key)[0])
        }
      })
    },
    async handleDelete(id) {
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const response = await this.$store.dispatch(WORK_HISTORY_DELETE, id)
        switch (response.status_code) {
          case 200:
            await this.$store.commit(INDEX_SET_SUCCESS, {
              show: true,
              text: response.messages
            })
            this.accountForm = this.clonedAccountForm
            this.$router.push('/my-page/job-career')
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
    checkStartYear() {
      const current = new Date().toISOString().slice(0, 7)
      const start = this.accountForm.period_year_start + '-' + this.accountForm.period_month_start
      const end = this.accountForm.period_year_end + '-' + this.accountForm.period_month_end
      return { current, start, end }
    },
    resetValidDate() {
      const date = this.checkStartYear()
      if (this.accountForm.period_month_start && this.accountForm.period_year_start) {
        if (date.start < date.end) {
          this.resetValidate('period_start')
          this.resetValidate('period_end')
        }
        this.accountForm.period_start = this.accountForm.period_year_start + '/' + this.accountForm.period_month_start
      } else {
        this.accountForm.period_start = ''
      }
      if (this.accountForm.period_year_end && this.accountForm.period_month_end) {
        this.accountForm.period_end = this.accountForm.period_year_end + '/' + this.accountForm.period_month_end
      }
    }
  }
}
</script>
