<template>
  <div>
    <el-dialog
      class="form-dialog-apply"
      :title="$t('job.set_date_time_interview')"
      :visible.sync="applyDialogState"
      width="84%"
      top="5vh"
      :before-close="closeAboutDialog"
    >
      <el-form
        ref="formApply"
        :model="formApply"
        :rules="formApplyRules"
        autocomplete="off"
        label-position="left"
      >
        <div class="header-search">
          <div class="search-apply">
            <div class="header-search-left">
              <span>{{ $t('job.preferred_date') }}</span>
            </div>
            <div class="header-search-right">
              <el-form-item prop="date" :error="(error.key === 'date') ? error.value : ''">
                <el-select v-model="formApply.date" ref="date" :placeholder="$t('job.preferred_date')" @change="changeDay" @focus="resetValidate('date')">
                  <el-option
                    v-for="(item, index) in listDays"
                    :key="index"
                    :label="item.date_format"
                    :value="item.date"
                    :disabled="!item.is_enable">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="search-work-location">
            <div class="header-search-left">
              <span>{{ $t('job.desired_time') }}</span>
            </div>
            <div class="header-search-right">
              <el-form-item prop="hours" :error="(error.key === 'hours') ? error.value : ''">
                <el-select v-model="formApply.hours" ref="hours" :placeholder="$t('job.desired_time')" @focus="resetValidate('hours')">
                  <el-option
                    v-for="(item, index) in listTime"
                    :key="index"
                    :label="item.hours"
                    :value="item.hours"
                    :disabled="item.is_enabled_time !== 1">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="interview-time">
          {{ $t('job.interview_time') }}: {{ (formApply.date ? listDate[formApply.date].date_format : '') + ' ' + formApply.hours }}
        </div>
        <el-form-item prop="interview_approaches_id">
          <div class="form-change-method">
            <div class="title-form">
              <span>{{ $t('job.choose_preferred_method') }}</span>
            </div>
            <div class="method-content">
              <el-radio-group v-model="formApply.interview_approaches_id">
                <el-radio v-for="(method, index) in listMethod" :key="index" :label="method.id">{{ method.name }}</el-radio>
              </el-radio-group>
            </div>
            <div class="method-note">
              <span><span class="danger">※</span>{{ $t('job.note_choose_method') }}</span>
            </div>
          </div>
        </el-form-item>
        <div class="form-question">
          <div class="title-form">
            <span>{{ $t('job.question_request') }}</span>
          </div>
          <div class="question-note">({{ $t('job.question_request_note') }})</div>
          <div class="question-content">
            <el-form-item prop="note">
              <el-input
                v-model="formApply.note"
                type="textarea"
                :rows="7"
                maxlength="1000"
                :placeholder="$t('job.enter_your_question')"
                @focus="resetValidate('note')"
              >
              </el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="default" @click="closeAboutDialog">
          {{ $t('button.close_up') }}
        </el-button>
        <el-button type="danger" @click="submitApply">
          {{ $t('button.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import {
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  APPLICATION_GET_DATA_APPLICATION,
  APPLICATION_GET_DATA_DETAIL_APPLICATION,
  APPLICATION_CREATE_APPLICATION,
  APPLICATION_UPDATE_APPLICATION,
  INDEX_SET_SUCCESS
} from '../../store/store.const'

export default {
  name: 'FormApplyJobElement',
  props: ['applyDialog', 'isEdit', 'job', 'apply'],
  data() {
    const validFormLength = (rule, value, callback) => {
      if (value && value.length > 1000) {
        callback(new Error(this.$t('validation.max_length_text', { _field_: this.$t('job.question_request'), _max_: 1000 })))
      } else {
        callback()
      }
    }
    const validRequired = (rule, value, callback, message) => {
      if (value) {
        callback()
      } else {
        callback(new Error(message))
      }
    }
    return {
      jobStatus: true,
      applyDialogState: false,
      confirmModal: false,
      formApply: {
        date: '',
        hours: '',
        interview_approaches_id: '',
        note: '',
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      listDays: [
        {
          date_format: this.$t('job.preferred_date'),
          is_enable: false
        }
      ],
      listDate: {},
      listTime: [
        {
          hours: this.$t('job.desired_time'),
          is_enable_time: 0
        }
      ],
      listMethod: [],
      formApplyRules: {
        interview_approaches_id: [
          { validator: validRequired, message: this.$t('validation.com010'), trigger: 'blur' }
        ],
        note: [
          { validator: validFormLength, trigger: 'blur' }
        ]
      },
      clonedformApply: {}
    }
  },
  async created() {
  },
  watch: {
    async applyDialog() {
      this.applyDialogState = !this.applyDialogState
      if (this.applyDialogState) {
        await this.getDetailJob()
      }
      this.formApply.errors = {}
      this.clonedformApply = _.cloneDeep(this.formApply)
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog')
    },
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.formApply.fields.find((f) => f.prop === ref).clearValidate()
      this.formApply.errors[ref] = ''
    },
    async getDetailJob() {
      if (this.isEdit) {
        const dataResponse = await this.$store.dispatch(APPLICATION_GET_DATA_DETAIL_APPLICATION, this.apply)
        if (dataResponse.status_code === 200) {
          this.formApply.date = dataResponse.data.application_user.date
          this.formApply.hours = dataResponse.data.application_user.hours
          this.formApply.interview_approaches_id = dataResponse.data.application_user.interview_approaches.id
          this.formApply.note = dataResponse.data.application_user.interview_approaches.approach
          this.listDays = dataResponse.data.list_time.time
          this.listMethod = dataResponse.data.list_time.approach
          this.listTime = []
          const dataDate = {}
          dataResponse.data.list_time.time.forEach(date => {
            dataDate[date.date] = date
          })
          this.listDate = dataDate
          this.listTime = this.listDate[dataResponse.data.application_user.date].times
        } else if (dataResponse.status_code === 400) {
          this.$router.push('/job-not-found')
        } else if (dataResponse.status_code === 500) {
          await this.$store.commit(INDEX_SET_ERROR, {
            show: true,
            text: this.$t('content.EXC_001')
          })
        } else {
          await this.$store.commit(INDEX_SET_ERROR, {
            show: true,
            text: dataResponse.messages
          })
        }
      } else {
        const dataResponse = await this.$store.dispatch(APPLICATION_GET_DATA_APPLICATION, this.job.id)
        if (dataResponse.status_code === 200) {
          this.listDays = dataResponse.data.time
          this.listTime = []
          const dataDate = {}
          for (let x = 0; x < this.listDays.length; x++) {
            if (this.listDays[x].is_enable) {
              this.formApply.date = this.listDays[x].date
              this.listTime = this.listDays[x].times
              break
            }
          }
          for (let y = 0; y < this.listTime.length; y++) {
            if (this.listTime[y].is_enabled_time) {
              this.formApply.hours = this.listTime[y].hours
              break
            }
          }
          this.formApply.interview_approaches_id = ''
          this.formApply.note = ''
          dataResponse.data.time.forEach(date => {
            dataDate[date.date] = date
          })
          this.listDate = dataDate
          this.listMethod = dataResponse.data.approach
        }
        if (dataResponse.status_code === 500) {
          await this.$store.commit(INDEX_SET_ERROR, {
            show: true,
            text: this.$t('content.EXC_001')
          })
        } else if (dataResponse.status_code === 400) {
          this.$router.push('/job-not-found')
        }
      }
    },
    submitApply() {
      if (this.error.key) {
        return
      }
      this.$refs.formApply.validate(async valid => {
        if (valid) {
          await this.$store.commit(INDEX_SET_LOADING, true)
          if (this.isEdit) {
            const dataForm = this.formApply
            const dataResponse = await this.$store.dispatch(APPLICATION_UPDATE_APPLICATION, { id: this.apply, form: dataForm })
            switch (dataResponse.status_code) {
              case 200:
                await this.$store.commit(INDEX_SET_SUCCESS, {
                  show: true,
                  text: dataResponse.messages
                })
                this.closeDialog()
                await this.$emit('getListHistory')
                break
              case 500:
                await this.$store.commit(INDEX_SET_ERROR, {
                  show: true,
                  text: this.$t('content.EXC_001')
                })
                break
              case 400:
                await this.$router.push('/job-not-found')
                break
              default:
                await this.$store.commit(INDEX_SET_ERROR, {
                  show: true,
                  text: dataResponse.messages
                })
                break
            }
          } else {
            const dataForm = this.formApply
            dataForm.id = this.job.id
            const dataResponse = await this.$store.dispatch(APPLICATION_CREATE_APPLICATION, dataForm)
            switch (dataResponse.status_code) {
              case 200:
                await this.$store.commit(INDEX_SET_SUCCESS, {
                  show: true,
                  text: dataResponse.messages
                })
                this.closeDialog()
                this.$emit('changeApply')
                break
              case 500:
                await this.$store.commit(INDEX_SET_ERROR, {
                  show: true,
                  text: this.$t('content.EXC_001')
                })
                break
              case 400:
                await this.$router.push('/job-not-found')
                break
              case 422:
                await this.$store.commit(INDEX_SET_ERROR, {
                  show: true,
                  text: dataResponse.data.date[0]
                })
                break
              default:
                await this.$store.commit(INDEX_SET_ERROR, {
                  show: true,
                  text: dataResponse.messages
                })
                break
            }
          }
          await this.$store.commit(INDEX_SET_LOADING, false)
        }
      })
    },
    changeDay(value) {
      this.listTime = this.listDate[value].times
      for (let y = 0; y < this.listTime.length; y++) {
        if (this.listTime[y].is_enabled_time) {
          this.formApply.hours = this.listTime[y].hours
          break
        }
      }
    },
    handleClose(done) {
      this.$confirm(this.$t('content.CON_002'), {
        confirmButtonText: this.$t('confirm_modal.yes'),
        cancelButtonText: this.$t('confirm_modal.no'),
        type: 'warning'
      })
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    cancelModal() {
      this.$confirm(this.$t('content.CON_002'), {
        confirmButtonText: this.$t('confirm_modal.yes'),
        cancelButtonText: this.$t('confirm_modal.no'),
        type: 'warning'
      })
        .then(_ => {
          this.$emit('closeDialog')
          this.error = { key: null, value: '' }
          if (this.$refs.formApply) {
            this.$refs.formApply.resetFields()
          }
        })
        .catch(_ => {})
    },
    closeAboutDialog() {
      this.formApply.errors = {}
      if (_.isEqual(this.formApply, this.clonedformApply)) {
        this.$emit('closeDialog')
        if (this.$refs.formApply) {
          this.$refs.formApply.resetFields()
        }
        this.error = { key: null, value: '' }
      } else {
        this.cancelModal()
      }
    }
  }
}
</script>
