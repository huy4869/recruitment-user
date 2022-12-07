<template>
  <footer class="footer">
    <div class="container-footer">
      <div class="show-pc">
        <div class="top-arrow">
          <img src="@/static/assets/icon/top-arrow.svg" @click="scrollToTop">
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
    <div class="show-sp">
      <div class="footer-mobile">
        <div class="content-button">
          <div class="d-flex justify-between list-icon">
            <div class="button-footer" @click="handleRouter('/')">
              <img src="/assets/icon/icon_home.png" alt="">
            </div>
            <div v-if="loggedIn" class="button-footer">
              <div @click="handleRouter('/chat')">
                <img src="/assets/icon/icon_chat.svg" alt="">
              </div>
            </div>
            <div class="button-footer" @click="handleRouter('/search')">
              <img src="/assets/icon/icon_search.svg" alt="">
            </div>
            <div class="button-footer" @click="handleRouter('/notification')">
              <img src="/assets/icon/icon_notification_mobile.svg" alt="">
            </div>
          </div>
          <div class="button-home" @click="handleRouter('/my-page/top-page')">
            <img src="/assets/icon/icon_user_mobile.png" alt=""><span>{{ $t('page.my_page') }}</span>
          </div>
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
