<template>
  <div class="login-element">
    <el-row>
      <el-col class="col-mobile" :span="12">
        <div class="login-title">{{ $t('login.title') }}</div>
        <el-form
          ref="accountForm"
          :model="accountForm"
          :rules="accountRules"
          autocomplete="off"
          label-position="left"
        >
          <el-form-item class="email-login" label="" prop="email" :error="(error.key === 'email') ? error.value : ''">
            <div class="label">{{ $t('login.email') }}</div>
            <el-input
              ref="email"
              v-model.trim="accountForm.email"
              :placeholder="$t('login.email')"
              name="email"
              maxlength="255"
              type="text"
              tabindex="2"
              @focus="resetValidate('email')"
            />
          </el-form-item>
          <el-form-item class="password-login" label="" prop="password" :error="(error.key === 'password') ? error.value : ''">
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
              @keydown.enter="login"
              @keydown.native.tab.prevent="$refs.email.focus()"
              @focus="resetValidate('password')"
            >
              <i slot="suffix" class="cursor-pointer" @click="displayPass()">
                <img v-if="showPass" class="icon-show-pass" src="/assets/icon/eye-input.svg" alt="showpass"/>
                <img v-else class="icon-show-pass" src="/assets/icon/hide-eye.svg" alt="hidepass"/>
              </i>
            </el-input>
          </el-form-item>
          <div class="d-flex align-items-center check-remember">
            <el-checkbox v-model="accountForm.remember" :label="$t('login.remember_me')" size="large"></el-checkbox>
            <div class="login-here">
              <span>{{ $t('login.forgot_password') }}</span>
              <span class="forgot-password underline-hover" @click="changeLink('forgot-password')">
                {{ $t('login.here') }}
              </span>
            </div>
          </div>
          <el-form-item class="button-login">
            <div :class="{'disabled' : disabledButton}">
              <el-button
                v-loading.fullscreen.lock="fullscreenLoading"
                :loading="loading"
                type="danger"
                @click.native.prevent="login"
              >
                {{ $t('login.title') }}
              </el-button>
            </div>
          </el-form-item>
          <div class="link-register">
            <span class="underline-hover register-button" @click="changeLink('register')">{{ $t('login.create_new_account') }}</span>
          </div>
          <div id="here-login" class="here-mobile text-center">
            <span class="text-primary-black">{{ $t('login.forgot_password') }}</span>
            <span class="underline-hover text-primary-pink cursor-pointer" @click="changeLink('forgot-password')">
              {{ $t('login.here') }}
            </span>
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
import _ from 'lodash'
import {
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  INDEX_SET_ERROR
} from '../../store/store.const'
import { validEmail, validHalfWidth, validOnlyHalfWidth } from '@/utils/validate'

export default {
  name: 'LoginElement',
  data() {
    const validFormEmail = (rule, value, callback) => {
      if (value && value.length > 255) {
        callback(new Error(this.$t('validation.halfwidth_email_length', { _field_: this.$t('login.email') })))
      }
      if (value.search(' ') !== -1) {
        callback(new Error(this.$t('validation.com002', { _field_: this.$t('login.email') })))
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
    return {
      accountForm: {
        email: '',
        password: '',
        remember: false,
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
        remember: []
      },
      valid: false,
      capsToolPasswordTip: false,
      loading: false,
      fullscreenLoading: false,
      showPass: true,
      routerBack: '/'
    }
  },
  computed: {
    disabledButton() {
      return this.accountForm.email === '' || !validEmail(this.accountForm.email) || !validHalfWidth(this.accountForm.email) ||
        !validHalfWidth(this.accountForm.password) || this.accountForm.password === '' || this.accountForm.password.length < 4 || this.accountForm.password.length > 12
    }
  },
  created() {
    const dataBack = _.cloneDeep(this.$cookies.get('auth.redirect'))
    if (dataBack !== undefined) {
      this.routerBack = this.$route.fullPath.replace('/login', dataBack)
    }
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
            const { data } = await this.$auth.loginWith('local', {
              data: {
                email: this.accountForm.email,
                password: this.accountForm.password,
                remember: this.accountForm.remember ? 1 : 0
              }
            })
            switch (data.status_code) {
              case 200:
                await this.$store.commit(INDEX_SET_SUCCESS, {
                  show: true,
                  text: data.messages
                })
                await this.$router.push(this.routerBack)
                if (this.routerBack !== '/') {
                  this.$cookies.set('auth.redirect', '/')
                }
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
    displayPass() {
      this.showPass = !this.showPass
    }
  }
}
</script>

<style scoped lang="scss">
</style>
