<template>
  <div class="cv-page">
    <TitlePageElement class="show-pc"></TitlePageElement>
    <BannerElement :banner="$t('page.web_cv')"></BannerElement>
    <div class="cv-content">
      <MenuLeftElement menu-active="web_cv"></MenuLeftElement>
      <EditSelfPrElement :self_pr="self_pr"></EditSelfPrElement>
    </div>
  </div>
</template>

<script>
import BannerElement from '~/components/layout/BannerElement'
import TitlePageElement from '~/components/layout/TitlePageElement'
import MenuLeftElement from '~/components/my-page/MenuLeftElement'
import { INDEX_SET_LOADING, INDEX_SET_TITLE_MENU, USER_SELF_PR } from '~/store/store.const'
import EditSelfPrElement from '~/components/my-page/EditSelfPrElement'
export default {
  name: 'EditSelfPrPage',
  components: { EditSelfPrElement, TitlePageElement, BannerElement, MenuLeftElement },
  data() {
    return {
      self_pr: {}
    }
  },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.my_page'), route: '/my-page' },
      { name: this.$t('page.web_cv'), route: '/my-page#web_cv' },
      { name: this.$t('my_page.self_pr'), route: '/my-page/self-pr' },
      { name: this.$t('self_pr.edit') }
    ])
    this.getSelfPr()
  },
  methods: {
    async getSelfPr() {
      this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const response = await this.$store.dispatch(USER_SELF_PR)
        const { data, status_code } = response
        if (status_code === 200) {
          this.self_pr = data
        }
      } catch (e) {
        this.$store.commit(INDEX_SET_LOADING, false)
      }
      this.$store.commit(INDEX_SET_LOADING, false)
    }
  }
}
</script>
