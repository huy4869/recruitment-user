<template>
  <div class="login-element">
    <el-row>
      <el-col class="col-mobile"  :span="12">
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
        >
          <el-form-item class="password-login" prop="password">
            <div class="label">{{ $t('login.password') }}</div>
            <el-input
              ref="password"
              v-model="accountForm.password"
              :placeholder="$t('login.password')"
              name="password"
              :type="showPass?'text':'password'"
              tabindex="3"
              maxlength="32"
              autocomplete="off"
              @keydown.native.enter="login"
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
              v-model="accountForm.password_confirmation"
              :placeholder="$t('register.password_confirmation')"
              name="password_confirmation"
              :type="showPassConfirm?'text':'password'"
              tabindex="3"
              maxlength="32"
              autocomplete="off"
              @keydown.native.enter="login"
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
                :disabled="disabledButton"
                type="danger"
                @click.native.prevent="login"
              >
                {{ $t('register.send') }}
              </el-button>
            </div>
          </el-form-item>
          <div class="here-mobile text-center">
            <span class="text-mobile cursor-pointer text-primary-pink" @click="changeLink('register')">{{ $t('login.create_new_account') }}</span>
          </div>
        </el-form>
      </el-col>
      <el-col :span="12" class="col-mobile image-login">
        <img class="img-login" src="/assets/images/login.svg" alt="">
      </el-col>
    </el-row>
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
import { validEmail } from '@/utils/validate'

export default {
  name: 'ForgotElement',
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
        callback(new Error(this.$t('validation.required', { _field_: this.$t('account.password') }).toString()))
      } else {
        if (value.length < 4 || value.length > 12) {
          callback(new Error(this.$t('validation.pass_format')))
        }
        if (this.accountForm.password_confirmation !== '') {
          this.$refs.accountForm.validateField('password_confirmation')
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
            message: this.$t('validation.passNotMatch'),
            trigger: 'blur'
          }
        ],
        remember: []
      },
      valid: false,
      capsToolPasswordTip: false,
      loading: false,
      fullscreenLoading: false,
      showPass: false,
      showPassConfirm: false
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
      this.$router.push('/')
    } else {
      const data = await this.$store.dispatch(AUTH_CHECK_TOKEN, {
        token: this.token
      })
      if (data.status_code !== 200) {
        this.$router.push('/')
        this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.messages })
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
