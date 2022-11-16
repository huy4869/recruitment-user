<template>
  <div class="right-content-element">
    <div class="edit-cv-element">
      <div class="edit-cv-title">
        {{ $t('my_page.job_career') }} <div class="text-count-career"><span>{{ $route.params.id }}</span></div> {{ $t('my_page.create') }}
      </div>
      <div class="edit-cv-content edit-form-content">
        <div class="card-text-title card-title-mobile"> {{ $t('my_page.job_career') + $route.params.id + $t('my_page.create') }}</div>
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
              <el-col :md="6" :sm="12" class="col-label">
                <div class="label"><span>{{ $t('career.store_name') }}</span></div>
                <div class="required">{{ $t('form.required') }}</div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="store_name" :error="(error.key === 'store_name') ? error.value : ''">
                        <el-input
                          ref="store_name"
                          v-model="accountForm.store_name"
                          :placeholder="$t('career.store_name')"
                          name="store_name"
                          type="text"
                          tabindex="2"
                          show-word-limit
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
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="company_name" :error="(error.key === 'company_name') ? error.value : ''">
                        <el-input
                          ref="company_name"
                          v-model="accountForm.company_name"
                          :placeholder="$t('career.enter_company_name')"
                          name="company_name"
                          type="text"
                          tabindex="2"
                          show-word-limit
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
              <el-col class="pb-8" :md="18" :sm="24">
                <div class="content-input content-datetime">
                  <el-row class="enroll-checkbox">
                    <el-checkbox v-model="accountForm.period_check" class="time-checkbox">{{ $t('my_page.enroll') }}</el-checkbox>
                  </el-row>
                  <el-row class="d-flex period">
                    <el-col :md="9" :sm="24" class="first-name">
                      <el-form-item label="" prop="period_start" :error="(error.key === 'period_start') ? error.value : ''">
                        <el-row class="d-flex">
                          <el-col  :sm="12" :xs="12" class="birth-year">
                            <el-select
                              ref="period_start"
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
                              ref="period_start"
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
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </el-col>
                          <span class="text-normal birthday">{{ $t('form.month') }}</span>
                        </el-row>
                      </el-form-item>
                    </el-col>
                    <span v-show="accountForm.period_check" class="date-space">~</span>
                    <el-col v-show="accountForm.period_check" :md="9" :sm="24" class="birth-year">
                      <el-form-item label="" prop="period_end" :error="(error.key === 'period_end') ? error.value : ''">
                        <el-row class="d-flex">
                          <el-col  :sm="12" :xs="12" class="birth-year">
                            <el-select
                              ref="period_end"
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
                              ref="period_end"
                              v-model="accountForm.period_month_end"
                              name="period_end"
                              :placeholder="$t('MM')"
                              @focus="resetValidate('period_end')"
                              @blur="validate('period_end')"
                            >
                              <el-option
                                v-for="item in linksMonth"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value">
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
                <div class="content-input">
                  <el-row class="">
                    <el-col :md="10" :sm="24">
                      <el-form-item label="" prop="job_type_name" :error="(error.key === 'job_type_name') ? error.value : ''">
                        <el-select
                          v-model="accountForm.job_type_name"
                          :placeholder="$t('career.enter_occupation')"
                          @blur="validate('job_type_name')"
                          @focus="resetValidate('job_type_name')">
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
                      <div class="text-bold">{{ $t('career.other_occupation') }}</div>
                      <el-form-item label="" prop="other_occupation" :error="(error.key === 'other_occupation') ? error.value : ''">
                        <el-autocomplete
                          ref="other_occupation"
                          v-model="accountForm.other_occupation"
                          :placeholder="$t('career.enter_other_occupation')"
                          :fetch-suggestions="queryOccupation"
                          :maxlength="255"
                          name="other_occupation"
                          type="text"
                          tabindex="2"
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
                <div class="content-input">
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
                          @focus="resetValidate('position_offices')"
                        >
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
                <div class="content-input">
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
                      <div class="text-bold">{{ $t('career.other_emp_status') }}</div>
                      <el-form-item label="" prop="other_status" :error="(error.key === 'other_status') ? error.value : ''">
                        <el-autocomplete
                          ref="other_status"
                          v-model="accountForm.other_status"
                          :placeholder="$t('career.enter_other_emp_status')"
                          :fetch-suggestions="queryStatus"
                          :maxlength="255"
                          name="other_status"
                          type="text"
                          tabindex="2"
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
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="business_content" :error="(error.key === 'business_content') ? error.value : ''">
                        <el-input
                          ref="alias_name"
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
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="experience_accumulation" :error="(error.key === 'experience_accumulation') ? error.value : ''">
                        <el-input
                          ref="alias_name"
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
      <el-button class="card-button triple-btn" @click="showConfirmModal">{{ $t('my_page.back') }}</el-button>
      <el-button class="card-button triple-btn" type="danger" @click.native="update" >{{ $t('my_page.save') }}</el-button>
    </div>
    <ConfirmModal
      v-show="confirmModal"
      :text="$t('confirm_modal.back_confirm')"
      @close="closeConfirmModal"
      @handleRouter="handleRouter('/my-page/job-career')">
    </ConfirmModal>
  </div>
