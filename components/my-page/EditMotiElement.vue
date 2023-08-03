<template>
  <div class="right-content-element">
    <div class="edit-cv-element">
      <div class="edit-cv-title">{{ $t('motivation.edit') }}</div>
      <div class="edit-cv-content edit-form-content">
        <div class="card-text-title card-title-mobile"> {{ $t('motivation.edit') }}</div>
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
                <div class="label"><span>{{ $t('motivation.name') }}</span></div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="motivation" :error="(error.key === 'motivation') ? error.value : ''">
                        <el-input
                          ref="motivation"
                          v-model="accountForm.motivation"
                          :placeholder="$t('motivation.name')"
                          :autosize="{ minRows: 5, maxRows: 12}"
                          name="motivation"
                          type="textarea"
                          maxlength="2000"
                          tabindex="2"
                          @focus="resetValidate('motivation')"
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
                <div class="label"><span>{{ $t('motivation.note') }}</span></div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="noteworthy" :error="(error.key === 'noteworthy') ? error.value : ''">
                        <el-input
                          ref="alias_name"
                          v-model="accountForm.noteworthy"
                          :placeholder="$t('motivation.note')"
                          :autosize="{ minRows: 5, maxRows: 12}"
                          name="noteworthy"
                          type="textarea"
                          maxlength="2000"
                          tabindex="2"
                          @focus="resetValidate('noteworthy')"
                        />
                      </el-form-item>
                      <div class="sm-text">{{ $t('my_page.currently') }}{{ experienceLength }}{{ $t('my_page.characters') }}</div>
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
      <el-button class="card-button btn-right" type="danger" @click.native="update" >{{ $t('my_page.save') }}</el-button>
    </div>
    <ConfirmModal
      v-show="confirmModal"
      :text="$t('confirm_modal.back_confirm')"
      @close="closeConfirmModal"
      @handleRouter="handleRouter('/my-page/motivation')">
    </ConfirmModal>
  </div>
</template>

<script>
import BorderElement from './BorderElement'
import {
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  MOTIVATION_UPDATE
} from '@/store/store.const'

export default {
  name: 'EditCvElement',
  components: { BorderElement },
  props: {
    motivation: {
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
        motivation: '',
        noteworthy: '',
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      accountRules: {
        motivation: [
          { validator: validAreaLength, message: this.$t('validation.area_length', { _field_: this.$t('motivation.name') }), trigger: 'blur' }
        ],
        noteworthy: [
          { validator: validAreaLength, message: this.$t('validation.area_length', { _field_: this.$t('motivation.note') }), trigger: 'blur' }
        ]
      },
      confirmModal: false
    }
  },
  computed: {
    contentLength() {
      return this.accountForm.motivation ? this.accountForm.motivation.length : ''
    },
    experienceLength() {
      return this.accountForm.noteworthy ? this.accountForm.noteworthy.length : ''
    }
  },
  watch: {
    motivation() {
      for (const item in this.motivation) {
        this.accountForm[item] = this.motivation[item]
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
    handleRouter(route) {
      this.$router.push(route)
    },
    showConfirmModal() {
      this.confirmModal = true
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
            const response = await this.$store.dispatch(MOTIVATION_UPDATE, {
              ...dto
            })
            if (response.status_code === 200) {
              await this.$store.commit(INDEX_SET_SUCCESS, {
                show: true,
                text: response.messages
              })
              this.handleRouter('/my-page/motivation')
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
    }
  }
}
</script>
