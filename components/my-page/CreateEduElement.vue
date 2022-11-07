<template>
  <div class="right-content-element">
    <div class="edit-cv-element">
      <div class="edit-cv-title">{{ $t('education.title') }}{{ index | toFullWidth(index) }}{{ $t('my_page.edit') }}</div>
      <div class="edit-cv-content edit-form-content">
        <div class="card-text-title card-title-mobile"> {{ $t('education.title') }}{{ index | toFullWidth(index) }}{{ $t('my_page.edit') }}</div>
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
                <div class="label"><span>{{ $t('education.name') }}</span></div>
                <div class="required">{{ $t('form.required') }}</div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="school_name" :error="(error.key === 'school_name') ? error.value : ''">
                        <el-input
                          ref="school_name"
                          v-model="accountForm.school_name"
                          :placeholder="$t('education.enter_name')"
                          name="school_name"
                          type="text"
                          tabindex="2"
                          maxlength="255"
                          @focus="resetValidate('school_name')"
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
                  <span>{{ $t('education.date') }}</span>
                </div>
                <div class="required">{{ $t('form.required') }}</div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex period">
                    <el-col :md="9" :sm="24" class="first-name">
                      <el-form-item label="" prop="enrollment_period_start" :error="(error.key === 'enrollment_period_start') ? error.value : ''">
                        <el-row class="d-flex">
                          <el-col  :sm="12" :xs="12" class="birth-year">
                            <el-autocomplete
                              ref="enrollment_period_start"
                              v-model.trim="accountForm.enrollment_period_year_start"
                              :placeholder="$t('YYYY')"
                              :fetch-suggestions="queryYear"
                              name="year"
                              type="text"
                              tabindex="2"
                              :maxlength="4"
                              oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                              pattern="[0-9]*"
                              inputmode="numeric"
                              @focus="resetValidate('enrollment_period_start')"
                            />
                          </el-col>
                          <span class="text-normal birthday">{{ $t('form.year') }}</span>
                          <el-col :sm="12" :xs="10" class="birth-month">
                            <el-autocomplete
                              ref="enrollment_period_start"
                              v-model.trim="accountForm.enrollment_period_month_start"
                              :placeholder="$t('MM')"
                              :fetch-suggestions="queryMonth"
                              name="enrollment_period_start"
                              type="text"
                              :maxlength="2"
                              tabindex="2"
                              oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                              pattern="[0-9]*"
                              inputmode="numeric"
                              @focus="resetValidate('enrollment_period_start')"
                            />
                          </el-col>
                          <span class="text-normal birthday">{{ $t('form.month') }}</span>
                        </el-row>
                      </el-form-item>
                    </el-col>
                    <span class="date-space">~</span>
                    <el-col :md="9" :sm="24" class="birth-year">
                      <el-form-item label="" prop="enrollment_period_end" :error="(error.key === 'enrollment_period_end') ? error.value : ''">
                        <el-row class="d-flex">
                          <el-col  :sm="12" :xs="12" class="birth-year">
                            <el-autocomplete
                              ref="enrollment_period_end"
                              v-model.trim="accountForm.enrollment_period_year_end"
                              :placeholder="$t('YYYY')"
                              :fetch-suggestions="queryYear"
                              name="birthday"
                              type="text"
                              tabindex="2"
                              :maxlength="4"
                              oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                              pattern="[0-9]*"
                              inputmode="numeric"
                              @focus="resetValidate('enrollment_period_end')"
                            />
                          </el-col>
                          <span class="text-normal birthday">{{ $t('form.year') }}</span>
                          <el-col  :sm="12" :xs="10" class="birth-month">
                            <el-autocomplete
                              ref="enrollment_period_end"
                              v-model.trim="accountForm.enrollment_period_month_end"
                              :placeholder="$t('MM')"
                              :fetch-suggestions="queryMonth"
                              name="birthday"
                              type="text"
                              :maxlength="2"
                              tabindex="2"
                              oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                              pattern="[0-9]*"
                              inputmode="numeric"
                              @focus="resetValidate('enrollment_period_end')"
                            />
                          </el-col>
                          <span class="text-normal birthday">{{ $t('form.month') }}</span>
                        </el-row>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="edu-status">
                    <el-col :md="10" :sm="24" :xs="16">
                      <el-form-item label="" prop="learning_status_id" :error="(error.key === 'learning_status_id') ? error.value : ''">
                        <el-select v-model="accountForm.learning_status_id" :placeholder="$t('education.enter_type')">
                          <el-option
                            v-for="item in typeList"
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
          </div>
        </el-form>
      </div>
    </div>
    <div id="btn-center" class="text-center">
      <el-button class="card-button triple-btn" @click="showConfirmModal">{{ $t('my_page.back') }}</el-button>
      <el-button :disabled="disabledButton" class="card-button triple-btn" type="danger" @click.native="update" >{{ $t('my_page.save') }}</el-button>
    </div>
    <ConfirmModal
      v-show="confirmModal"
      :text="$t('confirm_modal.back_confirm')"
      @close="closeConfirmModal"
      @handleRouter="handleRouter('/my-page/education')">
    </ConfirmModal>
    <ConfirmModal
      v-show="deleteModal"
      :text="$t('confirm_modal.delete_confirm')"
      @close="closeDeleteModal">
    </ConfirmModal>
  </div>

