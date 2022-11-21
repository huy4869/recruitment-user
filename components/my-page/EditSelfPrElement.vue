<template>
  <div class="right-content-element">
    <div class="edit-cv-element">
      <div class="edit-cv-title">{{ $t('self_pr.edit') }}</div>
      <div class="edit-cv-content edit-form-content">
        <div class="card-text-title card-title-mobile"> {{ $t('self_pr.edit') }}</div>
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
                      <el-form-item label="" prop="favorite_skill" :error="(error.key === 'favorite_skill') ? error.value : ''">
                        <el-input
                          ref="favorite_skill"
                          v-model="accountForm.favorite_skill"
                          :placeholder="$t('self_pr.enter_business_content')"
                          :autosize="{ minRows: 5, maxRows: 12}"
                          name="favorite_skill"
                          type="textarea"
                          maxlength="2000"
                          tabindex="2"
                          @focus="resetValidate('favorite_skill')"
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
                      <el-form-item label="" prop="experience_knowledge" :error="(error.key === 'experience_knowledge') ? error.value : ''">
                        <el-input
                          ref="alias_name"
                          v-model="accountForm.experience_knowledge"
                          :placeholder="$t('self_pr.enter_experience')"
                          :autosize="{ minRows: 5, maxRows: 12}"
                          name="experience_knowledge"
                          type="textarea"
                          maxlength="2000"
                          tabindex="2"
                          @focus="resetValidate('experience_knowledge')"
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
                      <el-form-item label="" prop="self_pr" :error="(error.key === 'self_pr') ? error.value : ''">
                        <el-input
                          ref="self_pr"
                          v-model="accountForm.self_pr"
                          :placeholder="$t('self_pr.enter_pr')"
                          :autosize="{ minRows: 5, maxRows: 12}"
                          name="self_pr"
                          type="textarea"
                          maxlength="2000"
                          tabindex="2"
                          @focus="resetValidate('self_pr')"
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
      <el-button class="card-button btn-right" type="danger" @click.native="update" >{{ $t('my_page.edit') }}</el-button>
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
import _ from 'lodash'
import BorderElement from './BorderElement'
import {
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  USER_SELF_PR_UPDATE
} from '@/store/store.const'

export default {
  name: 'EditCvElement',
  components: { BorderElement },
  props: {
    self_pr: {
      type: Object,
      default: () => {}
    }
  },
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
        favorite_skill: '',
        experience_knowledge: '',
        self_pr: '',
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      accountRules: {
        favorite_skill: [
          { validator: validAreaLength, message: this.$t('validation.area_length', { _field_: this.$t('self_pr.business_content') }), trigger: 'blur' }
        ],
        experience_knowledge: [
          { validator: validAreaLength, message: this.$t('validation.area_length', { _field_: this.$t('self_pr.experience_knowledge') }), trigger: 'blur' }
        ],
        self_pr: [
          { validator: validAreaLength, message: this.$t('validation.area_length', { _field_: this.$t('self_pr.pr') }), trigger: 'blur' }
        ]
      },
      confirmModal: false,
      clonedAccountForm: {}
    }
  },
  computed: {
    contentLength() {
      return this.accountForm.favorite_skill ? this.accountForm.favorite_skill.length : ''
    },
    experienceLength() {
      return this.accountForm.experience_knowledge ? this.accountForm.experience_knowledge.length : ''
    },
    prLength() {
      return this.accountForm.self_pr ? this.accountForm.self_pr.length : ''
    }
  },
  watch: {
    async self_pr() {
      await this.getSelfPrData()
      this.clonedAccountForm = _.cloneDeep(this.accountForm)
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
      if (_.isEqual(this.accountForm, this.clonedAccountForm)) {
        this.handleRouter('/my-page/self-pr')
      } else {
        this.confirmModal = true
      }
    },
    closeConfirmModal() {
      this.confirmModal = false
    },
    update() {
      this.error = { key: null, value: '' }
      this.$refs.accountForm.validate(async valid => {
        if (valid) {
          try {
            await this.$store.commit(INDEX_SET_LOADING, true)
            const dto = this.accountForm
            const response = await this.$store.dispatch(USER_SELF_PR_UPDATE, {
              ...dto
            })
            if (response.status_code === 200) {
              await this.$store.commit(INDEX_SET_SUCCESS, {
                show: true,
                text: response.messages
              })
              this.handleRouter('/my-page/self-pr')
            } else if (response.status_code === 500) {
              await this.$store.commit(INDEX_SET_ERROR, {
                show: true,
                text: this.$t('content.EXC_001')
              })
            } else {
              await this.$store.commit(INDEX_SET_ERROR, {
                show: true,
                text: response.messages
              })
            }
            await this.$store.commit(INDEX_SET_LOADING, false)
          } catch (err) {
            await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
          }
          await this.$store.commit(INDEX_SET_LOADING, false)
        }
      })
    },
    getSelfPrData() {
      for (const item in this.self_pr) {
        this.accountForm[item] = this.self_pr[item]
      }
    }
  }
}
</script>
