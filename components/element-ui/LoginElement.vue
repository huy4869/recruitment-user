<template>
  <div class="login-element">
    <el-row>
      <el-col :span="12">
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
          <el-form-item class="password-login" label="" prop="password">
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
              @keydown.native.enter="login"
              @keydown.native.tab.prevent="$refs.email.focus()"
              @focus="resetValidate('password')"
              show-password
            />
          </el-form-item>
          <div class="d-flex align-items-center check-remember">
            <el-checkbox v-model="accountForm.remember" :label="$t('login.remember_me')" size="large"></el-checkbox>
            <div>
              <span>{{ $t('login.forgot_password') }}</span>
              <span class="forgot-password" @click="changeModal('forgot')">
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
            <span class="register-button" @click="changeModal('register')">{{ $t('login.create_new_account') }}</span>
          </div>
        </el-form>
      </el-col>
      <el-col :span="12">
        <img src="/assets/images/login.svg" alt="">
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
        callback(new Error(this.$t('validation.phone')))
      } else {
        callback()
      }
    }
    return {
      accountForm: {
        email: '',
        password: '',
        remember: '',
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
      if (this.accountForm.email === '' || this.accountForm.password === '') {
        return true
      }
      return false
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
    checkCapslock(e, attr) {
      const { key } = e
      this[attr] = key && key.length === 1 && (key >= 'A' && key <= 'Z')
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
    async changeModal(state) {
      await this.$emit('change', state)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
