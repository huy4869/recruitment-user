<template>
  <div class="inquiry-content">
    <div class="inquiry-container">
      <div class="left-container">
        <div class="inquiry-title">{{ $t('inquiry.form') }}</div>
        <div class="description text-primary-black">{{ $t('inquiry.des_1') }}</div>
        <div class="description2 text-primary-black">{{ $t('inquiry.des_2') }}</div>
        <div class="edit-cv-element">
          <div class="edit-cv-content edit-form-content">
            <el-form
              ref="accountForm"
              :model="accountForm"
              :rules="accountRules"
              autocomplete="off"
              label-position="left"
            >
              <div class="edit-form-input">
                <BorderElement :col-size="7" :middle="true"></BorderElement>
                <el-row class="d-flex form-label-input">
                  <el-col :md="7" :sm="16" class="col-label">
                    <div class="label"><span>{{ $t('inquiry.email') }}</span></div>
                    <div class="required">{{ $t('form.required') }}</div>
                  </el-col>
                  <el-col :md="17" :sm="24">
                    <div class="content-input">
                      <el-row class="d-flex">
                        <el-col :md="22" :sm="24">
                          <el-form-item label="" prop="email" :error="(error.key === 'email') ? error.value : ''">
                            <el-input
                              ref="email"
                              v-model.trim="accountForm.email"
                              :placeholder="$t('inquiry.enter_email')"
                              name="email"
                              type="text"
                              tabindex="2"
                              maxlength="255"
                              @focus="resetValidate('email')"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <BorderElement :col-size="7" :middle="true"></BorderElement>
                <el-row class="d-flex form-label-input">
                  <el-col :md="7" :sm="16" class="col-label">
                    <div class="label"><span>{{ $t('inquiry.name') }}</span></div>
                    <div class="required">{{ $t('form.required') }}</div>
                  </el-col>
                  <el-col :md="17" :sm="24">
                    <div class="content-input">
                      <el-row class="d-flex">
                        <el-col :md="22" :sm="24">
                          <el-form-item label="" prop="name" :error="(error.key === 'name') ? error.value : ''">
                            <el-input
                              ref="name"
                              v-model="accountForm.name"
                              :placeholder="$t('inquiry.enter_name')"
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
                <BorderElement :col-size="7" :middle="true"></BorderElement>
                <el-row class="d-flex form-label-input">
                  <el-col :md="7" :sm="16" class="col-label">
                    <div class="label"><span>{{ $t('inquiry.phone') }}</span></div>
                    <div class="required">{{ $t('form.required') }}</div>
                  </el-col>
                  <el-col :md="17" :sm="24">
                    <div class="content-input">
                      <el-row class="d-flex">
                        <el-col :md="22" :sm="24">
                          <el-form-item label="" prop="tel" :error="(error.key === 'tel') ? error.value : ''">
                            <el-input
                              ref="tel"
                              v-model.trim="accountForm.tel"
                              :placeholder="$t('inquiry.enter_phone')"
                              name="tel"
                              type="text"
                              tabindex="2"
                              maxlength="13"
                              @focus="resetValidate('tel')"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <BorderElement :col-size="7" :middle="true"></BorderElement>
                <el-row class="d-flex form-label-input">
                  <el-col :md="7" :sm="16" class="col-label">
                    <div class="label"><span>{{ $t('inquiry.content') }}</span></div>
                    <div class="required">{{ $t('form.required') }}</div>
                  </el-col>
                  <el-col :md="17" :sm="24">
                    <div class="content-input">
                      <el-row class="d-flex">
                        <el-col :md="22" :sm="24">
                          <el-form-item label="" prop="content" :error="(error.key === 'content') ? error.value : ''">
                            <el-input
                              ref="pr"
                              v-model="accountForm.content"
                              :placeholder="$t('inquiry.enter_content')"
                              :autosize="{ minRows: 5, maxRows: 12}"
                              name="content"
                              type="textarea"
                              maxlength="1000"
                              tabindex="2"
                              @focus="resetValidate('content')"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <BorderElement :col-size="7" :middle="true"></BorderElement>
              </div>
            </el-form>
          </div>
        </div>
        <div id="btn-center" class="text-center">
          <el-button class="card-button btn-right" type="danger" @click.native="submit" >{{ $t('inquiry.send') }}</el-button>
        </div>
      </div>
      <div class="right-container text-center">
        <div class="here text-bold">{{ $t('inquiry.here') }}</div>
        <div class="schedule-des">
          <div class="phone-number">{{ phone }}</div>
          <div class="time text-primary-black">{{ $t('inquiry.time') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BorderElement from '../my-page/BorderElement'
import {
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  INQUIRY_CREATE,
  INQUIRY_PHONE_NUMBER
} from '~/store/store.const'
import { validEmail, validOnlyHalfWidth, validPhoneNumber } from '~/utils/validate'

export default {
  name: 'InquiryNoLoginElement',
  components: { BorderElement },
  data() {
    const validAreaLength = (rule, value, callback, message) => {
      if (value && value.length > 1000) {
        callback(new Error(message))
      } else {
        callback()
      }
    }
    const validFormEmail = (rule, value, callback) => {
      if (value && value.length > 255) {
        callback(new Error(this.$t('validation.max_length', { _field_: this.$t('login.email') })))
      }
      if (value.search(' ') !== -1) {
        callback(new Error(this.$t('validation.com002', { _field_: this.$t('login.email') })))
      }
      if (!validOnlyHalfWidth(value)) {
        callback(new Error(this.$t('validation.halfwidth_email_length', { _field_: this.$t('login.email') })))
      }
      if (!validEmail(value)) {
        callback(new Error(this.$t('validation.email', { _field_: this.$t('login.email') })))
      } else {
        callback()
      }
    }
    const validFormLength = (rule, value, callback, message) => {
      if (value && value.length > 255) {
        callback(new Error(this.$t('validation.max_length', { _field_: message })))
      } else {
        callback()
      }
    }
    const validPhone = (rule, value, callback) => {
      if (!validOnlyHalfWidth(value)) {
        callback(new Error(this.$t('validation.halfwidth_length', { _field_: this.$t('inquiry.phone') })))
      }
      if (value && (value.length > 13 || value.length < 10 || !value.startsWith(0))) {
        callback(new Error(this.$t('validation.phone_length', { _field_: this.$t('inquiry.phone') })))
      } else if (!validPhoneNumber(value)) {
        callback(new Error(this.$t('validation.phone', { _field_: this.$t('inquiry.phone') })))
      } else {
        callback()
      }
    }
    return {
      accountForm: {
        email: '',
        content: '',
        name: '',
        tel: '',
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      accountRules: {
        email: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('inquiry.email') }), trigger: 'blur' },
          { validator: validFormEmail, trigger: 'blur' }
        ],
        name: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('inquiry.name') }), trigger: 'blur' },
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('inquiry.name') }), trigger: 'blur' }
        ],
        tel: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('inquiry.phone') }), trigger: 'blur' },
          { validator: validPhone, trigger: 'blur' }
        ],
        content: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('inquiry.content') }), trigger: 'blur' },
          { validator: validAreaLength, message: this.$t('validation.area_length_2', { _field_: this.$t('inquiry.content') }), trigger: 'blur' }
        ]
      },
      phone: ''
    }
  },
  created() {
    this.getPhoneNumber()
  },
  methods: {
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.accountForm.fields.find((f) => f.prop === ref).clearValidate()
      this.accountForm.errors[ref] = ''
    },
    submit() {
      this.error = { key: null, value: '' }
      this.$refs.accountForm.validate(async valid => {
        if (valid) {
          try {
            await this.$store.commit(INDEX_SET_LOADING, true)
            const dto = this.accountForm
            const response = await this.$store.dispatch(INQUIRY_CREATE, {
              ...dto
            })
            if (response.status_code === 200) {
              await this.$store.commit(INDEX_SET_SUCCESS, {
                show: true,
                text: response.messages
              })
              this.accountForm = {
                email: '',
                content: '',
                name: '',
                tel: '',
                errors: {}
              }
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
    async getPhoneNumber() {
      this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const response = await this.$store.dispatch(INQUIRY_PHONE_NUMBER)
        const { data, status_code } = response
        if (status_code === 200) {
          this.phone = data
        }
      } catch (e) {
        this.$store.commit(INDEX_SET_LOADING, false)
      }
      this.$store.commit(INDEX_SET_LOADING, false)
    }
  }
}
</script>
