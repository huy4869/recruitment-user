<template>
  <div class="cv-page">
    <client-only>
      <div>
        <TitlePageElement class="show-pc"></TitlePageElement>
        <BannerElement :banner="$t('page.my_page')" :sub-banner="$t('page.sub_web_cv')"></BannerElement>
      </div>
      <div class="cv-content">
        <div>
          <MenuLeftElement menu-active="application-history"></MenuLeftElement>
        </div>
        <ApplicationHistoryElement></ApplicationHistoryElement>
      </div>
    </client-only>
  </div>
</template>

<script>
import BannerElement from '../../components/layout/BannerElement'
import TitlePageElement from '../../components/layout/TitlePageElement'
import MenuLeftElement from '../../components/my-page/MenuLeftElement'
import ApplicationHistoryElement from '../../components/my-page/ApplicationHistoryElement'
import {
  INDEX_SET_TITLE_MENU
} from '../../store/store.const'

export default {
  name: 'MyPage',
  components: {
    TitlePageElement,
    BannerElement,
    MenuLeftElement,
    ApplicationHistoryElement
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