</template>

<script>
import BorderElement from './BorderElement'
import { LINKS_MONTH } from '@/constants/store'
import { EDU_CREATE, INDEX_SET_ERROR, INDEX_SET_LOADING, INDEX_SET_SUCCESS } from '@/store/store.const'

export default {
  name: 'EditEduElement',
  filters: {
    toFullWidth(value) {
      return value.toString().replace(/[A-Za-z0-9]/g, function(s) { return String.fromCharCode(s.charCodeAt(0) + 0xFEE0) })
    }
  },
  components: { BorderElement },
  props: {
    m_learning_status: {
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
    const validDate = (rule, value, callback, message) => {
      const date = this.checkStartYear()
      if (date.start > date.end) {
        callback(new Error(this.$t('validation.err004')))
      } else if (date.start > date.current) {
        callback(new Error(this.$t('validation.err043')))
      } else {
        callback()
      }
    }
    return {
      accountForm: {
        school_name: '',
        enrollment_period_start: '',
        enrollment_period_end: '',
        enrollment_period_year_start: '',
        enrollment_period_month_start: '04',
        enrollment_period_year_end: '',
        enrollment_period_month_end: '04',
        learning_status_id: '',
        errors: {}
      },
      typeList: [],
      error: {
        key: null,
        value: ''
      },
      accountRules: {
        school_name: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('education.name') }), trigger: 'blur' },
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('education.name') }), trigger: 'blur' }
        ],
        enrollment_period_start: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('education.date') }), trigger: 'blur' },
          { validator: validDate, trigger: 'blur' }
        ],
        enrollment_period_end: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('education.date') }), trigger: 'blur' },
          { validator: validDate, trigger: 'blur' }
        ],
        learning_status_id: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('education.date') }), trigger: 'blur' }
        ]
      },
      linksYear: [],
      linksMonth: [],
      index: this.$route.params.id || '',
      confirmModal: false,
      deleteModal: false
    }
  },
  computed: {
    enrollment_period_start() {
      return this.accountForm.enrollment_period_year_start && this.accountForm.enrollment_period_month_start
    },
    enrollment_period_end() {
      return this.accountForm.enrollment_period_year_end && this.accountForm.enrollment_period_month_end
    },
    disabledButton() {
      return this.accountForm.school_name === '' || this.accountForm.enrollment_period_year_start === '' ||
        this.accountForm.enrollment_period_month_start === '' || this.accountForm.enrollment_period_year_end === '' ||
        this.accountForm.enrollment_period_month_end === '' || this.accountForm.learning_status_id === ''
    }
  },
  watch: {
    m_learning_status() {
      this.typeList = this.m_learning_status
    },
    'accountForm.enrollment_period_year_start'() {
      const date = this.checkStartYear()
      if (this.accountForm.enrollment_period_year_start && this.accountForm.enrollment_period_month_start) {
        this.accountForm.enrollment_period_start = this.accountForm.enrollment_period_year_start + '/' + this.accountForm.enrollment_period_month_start
        if (date.start < date.end) {
          this.resetValidate('enrollment_period_start')
        }
      } else {
        this.accountForm.enrollment_period_start = ''
      }
    },
    'accountForm.enrollment_period_month_start'() {
      const date = this.checkStartYear()
      if (this.accountForm.enrollment_period_month_start && this.accountForm.enrollment_period_year_start) {
        this.accountForm.enrollment_period_start = this.accountForm.enrollment_period_year_start + '/' + this.accountForm.enrollment_period_month_start
        if (date.start < date.end) {
          this.resetValidate('enrollment_period_start')
        }
      } else {
        this.accountForm.enrollment_period_start = ''
      }
    },
    'accountForm.enrollment_period_year_end'() {
      const date = this.checkStartYear()
      if (this.accountForm.enrollment_period_year_end && this.accountForm.enrollment_period_month_end) {
        this.accountForm.enrollment_period_end = this.accountForm.enrollment_period_year_end + '/' + this.accountForm.enrollment_period_month_end
        if (date.start < date.end) {
          this.resetValidate('enrollment_period_end')
          this.resetValidate('enrollment_period_start')
        }
      } else {
        this.accountForm.enrollment_period_end = ''
      }
    },
    'accountForm.enrollment_period_month_end'() {
      const date = this.checkStartYear()
      if (this.accountForm.enrollment_period_month_end && this.accountForm.enrollment_period_year_end) {
        this.accountForm.enrollment_period_end = this.accountForm.enrollment_period_year_end + '/' + this.accountForm.enrollment_period_month_end
        if (date.start < date.end) {
          this.resetValidate('enrollment_period_end')
          this.resetValidate('enrollment_period_start')
        }
      } else {
        this.accountForm.enrollment_period_end = ''
      }
    }
  },
  mounted() {
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
    showDeleteModal() {
      this.deleteModal = true
    },
    closeDeleteModal() {
      this.deleteModal = false
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
    loadAllYear() {
      for (let i = new Date().getFullYear() + 10; i >= 1970; i--) {
        this.linksYear.push({ value: i.toString() })
      }
    },
    loadAllMonth() {
      this.linksMonth = LINKS_MONTH
    },
    update() {
      this.error = { key: null, value: '' }
      this.$refs.accountForm.validate(async valid => {
        if (valid) {
          try {
            await this.$store.commit(INDEX_SET_LOADING, true)
            const dto = this.accountForm
            const response = await this.$store.dispatch(EDU_CREATE, {
              ...dto
            })
            switch (response.status_code) {
              case 200:
                await this.$store.commit(INDEX_SET_SUCCESS, {
                  show: true,
                  text: response.messages
                })
                this.handleRouter('/my-page/education')
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
      })
    },
    checkStartYear() {
      const current = new Date().toISOString().slice(0, 7)
      const start = this.accountForm.enrollment_period_year_start + '-' + (Number(this.accountForm.enrollment_period_month_start) <= 10 ? this.accountForm.enrollment_period_month_start : ('0' + this.accountForm.enrollment_period_month_start))
      const end = this.accountForm.enrollment_period_year_end + '-' + (Number(this.accountForm.enrollment_period_month_end) <= 10 ? this.accountForm.enrollment_period_month_end : ('0' + this.accountForm.enrollment_period_month_end))
      return { current, start, end }
    }
  }
}
</script>
