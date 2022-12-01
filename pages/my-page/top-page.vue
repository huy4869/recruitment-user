<template>
  <div class="cv-page">
    <client-only>
      <div>
        <TitlePageElement class="show-pc"></TitlePageElement>
        <BannerElement class="show-pc" :banner="$t('page.my_page')" :sub-banner="$t('page.sub_web_cv')"></BannerElement>
      </div>
      <div class="cv-content">
        <div>
          <MenuLeftElement menu-active="top-page"></MenuLeftElement>
        </div>
        <TopPageElement></TopPageElement>
      </div>
    </client-only>
  </div>
</template>

<script>
import BannerElement from '../../components/layout/BannerElement'
import TitlePageElement from '../../components/layout/TitlePageElement'
import MenuLeftElement from '../../components/my-page/MenuLeftElement'
import TopPageElement from '../../components/my-page/TopPageElement'
import {
  INDEX_SET_TITLE_MENU
} from '../../store/store.const'

export default {
  name: 'TopPage',
  components: {
    TitlePageElement,
    BannerElement,
    MenuLeftElement,
    TopPageElement
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
