<template>
  <div class="cv-page">
    <BannerElement :banner="$t('page.my_page')" title="my page" :subBanner="$t('content.web_cv')"></BannerElement>
    <TitlePageElement class="show-pc"></TitlePageElement>
    <div class="cv-content">
      <MenuLeftElement menu-active="web-cv"></MenuLeftElement>
      <div class="right-content-element">
        <div class="edit-cv-element">
          <div class="edit-cv-title">
            {{ $t('my_page.qualification') }}<div class="text-count-career"><span>{{ $route.params.id | fullwidth }}</span></div>{{ $t('my_page.create') }}
          </div>
          <div class="edit-cv-content edit-form-content">
            <div class="card-text-title card-title-mobile">
              {{ $t('my_page.qualification') }}<div class="text-count-career"><span>{{ $route.params.id | fullwidth }}</span></div>{{ $t('my_page.create') }}
            </div>
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
                    <div class="label"><span>{{ $t('qualification.name') }}</span></div>
                    <div class="required">{{ $t('form.required') }}</div>
                  </el-col>
                  <el-col :md="18" :sm="24">
                    <div class="content-input">
                      <el-row class="d-flex">
                        <el-col :md="20" :sm="24">
                          <el-form-item label="" prop="name" :error="(error.key === 'name') ? error.value : ''">
                            <el-input
                              ref="store_name"
                              v-model="accountForm.name"
                              :placeholder="$t('form.enter_none')"
                              name="name"
                              type="text"
                              tabindex="2"
                              maxlength="255"
                              @focus="resetValidate('name')"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <BorderElement :middle="true"></BorderElement>
                <el-row class="d-flex form-label-input">
                  <el-col :xl="6" :md="6" :sm="12" class="col-label">
                    <div class="label">
                      <span>{{ $t('qualification.date') }}</span>
                    </div>
                  </el-col>
                  <el-col :xl="18" :md="18" :sm="24">
                    <div class="content-input content-datetime-edu">
                      <el-row class="d-flex period">
                        <el-col :md="9" :sm="24" class="first-name">
                          <el-form-item label="" prop="new_issuance_date" :error="(error.key === 'new_issuance_date') ? error.value : ''">
                            <el-row class="d-flex">
                              <el-col  :sm="12" :xs="12" class="birth-year">
                                <el-select
                                  ref="new_issuance_date"
                                  v-model="accountForm.year"
                                  clearable
                                  name="new_issuance_date"
                                  :placeholder="$t('YYYY')"
                                  @focus="resetValidate('new_issuance_date')"
                                  @blur="validate('new_issuance_date')"
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
                                  v-model="accountForm.month"
                                  clearable
                                  :placeholder="$t('MM')"
                                  @focus="resetValidate('new_issuance_date')"
                                  @blur="validate('new_issuance_date')"
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
              </div>
            </el-form>
          </div>
        </div>
        <div id="btn-center" class="text-center">
          <el-button class="card-button" @click="handleRouter('/my-page/qualification')">{{ $t('my_page.back') }}</el-button>
          <el-button class="card-button btn-right" type="danger" @click.native="update" >{{ $t('my_page.save') }}</el-button>
        </div>
        <ConfirmModal
          v-show="confirmModal"
          :text="$t('confirm_modal.back_confirm')"
          @close="closeConfirmModal"
          @handleRouter="handleRouter('/my-page/qualification')">
        </ConfirmModal>
        <ConfirmModal
          v-show="deleteModal"
          :text="$t('confirm_modal.delete_confirm')"
          @close="closeDeleteModal"
          @handleRouter="handleRouter('/my-page/qualification')">
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
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  INDEX_SET_TITLE_MENU, MY_PAGE_SET_STATE_PAGE,
  WORK_QUALIFICATION_CREATE
} from '~/store/store.const'
import BorderElement from '@/components/my-page/BorderElement'
import { LINKS_MONTH } from '@/constants/store'
export default {
  name: 'JobCareerPage',
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
    return {
      accountForm: {
        name: '',
        year: '',
        month: '',
        new_issuance_date: '',
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      accountRules: {
        name: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('qualification.name') }), trigger: 'blur' },
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('qualification.name') }), trigger: 'blur' }
        ]
      },
      linksYear: [],
      linksMonth: [],
      confirmModal: false,
      deleteModal: false,
      clonedAccountForm: {}
    }
  },
  computed: {
    new_issuance_date() {
      return this.accountForm.year && this.accountForm.month
    },
    disabledButton() {
      return this.accountForm.name === ''
    }
  },
  watch: {
    'accountForm.year'() {
      const data = this.checkDateNow()
      if (data) {
        this.accountRules.new_issuance_date = [{ required: true, message: data, trigger: 'blur' }]
        this.$refs.accountForm.validateField('new_issuance_date')
      } else {
        delete this.accountRules.new_issuance_date
        this.resetValidate('new_issuance_date')
      }
    },
    'accountForm.month'() {
      const data = this.checkDateNow()
      if (data) {
        this.accountRules.new_issuance_date = [{ required: true, message: data, trigger: 'blur' }]
        this.$refs.accountForm.validateField('new_issuance_date')
      } else {
        delete this.accountRules.new_issuance_date
        this.resetValidate('new_issuance_date')
      }
    }
  },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.my_page'), route: '/my-page/top-page' },
      { name: this.$t('page.web_cv'), route: '/my-page/web-cv' },
      { name: this.$t('my_page.qualification'), route: '/my-page/qualification' },
      { name: this.$t('my_page.qualification') + this.$route.params.id + this.$t('my_page.create') }

    ])
  },
  async mounted() {
    await this.loadAllYear()
    await this.loadAllMonth()
    this.clonedAccountForm = _.cloneDeep(this.accountForm)
  },
  methods: {
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
        this.handleRouter('/my-page/qualification')
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
      for (let i = new Date().getFullYear(); i >= 1970; i--) {
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
            let new_issuance_date = this.accountForm.year + '/' + this.accountForm.month
            if (this.accountForm.year === '' && this.accountForm.month === '') {
              new_issuance_date = ''
            }
            const dto = {
              name: this.accountForm.name,
              new_issuance_date
            }
            const response = await this.$store.dispatch(WORK_QUALIFICATION_CREATE, dto)
            switch (response.status_code) {
              case 200:
                await this.$store.commit(INDEX_SET_SUCCESS, {
                  show: true,
                  text: response.messages
                })
                this.accountForm = this.clonedAccountForm
                this.$router.push('/my-page/qualification')
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
    checkDateNow() {
      if ((this.accountForm.month && !this.accountForm.year) || (!this.accountForm.month && this.accountForm.year)) {
        return this.$t('validation.err041')
      }
      if ((this.accountForm.month && this.accountForm.year)) {
        const dateYearNow = new Date().getFullYear()
        const dateMonthNow = new Date().getMonth() + 1
        if ((Number(this.accountForm.year) === dateYearNow) && (Number(this.accountForm.month) > dateMonthNow)) {
          return this.$t('content.ERR_042')
        }
      }
      return ''
    }
  }
}
</script>
