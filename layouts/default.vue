<template>
  <div :class="{ 'show-modal-sp': showModal }">
    <client-only>
      <HeaderCommon />
      <NotificationBlock />
      <div class="home">
        <nuxt />
      </div>
      <div v-if="!showDetailMessage">
        <FooterCommon />
      </div>
      <LoadingBar />
    </client-only>
    <div v-if="showModal" class="nav_mobile">
      <label class="icon-close">
        <img id="close_btn" src="/assets/icon/union-white.svg" alt="" @click="closeModal">
      </label>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { SET_SHOW_MODAL_SP, SET_SHOW_MESSAGE_SP } from '../store/store.const'
import LoadingBar from '../components/LoadingBar'
import HeaderCommon from '../components/layout/HeaderCommon'
import FooterCommon from '../components/layout/FooterCommon'
import NotificationBlock from '@/components/NotificationBlock'

export default {
  name: 'DefaultLayout',
  components: { FooterCommon, HeaderCommon, LoadingBar, NotificationBlock },
  computed: {
    ...mapState({
      showDetailMessage: state => state.my_page.showDetailMessage,
      showModal: state => state.showModalSp
    })
  },
  created() {
    this.$store.commit(SET_SHOW_MODAL_SP, false)
  },
  watch: {
    '$route.path'() {
      this.$store.commit(SET_SHOW_MESSAGE_SP, false)
    }
  },
  methods: {
    closeModal() {
      this.$store.commit(SET_SHOW_MODAL_SP, false)
    }
  }
}
</script>
