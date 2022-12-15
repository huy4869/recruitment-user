<template>
  <div class="favorite-job-element job-element">
    <div class="">
      <div class="job-title d-flex justify-between card-title-mobile">
          <div class="card-primary-title">{{ $t('my_page.job_career') }}<div class="text-count-career"><span>{{ index | toFullWidth(index) }}</span></div>
          </div>
          <div class="btn-option d-flex">
            <el-button class="btn-edit" @click="handleRouter('job-career/edit/' + index + '?id=' + job.id)"><img src="/assets/icon/edit.svg" alt="img-edit">{{ $t('my_page.edit') }}</el-button>
            <el-button class="btn-remove" @click="showConfirmModal"><img src="/assets/icon/remove.svg" alt="img-edit">{{ $t('my_page.remove') }}</el-button>
          </div>
      </div>
      <div class="job-box items-center">
        <div class="left-item"><p class="card-text-primary">{{ $t('career.store_name') }}</p></div>
        <div class="right-item first-right-item"><p class="card-text-normal">{{ job.store_name }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('career.company_name') }}</p></div>
        <div class="right-item"><p class="card-text-normal">{{ job.company_name }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('career.period_start') }}</p></div>
        <div class="right-item"><p class="card-text-normal">{{ job.period_full_format }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('career.occupation') }}</p></div>
        <div class="right-item"><p class="card-text-normal">{{ job.job_type_name }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('career.position_offices') }}</p></div>
        <div class="right-item"><p class="card-text-normal">{{ job.position_offices }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('career.status') }}</p></div>
        <div class="right-item"><p class="card-text-normal text-ellipsis">{{ job.work_type_name }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('career.business_content') }}</p></div>
        <div class="right-item"><p class="card-text-normal break-word break-space">{{ job.business_content }}</p></div>
        <div class="left-item"><p class="card-text-primary">
          {{ $t('career.experience_accumulation1') }}<br>
          {{ $t('career.experience_accumulation2') }}<br>
          {{ $t('career.experience_accumulation3') }}</p>
        </div>
        <div class="right-item">
          <p class="card-text-normal text-wide break-word break-space">{{ job.experience_accumulation }}</p>
        </div>
      </div>
      <div class="btn-option-mobile d-flex">
        <el-button class="btn-edit" @click="handleRouter('job-career/edit/' + index + '?id=' + job.id)"><img src="/assets/icon/edit.svg" alt="img-edit">{{ $t('my_page.edit') }}</el-button>
        <el-button class="btn-remove" @click="showConfirmModal"><img src="/assets/icon/remove.svg" alt="img-edit">{{ $t('my_page.remove') }}</el-button>
      </div>
    </div>
    <ConfirmModal
      v-show="confirmModal"
      :text="$t('confirm_modal.delete_confirm')"
      @close="closeConfirmModal"
      @handleRouter="handleDelete(job.id)"
    >
    </ConfirmModal>
  </div>
</template>

<script>

import {
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  WORK_HISTORY_DELETE
} from '~/store/store.const'

export default {
  name: 'JobElement',
  filters: {
    toFullWidth(value) {
      return value.toString().replace(/[A-Za-z0-9]/g, function(s) { return String.fromCharCode(s.charCodeAt(0) + 0xFEE0) })
    }
  },
  props: ['job', 'index'],
  data() {
    return {
      confirmModal: false
    }
  },
  methods: {
    showConfirmModal() {
      this.confirmModal = true
    },
    closeConfirmModal() {
      this.confirmModal = false
    },
    handleRouter(route) {
      this.$router.push(route)
    },
    async handleDelete(id) {
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const response = await this.$store.dispatch(WORK_HISTORY_DELETE, id)
        switch (response.status_code) {
          case 200:
            await this.$store.commit(INDEX_SET_SUCCESS, {
              show: true,
              text: response.messages
            })
            this.closeConfirmModal()
            this.reloadList()
            break
          case 500:
            await this.$store.commit(INDEX_SET_ERROR, {
              show: true,
              text: this.$t('content.EXC_001')
            })
            break
          default:
            await this.$store.commit(INDEX_SET_ERROR, {
              show: true,
              text: response.messages
            })
            break
        }
        await this.$store.commit(INDEX_SET_LOADING, false)
      } catch (err) {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    reloadList() {
      this.$emit('reloadList')
    }
  }
}
</script>
