<template>
  <div>
    <div class="show-pc">
      <IndexPageElement></IndexPageElement>
    </div>
    <div class="show-sp">
      <IndexPageMobileElement></IndexPageMobileElement>
    </div>
  </div>
</template>

<script>
import { INDEX_SET_TITLE_MENU } from '../store/store.const'
import IndexPageElement from '../components/home/IndexPageElement'
import IndexPageMobileElement from '../components/home/IndexPageMobileElement'

export default {
  name: 'NotificationHistoryPage',
  components: { IndexPageMobileElement, IndexPageElement },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.my_page'), route: '/notification-history' }
    ])
  }
}
</script>
