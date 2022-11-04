<template>
  <div class="cv-page">
    <TitlePageElement v-if="!showDetailMessage" class="show-pc"></TitlePageElement>
    <BannerElement v-if="!showDetailMessage" :banner="titlePage[page]" :sub-banner="subTitle"></BannerElement>
    <div class="cv-content">
      <MenuLeftElement v-if="!showDetailMessage" :menu-active="page"></MenuLeftElement>
      <TopPageElement v-if="page === 'top_page'"></TopPageElement>
      <ApplicationHistoryElement v-if="page === 'application_history'"></ApplicationHistoryElement>
      <FavoriteJobElement v-if="page === 'favorite_job'"></FavoriteJobElement>
      <IndexCvElement v-if="page === 'web_cv'"></IndexCvElement>
      <PastSearchConditionElement v-if="page === 'past_search_condition'"></PastSearchConditionElement>
      <DesiredConditionElement v-if="page === 'desired_condition'"></DesiredConditionElement>
      <ChangePasswordElement v-if="page === 'change_password'"></ChangePasswordElement>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BannerElement from '../../components/layout/BannerElement'
import TitlePageElement from '../../components/layout/TitlePageElement'
import MenuLeftElement from '../../components/my-page/MenuLeftElement'
import IndexCvElement from '../../components/my-page/IndexCvElement'
import TopPageElement from '../../components/my-page/TopPageElement'
import ApplicationHistoryElement from '../../components/my-page/ApplicationHistoryElement'
import FavoriteJobElement from '../../components/my-page/FavoriteJobElement'
import ChangePasswordElement from '../../components/my-page/ChangePasswordElement'
import PastSearchConditionElement from '../../components/my-page/PastSearchConditionElement'
import DesiredConditionElement from '../../components/my-page/DesiredConditionElement'
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
    FavoriteJobElement,
    ChangePasswordElement,
    PastSearchConditionElement,
    DesiredConditionElement
  },
  middleware: 'auth',
  data() {
    return {
      titlePage: {
        'top_page': this.$t('page.my_page'),
        'application_history': this.$t('page.my_page'),
        'favorite_job': this.$t('page.my_page'),
        'web_cv': this.$t('page.web_cv'),
        'past_search_condition': this.$t('page.my_page'),
        'desired_condition': this.$t('page.my_page'),
        'change_password': this.$t('page.my_page')
      },
      subTitle: this.$t('page.sub_web_cv'),
      page: 'top_page'
    }
  },
  computed: {
    ...mapState({
      statePage: state => state.my_page.statePage,
      showDetailMessage: state => state.my_page.showDetailMessage
    })
  },
  watch: {
    'statePage'(value) {
      this.page = value
    }
  },
  created() {
    if (this.$route.hash) {
      const data = this.$route.hash
      this.page = data.replace('#', '')
    }
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.my_page'), route: '/my-page' }
    ])
  }
}
</script>
