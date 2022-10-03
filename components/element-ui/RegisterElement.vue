<template>
  <div class="login-element" id="register-element">
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
              show-word-limit
              @focus="resetValidate('email')"
            />
          </el-form-item>
          <el-form-item class="password-login" :label="$t('login.password')" prop="password">
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
              @focus="resetValidate('password')"
            />
          </el-form-item>
          <el-form-item class="password-login" :label="$t('register.password_confirmation')" prop="password_confirmation">
            <el-input
              ref="password_confirmation"
              v-model="accountForm.password_confirmation"
              :placeholder="$t('register.password_confirmation')"
              name="password_confirmation"
              type="password"
              tabindex="3"
              maxlength="32"
              autocomplete="off"
              show-password
              @keydown.native.enter="login"
              @keydown.native.tab.prevent="$refs.email.focus()"
              @focus="resetValidate('password_confirmation')"
            />
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
            <span class="text-mobile cursor-pointer text-primary-pink" @click="changeLink('register')">{{ $t('register.here') }}</span>
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
  CHAT_FETCH_ROOMS,
  CHAT_SET_UN_READ_MESSAGE
} from '../../store/store.const'
import { validEmail } from '@/utils/validate'

export default {
  name: 'LoginElement',
  data() {
    const validFormEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error(this.$t('validation.email', { _field_: this.$t('login.email') })))
      } else {
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
          { required: true, message: this.$t('validation.required', { _field_: this.$t('login.password') }), trigger: 'blur' }
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
      fullscreenLoading: false
    }
  },
  computed: {
    disabledButton() {
      return this.accountForm.email === '' || this.accountForm.password === '' ||
        this.accountForm.password_confirmation === '' || !this.accountForm.has_terms || !this.accountForm.has_agreement
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
                phone_number: this.accountForm.email,
                password: this.accountForm.password,
                remember: this.accountForm.remember ? 1 : 0
              }
            })
            switch (data.status_code) {
              case 200:
                await this.$store.commit(INDEX_SET_SUCCESS, {
                  show: true,
                  text: data.message
                })
                await this.$emit('close')
                if (this.$device.isMobile) {
                  const response = await this.$store.dispatch(CHAT_FETCH_ROOMS, {
                    per_page: 1000,
                    page: 1,
                    shop_id: '',
                    name: ''
                  })
                  if (response.status_code === 200 && response.data.data.length) {
                    this.$store.commit(CHAT_SET_UN_READ_MESSAGE, response.data.data.map(item => item.unread_total_user).reduce((prev, curr) => prev + curr, 0) || '')
                  }
                }
                break
              case 422:
                for (const [key] of Object.entries(data.data)) {
                  this.error = { key, value: data.data[key][0] }
                }
                break
              default:
                await this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.message })
                break
            }
          } catch (err) {
            await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
          }
          await this.$store.commit(INDEX_SET_LOADING, false)
        }
      })
    },
    async changeLink(state) {
      await this.$emit('change', state)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
