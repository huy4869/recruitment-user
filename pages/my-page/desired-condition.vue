<template>
  <div class="cv-page web-cv-page">
    <client-only>
      <div>
        <BannerElement :banner="$t('page.my_page')" title="my page" :subBanner="$t('content.web_cv')"></BannerElement>
        <TitlePageElement class="show-pc"></TitlePageElement>
      </div>
      <div class="cv-content">
        <MenuLeftElement menu-active="desired-condition"></MenuLeftElement>
        <DesiredConditionElement></DesiredConditionElement>
      </div>
    </client-only>
  </div>
</template>

<script>
import BannerElement from '../../components/layout/BannerElement'
import TitlePageElement from '../../components/layout/TitlePageElement'
import MenuLeftElement from '../../components/my-page/MenuLeftElement'
import DesiredConditionElement from '../../components/my-page/DesiredConditionElement'
import {
  INDEX_SET_TITLE_MENU
} from '../../store/store.const'

export default {
  name: 'MyPage',
  components: {
    TitlePageElement,
    BannerElement,
    MenuLeftElement,
    DesiredConditionElement
  },
  middleware: 'auth',
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('my_page.desired_condition'), route: '/my-page/desired-condition' }
    ])
  }
}
</script>
