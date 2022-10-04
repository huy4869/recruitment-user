<template>
  <div class="cv-page">
    <TitlePageElement class="show-pc"></TitlePageElement>
    <BannerElement :banner="$t('page.web_cv')" :sub-banner="subTitle"></BannerElement>
    <div class="cv-content">
      <MenuLeftElement menu-active="web_cv"></MenuLeftElement>
      <IndexCvElement v-if="statePage === 'web_cv'"></IndexCvElement>
    </div>
  </div>
</template>

<script>
import BannerElement from '../../components/layout/BannerElement'
import TitlePageElement from '../../components/layout/TitlePageElement'
import MenuLeftElement from '../../components/my-page/MenuLeftElement'
import IndexCvElement from '../../components/my-page/IndexCvElement'
import { INDEX_SET_TITLE_MENU } from '../../store/store.const'

export default {
  name: 'MyPage',
  components: { TitlePageElement, BannerElement, MenuLeftElement, IndexCvElement },
  data() {
    return {
      statePage: 'web_cv',
      subTitle: this.$t('page.sub_web_cv')
    }
  },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.my_page'), route: '/my_page' }
    ])
  },
  methods: {
    changeStatePage(page) {
      this.statePage = page
    }
  }
}
</script>
