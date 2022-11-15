<template>
  <div class="right-content-element">
    <div class="edit-cv-element">
      <div class="edit-cv-title">{{ $t('qualification.title') }}<div class="text-count-career"><span>{{ index | toFullWidth(index) }}</span></div>{{ $t('my_page.edit') }}</div>
      <div class="edit-cv-content edit-form-content">
        <div class="card-text-title card-title-mobile"> {{ $t('qualification.title') }}<div class="text-count-career"><span>{{ index | toFullWidth(index) }}</span></div>{{ $t('my_page.edit') }}</div>
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
              <el-col :md="6" :sm="12" class="col-label">
                <div class="label">
                  <span>{{ $t('qualification.date') }}</span>
                </div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input content-datetime-edu">
                  <el-row class="d-flex period">
                    <el-col :md="10" :sm="24" class="first-name">
                      <el-form-item label="" prop="new_issuance_date_edit" :error="(error.key === 'new_issuance_date') ? error.value : ''">
                        <el-row class="d-flex">
                          <el-col :xl="24" :sm="12" :xs="12" class="birth-year">
                            <el-select
                              clearable
                              ref="new_issuance_date_edit"
                              name="new_issuance_date_edit"
                              v-model="accountForm.year"
                              :placeholder="$t('YYYY')"
                              @focus="resetValidate('new_issuance_date_edit')"
                              @blur="validate('new_issuance_date_edit')"
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
                              clearable
                              v-model="accountForm.month"
                              :placeholder="$t('MM')"
                              @focus="resetValidate('new_issuance_date_edit')"
                              @blur="validate('new_issuance_date_edit')"
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
      <el-button class="card-button triple-btn" @click="showConfirmModal">{{ $t('my_page.back') }}</el-button>
      <el-button class="card-button triple-btn" @click="showDeleteModal">{{ $t('my_page.remove') }}</el-button>
      <el-button class="card-button triple-btn" type="danger" @click.native="update" >{{ $t('my_page.save') }}</el-button>
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
      @handleRouter="handleDelete(qualification.id)"
      >
    </ConfirmModal>
  </div>
</template>

<script>
import BorderElement from './BorderElement'
import {
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS, WORK_QUALIFICATION_DELETE,
  WORK_QUALIFICATION_UPDATE
} from '@/store/store.const'
import { LINKS_MONTH } from '@/constants/store'

export default {
  name: 'EditQualifyElement',
  filters: {
    toFullWidth(value) {
      return value.toString().replace(/[A-Za-z0-9]/g, function(s) { return String.fromCharCode(s.charCodeAt(0) + 0xFEE0) })
    }
  },
  components: { BorderElement },
  props: {
    qualification: {
      type: Object,
      default: () => {}
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
    return {
      accountForm: {
        name: '',
        year: '',
        month: '',
        new_issuance_date_edit: '',
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
      index: this.$route.params.id || '',
      confirmModal: false,
      deleteModal: false
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
    qualification() {
      for (const item in this.qualification) {
        this.accountForm[item] = this.qualification[item]
      }
    },
    'accountForm.year'() {
      const data = this.checkDateNow()
      if (data) {
        this.accountRules.new_issuance_date_edit = [{ required: true, message: data, trigger: 'blur' }]
        this.$refs.accountForm.validateField('new_issuance_date_edit')
      } else {
        delete this.accountRules.new_issuance_date_edit
        this.resetValidate('new_issuance_date_edit')
      }
    },
    'accountForm.month'() {
      const data = this.checkDateNow()
      if (data) {
        this.accountRules.new_issuance_date_edit = [{ required: true, message: data, trigger: 'blur' }]
        this.$refs.accountForm.validateField('new_issuance_date_edit')
      } else {
        delete this.accountRules.new_issuance_date_edit
        this.resetValidate('new_issuance_date_edit')
      }
    }
  },
  mounted() {
    this.loadAllYear()
    this.loadAllMonth()
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
      let check = false
      for (const x in this.qualification) {
        if (this.qualification[x] !== this.accountForm[x]) {
          check = true
        }
      }
      if (check) {
        this.confirmModal = true
      } else {
        this.handleRouter('/my-page/qualification')
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
            let new_issuance_date = this.accountForm.year + '/' + this.accountForm.month
            if (this.accountForm.year === '' && this.accountForm.month === '') {
              new_issuance_date = ''
            }
            const dto = {
              name: this.accountForm.name,
              new_issuance_date
            }
            const response = await this.$store.dispatch(WORK_QUALIFICATION_UPDATE, {
              id: this.$route.query.id,
              data: dto
            })
            switch (response.status_code) {
              case 200:
                await this.$store.commit(INDEX_SET_SUCCESS, {
                  show: true,
                  text: response.messages
                })
                this.handleRouter('/my-page/qualification')
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
        const response = await this.$store.dispatch(WORK_QUALIFICATION_DELETE, id)
        switch (response.status_code) {
          case 200:
            await this.$store.commit(INDEX_SET_SUCCESS, {
              show: true,
              text: response.messages
            })
            this.$router.push('/my-page/qualification')
            break
          case 500:
            await this.$store.commit(INDEX_SET_ERROR, {
              show: true,
              text: this.$t('content.EXC_001')
            })
            this.$router.push('/my-page/qualification')
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
