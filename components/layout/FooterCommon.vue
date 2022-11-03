<template>
  <footer class="footer">
    <div class="container-footer">
      <div class="footer-item">
        <div class="show-sp-center cursor-pointer">{{ $t('footer.company') }}</div>
        <div class="show-sp-center cursor-pointer">{{ $t('footer.faq') }}</div>
        <div class="cursor-pointer">{{ $t('footer.terms') }}</div>
        <div class="cursor-pointer">{{ $t('footer.privacy') }}</div>
        <div class="cursor-pointer" @click="handleRouter('/inquiry')">{{ $t('footer.inquiry') }}</div>
        <img class="top-arrow show-pc" src="@/static/assets/icon/top-arrow.svg" alt="top-arrow" @click="scrollToTop">
      </div>
      <div class="logo show-pc">
        <img src="/assets/images/logo.svg" alt="">
      </div>
      <div class="copy-right">
        Copyright©2022 VAMPS Hair Design. All Rights Reserved
      </div>
    </div>
    <div class="show-sp">
      <div class="footer-mobile">
        <div class="content-button">
          <div class="button-home">
            <img src="/assets/icon/icon_home_footer.svg" alt=""><span>{{ $t('page.home') }}</span>
          </div>
          <div class="d-flex justify-between list-icon">
            <div class="button-footer">
              <img src="/assets/icon/icon_search.svg" alt="">
            </div>
            <div class="button-footer">
              <img src="/assets/icon/icon_notification_mobile.svg" alt="">
            </div>
            <div class="button-footer">
              <img src="/assets/icon/icon_user_mobile.svg" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'FooterCommon',
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
