<template>
  <div class="cv-page">
    <TitlePageElement class="show-pc"></TitlePageElement>
    <BannerElement :banner="$t('page.web_cv')"></BannerElement>
    <div class="cv-content">
      <MenuLeftElement menu-active="web_cv"></MenuLeftElement>
      <EditQualifyElement :qualification="qualification"></EditQualifyElement>
    </div>
  </div>
</template>

<script>
import BannerElement from '~/components/layout/BannerElement'
import TitlePageElement from '~/components/layout/TitlePageElement'
import MenuLeftElement from '~/components/my-page/MenuLeftElement'
import {
  INDEX_SET_LOADING,
  INDEX_SET_TITLE_MENU,
  WORK_QUALIFICATION_DETAIL
} from '~/store/store.const'
import EditQualifyElement from '~/components/my-page/EditQualifyElement'
export default {
  name: 'JobCareerPage',
  middleware: 'auth',
  components: { EditQualifyElement, TitlePageElement, BannerElement, MenuLeftElement },
  data() {
    return {
      qualification: {}
    }
  },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.my_page'), route: '/my-page' },
      { name: this.$t('page.web_cv'), route: '/my-page#web_cv' },
      { name: this.$t('my_page.qualification'), route: '/my-page/qualification' },
      { name: this.$t('my_page.qualification') + this.$route.params.id + this.$t('my_page.edit') }
    ])
    this.getQualification()
  },
  methods: {
    async getQualification() {
      this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const response = await this.$store.dispatch(WORK_QUALIFICATION_DETAIL, this.$route.query.id)
        const { data, status_code } = response
        if (status_code === 200) {
          this.qualification = data
        }
      } catch (e) {
        this.$store.commit(INDEX_SET_LOADING, false)
      }
      this.$store.commit(INDEX_SET_LOADING, false)
    }
  }
}
</script>
