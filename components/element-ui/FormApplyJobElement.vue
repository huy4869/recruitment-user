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
              <el-select v-model="formApply.date" placeholder="Select">
                <el-option
                  v-for="item in listDate"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="search-work-location">
            <div class="header-search-left">
              <span>{{ $t('job.desired_time') }}</span>
            </div>
            <div class="header-search-right">
              <el-select v-model="formApply.time" placeholder="Select">
                <el-option
                  v-for="item in listTime"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="interview-time">
          {{ $t('job.interview_time') }}: {{ formApply.date + ' ' + formApply.time }}
        </div>
        <div class="form-change-method">
          <div class="title-form">
            <span>{{ $t('job.choose_preferred_method') }}</span>
          </div>
          <div class="method-content">
            <el-radio-group v-model="formApply.method">
              <el-radio v-for="(method, index) in listMethod" :key="index" :label="method.id">{{ method.value }}</el-radio>
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
              type="textarea"
              :rows="4"
              :placeholder="$t('job.enter_your_question')"
              v-model="formApply.question">
            </el-input>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain>
          {{ $t('button.close_up') }}
        </el-button>
        <el-button type="danger">
          {{ $t('button.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'FormApplyJobElement',
  props: ['applyDialog'],
  data() {
    return {
      jobStatus: true,
      applyDialogState: false,
      formApply: {
        date: '',
        time: '',
        method: '',
        question: ''
      },
      listDate: [
        '2022年09月02日（月）',
        '2022年09月03日（火）',
        '2022年09月04日（水）',
        '2022年09月05日（木）',
        '2022年09月06日（金) ',
        '2022年09月07日（土）',
        '2022年09月08日（日）'
      ],
      listTime: ['12:00', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30'],
      listMethod: [
        { id: 1, value: 'オンライン面接（2営業日以内にZoomURLをメールにて送付いたします）' },
        { id: 2, value: '対面（東京都港区虎ノ門１－２－３)' },
        { id: 3, value: '電話面接' }
      ]
    }
  },
  watch: {
    applyDialog(value) {
      this.applyDialogState = value
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>
