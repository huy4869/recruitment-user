<template>
  <div class="cv-page">
    <TitlePageElement class="show-pc"></TitlePageElement>
    <BannerElement :banner="titlePage[statePage]" :sub-banner="subTitle"></BannerElement>
    <div class="cv-content">
      <MenuLeftElement :menu-active="statePage" @changePage="changeStatePage"></MenuLeftElement>
      <TopPageElement v-if="statePage === 'top_page'"></TopPageElement>
      <ApplicationHistoryElement v-if="statePage === 'application_history'"></ApplicationHistoryElement>
      <IndexCvElement v-if="statePage === 'web_cv'"></IndexCvElement>
      <ChangePasswordElement v-if="statePage === 'change_password'"></ChangePasswordElement>
    </div>
  </div>
</template>

<script>
import BannerElement from '../../components/layout/BannerElement'
import TitlePageElement from '../../components/layout/TitlePageElement'
import MenuLeftElement from '../../components/my-page/MenuLeftElement'
import IndexCvElement from '../../components/my-page/IndexCvElement'
import TopPageElement from '../../components/my-page/TopPageElement'
import ApplicationHistoryElement from '../../components/my-page/ApplicationHistoryElement'
import ChangePasswordElement from '../../components/my-page/ChangePasswordElement'
import { INDEX_SET_TITLE_MENU } from '../../store/store.const'

export default {
  name: 'MyPage',
  components: {
    TitlePageElement,
    BannerElement,
    MenuLeftElement,
    IndexCvElement,
    TopPageElement,
    ApplicationHistoryElement,
    ChangePasswordElement
  },
  data() {
    return {
      statePage: 'change_password',
      titlePage: {
        'top_page': this.$t('page.my_page'),
        'application_history': this.$t('page.my_page'),
        'favorite_job': this.$t('page.my_page'),
        'web_cv': this.$t('page.web_cv'),
        'chat': this.$t('page.my_page'),
        'change_password': this.$t('page.my_page')
      },
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
