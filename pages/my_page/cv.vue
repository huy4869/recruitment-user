<template>
  <div>
    <TitlePageElement></TitlePageElement>
    <EditCvElement></EditCvElement>
  </div>
</template>

<script>
import EditCvElement from '../../components/element-ui/EditCvElement'
import TitlePageElement from '../../components/layout/TitlePageElement'
import { INDEX_SET_TITLE_MENU } from '../../store/store.const'

export default {
  name: 'CvPage',
  components: { EditCvElement, TitlePageElement },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.my_page'), route: '/my_page' },
      { name: this.$t('page.web_cv'), route: '/my_page/cv' }
    ])
  }
}
</script>
