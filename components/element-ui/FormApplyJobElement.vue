<template>
  <div>
    <el-dialog class="form-dialog-apply" :title="$t('job.set_date_time_interview')" :visible.sync="applyDialogState" width="84%" top="5vh" @close="closeDialog">
      <div>
        <div class="header-search">
          <div class="search-apply">
            <div class="header-search-left">
              <span>{{ $t('job.preferred_date') }}</span>
            </div>
            <div class="header-search-right">
              <el-select v-model="formApply.date" placeholder="Select" @change="changeDay">
                <el-option
                  v-for="(item, index) in listDays"
                  :key="index"
                  :label="item.date_format"
                  :value="item.date"
                  :disabled="!item.is_enable">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="search-work-location">
            <div class="header-search-left">
              <span>{{ $t('job.desired_time') }}</span>
            </div>
            <div class="header-search-right">
              <el-select v-model="formApply.hours" placeholder="Select">
                <el-option
                  v-for="(item, index) in listTime"
                  :key="index"
                  :label="item.hours"
                  :value="item.hours"
                  :disabled="item.is_enabled_time !== 1">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="interview-time">
          {{ $t('job.interview_time') }}: {{ formApply.date ? listDate[formApply.date].date_format : '' + ' ' + formApply.hours }}
        </div>
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
            <span class="danger">※</span><span>{{ $t('job.note_choose_method') }}</span>
          </div>
        </div>
        <div class="form-question">
          <div class="title-form">
            <span>{{ $t('job.question_request') }}</span>
          </div>
          <div class="question-note">({{ $t('job.question_request_note') }})</div>
          <div class="question-content">
            <el-input
              v-model="formApply.note"
              type="textarea"
              :rows="4"
              :placeholder="$t('job.enter_your_question')"
              >
            </el-input>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain @click="closeDialog">
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
import {
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  APPLICATION_GET_DATA_APPLICATION,
  APPLICATION_GET_DATA_DETAIL_APPLICATION,
  APPLICATION_CREATE_APPLICATION,
  APPLICATION_UPDATE_APPLICATION,
  MASTER_GET_DATA,
  INDEX_SET_SUCCESS
} from '../../store/store.const'

export default {
  name: 'FormApplyJobElement',
  props: ['applyDialog', 'isEdit', 'job', 'apply'],
  data() {
    return {
      jobStatus: true,
      applyDialogState: false,
      formApply: {
        date: '',
        hours: '',
        interview_approaches_id: '',
        note: ''
      },
      listDays: [],
      listDate: {},
      listTime: [],
      listMethod: []
    }
  },
  async created() {
    await this.getMasterData()
  },
  watch: {
    async applyDialog(value) {
      this.applyDialogState = value
      await this.getDetailJob()
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog')
    },
    async getMasterData() {
      const dataResources = [
        'resources[m_interview_approaches]={"model": "MInterviewApproach"}'
      ]
      const dataMasterData = await this.$store.dispatch(MASTER_GET_DATA, dataResources.join('&'))
      this.listMethod = dataMasterData.data.m_interview_approaches
    },
    async getDetailJob() {
      if (this.isEdit) {
        const dataResponse = await this.$store.dispatch(APPLICATION_GET_DATA_DETAIL_APPLICATION, this.apply.id)
        if (dataResponse.status_code === 200) {
          this.formApply.date = dataResponse.data.application_user.date
          this.formApply.hours = dataResponse.data.application_user.hours
          this.formApply.interview_approaches_id = dataResponse.data.application_user.interview_approaches.id
          this.formApply.note = dataResponse.data.application_user.interview_approaches.approach
          this.listDays = dataResponse.data.list_time
          this.listTime = []
          const dataDate = {}
          dataResponse.data.list_time.forEach(date => {
            dataDate[date.date] = date
          })
          this.listDate = dataDate
          this.changeDay(dataResponse.data.application_user.date)
        } else {
          await this.$store.commit(INDEX_SET_ERROR, {
            show: true,
            text: dataResponse.messages
          })
        }
      } else {
        const dataResponse = await this.$store.dispatch(APPLICATION_GET_DATA_APPLICATION, this.job.id)
        if (dataResponse.status_code === 200) {
          this.listDays = dataResponse.data
          this.listTime = []
          const dataDate = {}
          dataResponse.data.forEach(date => {
            dataDate[date.date] = date
          })
          this.listDate = dataDate
        }
      }
    },
    async submitApply() {
      if (this.isEdit) {
        const dataForm = this.formApply
        const dataResponse = await this.$store.dispatch(APPLICATION_UPDATE_APPLICATION, { id: this.apply.id, form: dataForm })
        if (dataResponse.status_code === 200) {
          await this.$store.commit(INDEX_SET_SUCCESS, {
            show: true,
            text: dataResponse.messages
          })
        } else {
          await this.$store.commit(INDEX_SET_ERROR, {
            show: true,
            text: dataResponse.messages
          })
        }
      } else {
        const dataForm = this.formApply
        dataForm.id = this.job.id
        await this.$store.commit(INDEX_SET_LOADING, true)
        const dataResponse = await this.$store.dispatch(APPLICATION_CREATE_APPLICATION, dataForm)
        if (dataResponse.status_code === 200) {
          await this.$store.commit(INDEX_SET_SUCCESS, {
            show: true,
            text: dataResponse.messages
          })
          this.closeDialog()
          this.$emit('changeApply')
        } else {
          await this.$store.commit(INDEX_SET_ERROR, {
            show: true,
            text: dataResponse.messages
          })
        }
        await this.$store.commit(INDEX_SET_LOADING, false)
      }
    },
    changeDay(value) {
      this.listTime = this.listDate[value].times
    }
  }
}
</script>
