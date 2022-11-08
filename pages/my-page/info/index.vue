<template>
  <div class="cv-page">
    <TitlePageElement class="show-pc"></TitlePageElement>
    <BannerElement :banner="$t('page.web_cv')"></BannerElement>
    <div class="cv-content">
      <MenuLeftElement menu-active="web_cv"></MenuLeftElement>
      <InfoElement :info="info"></InfoElement>
    </div>
  </div>
</template>

<script>
import BannerElement from '../../../components/layout/BannerElement'
import TitlePageElement from '../../../components/layout/TitlePageElement'
import MenuLeftElement from '../../../components/my-page/MenuLeftElement'
import InfoElement from '../../../components/my-page/InfoElement'
import { INDEX_SET_LOADING, INDEX_SET_TITLE_MENU, USER_BASIC_INFO } from '../../../store/store.const'
export default {
  name: 'CvPage',
  middleware: 'auth',
  components: { TitlePageElement, BannerElement, MenuLeftElement, InfoElement },
  data() {
    return {
      info: {}
    }
  },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.my_page'), route: '/my-page' },
      { name: this.$t('page.web_cv'), route: '/my-page#web_cv' },
      { name: this.$t('my_page.basic_information'), route: '/my-page/info' }
    ])
    this.getBasicInfo()
  },
  methods: {
    async getBasicInfo() {
      this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const response = await this.$store.dispatch(USER_BASIC_INFO)
        const { data, status_code } = response
        if (status_code === 200) {
          this.info = data
        }
      } catch (e) {
        this.$store.commit(INDEX_SET_LOADING, false)
      }
      this.$store.commit(INDEX_SET_LOADING, false)
    }
  }
}
</script>
