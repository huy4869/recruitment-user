<template>
  <div class="job-not-found-page">
    <TitlePageElement class="show-pc"></TitlePageElement>
    <div class="text-center job-nodata">{{ $t('common.job_not_found') }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TitlePageElement from '../components/layout/TitlePageElement'
import { INDEX_SET_TITLE_MENU } from '@/store/store.const'
export default {
  name: 'JobNotFoundPage',
  components: { TitlePageElement },
  computed: {
    ...mapState({
      errorJob: state => state.errorJob
    })
  },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('common.job_not_found'), route: '/' }
    ])
  }
}
</script>
