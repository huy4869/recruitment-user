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
              type="text"
              tabindex="2"
              show-word-limit
              @focus="resetValidate('email')"
            />
          </el-form-item>
          <el-form-item class="password-login" label="" prop="password" :error="(error.key === 'password') ? error.value : ''">
            <div class="label">{{ $t('login.password') }}</div>
            <el-input
              ref="password"
              v-model="accountForm.password"
              :placeholder="$t('login.password')"
              name="password"
              type="password"
              tabindex="3"
              maxlength="32"
              autocomplete="off"
              show-password
              @keydown.native.enter="login"
              @keydown.native.tab.prevent="$refs.email.focus()"
              @focus="resetValidate('password')"
            />
          </el-form-item>
          <div class="d-flex align-items-center check-remember">
            <el-checkbox v-model="accountForm.remember" :label="$t('login.remember_me')" size="large"></el-checkbox>
            <div class="login-here">
              <span>{{ $t('login.forgot_password') }}</span>
              <span class="forgot-password" @click="changeLink('forgot-password')">
                {{ $t('login.here') }}
              </span>
            </div>
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
                {{ $t('login.title') }}
              </el-button>
            </div>
          </el-form-item>
          <div class="link-register">
            <span class="register-button" @click="changeLink('register')">{{ $t('login.create_new_account') }}</span>
          </div>
          <div id="here-login" class="here-mobile text-center">
            <span class="text-primary-black">{{ $t('login.forgot_password') }}</span>
            <span class="text-primary-pink cursor-pointer" @click="changeLink('forgot-password')">
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
import {
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  INDEX_SET_ERROR
} from '../../store/store.const'
import { validEmail, validHalfWidth } from '@/utils/validate'

export default {
  name: 'LoginElement',
  data() {
    const validFormEmail = (rule, value, callback) => {
      if (value && value.length > 255) {
        callback(new Error(this.$t('validation.max_length', { _field_: this.$t('login.email') })))
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
        if (!validHalfWidth(value)) {
          callback(new Error(this.$t('validation.halfwidth_length', { _field_: this.$t('login.email') })))
        }
        if (value.length < 4 || value.length > 12) {
          callback(new Error(this.$t('validation.pass_format')))
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
      fullscreenLoading: false
    }
  },
  computed: {
    disabledButton() {
      return this.accountForm.email === '' || this.accountForm.password === ''
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
                this.$router.push('/')
                break
              case 422:
                for (const [key] of Object.entries(data.data)) {
                  this.error = { key, value: data.data[key][0] }
                }
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
    }
  }
}
</script>

<style scoped lang="scss">
</style>
