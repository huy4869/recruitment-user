<template>
  <div class="right-content-element">
    <div class="edit-cv-element">
      <div class="edit-cv-title">{{ $t('my_page.edit_basic_information') }}</div>
      <div class="edit-cv-content edit-form-content">
        <div class="card-text-title card-title-mobile"> {{ $t('my_page.edit_basic_information') }}</div>
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
              <el-col :md="6" :sm="24" class="col-label">
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
              <el-col :md="6" :sm="24" class="col-label">
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
              <el-col :md="6" :sm="24" class="col-label">
                <div class="label">
                  <span>{{ $t('career.period_start') }}</span>
                </div>
                <div class="required">{{ $t('form.required') }}</div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="enroll-checkbox">
                    <el-checkbox v-model="accountForm.enroll">{{ $t('my_page.enroll') }}</el-checkbox>
                  </el-row>
                  <el-row class="d-flex period">
                    <el-col :md="9" :sm="24" class="first-name">
                      <el-form-item label="" prop="period_start" :error="(error.key === 'period_start') ? error.value : ''">
                        <el-row class="d-flex">
                          <el-col  :sm="12" :xs="12" class="birth-year">
                            <el-autocomplete
                              ref="period_start"
                              v-model.trim="accountForm.period_start_year"
                              :placeholder="$t('YYYY')"
                              :fetch-suggestions="queryYear"
                              name="year"
                              type="text"
                              tabindex="2"
                              :maxlength="4"
                              oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                              pattern="[0-9]*"
                              inputmode="numeric"
                              @focus="resetValidate('period_start')"
                            />
                          </el-col>
                          <span class="text-normal birthday">{{ $t('form.year') }}</span>
                          <el-col :sm="12" :xs="10" class="birth-month">
                            <el-autocomplete
                              ref="period_startx"
                              v-model.trim="accountForm.period_start_month"
                              :placeholder="$t('MM')"
                              :fetch-suggestions="queryMonth"
                              name="period_start"
                              type="text"
                              :maxlength="2"
                              tabindex="2"
                              oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                              pattern="[0-9]*"
                              inputmode="numeric"
                              @focus="resetValidate('period_start')"
                            />
                          </el-col>
                          <span class="text-normal birthday">{{ $t('form.month') }}</span>
                        </el-row>
                      </el-form-item>
                    </el-col>
                    <span v-show="accountForm.enroll" class="date-space">~</span>
                    <el-col v-show="accountForm.enroll" :md="9" :sm="24" class="birth-year">
                      <el-form-item label="" prop="period_end" :error="(error.key === 'period_end') ? error.value : ''">
                        <el-row class="d-flex">
                          <el-col  :sm="12" :xs="12" class="birth-year">
                            <el-autocomplete
                              ref="period_end"
                              v-model.trim="accountForm.period_end_year"
                              :placeholder="$t('YYYY')"
                              :fetch-suggestions="queryYear"
                              name="birthday"
                              type="text"
                              tabindex="2"
                              :maxlength="4"
                              oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                              pattern="[0-9]*"
                              inputmode="numeric"
                              @focus="resetValidate('period_end')"
                            />
                          </el-col>
                          <span class="text-normal birthday">{{ $t('form.year') }}</span>
                          <el-col  :sm="12" :xs="10" class="birth-month">
                            <el-autocomplete
                              ref="period_end"
                              v-model.trim="accountForm.period_end_month"
                              :placeholder="$t('MM')"
                              :fetch-suggestions="queryMonth"
                              name="birthday"
                              type="text"
                              :maxlength="2"
                              tabindex="2"
                              oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                              pattern="[0-9]*"
                              inputmode="numeric"
                              @focus="resetValidate('period_end')"
                            />
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
              <el-col :md="6" :sm="24" class="col-label">
                <div class="label"><span>{{ $t('career.occupation') }}</span></div>
                <div class="required">{{ $t('form.required') }}</div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="">
                    <el-col :md="10" :sm="24">
                      <el-form-item label="" prop="occupationSelect" :error="(error.key === 'occupation') ? error.value : ''">
                        <el-select v-model="accountForm.occupationSelect" :placeholder="$t('career.enter_occupation')">
                          <el-option
                            v-for="item in occupation"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col v-if="accountForm.occupationSelect === -1" :md="20" :sm="24">
                      <div class="text-bold">{{ $t('career.other_occupation') }}</div>
                      <el-form-item label="" prop="other_occupation" :error="(error.key === 'other_occupation') ? error.value : ''">
                        <el-autocomplete
                          ref="other_occupation"
                          v-model="accountForm.other_occupation"
                          :placeholder="$t('career.enter_other_occupation')"
                          :fetch-suggestions="queryOccupation"
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
              <el-col :md="6" :sm="24" class="col-label">
                <div class="label"><span>{{ $t('career.position_offices') }}</span></div>
                <div class="required">{{ $t('form.required') }}</div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="position_offices" :error="(error.key === 'position_offices') ? error.value : ''">
                        <el-select v-model="accountForm.position_offices" :placeholder="$t('career.position_offices')" size="large" multiple>
                          <el-option
                            v-for="item in positions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
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
              <el-col :md="6" :sm="24" class="col-label">
                <div class="label"><span>{{ $t('career.status') }}</span></div>
                <div class="required">{{ $t('form.required') }}</div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="">
                    <el-col :md="10" :sm="24">
                      <el-form-item label="" prop="status" :error="(error.key === 'status') ? error.value : ''">
                        <el-select v-model="accountForm.status" :placeholder="$t('career.enter_emp_status')">
                          <el-option
                            v-for="item in emp_status"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col v-if="accountForm.status === -1" :md="20" :sm="24">
                      <div class="text-bold">{{ $t('career.other_emp_status') }}</div>
                      <el-form-item label="" prop="other_status" :error="(error.key === 'other_status') ? error.value : ''">
                        <el-autocomplete
                          ref="other_status"
                          v-model="accountForm.other_status"
                          :placeholder="$t('career.enter_other_emp_status')"
                          :fetch-suggestions="queryStatus"
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
              <el-col :md="6" :sm="24" class="col-label">
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
              <el-col :md="6" :sm="24" class="col-label">
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
                      <el-form-item label="" prop="experience" :error="(error.key === 'experience') ? error.value : ''">
                        <el-input
                          ref="alias_name"
                          v-model="accountForm.experience"
                          :placeholder="$t('career.experience')"
                          :autosize="{ minRows: 5, maxRows: 10}"
                          name="experience"
                          type="textarea"
                          maxlength="2000"
                          tabindex="2"
                          @focus="resetValidate('experience')"
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
      <el-button class="card-button" @click="showConfirmModal">{{ $t('my_page.back') }}</el-button>
      <el-button class="card-button btn-right" type="danger" @click.native="submit" >{{ $t('my_page.save') }}</el-button>
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
import BorderElement from './BorderElement'

