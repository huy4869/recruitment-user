<template>
  <div class="cv-page past-search-page">
    <client-only>
      <div>
        <BannerElement :banner="$t('page.my_page')" title="my page" :subBanner="$t('content.web_cv')"></BannerElement>
        <TitlePageElement class="show-pc"></TitlePageElement>
      </div>
      <div class="cv-content">
        <div>
          <MenuLeftElement menu-active="past-search-condition"></MenuLeftElement>
        </div>
        <PastSearchConditionElement></PastSearchConditionElement>
      </div>
    </client-only>
  </div>
</template>

<script>
import BannerElement from '../../components/layout/BannerElement'
import TitlePageElement from '../../components/layout/TitlePageElement'
import MenuLeftElement from '../../components/my-page/MenuLeftElement'
import PastSearchConditionElement from '../../components/my-page/PastSearchConditionElement'
import {
  INDEX_SET_TITLE_MENU
} from '../../store/store.const'

export default {
  name: 'MyPage',
  components: {
    TitlePageElement,
    BannerElement,
    MenuLeftElement,
    PastSearchConditionElement
  },
  middleware: 'auth',
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('my_page.past_search_condition'), route: '/my-page/past-search-condition' }
    ])
  }
}
</script>