</template>

<script>
import _ from 'lodash'
import BorderElement from './BorderElement'
import {
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  WORK_HISTORY_DELETE,
  WORK_HISTORY_CREATE
} from '@/store/store.const'
import { getAllMonth } from '@/utils/handleDate'
export default {
  name: 'EditCvElement',
  components: { BorderElement },
  filters: {
    toFullWidth(value) {
      return value.toString().replace(/[A-Za-z0-9]/g, function(s) { return String.fromCharCode(s.charCodeAt(0) + 0xFEE0) })
    }
  },
  props: {
    m_job_types: {
      type: Array,
      default: () => []
    },
    m_position_offices: {
      type: Array,
      default: () => []
    },
    m_work_types: {
      type: Array,
      default: () => []
    }
  },
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
      } else {
        callback()
      }
    }
    return {
      accountForm: {
        business_content: '',
        experience_accumulation: '',
        period_check: false,
        store_name: '',
        company_name: '',
        period_start: '',
        period_end: '',
        job_type_name: '',
        job_types: {
          id: '',
          name: ''
        },
        work_types: {
          id: '',
          name: ''
        },
        position_offices: [],
        position_full_offices: [],
        work_type_name: '',
        other_status: '',
        other_occupation: '',
        period_year_end: '',
        period_month_end: '',
        period_year_start: '',
        period_month_start: '',
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
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('career.occupation') }), trigger: 'blur' }
        ],
        other_status: [
          { validator: validRequired, message: this.$t('validation.required', { _field_: this.$t('career.other_emp_status') }), trigger: 'blur' },
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('career.status') }), trigger: 'blur' }
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
          { required: true, message: this.$t('validation.required', { _field_: this.$t('career.position_offices') }), trigger: ['change', 'blur'] }
        ]
      },
      confirmModal: false,
      linksStatus: [],
      linksOccupation: [],
      linksYear: [],
      linksMonth: [],
      index: this.$route.params.id || '',
      clonedOccupation: [],
      deleteModal: false,
      clonedAccountForm: {}
    }
  },
  computed: {
    contentLength() {
      return this.accountForm.business_content.length
    },
    experienceLength() {
      return this.accountForm.experience_accumulation.length
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
      if (this.accountForm.period_check && (this.accountForm.period_year_end === '' || this.accountForm.period_month_end === '')) {
        return true
      }
      return this.accountForm.store_name === '' || this.accountForm.period_month_start === '' ||
        this.accountForm.period_year_start === '' || this.accountForm.job_type_name === '' ||
        this.accountForm.position_offices === '' || this.accountForm.work_type_name === ''
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
      if (this.accountForm.period_check) {
        this.accountForm.period_year_end = '2000'
        this.accountForm.period_month_end = '01'
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
    'accountForm.period_year_end'() {
      this.resetValidDate()
    },
    'accountForm.period_month_end'() {
      this.resetValidDate()
    },
    'accountForm.period_year_start'() {
      this.resetValidDate()
      if (this.accountForm.period_year_start === new Date().getFullYear().toString()) {
        this.linksMonth = this.linksMonth.splice(0, this.linksMonth.length - 1)
      } else {
        this.linksMonth = getAllMonth()
      }
    },
    'accountForm.period_month_start'() {
      this.resetValidDate()
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
    }
  },
  async mounted() {
    await this.loadAllYear()
    await this.loadAllMonth()
    await this.getCarrerInfo()
    this.clonedAccountForm = _.cloneDeep(this.accountForm)
  },
  methods: {
    validatePositionOffice(val) {
      if (!val) {
        this.validate('position_offices')
      }
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
    },
    update() {
      this.error = { key: null, value: '' }
      this.$refs.accountForm.validate(async valid => {
        if (valid) {
          try {
            await this.$store.commit(INDEX_SET_LOADING, true)
            const dto = this.accountForm
            dto.period_check = this.accountForm.period_check ? 0 : 1
            dto.period_end = dto.period_check === 0 ? dto.period_end : ''
            if (this.accountForm.other_occupation) {
              dto.job_types.id = 6
              dto.job_types.name = this.accountForm.other_occupation
            }
            if (this.accountForm.other_status) {
              dto.work_types.id = 5
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
            const response = await this.$store.dispatch(WORK_HISTORY_CREATE, dto)
            this.accountForm.period_check = dto.period_check === 0

            if (response.status_code === 200) {
              await this.$store.commit(INDEX_SET_SUCCESS, {
                show: true,
                text: response.messages
              })
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
    },
    getCarrerInfo() {
      this.accountForm.period_year_start = '2000'
      this.accountForm.period_month_start = '01'
    }
  }
}
</script>
