<template>
  <div class="modal-backdrop">
    <div class="confirm-modal text-center">
      <img src="/assets/icon/Cancel.svg" alt="cancel">
      <div class="title"> {{ text }} </div>
      <div class="btn-group d-flex justify-center">
        <el-button class="button" @click="close" >{{$t('confirm_modal.no')}}</el-button>
        <el-button class="button" type="danger" @click="handleRouter" >{{$t('confirm_modal.yes')}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ConfirmModal',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    handleRouter() {
      this.$emit('handleRouter')
    }
  }
}
</script>
