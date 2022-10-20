<template>
  <div class="cv-page">
    <TitlePageElement class="show-pc"></TitlePageElement>
    <BannerElement :banner="$t('page.web_cv')"></BannerElement>
    <div class="cv-content">
      <MenuLeftElement menu-active="web_cv"></MenuLeftElement>
      <CreateCareerElement></CreateCareerElement>
    </div>
  </div>
</template>

<script>
import BannerElement from '~/components/layout/BannerElement'
import TitlePageElement from '~/components/layout/TitlePageElement'
import MenuLeftElement from '~/components/my-page/MenuLeftElement'
import { INDEX_SET_TITLE_MENU } from '~/store/store.const'
import CreateCareerElement from '~/components/my-page/CreateCareerElement'
export default {
  name: 'JobCareerPage',
  components: { CreateCareerElement, TitlePageElement, BannerElement, MenuLeftElement },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.my_page'), route: '/my-page' },
      { name: this.$t('page.web_cv'), route: '/my-page#web_cv' },
      { name: this.$t('my_page.job_career'), route: '/my-page/job-career' },
      { name: this.$t('my_page.job_career') + this.$route.params.id + this.$t('my_page.create'), route: '/my-page/job-career' }
    ])
  }
}
</script>
