<template>
  <div id="register-element" class="login-element">
    <img class="logo-login" src="/assets/images/logo_white.svg" alt="">
    <div class="login-form">
      <div class="login-title">{{ $t('register.title') }}</div>
      <el-form
        ref="accountForm"
        :model="accountForm"
        :rules="accountRules"
        autocomplete="off"
        label-position="left"
      >
        <el-row class="d-flex">
          <div class="label"><span>{{ $t('my_page.name') }}</span></div>
          <div class="required">{{ $t('form.required') }}</div>
        </el-row>
        <el-row class="d-flex form-label-input">
          <div ref="first_name"></div>
          <div class="content-input" ref="last_name">
            <el-row class="d-flex">
              <el-col :md="24" :sm="12" class="first-name">
                <el-form-item label="" prop="first_name" :error="(error.key === 'first_name') ? error.value : ''">
                  <el-input
                    v-model="accountForm.first_name"
                    :placeholder="$t('my_page.first_name')"
                    name="first_name"
                    type="text"
                    tabindex="2"
                    maxlength="255"
                    @focus="resetValidate('first_name')"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :sm="12" class="last-name">
                <el-form-item label="" prop="last_name" :error="(error.key === 'last_name') ? error.value : ''">
                  <el-input
                    v-model="accountForm.last_name"
                    :placeholder="$t('my_page.last_name')"
                    name="last_name"
                    type="text"
                    tabindex="2"
                    maxlength="255"
                    @focus="resetValidate('last_name')"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-row>

        <el-row class="d-flex">
          <div class="label"><span>{{ $t('my_page.furigana_name') }}</span></div>
          <div class="required">{{ $t('form.required') }}</div>
        </el-row>
        <el-row class="d-flex form-label-input">
          <div ref="first_name"></div>
          <div class="content-input" ref="first_name">
            <el-row class="d-flex">
              <el-col :md="24" :sm="12" class="first-name">
                <el-form-item label="" prop="furi_first_name" :error="(error.key === 'furi_first_name') ? error.value : ''">
                  <el-input
                    v-model="accountForm.furi_first_name"
                    :placeholder="$t('my_page.furi_first_name')"
                    name="furi_first_name"
                    type="text"
                    tabindex="2"
                    maxlength="255"
                    @focus="resetValidate('furi_first_name')"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :sm="12" class="last-name">
                <el-form-item label="" prop="furi_last_name" :error="(error.key === 'furi_last_name') ? error.value : ''">
                  <el-input
                    v-model="accountForm.furi_last_name"
                    :placeholder="$t('my_page.furi_last_name')"
                    name="furi_last_name"
                    type="text"
                    tabindex="2"
                    maxlength="255"
                    @focus="resetValidate('furi_last_name')"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-row>
        <el-form-item class="email-login" label="" prop="email" :error="(error.key === 'email') ? error.value : ''">
          <el-row class="d-flex">
            <div class="label"><span>{{ $t('login.email') }}</span></div>
            <div class="required">{{ $t('form.required') }}</div>
          </el-row>
          <el-input
            ref="email"
            v-model.trim="accountForm.email"
            :placeholder="$t('login.email')"
            name="email"
            type="text"
            tabindex="2"
            maxlength="255"
            @focus="resetValidate('email')"
          />
        </el-form-item>
        <el-form-item class="password-login" label="" prop="password" :error="(error.key === 'password') ? error.value : ''">
          <el-row class="d-flex">
            <div class="label"><span>{{ $t('login.password') }}</span></div>
            <div class="required">{{ $t('form.required') }}</div>
          </el-row>
          <el-input
            ref="password"
            v-model.trim="accountForm.password"
            :placeholder="$t('login.password')"
            name="password"
            :type="showPass?'text':'password'"
            tabindex="3"
            maxlength="12"
            autocomplete="off"
            @focus="resetValidate('password')"
            @change="checkPassword"
          >
            <i slot="suffix" class="cursor-pointer" @click="displayPass('pass')">
              <img v-if="showPass" class="icon-show-pass" src="/assets/icon/eye-input.svg" alt="showpass"/>
              <img v-else class="icon-show-pass" src="/assets/icon/hide-eye.svg" alt="hidepass"/>
            </i>
          </el-input>
        </el-form-item>
        <el-form-item class="password-login" label="" prop="password_confirmation" :error="(error.key === 'password_confirmation') ? error.value : ''">
          <el-row class="d-flex">
            <div class="label"><span>{{ $t('register.password_confirmation') }}</span></div>
            <div class="required">{{ $t('form.required') }}</div>
          </el-row>
          <el-input
            ref="password_confirmation"
            v-model.trim="accountForm.password_confirmation"
            :placeholder="$t('register.password_confirmation')"
            name="password_confirmation"
            :type="showPassConfirm?'text':'password'"
            tabindex="3"
            maxlength="12"
            autocomplete="off"
            @keydown.native.tab.prevent="$refs.email.focus()"
            @focus="resetValidate('password_confirmation')"
          >
            <i slot="suffix" class="cursor-pointer" @click="displayPass('passConfirm')">
              <img v-if="showPassConfirm" class="icon-show-pass" src="/assets/icon/eye-input.svg"/>
              <img v-else class="icon-show-pass" src="/assets/icon/hide-eye.svg"/>
            </i>
          </el-input>
        </el-form-item>
        <div class="d-flex align-items-center">
          <el-checkbox v-model="accountForm.has_terms" size="large"></el-checkbox>
          <div class="terms cursor-pointer">
              <span class="text-primary-pink text-mobile">
                {{ $t('register.terms') }}
              </span>
            <span class="text-primary-black text-mobile" @click="accountForm.has_terms = !accountForm.has_terms">{{ $t('register.agree') }}</span>
          </div>
        </div>
        <div class="description">
          <el-checkbox v-model="accountForm.has_agreement" :label="$t('register.description')" size="large"></el-checkbox>
        </div>

        <el-form-item class="button-login">
          <div :class="{'disabled' : disabledButton}">
            <el-button
              v-loading.fullscreen.lock="fullscreenLoading"
              :loading="loading"
              :disabled="disabledButton"
              type="danger"
              @click.native.prevent="login"
            >
              {{ $t('register.send') }}
            </el-button>
          </div>
        </el-form-item>
        <div class="link-register text-center">
          <span class="text-mobile text-primary-black">{{ $t('register.have_account') }}</span>
          <span class="text-mobile cursor-pointer underline-hover text-primary-pink" @click="changeLink('login')">{{ $t('register.here') }}</span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import {
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  INDEX_SET_ERROR,
  AUTH_REGISTER
} from '../../store/store.const'
import { validEmail, validFullWidth, validHalfWidth, validOnlyHalfWidth } from '@/utils/validate'

