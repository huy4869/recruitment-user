<template>
  <div class="cv-page web-cv-page">
    <BannerElement :banner="$t('page.my_page')" title="my page" :subBanner="$t('content.web_cv')"></BannerElement>
    <TitlePageElement class="show-pc"></TitlePageElement>
    <div class="cv-content">
      <MenuLeftElement sub-active="info" menu-active="web-cv"></MenuLeftElement>
      <InfoElement :info="info" :list-detail="listPrDetail"></InfoElement>
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
      info: {},
      user: this.$auth.user,
      listPrDetail: []
    }
  },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.my_page'), route: '/my-page/top-page' },
      { name: this.$t('page.web_cv'), route: '/my-page/web-cv' },
      { name: this.$t('my_page.basic_information'), route: '/my-page/info' }
    ])
    this.getBasicInfo()
  },
  watch: {
    user() {
      this.$auth.fetchUser()
    }
  },
  methods: {
    async getBasicInfo() {
      this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const response = await this.$store.dispatch(USER_BASIC_INFO)
        const { data, status_code } = response
        if (status_code === 200) {
          const listDetail = []
          this.info = data
          data.images.forEach((element) => {
            listDetail.push(element.url)
          })
          for (let i = 0; i < (3 - data.images.length); i++) {
            listDetail.push('/assets/icon/icon_user_default.svg')
          }
          this.listPrDetail = listDetail
        }
      } catch (e) {
        this.$store.commit(INDEX_SET_LOADING, false)
      }
      this.$store.commit(INDEX_SET_LOADING, false)
    }
  }
}
</script>
