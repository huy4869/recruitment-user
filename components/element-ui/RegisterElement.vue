<template>
  <div id="register-element" class="login-element">
    <el-row>
      <el-col class="col-mobile"  :span="12">
        <div class="login-title">{{ $t('register.title') }}</div>
        <el-form
          ref="accountForm"
          :model="accountForm"
          :rules="accountRules"
          autocomplete="off"
          label-position="left"
        >
          <el-form-item class="email-login" :label="$t('login.email')" prop="email" :error="(error.key === 'email') ? error.value : ''">
<!--            <div class="label">{{ $t('login.email') }}</div>-->
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
          <el-form-item class="password-login" :label="$t('login.password')" prop="password" :error="(error.key === 'password') ? error.value : ''">
            <el-input
              ref="password"
              v-model.trim="accountForm.password"
              :placeholder="$t('login.password')"
              name="password"
              :type="showPass?'text':'password'"
              tabindex="3"
              maxlength="12"
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
          <el-form-item class="password-login" :label="$t('register.password_confirmation')" prop="password_confirmation" :error="(error.key === 'password_confirmation') ? error.value : ''">
            <el-input
              ref="password_confirmation"
              v-model.trim="accountForm.password_confirmation"
              :placeholder="$t('register.password')"
              name="password_confirmation"
              :type="showPassConfirm?'text':'password'"
              tabindex="3"
              maxlength="12"
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
          <div class="register-here text-primary-black text-center">
            <span class="text-mobile">{{ $t('register.have_account') }}</span>
            <span class="text-mobile cursor-pointer text-primary-pink" @click="changeLink('login')">{{ $t('register.here') }}</span>
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
  AUTH_REGISTER
} from '../../store/store.const'
import { validEmail, validHalfWidth, validOnlyHalfWidth } from '@/utils/validate'

export default {
  name: 'LoginElement',
  data() {
    const validFormEmail = (rule, value, callback) => {
      if (value && value.length > 255) {
        callback(new Error(this.$t('validation.halfwidth_email_length', { _field_: this.$t('login.email') })))
      }
      if (!validHalfWidth(value)) {
        callback(new Error(this.$t('validation.halfwidth_email_length', { _field_: this.$t('login.email') })))
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
            message: this.$t('validation.passNotMatch', { _field_: this.$t('register.password_confirmation') }),
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
      return !this.accountForm.has_terms || !this.accountForm.has_agreement
    }
  },
  created() {
    if (this.$refs.accountForm !== undefined) {
      this.resetValidate('accountForm')
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
              email: this.accountForm.email,
              password: this.accountForm.password,
              password_confirmation: this.accountForm.password_confirmation
            }
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
