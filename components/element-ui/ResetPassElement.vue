<template>
  <div class="login-element reset-password-element">
    <img class="logo-login cursor-pointer" src="/assets/images/logo_white.svg" alt="" @click="changeLink('/')">
    <div>
      <div class="login-title">{{ $t('forgot_pass.reset') }}</div>
      <div id="forgot-des" class="text-center">
        <div class="text-primary-black text-mobile">{{ $t('forgot_pass.reset_des') }}</div>
      </div>
      <el-form
        ref="accountForm"
        :model="accountForm"
        :rules="accountRules"
        autocomplete="off"
        label-position="left"
        @submit.native.prevent
      >
        <el-form-item class="password-login" prop="password">
          <div class="label">{{ $t('login.password') }}</div>
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
          >
            <i slot="suffix" class="cursor-pointer" @click="displayPass('pass')">
              <img v-if="showPass" class="icon-show-pass" src="/assets/icon/eye-input.svg" alt="showpass"/>
              <img v-else class="icon-show-pass" src="/assets/icon/hide-eye.svg" alt="hidepass"/>
            </i>
          </el-input>
        </el-form-item>
        <el-form-item class="password-login" prop="password_confirmation">
          <div class="label">{{ $t('register.password_confirmation') }}</div>
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

        <el-form-item class="button-login">
          <div :class="{'disabled' : disabledButton}">
            <el-button
              v-loading.fullscreen.lock="fullscreenLoading"
              :loading="loading"
              type="danger"
              @click.native.prevent="login"
            >
              {{ $t('forgot_pass.reset') }}
            </el-button>
          </div>
        </el-form-item>
        <div class="link-register text-center">
          <span class="underline-hover text-mobile cursor-pointer text-primary-pink" @click="changeLink('register')">{{ $t('login.create_new_account') }}</span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  INDEX_SET_ERROR,
  AUTH_CHECK_TOKEN,
  AUTH_RESET_PASS
} from '../../store/store.const'
import { validEmail, validOnlyHalfWidth } from '@/utils/validate'

export default {
  name: 'ResetPasswordElement',
  data() {
    const validFormEmail = (rule, value, callback) => {
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
        callback(new Error(this.$t('validation.passNotMatch', { _field_: this.$t('register.password_confirmation') }).toString()))
      } else {
        callback()
      }
    }
    return {
      accountForm: {
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
            message: this.$t('validation.passNotMatch', { _field_: this.$t('register.password_confirmation') }).toString(),
            trigger: 'blur'
          }
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
      return this.accountForm.password_confirmation === '' || this.accountForm.password === ''
    }
  },
  async created() {
    this.token = this.$route.query.token
    if (this.token == null || this.token === '') {
      await this.$router.push('/')
    } else {
      const data = await this.$store.dispatch(AUTH_CHECK_TOKEN, {
        token: this.token
      })
      switch (data.status_code) {
        case 200:
          break
        case 500:
          await this.$store.commit(INDEX_SET_ERROR, {
            show: true,
            text: this.$t('content.EXC_001')
          })
          await this.$router.push('/404-not-found')
          break
        default:
          this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.messages })
          await this.$router.push('/404-not-found')
          break
      }
    }
  },
  methods: {
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
            const dto = {
              token: this.token,
              password: this.accountForm.password,
              password_confirmation: this.accountForm.password_confirmation
            }
            const data = await this.$store.dispatch(AUTH_RESET_PASS, dto)

            switch (data.status_code) {
              case 200:
                this.$store.commit(INDEX_SET_SUCCESS, {
                  show: true,
                  text: data.messages
                })
                this.$router.push('/login')
                break
              case 422:
                for (const [k] of Object.entries(data.data)) {
                  this.error = { key: k, value: data.data[k][0] }
                  this.errorResponse.push({ key: k, value: data.data[k][0] })
                }
                break
              case 500:
                await this.$store.commit(INDEX_SET_ERROR, {
                  show: true,
                  text: this.$t('content.EXC_001')
                })
                break
              default:
                this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.messages })
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
