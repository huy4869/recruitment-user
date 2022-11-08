<template>
  <div class="cv-page">
    <TitlePageElement class="show-pc"></TitlePageElement>
    <BannerElement :banner="$t('page.web_cv')"></BannerElement>
    <div class="cv-content">
      <MenuLeftElement menu-active="web_cv"></MenuLeftElement>
      <CreateEduElement :m_learning_status="m_learning_status"></CreateEduElement>
    </div>
  </div>
</template>

<script>
import BannerElement from '~/components/layout/BannerElement'
import TitlePageElement from '~/components/layout/TitlePageElement'
import MenuLeftElement from '~/components/my-page/MenuLeftElement'
import { INDEX_SET_TITLE_MENU, MASTER_GET_DATA } from '~/store/store.const'
import CreateEduElement from '~/components/my-page/CreateEduElement'
export default {
  name: 'JobCareerPage',
  middleware: 'auth',
  components: { CreateEduElement, TitlePageElement, BannerElement, MenuLeftElement },
  data() {
    return {
      edu: {},
      m_learning_status: []
    }
  },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.my_page'), route: '/my-page' },
      { name: this.$t('page.web_cv'), route: '/my-page#web_cv' },
      { name: this.$t('education.title'), route: '/my-page/education' },
      { name: this.$t('education.title') + this.$route.params.id + this.$t('my_page.create') }
    ])
    this.getMasterData()
  },
  methods: {
    async getMasterData() {
      const dataResources = [
        'resources[m_learning_status]={"model": "MLearningStatus"}'
      ]
      await this.$store.dispatch(MASTER_GET_DATA, dataResources.join('&')).then(res => {
        this.m_learning_status = res.data.m_learning_status
      })
    }
  }
}
</script>
