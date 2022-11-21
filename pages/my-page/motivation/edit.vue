<template>
  <div class="cv-page">
    <TitlePageElement class="show-pc"></TitlePageElement>
    <BannerElement :banner="$t('page.web_cv')"></BannerElement>
    <div class="cv-content">
      <MenuLeftElement menu-active="web_cv"></MenuLeftElement>
      <EditMotiElement :motivation="motivation"></EditMotiElement>
    </div>
  </div>
</template>

<script>
import BannerElement from '~/components/layout/BannerElement'
import TitlePageElement from '~/components/layout/TitlePageElement'
import MenuLeftElement from '~/components/my-page/MenuLeftElement'
import { INDEX_SET_LOADING, INDEX_SET_TITLE_MENU, MOTIVATION_USER } from '~/store/store.const'
import EditMotiElement from '~/components/my-page/EditMotiElement'
export default {
  name: 'EditSelfPrPage',
  middleware: 'auth',
  components: { EditMotiElement, TitlePageElement, BannerElement, MenuLeftElement },
  data() {
    return {
      motivation: {}
    }
  },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.my_page'), route: '/my-page/top-page' },
      { name: this.$t('page.web_cv'), route: '/my-page/web-cv' },
      { name: this.$t('my_page.motivation'), route: '/my-page/motivation' },
      { name: this.$t('motivation.edit') }
    ])
    this.getMotivation()
  },
  methods: {
    async getMotivation() {
      this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const response = await this.$store.dispatch(MOTIVATION_USER)
        const { data, status_code } = response
        if (status_code === 200) {
          this.motivation = data
        }
      } catch (e) {
        this.$store.commit(INDEX_SET_LOADING, false)
      }
      this.$store.commit(INDEX_SET_LOADING, false)
    }
  }
}
</script>