export default {
  name: 'EditCvElement',
  components: { BorderElement },
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
    // const validFullWidthLength = (rule, value, callback, message) => {
    //   if (!validFullWidth(value)) {
    //     callback(new Error(this.$t('validation.max_length', { _field_: message })))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      accountForm: {
        business_content: '',
        experience: '',
        enroll: false,
        store_name: '',
        company_name: '',
        period_start: '',
        period_end: '',
        occupationSelect: '',
        position_offices: '',
        status: '',
        other_status: '',
        other_occupation: '',
        period_end_year: '',
        period_end_month: '',
        period_start_year: '',
        period_start_month: '',
        errors: {}
      },
      occupation: [
        { value: 'ヘア', label: 'ヘア' },
        { value: 'ネイル・マツゲ', label: 'ネイル・マツゲ' },
        { value: '整体・カイロ・酸素・温浴', label: '整体・カイロ・酸素・温浴' },
        { value: 'フェイシャル・ボディ・脱毛', label: 'フェイシャル・ボディ・脱毛' },
        { value: '美容クリニック', label: '美容クリニック' },
        { value: -1, label: 'その他' }
      ],
      positions: [
        { value: 'ヘア', label: 'ヘア' },
        { value: 'ネイル・マツゲ', label: 'ネイル・マツゲ' },
        { value: '整体・カイロ・酸素・温浴', label: '整体・カイロ・酸素・温浴' },
        { value: 'フェイシャル・ボディ・脱毛', label: 'フェイシャル・ボディ・脱毛' },
        { value: '美容クリニック', label: '美容クリニック' },
        { value: 'その他', label: 'その他' }
      ],
      emp_status: [
        { value: '正社員', label: '正社員' },
        { value: '派遣社員', label: '派遣社員' },
        { value: '契約社員', label: '契約社員' },
        { value: 'アルバイト', label: 'アルバイト' },
        { value: -1, label: 'その他' }
      ],
      error: {
        key: null,
        value: ''
      },
      accountRules: {
        store_name: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('career.store_name') }), trigger: 'blur' },
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('career.store_name') }), trigger: 'blur' }
        ],
        company_name: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('career.company_name') }), trigger: 'blur' }
        ],
        business_content: [
          { validator: validAreaLength, message: this.$t('validation.area_length', { _field_: this.$t('career.business_content') }), trigger: 'blur' }
        ],
        experience: [
          { validator: validAreaLength, message: this.$t('validation.area_length', { _field_: this.$t('career.experience') }), trigger: 'blur' }
        ],
        other_occupation: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('career.occupation') }), trigger: 'blur' }
        ],
        other_status: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('career.status') }), trigger: 'blur' }
        ],
        period_start: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('career.period_start') }), trigger: 'blur' }
        ],
        period_end: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('career.period_start') }), trigger: 'blur' }
        ],
        status: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('career.status') }), trigger: 'blur' }
        ],
        occupationSelect: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('career.occupation') }), trigger: 'blur' }
        ],
        position_offices: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('career.position_offices') }), trigger: 'blur' }
        ]
      },
      confirmModal: false,
      linksStatus: [],
      linksOccupation: [],
      linksYear: [],
      linksMonth: []
    }
  },
  computed: {
    contentLength() {
      return this.accountForm.business_content.length
    },
    experienceLength() {
      return this.accountForm.experience.length
    },
    period_start() {
      return this.accountForm.period_start_year && this.accountForm.period_start_month
    },
    period_end() {
      return this.accountForm.period_end_year && this.accountForm.period_end_month
    }
  },
  watch: {
    period_start() {
      if (this.accountForm.period_start_year && this.accountForm.period_start_month) {
        this.accountForm.period_start = 'period_start'
      }
    },
    period_end() {
      if (this.accountForm.period_end_year && this.accountForm.period_end_month) {
        this.accountForm.period_end = 'period_end'
      }
    },
    'accountForm.enroll'() {
      this.accountForm.period_end_year = ''
      this.accountForm.period_end_month = ''
    }
  },
  mounted() {
    this.linksOccupation = this.loadAllOccupation()
    this.linksStatus = this.loadAllStatus()
    this.loadAllYear()
    this.loadAllMonth()
  },
  methods: {
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
      const clonedOccupation = JSON.parse(JSON.stringify(this.occupation))
      return clonedOccupation.splice(0, (clonedOccupation.length - 1))
    },
    loadAllStatus() {
      const clonedStatus = JSON.parse(JSON.stringify(this.emp_status))
      return clonedStatus.splice(0, (clonedStatus.length - 1))
    },
    loadAllYear() {
      for (let i = new Date().getFullYear(); i >= 1900; i--) {
        this.linksYear.push({ value: i.toString() })
      }
    },
    loadAllMonth() {
      for (let i = 1; i <= 12; i++) {
        this.linksMonth.push({ value: i.toString() })
      }
    },
    submit() {
      this.$refs.accountForm.validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
