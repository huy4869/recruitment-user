<template>
  <div class="cv-page web-cv-page">
    <BannerElement :banner="$t('page.my_page')" title="my page" :subBanner="$t('content.web_cv')"></BannerElement>
    <TitlePageElement class="show-pc"></TitlePageElement>
    <div class="cv-content">
      <MenuLeftElement menu-active="web-cv" sub-active="education"></MenuLeftElement>
      <EducationElement :listEdu="listEdu" @reloadList="getListEdu"></EducationElement>
    </div>
  </div>
</template>

<script>
import BannerElement from '../../../components/layout/BannerElement'
import TitlePageElement from '../../../components/layout/TitlePageElement'
import MenuLeftElement from '../../../components/my-page/MenuLeftElement'
import { INDEX_SET_LOADING, INDEX_SET_TITLE_MENU, EDU_LIST } from '../../../store/store.const'
import EducationElement from '../../../components/my-page/EducationElement'
export default {
  name: 'JobCareerPage',
  middleware: 'auth',
  components: { EducationElement, TitlePageElement, BannerElement, MenuLeftElement },
  data() {
    return {
      listEdu: []
    }
  },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.my_page'), route: '/my-page/top-page' },
      { name: this.$t('page.web_cv'), route: '/my-page/web-cv' },
      { name: this.$t('education.title'), route: '/my-page/education' }
    ])
    this.getListEdu()
  },
  methods: {
    async getListEdu() {
      this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const response = await this.$store.dispatch(EDU_LIST)
        const { data, status_code } = response
        if (status_code === 200) {
          this.listEdu = data
        }
      } catch (e) {
        this.$store.commit(INDEX_SET_LOADING, false)
      }
      this.$store.commit(INDEX_SET_LOADING, false)
    }
  }
}
</script>
