<template>
  <footer class="footer">
    <div class="container-footer">
      <div class="show-pc">
        <div class="top-arrow">
          <div class="footer-active" @click="scrollToTop">
            <img class="cursor-pointer show-active" src="@/static/assets/icon/top-arrow.png">
            <img class="cursor-pointer hide-active" src="@/static/assets/icon/top-arrow-active.png">
          </div>
        </div>
        <div class="footer-item">
          <div class="show-sp-center cursor-pointer">{{ $t('footer.company') }}</div>
          <div class="show-sp-center cursor-pointer">{{ $t('footer.faq') }}</div>
          <div class="cursor-pointer">{{ $t('footer.terms') }}</div>
          <div class="cursor-pointer">{{ $t('footer.privacy') }}</div>
          <div class="cursor-pointer" @click="handleRouter('/inquiry')">{{ $t('footer.inquiry') }}</div>
        </div>
        <div class="logo">
          <img src="/assets/images/logo.svg" alt="">
        </div>
        <div class="copy-right">
          Copyright©2022 VAMPS Hair Design. All Rights Reserved
        </div>
      </div>
      <div class="show-sp">
        <div class="footer-item">
          <div class="show-sp-center cursor-pointer">{{ $t('footer.company') }}</div>
          <div class="show-sp-center cursor-pointer">{{ $t('footer.faq') }}</div>
          <div class="cursor-pointer">{{ $t('footer.terms') }}</div>
          <div class="cursor-pointer" @click="handleRouter('/inquiry')">{{ $t('footer.inquiry') }}</div>
          <div class="cursor-pointer"><span>{{ $t('footer.privacy') }}</span></div>
        </div>
        <div class="border-footer"></div>
        <div class="copy-right">
          Copyright©2022 VAMPS Hair Design. All Rights Reserved
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'FooterCommon',
  data() {
    return {
      loggedIn: this.$auth.loggedIn
    }
  },
  methods: {
    handleRouter(route) {
      this.$router.push(route)
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>
