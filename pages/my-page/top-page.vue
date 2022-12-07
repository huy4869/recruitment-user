<template>
  <div class="cv-page">
    <client-only>
      <div>
        <BannerElement :banner="$t('page.my_page')" title="my page" :subBanner="$t('content.web_cv')"></BannerElement>
        <TitlePageElement class="show-pc"></TitlePageElement>
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
      { name: this.$t('my_page.top'), route: '/my-page' }
    ])
  }
}
</script>
