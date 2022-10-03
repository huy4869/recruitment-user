<template>
  <div class="menu-left-element">
    <div v-for="(menu, key) in menuLeft" :key="key">
      <router-link v-if="menu.key === menuActive" class="menu-left menu-active" :to="menu.route">
        <span class="menu-name">{{ menu.name }}</span>
        <img src="/assets/icon/icon_arrow_active.svg" alt="">
      </router-link>
      <router-link v-else class="menu-left" :to="menu.route">
        <span class="menu-name">{{ menu.name }}</span>
        <img src="/assets/icon/icon_arrow.svg" alt="">
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuLeftElement',
  props: ['menuActive'],
  data() {
    return {
      menuLeft: [
        { name: this.$t('my_page.top_page'), key: 'top_page', route: '/' },
        { name: this.$t('my_page.history'), key: 'history', route: '/' },
        { name: this.$t('my_page.favorite_job'), key: 'favorite_job', route: '/' },
        { name: this.$t('my_page.web_cv'), key: 'web_cv', route: '/my_page/cv' },
        { name: this.$t('my_page.chat'), key: 'chat', route: '/' },
        { name: this.$t('my_page.change_password'), key: 'change_password', route: '/' }
      ]
    }
  }
}
</script>
