<template>
  <div class="banner-element">
    <div class="banner-title"></div>
    <div class="banner-sub-title"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BannerElement',
  props: ['menu'],
  computed: {
    ...mapState({
      listMenu: state => state.titleMenu
    })
  }
}
</script>
