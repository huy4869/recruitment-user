<template>
  <div class="cv-page">
    <BannerElement :banner="$t('page.my_page')" title="my page" :subBanner="$t('content.web_cv')"></BannerElement>
    <TitlePageElement class="show-pc"></TitlePageElement>
    <div class="cv-content">
      <MenuLeftElement menu-active="web-cv"></MenuLeftElement>
      <div class="right-content-element">
        <div class="edit-cv-element">
          <div class="edit-cv-title">{{ $t('education.title') }}<div class="text-count-career"><span>{{ index | toFullWidth(index) }}</span></div>{{ $t('my_page.edit') }}</div>
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
                    <div class="content-input content-datetime-edu">
                      <el-row class="d-flex period ">
                        <el-col :md="9" :sm="24" class="first-name">
                          <el-form-item label="" prop="enrollment_period_start" :error="(error.key === 'enrollment_period_start') ? error.value : ''">
                            <el-row class="d-flex">
                              <el-col  :sm="12" :xs="12" class="birth-year">
                                <el-select
                                  v-model="accountForm.enrollment_period_year_start"
                                  :placeholder="$t('YYYY')"
                                  @focus="resetValidate('enrollment_period_start')"
                                  @blur="validate('enrollment_period_start')"
                                >
                                  <el-option
                                    v-for="item in linksYear"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </el-col>
                              <span class="text-normal birthday birthday-edu">{{ $t('form.year') }}</span>
                              <el-col :sm="12" :xs="10" class="birth-month">
                                <el-select
                                  v-model="accountForm.enrollment_period_month_start"
                                  :placeholder="$t('MM')"
                                  @focus="resetValidate('enrollment_period_start')"
                                  @blur="validate('enrollment_period_start')"
                                >
                                  <el-option
                                    v-for="item in linksMonth"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </el-col>
                              <span class="text-normal birthday birthday-edu">{{ $t('form.month') }}</span>
                            </el-row>
                          </el-form-item>
                        </el-col>
                        <span class="date-space date-space-edu"> ~ </span>
                        <el-col :md="9" :sm="24" class="birth-year">
                          <el-form-item label="" prop="enrollment_period_end" :error="(error.key === 'enrollment_period_end') ? error.value : ''">
                            <el-row class="d-flex">
                              <el-col  :sm="12" :xs="12" class="birth-year">
                                <el-select
                                  v-model="accountForm.enrollment_period_year_end"
                                  :placeholder="$t('YYYY')"
                                  @focus="resetValidate('enrollment_period_end')"
                                  @blur="validate('enrollment_period_end')"
                                >
                                  <el-option
                                    v-for="item in linksYear"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </el-col>
                              <span class="text-normal birthday birthday-edu">{{ $t('form.year') }}</span>
                              <el-col  :sm="12" :xs="10" class="birth-month">
                                <el-select
                                  v-model="accountForm.enrollment_period_month_end"
                                  :placeholder="$t('MM')"
                                  @focus="resetValidate('enrollment_period_end')"
                                  @blur="validate('enrollment_period_end')"
                                >
                                  <el-option
                                    v-for="item in linksMonth"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                              </el-col>
                              <span class="text-normal birthday birthday-edu">{{ $t('form.month') }}</span>
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
                                :value="item.id"
                                :disabled="item.disabled"
                              >
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
                  </el-col>
                  <el-col :md="18" :sm="24">
                    <div id="career-btn" class="justify-start text-center">
                      <el-button class="card-button triple-btn" @click="handleRouter('/my-page/education')">{{ $t('my_page.back') }}</el-button>
                      <el-button class="card-button tripl|e-btn" @click="showDeleteModal">{{ $t('my_page.remove') }}</el-button>
                      <el-button :disabled="disabledButton" class="card-button triple-btn" type="danger" @click.native="update" >{{ $t('my_page.save') }}</el-button>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </div>
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
          @close="closeDeleteModal"
          @handleRouter="handleDelete(edu.id)"
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
  INDEX_SET_LOADING,
  INDEX_SET_TITLE_MENU,
  EDU_DETAIL,
  MASTER_GET_DATA,
  MY_PAGE_SET_STATE_PAGE, EDU_UPDATE, INDEX_SET_SUCCESS, INDEX_SET_ERROR, EDU_DELETE
} from '~/store/store.const'
import BorderElement from '~/components/my-page/BorderElement'
import { LINKS_MONTH } from '@/constants/store'
export default {
  name: 'JobCareerPage',
  filters: {
    toFullWidth(value) {
      return value.toString().replace(/[A-Za-z0-9]/g, function(s) { return String.fromCharCode(s.charCodeAt(0) + 0xFEE0) })
    }
  },
  components: { BorderElement, TitlePageElement, BannerElement, MenuLeftElement },
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
      edu: {},
      m_learning_status: [],
      accountForm: {
        school_name: '',
        enrollment_period_start: '',
        enrollment_period_end: '',
        enrollment_period_year_start: '',
        enrollment_period_month_start: '',
        enrollment_period_year_end: '',
        enrollment_period_month_end: '',
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
          { required: true, message: this.$t('validation.required', { _field_: this.$t('education.date') }), trigger: 'change' },
          { validator: validDate, trigger: 'change' }
        ],
        enrollment_period_end: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('education.date') }), trigger: 'change' },
          { validator: validDate, trigger: 'change' }
        ]
      },
      linksYear: [],
      linksMonth: [],
      index: this.$route.params.id || '',
      confirmModal: false,
      clonedAccountForm: {},
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
    async edu() {
      await this.getEduInfo()
      this.clonedAccountForm = _.cloneDeep(this.accountForm)
    },
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
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.my_page'), route: '/my-page/top-page' },
      { name: this.$t('page.web_cv'), route: '/my-page/web-cv' },
      { name: this.$t('education.title'), route: '/my-page/education' },
      { name: this.$t('education.title') + this.$route.params.id + this.$t('my_page.edit') }
    ])
    this.getEdu()
    this.getMasterData()
  },
  mounted() {
    this.loadAllYear()
    this.loadAllMonth()
    this.clonedAccountForm = _.cloneDeep(this.accountForm)
  },
  methods: {
    async getEdu() {
      this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const response = await this.$store.dispatch(EDU_DETAIL, this.$route.query.id)
        const { data, status_code } = response
        if (status_code === 200) {
          this.edu = data
        }
      } catch (e) {
        this.$store.commit(INDEX_SET_LOADING, false)
      }
      this.$store.commit(INDEX_SET_LOADING, false)
    },
    async getMasterData() {
      const dataResources = [
        'resources[m_learning_status]={"model": "MLearningStatus"}'
      ]
      await this.$store.dispatch(MASTER_GET_DATA, dataResources.join('&')).then(res => {
        this.m_learning_status = res.data.m_learning_status
        if (res.status_code === 200) {
          this.m_learning_status = res.data.m_learning_status.length ? this.m_learning_status : [{ name: this.$t('education.enter_type'), disabled: true }]
        } else if (res.status_code === 500) {
          this.m_learning_status = [{
            name: this.$t('education.enter_type'),
            disabled: true
          }]
        }
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
        this.handleRouter('/my-page/education')
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
            const response = await this.$store.dispatch(EDU_UPDATE, {
              id: this.$route.query.id,
              data: dto
            })
            switch (response.status_code) {
              case 200:
                await this.$store.commit(INDEX_SET_SUCCESS, {
                  show: true,
                  text: response.messages
                })
                this.accountForm = this.clonedAccountForm
                this.handleRouter('/my-page/education')
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
    async handleDelete(id) {
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const response = await this.$store.dispatch(EDU_DELETE, id)
        switch (response.status_code) {
          case 200:
            await this.$store.commit(INDEX_SET_SUCCESS, {
              show: true,
              text: response.messages
            })
            this.accountForm = this.clonedAccountForm
            this.$router.push('/my-page/education')
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
      const start = this.accountForm.enrollment_period_year_start + '-' + this.accountForm.enrollment_period_month_start
      const end = this.accountForm.enrollment_period_year_end + '-' + this.accountForm.enrollment_period_month_end
      return { current, start, end }
    },
    getEduInfo() {
      for (const item in this.edu) {
        this.accountForm[item] = this.edu[item]
      }
    }
  }
}
</script>
