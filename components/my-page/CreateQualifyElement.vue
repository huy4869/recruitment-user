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
                          :placeholder="$t('qualification.name')"
                          name="name"
                          type="text"
                          tabindex="2"
                          show-word-limit
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
              <el-col :md="6" :sm="24" class="col-label">
                <div class="label">
                  <span>{{ $t('qualification.date') }}</span>
                </div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex period">
                    <el-col :md="9" :sm="24" class="first-name">
                      <el-form-item label="" prop="period_start" :error="(error.key === 'period_start') ? error.value : ''">
                        <el-row class="d-flex">
                          <el-col  :sm="12" :xs="12" class="birth-year">
                            <el-autocomplete
                              ref="period_start"
                              v-model.trim="accountForm.year"
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
                              v-model.trim="accountForm.month"
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
                  </el-row>
                </div>
              </el-col>
            </el-row>
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
      @handleRouter="handleRouter('/my-page/qualification')">
    </ConfirmModal>
    <ConfirmModal
      v-show="deleteModal"
      :text="$t('confirm_modal.delete_confirm')"
      @close="closeDeleteModal"
      @handleRouter="handleRouter('/my-page/qualification')">
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
    return {
      accountForm: {
        name: '',
        date: '',
        year: '',
        month: '',
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
      deleteModal: false
    }
  },
  computed: {
    period_start() {
      return this.accountForm.year && this.accountForm.month
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
      for (let i = new Date().getFullYear(); i >= 1900; i--) {
        this.linksYear.push({ value: i })
      }
    },
    loadAllMonth() {
      for (let i = 1; i <= 12; i++) {
        this.linksMonth.push({ value: i })
      }
    },
    submit() {
      this.$refs.accountForm.validate(valid => {
        if ((this.accountForm.year && !this.accountForm.month) || (!this.accountForm.year && this.accountForm.month)) {
          this.accountRules.period_start = [
            { required: true, message: this.$t('validation.required', { _field_: this.$t('qualification.name') }), trigger: 'blur' }
          ]
        }
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
