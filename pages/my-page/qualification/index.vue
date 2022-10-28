<template>
  <div class="cv-page">
    <TitlePageElement class="show-pc"></TitlePageElement>
    <BannerElement :banner="$t('page.web_cv')"></BannerElement>
    <div class="cv-content">
      <MenuLeftElement menu-active="web_cv"></MenuLeftElement>
      <QualificationElement :listQualification="listQualification" @reloadList="getListQualification"></QualificationElement>
    </div>
  </div>
</template>

<script>
import BannerElement from '../../../components/layout/BannerElement'
import TitlePageElement from '../../../components/layout/TitlePageElement'
import MenuLeftElement from '../../../components/my-page/MenuLeftElement'
import {
  INDEX_SET_LOADING,
  INDEX_SET_TITLE_MENU,
  WORK_QUALIFICATION_LIST
} from '../../../store/store.const'
import QualificationElement from '../../../components/my-page/QualificationElement'
export default {
  name: 'JobCareerPage',
  components: { QualificationElement, TitlePageElement, BannerElement, MenuLeftElement },
  data() {
    return {
      listQualification: []
    }
  },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.my_page'), route: '/my-page' },
      { name: this.$t('page.web_cv'), route: '/my-page#web_cv' },
      { name: this.$t('my_page.qualification'), route: '/my-page/qualification' }
    ])
    this.getListQualification()
  },
  methods: {
    async getListQualification() {
      this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const response = await this.$store.dispatch(WORK_QUALIFICATION_LIST)
        const { data, status_code } = response
        if (status_code === 200) {
          this.listQualification = data
        }
      } catch (e) {
        this.$store.commit(INDEX_SET_LOADING, false)
      }
      this.$store.commit(INDEX_SET_LOADING, false)
    }
  }
}
</script>
