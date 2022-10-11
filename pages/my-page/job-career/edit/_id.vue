<template>
  <div class="cv-page">
    <TitlePageElement class="show-pc"></TitlePageElement>
    <BannerElement :banner="$t('page.web_cv')"></BannerElement>
    <div class="cv-content">
      <MenuLeftElement menu-active="web_cv"></MenuLeftElement>
      <EditCareerElement></EditCareerElement>
    </div>
  </div>
</template>

<script>
import BannerElement from '~/components/layout/BannerElement'
import TitlePageElement from '~/components/layout/TitlePageElement'
import MenuLeftElement from '~/components/my-page/MenuLeftElement'
import { INDEX_SET_TITLE_MENU } from '~/store/store.const'
import EditCareerElement from '~/components/my-page/EditCareerElement'
export default {
  name: 'JobCareerPage',
  components: { EditCareerElement, TitlePageElement, BannerElement, MenuLeftElement },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.my_page'), route: '/my-page' },
      { name: this.$t('page.web_cv'), route: '/my-page/cv' }
    ])
  }
}
</script>
