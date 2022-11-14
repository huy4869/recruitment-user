<template>
  <div class="menu-left-element">
    <div class="show-pc">
      <div v-for="(menu, key) in menuLeft" :key="key" @click="changeToPage(menu.key)">
        <div v-show="menu.key === statePage" class="menu-left menu-active">
          <span class="menu-name">{{ menu.name }}</span>
          <img src="/assets/icon/icon_arrow_active.svg" alt="">
        </div>
        <div v-show="menu.key !== statePage" class="menu-left">
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
import { mapState } from 'vuex'
import { MY_PAGE_SET_STATE_PAGE } from '../../store/store.const'

export default {
  name: 'MenuLeftElement',
  props: ['menuActive'],
  data() {
    return {
      menuActiveSelect: '',
      menuLeft: [
        { name: this.$t('my_page.top_page'), key: 'top_page' },
        { name: this.$t('my_page.history'), key: 'application_history' },
        { name: this.$t('my_page.favorite_job'), key: 'favorite_job' },
        { name: this.$t('my_page.web_cv'), key: 'web_cv' },
        { name: this.$t('my_page.past_search_condition'), key: 'past_search_condition' },
        { name: this.$t('my_page.desired_condition'), key: 'desired_condition' },
        { name: this.$t('my_page.change_password'), key: 'change_password' }
      ]
    }
  },
  computed: {
    ...mapState({
      statePage: state => state.my_page.statePage
    })
  },
  created() {
    if (this.menuActive) {
      this.menuActiveSelect = this.menuActive
      this.$store.commit(MY_PAGE_SET_STATE_PAGE, this.menuActive)
    } else {
      this.menuActiveSelect = this.statePage
    }
  },
  watch: {
    statePage(value) {
      this.menuActiveSelect = value
    },
    menuActive(value) {
      this.menuActiveSelect = value
      this.$store.commit(MY_PAGE_SET_STATE_PAGE, value)
    }
  },
  methods: {
    changeToPage(page) {
      this.$store.commit(MY_PAGE_SET_STATE_PAGE, page)
      this.$router.push('/my-page#' + page)
    }
  }
}
</script>
