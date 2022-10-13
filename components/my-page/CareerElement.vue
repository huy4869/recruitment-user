<template>
  <div class="favorite-job-element job-element">
    <div class="">
      <div class="job-title d-flex justify-between card-title-mobile">
          <div class="card-primary-title">{{ $t('my_page.job_career') }}{{ index | toFullWidth(index) }}
          </div>
          <div class="btn-option d-flex">
            <el-button class="btn-edit" @click="handleRouter('job-career/edit')"><img src="/assets/icon/edit.svg" alt="img-edit">{{ $t('my_page.edit') }}</el-button>
            <el-button class="btn-remove" @click="showConfirmModal"><img src="/assets/icon/remove.svg" alt="img-edit">{{ $t('my_page.remove') }}</el-button>
          </div>
      </div>
      <div class="job-box items-center">
        <div class="left-item"><p class="card-text-primary">{{ $t('career.store_name') }}</p></div>
        <div class="right-item first-right-item"><p class="card-text-normal">{{ job.address }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('career.company_name') }}</p></div>
        <div class="right-item"><p class="card-text-normal">{{ job.work_type }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('career.period_start') }}</p></div>
        <div class="right-item"><p class="card-text-normal">{{ job.salary }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('career.occupation') }}</p></div>
        <div class="right-item"><p class="card-text-normal">{{ job.work_time }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('career.position_offices') }}</p></div>
        <div class="right-item"><p class="card-text-normal">{{ job.shifs }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('career.position_offices') }}</p></div>
        <div class="right-item"><p class="card-text-normal text-ellipsis">{{ job.welfare_treatment_description }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('career.business_content') }}</p></div>
        <div class="right-item"><p class="card-text-normal text-ellipsis">{{ job.welfare_treatment_description }}</p></div>
        <div class="left-item"><p class="card-text-primary">
          {{ $t('career.experience_accumulation1') }}<br>
          {{ $t('career.experience_accumulation2') }}<br>
          {{ $t('career.experience_accumulation3') }}</p>
        </div>
        <div class="right-item">
          <div class="">
            <p v-for="(feature, index) in job.features" :key="index" class="text-status">
              {{ feature }}
            </p>
          </div>
        </div>
      </div>
      <div class="btn-option-mobile d-flex">
        <el-button class="btn-edit" @click="handleRouter('job-career/edit')"><img src="/assets/icon/edit.svg" alt="img-edit">{{ $t('my_page.edit') }}</el-button>
        <el-button class="btn-remove" @click="showConfirmModal"><img src="/assets/icon/remove.svg" alt="img-edit">{{ $t('my_page.remove') }}</el-button>
      </div>
    </div>
    <ConfirmModal
      v-show="confirmModal"
      :text="$t('confirm_modal.delete_confirm')"
      @close="closeConfirmModal"
    >
    </ConfirmModal>
  </div>
</template>

<script>

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
    }
  }
}
</script>
