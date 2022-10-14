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
                      <el-form-item label="" prop="other_notable_things" :error="(error.key === 'other_notable_things') ? error.value : ''">
                        <el-input
                          ref="alias_name"
                          v-model="accountForm.other_notable_things"
                          :placeholder="$t('motivation.note')"
                          :autosize="{ minRows: 5, maxRows: 12}"
                          name="other_notable_things"
                          type="textarea"
                          maxlength="2000"
                          tabindex="2"
                          @focus="resetValidate('other_notable_things')"
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
      <el-button class="card-button btn-right" type="danger" @click.native="submit" >{{ $t('my_page.edit') }}</el-button>
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
        motivation: '',
        other_notable_things: '',
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
        other_notable_things: [
          { validator: validAreaLength, message: this.$t('validation.area_length', { _field_: this.$t('motivation.note') }), trigger: 'blur' }
        ]
      },
      confirmModal: false
    }
  },
  computed: {
    contentLength() {
      return this.accountForm.motivation.length
    },
    experienceLength() {
      return this.accountForm.other_notable_things.length
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
