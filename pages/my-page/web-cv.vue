<template>
  <div class="cv-page">
    <client-only>
      <div>
        <TitlePageElement class="show-pc"></TitlePageElement>
        <BannerElement :banner="this.$t('page.web_cv')" :sub-banner="this.$t('page.sub_web_cv')"></BannerElement>
      </div>
      <div class="cv-content">
        <MenuLeftElement menu-active="web-cv"></MenuLeftElement>
        <IndexCvElement></IndexCvElement>
      </div>
    </client-only>
  </div>
</template>

<script>
import BannerElement from '../../components/layout/BannerElement'
import TitlePageElement from '../../components/layout/TitlePageElement'
import MenuLeftElement from '../../components/my-page/MenuLeftElement'
import IndexCvElement from '../../components/my-page/IndexCvElement'
import {
  INDEX_SET_TITLE_MENU
} from '../../store/store.const'

export default {
  name: 'MyPage',
  components: {
    TitlePageElement,
    BannerElement,
    MenuLeftElement,
    IndexCvElement
  },
  middleware: 'auth',
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.my_page'), route: '/my-page' }
    ])
  }
}
</script>