export default {
  name: 'LoginElement',
  data() {
    const validFormEmail = (rule, value, callback) => {
      if (value && value.length > 255) {
        callback(new Error(this.$t('validation.halfwidth_email_length', { _field_: this.$t('login.email') })))
      }
      if (!validHalfWidth(value)) {
        callback(new Error(this.$t('validation.halfwidth_length', { _field_: this.$t('login.email') })))
      }
      if (!validEmail(value)) {
        callback(new Error(this.$t('validation.email', { _field_: this.$t('login.email') })))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('validation.required', { _field_: this.$t('login.password') }).toString()))
      } else {
        if (!validOnlyHalfWidth(value)) {
          callback(new Error(this.$t('validation.halfwidth_length', { _field_: this.$t('login.password') })))
        }
        if (value.length < 4 || value.length > 12) {
          callback(new Error(this.$t('validation.pass_format', { _field_: this.$t('login.password') })))
        }
        callback()
      }
    }
    const validateConfirmPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('validation.required', { _field_: this.$t('register.password_confirmation') }).toString()))
      } else if (value !== this.accountForm.password) {
        callback(new Error(this.$t('validation.passNotMatch').toString()))
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
    const validFormLength = (rule, value, callback, message) => {
      if (value && value.length > 255) {
        callback(new Error(this.$t('validation.max_length', { _field_: message })))
      } else {
        callback()
      }
    }
    const validFullWidthLength = (rule, value, callback, message) => {
      if (!validFullWidth(value)) {
        callback(new Error(this.$t('validation.max_length', { _field_: message })))
      } else {
        callback()
      }
    }
    return {
      accountForm: {
        first_name: '',
        last_name: '',
        furi_first_name: '',
        furi_last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        has_terms: false,
        has_agreement: false,
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      accountRules: {
        email: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('login.email') }), trigger: 'blur' },
          { validator: validFormEmail, trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('login.password') }), trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        password_confirmation: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('register.password_confirmation') }), trigger: 'blur' },
          {
            validator: validateConfirmPass,
            message: this.$t('validation.passNotMatch', { _field_: this.$t('register.password_confirmation') }),
            trigger: 'blur'
          }
        ],
        first_name: [
          { validator: validRequired, message: this.$t('validation.required', { _field_: this.$t('my_page.first_name') }), trigger: 'blur' },
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.first_name') }), trigger: 'blur' }
        ],
        last_name: [
          { validator: validRequired, message: this.$t('validation.required', { _field_: this.$t('my_page.last_name') }), trigger: 'blur' },
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.last_name') }), trigger: 'blur' }
        ],
        furi_first_name: [
          { validator: validRequired, message: this.$t('validation.required', { _field_: this.$t('my_page.furi_first_name') }), trigger: 'blur' },
          { validator: validFullWidthLength, message: this.$t('validation.fullwidth_length', { _field_: this.$t('my_page.furi_first_name') }), trigger: 'blur' }
        ],
        furi_last_name: [
          { validator: validRequired, message: this.$t('validation.required', { _field_: this.$t('my_page.furi_last_name') }), trigger: 'blur' },
          { validator: validFullWidthLength, message: this.$t('validation.fullwidth_length', { _field_: this.$t('my_page.furi_last_name') }), trigger: 'blur' }
        ],
        remember: []
      },
      valid: false,
      capsToolPasswordTip: false,
      loading: false,
      fullscreenLoading: false,
      showPass: true,
      showPassConfirm: true
    }
  },
  computed: {
    disabledButton() {
      return !this.accountForm.has_terms || !this.accountForm.has_agreement
    }
  },
  created() {
    if (this.$refs.accountForm !== undefined) {
      this.resetValidate('accountForm')
    }
  },
  methods: {
    checkPassword() {
      if (this.accountForm.password_confirmation) {
        this.validate('password_confirmation')
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
    login() {
      this.error = { key: null, value: '' }
      this.$refs.accountForm.validate(async valid => {
        if (valid) {
          try {
            await this.$store.commit(INDEX_SET_LOADING, true)
            const dto = _.cloneDeep(this.accountForm)
            delete dto.errors
            const data = await this.$store.dispatch(AUTH_REGISTER, {
              ...dto
            })
            switch (data.status_code) {
              case 200:
                await this.$store.commit(INDEX_SET_SUCCESS, {
                  show: true,
                  text: data.messages
                })
                this.changeLink('/login')
                break
              case 422:
                for (const [key] of Object.entries(data.data)) {
                  this.error = { key, value: data.data[key][0] }
                }
                break
              case 500:
                await this.$store.commit(INDEX_SET_ERROR, {
                  show: true,
                  text: this.$t('content.EXC_001')
                })
                break
              default:
                await this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.messages })
                break
            }
          } catch (err) {
            await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
          }
          await this.$store.commit(INDEX_SET_LOADING, false)
        }
      })
    },
    changeLink(state) {
      this.$router.push(state)
    },
    displayPass(type) {
      if (type === 'pass') {
        this.showPass = !this.showPass
      } else {
        this.showPassConfirm = !this.showPassConfirm
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
