<template>
  <div class="favorite-job-element job-element">
    <div class="">
      <div class="job-title d-flex justify-between card-title-mobile">
        <div class="card-primary-title">{{ $t('education.title') }}{{ index | toFullWidth(index) }}
        </div>
        <div class="btn-option d-flex">
          <el-button class="btn-edit" @click="handleRouter('education/edit/' + job.id)"><img src="/assets/icon/edit.svg" alt="img-edit">{{ $t('my_page.edit') }}</el-button>
          <el-button class="btn-remove" @click="showConfirmModal"><img src="/assets/icon/remove.svg" alt="img-edit">{{ $t('my_page.remove') }}</el-button>
        </div>
      </div>
      <div class="job-box ">
        <div class="left-item"><p class="card-text-primary">{{ $t('education.name') }}</p></div>
        <div class="right-item first-right-item"><p class="card-text-normal">{{ job.school_name }}</p></div>
        <div class="left-item"><p class="card-text-primary">{{ $t('education.date') }}</p></div>
        <div class="right-item"><p class="card-text-normal">{{ job.enrollment_period_format }}</p></div>
      </div>
      <div class="btn-option-mobile d-flex">
        <el-button class="btn-edit" @click="handleRouter('education/edit/' + job.id)"><img src="/assets/icon/edit.svg" alt="img-edit">{{ $t('my_page.edit') }}</el-button>
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
