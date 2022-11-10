<template>
  <div class="change-password-element">
    <div>
      <div class="change-password-title">
        <span>{{ $t('my_page.change_password') }}</span>
      </div>
      <div class="change-password-content edit-form-content">
        <el-form
          ref="accountForm"
          :model="accountForm"
          :rules="accountRules"
          autocomplete="off"
          label-position="left"
        >
          <div class="edit-form-input">
            <BorderElement :middle="false"></BorderElement>
            <el-row class="d-flex form-label-input">
              <el-col :md="6" :sm="24" class="col-label">
                <div class="label"><span>{{ $t('my_page.current_password') }}</span></div>
              </el-col>
              <el-col :md="18" :sm="24" >
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="current_password" :error="(error.key === 'current_password') ? error.value : ''">
                        <el-input
                          ref="current_password"
                          v-model="accountForm.current_password"
                          :placeholder="$t('my_page.current_password')"
                          name="current_password"
                          :type="showPass.current ? 'text' : 'password'"
                          tabindex="3"
                          maxlength="12"
                          autocomplete="off"
                          @focus="resetValidate('current_password')"
                        >
                          <i slot="suffix" class="cursor-pointer" @click="displayPass('current')">
                            <img v-if="showPass.current" class="icon-show-pass" src="/assets/icon/eye-input.svg" alt="showpass"/>
                            <img v-else class="icon-show-pass" src="/assets/icon/hide-eye.svg" alt="hidepass"/>
                          </i>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <BorderElement :middle="true"></BorderElement>
            <el-row class="d-flex form-label-input">
              <el-col :md="6" :sm="24" class="col-label">
                <div class="label"><span>{{ $t('my_page.new_password') }}</span></div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="new_password" :error="(error.key === 'password') ? error.value : ''">
                        <el-input
                          ref="new_password"
                          v-model="accountForm.new_password"
                          :placeholder="$t('my_page.new_password')"
                          name="new_password"
                          :type="showPass.new ? 'text' : 'password'"
                          tabindex="3"
                          maxlength="12"
                          autocomplete="off"
                          @focus="resetValidate('new_password')"
                        >
                          <i slot="suffix" class="cursor-pointer" @click="displayPass('new')">
                            <img v-if="showPass.new" class="icon-show-pass" src="/assets/icon/eye-input.svg" alt="showpass"/>
                            <img v-else class="icon-show-pass" src="/assets/icon/hide-eye.svg" alt="hidepass"/>
                          </i>
                        </el-input>
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
                  <span>{{ $t('my_page.new_password_confirmation') }}</span>
                </div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="new_password_confirmation" :error="(error.key === 'password_confirmation') ? error.value : ''">

                      <el-input
                        ref="new_password_confirmation"
                        v-model="accountForm.new_password_confirmation"
                        :placeholder="$t('my_page.new_password_confirmation')"
                        name="new_password_confirmation"
                        :type="showPass.confirm ? 'text' : 'password'"
                        tabindex="3"
                        maxlength="12"
                        autocomplete="off"
                        @focus="resetValidate('new_password_confirmation')"
                      >
                        <i slot="suffix" class="cursor-pointer" @click="displayPass('confirm')">
                          <img v-if="showPass.confirm" class="icon-show-pass" src="/assets/icon/eye-input.svg" alt="showpass"/>
                          <img v-else class="icon-show-pass" src="/assets/icon/hide-eye.svg" alt="hidepass"/>
                        </i>
                      </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <BorderElement :middle="true"></BorderElement>
          </div>
          <el-row class="d-flex form-label-input">
            <el-col :md="6" :sm="24" class="show-pc">
            </el-col>
            <el-col :md="18" :sm="24">
              <el-form-item class="button-change">
                <el-button
                  :loading="loading"
                  type="danger"
                  @click="submit"
                  :disabled="disabledButton"
                >
                  {{ $t('my_page.change') }}
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

import { validOnlyHalfWidth } from '../../utils/validate'
import {
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  INDEX_SET_ERROR,
  CHANGE_PASS
} from '../../store/store.const'
import BorderElement from './BorderElement'

export default {
  name: 'ChangePasswordElement',
  components: { BorderElement },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('validation.required', { _field_: this.$t('my_page.current_password') }).toString()))
      } else {
        if (value.length < 4 || value.length > 12) {
          callback(new Error(this.$t('validation.pass_format', { _field_: this.$t('my_page.current_password') })))
        }
        if (!validOnlyHalfWidth(value)) {
          callback(new Error(this.$t('validation.halfwidth_length', { _field_: this.$t('my_page.current_password') })))
        }
        callback()
      }
    }
    const validateNewPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('validation.required', { _field_: this.$t('my_page.new_password') }).toString()))
      } else {
        if (value.length < 4 || value.length > 12) {
          callback(new Error(this.$t('validation.pass_format', { _field_: this.$t('my_page.new_password') })))
        }
        if (!validOnlyHalfWidth(value)) {
          callback(new Error(this.$t('validation.halfwidth_length', { _field_: this.$t('my_page.new_password') })))
        }
        callback()
      }
      if (this.accountForm.password_confirmation !== '') {
        this.$refs.accountForm.validateField('password_confirmation')
      }
    }
    const validateConfirmPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('validation.required', { _field_: this.$t('my_page.new_password_confirmation') }).toString()))
      } else {
        if (value !== this.accountForm.new_password) {
          callback(new Error(this.$t('validation.passNotMatch', { _field_: this.$t('my_page.new_password_confirmation') }).toString()))
        }
        if (!validOnlyHalfWidth(value)) {
          callback(new Error(this.$t('validation.halfwidth_length', { _field_: this.$t('my_page.new_password_confirmation') })))
        }
        callback()
      }
    }
    return {
      accountForm: {
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      accountRules: {
        current_password: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('my_page.current_password') }), trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        new_password: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('my_page.new_password') }), trigger: 'blur' },
          { validator: validateNewPass, trigger: 'blur' }
        ],
        new_password_confirmation: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('my_page.new_password_confirmation') }), trigger: 'blur' },
          { validator: validateConfirmPass, trigger: 'blur' }
        ],
        remember: []
      },
      valid: false,
      capsToolPasswordTip: false,
      loading: false,
      showPass: {
        current: true,
        new: true,
        confirm: true
      }
    }
  },
  computed: {
    disabledButton() {
      if (this.accountForm.new_password !== this.accountForm.new_password_confirmation) {
        return true
      }
      return this.accountForm.current_password === '' || this.accountForm.new_password === '' ||
        this.accountForm.new_password_confirmation === ''
    }
  },
  async created() {
    await this.$store.commit(INDEX_SET_LOADING, false)
  },
  methods: {
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.accountForm.fields.find((f) => f.prop === ref).clearValidate()
      this.accountForm.errors[ref] = ''
    },
    displayPass(state) {
      this.showPass[state] = !this.showPass[state]
    },
    submit() {
      this.error = { key: null, value: '' }
      this.$refs.accountForm.validate(async valid => {
        if (valid) {
          try {
            this.$store.commit(INDEX_SET_LOADING, true)
            const data = await this.$store.dispatch(CHANGE_PASS, {
              current_password: this.accountForm.current_password,
              password_confirmation: this.accountForm.new_password_confirmation,
              password: this.accountForm.new_password
            })

            switch (data.status_code) {
              case 200:
                await this.$store.commit(INDEX_SET_SUCCESS, {
                  show: true,
                  text: data.messages
                })
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
    }
  }
}
</script>
