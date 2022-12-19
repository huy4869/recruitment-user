<template>
  <div class="menu-left-element">
    <div class="show-pc">
      <div v-for="(menu, key) in menuLeft" :key="key" @click="changeToPage(menu.key)">
        <div v-show="menu.key === statePage" class="menu-left menu-active d-flex items-center">
          <span class="menu-name">{{ menu.name }}</span>
          <img src="/assets/icon/icon-arrow-right.svg" alt="">
        </div>
        <div v-show="menu.key !== statePage" class="menu-left">
          <span class="menu-name">{{ menu.name }}</span>
          <img src="/assets/icon/icon_arrow.svg" alt="">
        </div>
      </div>
    </div>
    <div class="show-sp">
      <label for="nav-mobile-input" class="hamburger-title d-flex items-center">
        <img class="cursor-pointer" src="/assets/icon/hamburger.svg" alt="">
        <div v-for="(item, key) in menuLeft" :key="key">
          <div class="hamburger-name text-bold" v-if="item.key === menuActiveSelect">
            {{ item.name }}
          </div>
        </div>
      </label>
      <div class=" header-main-menu-mobile">
        <input @click="showModal"  id="nav-mobile-input" type="checkbox" name="" hidden class="nav-input">
        <label for="nav-mobile-input" class="nav-overlay"></label>
        <div class="nav-box">
            <div v-if="$auth.loggedIn" class="menu-mobile-alt ">
              <el-menu
                :default-active="menuActive"
                :default-openeds="['web-cv']"
                class="el-menu-vertical"
              >
                <div v-for="(item, key) in menuLeft" :key="key">
                  <el-submenu v-if="item.key === 'web-cv'" :index="item.key" :class="menuActive === 'web-cv' ? 'mobile-menu-active' : ''">
                    <template slot="title">
                      <span @click="changeToPage(item.key)">{{ item.name }}</span>
                    </template>
                    <el-menu-item :index="web.key" v-for="(web, key) in menuWebCv" :key="key" :class="subActive === web.key ? 'sub-menu-active' : ''" @click="changeToPage(web.key)" >
                      <div class="d-flex items-center justify-between">
                        <span class="menu-item">{{web.name}}</span>
                        <span><i class="el-icon-arrow-right"></i></span>
                      </div>
                    </el-menu-item>

                  </el-submenu>
                <el-menu-item v-else :index="item.key" @click="changeToPage(item.key)" >
                  <div class="d-flex items-center justify-between">
                    <span class="menu-item">{{item.name}}</span>
                    <span><i class="el-icon-arrow-right"></i></span>
                  </div>
                </el-menu-item>
                </div>
              </el-menu>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  MY_PAGE_SET_STATE_PAGE,
  SET_SHOW_MODAL_SP
} from '../../store/store.const'

export default {
  name: 'MenuLeftElement',
  props: ['menuActive', 'subActive'],
  data() {
    return {
      menuActiveSelect: '',
      menuLeft: [
        { name: this.$t('my_page.top_page'), key: 'top-page' },
        { name: this.$t('my_page.history'), key: 'application-history' },
        { name: this.$t('my_page.favorite_job'), key: 'favorite-job' },
        { name: this.$t('my_page.web_cv'), key: 'web-cv' },
        { name: this.$t('my_page.past_search_condition'), key: 'past-search-condition' },
        { name: this.$t('my_page.desired_condition'), key: 'desired-condition' },
        { name: this.$t('my_page.change_password'), key: 'change-password' }
      ],
      menuWebCv: [
        { name: this.$t('my_page.basic_information'), key: 'info' },
        { name: this.$t('my_page.job_career'), key: 'job-career' },
        { name: this.$t('my_page.self_pr'), key: 'self-pr' },
        { name: this.$t('my_page.qualification'), key: 'qualification' },
        { name: this.$t('my_page.education_background'), key: 'education' },
        { name: this.$t('my_page.motivation'), key: 'motivation' }
      ]
    }
  },
  computed: {
    ...mapState({
      statePage: state => state.my_page.statePage,
      showModalSp: state => state.showModalSp
    })
  },
  created() {
    if (this.menuActive) {
      this.menuActiveSelect = this.menuActive
      this.$store.commit(MY_PAGE_SET_STATE_PAGE, this.menuActive)
    } else {
      this.menuActiveSelect = this.statePage
    }
    this.$store.commit(SET_SHOW_MODAL_SP, false)
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
      this.$router.push('/my-page/' + page)
    },
    showModal() {
      this.$store.commit(SET_SHOW_MODAL_SP, !this.showModalSp)
    }
  }
}
</script>
