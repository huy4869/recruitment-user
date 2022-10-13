<template>
  <div class="right-content-element">
    <div class="edit-cv-element">
      <div class="edit-cv-title">{{ $t('self_pr.title') }}</div>
      <div class="edit-cv-content edit-form-content">
        <div class="card-text-title card-title-mobile"> {{ $t('self_pr.title') }}</div>
        <el-form
          ref="accountForm"
          :model="accountForm"
          :rules="accountRules"
          autocomplete="off"
          label-position="left"
        >
          <div class="edit-form-input">
            <BorderElement :middle="true"></BorderElement>
            <el-row class="d-flex form-label-input">
              <el-col :md="6" :sm="24" class="col-label">
                <div class="label"><span>{{ $t('self_pr.business_content') }}</span></div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="business_content" :error="(error.key === 'business_content') ? error.value : ''">
                        <el-input
                          ref="business_content"
                          v-model="accountForm.business_content"
                          :placeholder="$t('self_pr.enter_business_content')"
                          :autosize="{ minRows: 5, maxRows: 12}"
                          name="business_content"
                          type="textarea"
                          maxlength="2000"
                          tabindex="2"
                          @focus="resetValidate('business_content')"
                        />
                      </el-form-item>
                      <div class="sm-text">{{ $t('my_page.currently') }}{{ contentLength }}{{ $t('my_page.characters') }}</div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <BorderElement :middle="true"></BorderElement>
            <el-row class="d-flex form-label-input">
              <el-col :md="6" :sm="24" class="col-label">
                <div class="label"><span>{{ $t('self_pr.experience') }}{{ $t('self_pr.skill') }}</span></div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="experience" :error="(error.key === 'experience') ? error.value : ''">
                        <el-input
                          ref="alias_name"
                          v-model="accountForm.experience"
                          :placeholder="$t('self_pr.enter_experience')"
                          :autosize="{ minRows: 5, maxRows: 12}"
                          name="experience"
                          type="textarea"
                          maxlength="2000"
                          tabindex="2"
                          @focus="resetValidate('experience')"
                        />
                      </el-form-item>
                      <div class="sm-text">{{ $t('my_page.currently') }}{{ experienceLength }}{{ $t('my_page.characters') }}</div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <BorderElement :middle="true"></BorderElement>
            <el-row class="d-flex form-label-input">
              <el-col :md="6" :sm="24" class="col-label">
                <div class="label"><span>{{ $t('self_pr.pr') }}</span></div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="pr" :error="(error.key === 'pr') ? error.value : ''">
                        <el-input
                          ref="pr"
                          v-model="accountForm.pr"
                          :placeholder="$t('self_pr.enter_pr')"
                          :autosize="{ minRows: 5, maxRows: 12}"
                          name="pr"
                          type="textarea"
                          maxlength="2000"
                          tabindex="2"
                          @focus="resetValidate('pr')"
                        />
                      </el-form-item>
                      <div class="sm-text">{{ $t('my_page.currently') }}{{ prLength }}{{ $t('my_page.characters') }}</div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <BorderElement :middle="true"></BorderElement>
          </div>
        </el-form>
      </div>
    </div>
    <div id="btn-center" class="text-center">
      <el-button class="card-button" @click="showConfirmModal">{{ $t('my_page.back') }}</el-button>
      <el-button class="card-button btn-right" type="danger" @click.native="submit" >{{ $t('my_page.edit') }}</el-button>
    </div>
    <ConfirmModal
      v-show="confirmModal"
      :text="$t('confirm_modal.back_confirm')"
      @close="closeConfirmModal"
      @handleRouter="handleRouter('/my-page/self-pr')">
    </ConfirmModal>
  </div>
</template>

<script>
import BorderElement from './BorderElement'

export default {
  name: 'EditCvElement',
  components: { BorderElement },
  data() {
    const validAreaLength = (rule, value, callback, message) => {
      if (value && value.length > 2000) {
        callback(new Error(this.$t('validation.area_length', { _field_: message })))
      } else {
        callback()
      }
    }
    return {
      accountForm: {
        business_content: '',
        experience: '',
        pr: '',
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      accountRules: {
        business_content: [
          { validator: validAreaLength, message: this.$t('validation.area_length', { _field_: this.$t('career.business_content') }), trigger: 'blur' }
        ],
        experience: [
          { validator: validAreaLength, message: this.$t('validation.area_length', { _field_: this.$t('career.experience') }), trigger: 'blur' }
        ],
        pr: [
          { validator: validAreaLength, message: this.$t('validation.area_length', { _field_: this.$t('career.experience') }), trigger: 'blur' }
        ]
      },
      confirmModal: false
    }
  },
  computed: {
    contentLength() {
      return this.accountForm.business_content.length
    },
    experienceLength() {
      return this.accountForm.experience.length
    },
    prLength() {
      return this.accountForm.pr.length
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
    handleRouter(route) {
      this.$router.push(route)
    },
    showConfirmModal() {
      this.confirmModal = true
    },
    closeConfirmModal() {
      this.confirmModal = false
    },
    submit() {
      this.$refs.accountForm.validate(valid => {
        if (valid) {
          console.log('submit')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
