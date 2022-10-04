<template>
  <div class="menu-left-element">
    <div class="show-pc">
      <div v-for="(menu, key) in menuLeft" :key="key" @click="changeToPage(menu.key)">
        <div v-if="menu.key === menuActive" class="menu-left menu-active">
          <span class="menu-name">{{ menu.name }}</span>
          <img src="/assets/icon/icon_arrow_active.svg" alt="">
        </div>
        <div v-else class="menu-left">
          <span class="menu-name">{{ menu.name }}</span>
          <img src="/assets/icon/icon_arrow.svg" alt="">
        </div>
      </div>
    </div>
    <div class="show-sp">
      <el-select v-model="menuActiveSelect" @change="changeToPage(menuActiveSelect)">
        <el-option
          v-for="item in menuLeft"
          :key="item.key"
          :label="item.name"
          :value="item.key">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuLeftElement',
  props: ['menuActive'],
  data() {
    return {
      menuActiveSelect: '',
      menuLeft: [
        { name: this.$t('my_page.top_page'), key: 'top_page' },
        { name: this.$t('my_page.history'), key: 'history' },
        { name: this.$t('my_page.favorite_job'), key: 'favorite_job' },
        { name: this.$t('my_page.web_cv'), key: 'web_cv' },
        { name: this.$t('my_page.chat'), key: 'chat' },
        { name: this.$t('my_page.change_password'), key: 'change_password' }
      ]
    }
  },
  created() {
    this.menuActiveSelect = this.menuActive
  },
  watch: {
    menuActive(value) {
      this.menuActiveSelect = value
    }
  },
  methods: {
    changeToPage(page) {
      this.$emit('changePage', page)
    }
  }
}
</script>
