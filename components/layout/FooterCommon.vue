<template>
  <footer class="footer">
    <div class="container-footer">
      <div class="footer-item">
        <div class="show-sp-center">{{ $t('footer.company') }}</div>
        <div class="show-sp-center">{{ $t('footer.faq') }}</div>
        <div>{{ $t('footer.terms') }}</div>
        <div>{{ $t('footer.privacy') }}</div>
        <div>{{ $t('footer.inquiry') }}</div>
        <img class="top-arrow show-pc" src="@/static/assets/icon/top-arrow.svg" alt="top-arrow">
      </div>
      <div class="logo">
        <img src="/assets/images/logo.svg" alt="">
      </div>
      <div class="copy-right">
        Copyright©2022 VAMPS Hair Design. All Rights Reserved
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'FooterCommon'
}
</script>
