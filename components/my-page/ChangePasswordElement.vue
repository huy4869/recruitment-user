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
                      <el-form-item label="" prop="password" :error="(error.key === 'password') ? error.value : ''">
                        <el-input
                          ref="password"
                          v-model="accountForm.password"
                          :placeholder="$t('my_page.current_password')"
                          name="password"
                          type="password"
                          tabindex="3"
                          maxlength="32"
                          autocomplete="off"
                          show-password
                          @focus="resetValidate('password')"
                        />
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
                      <el-form-item label="" prop="new_password" :error="(error.key === 'new_password') ? error.value : ''">
                        <el-input
                          ref="new_password"
                          v-model="accountForm.password"
                          :placeholder="$t('my_page.new_password')"
                          name="new_password"
                          type="password"
                          tabindex="3"
                          maxlength="32"
                          autocomplete="off"
                          show-password
                          @focus="resetValidate('new_password')"
                        />
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
                      <el-form-item label="" prop="new_password_confirmation" :error="(error.key === 'new_password_confirmation') ? error.value : ''">

                      <el-input
                        ref="new_password_confirmation"
                        v-model="accountForm.new_password_confirmation"
                        :placeholder="$t('my_page.new_password_confirmation')"
                        name="new_password_confirmation"
                        type="password"
                        tabindex="3"
                        maxlength="32"
                        autocomplete="off"
                        show-password
                        @focus="resetValidate('new_password_confirmation')"
                      />
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
import BorderElement from './BorderElement'

export default {
  name: 'ChangePasswordElement',
  components: { BorderElement },
  data() {
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
        callback(new Error(this.$t('validation.passNotMatch').toString()))
      } else {
        callback()
      }
    }
    return {
      accountForm: {
        password: '',
        new_password: '',
        new_password_confirmation: '',
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      accountRules: {
        password: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('login.password') }), trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        new_password: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('login.password') }), trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        new_password_confirmation: [
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
      loading: false
    }
  },
  created() {
  },
  methods: {
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.accountForm.fields.find((f) => f.prop === ref).clearValidate()
      this.accountForm.errors[ref] = ''
    }
  }
}
</script>
