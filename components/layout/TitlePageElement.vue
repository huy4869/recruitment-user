<template>
  <div class="title-page-element">
    <div v-for="(title, key) in listMenu" :key="key">
      <div class="d-flex" v-if="key === 0">
        <router-link class="title-link" :to="title.route" tag="button">
          <img src="/assets/icon/icon_home.svg"/>
          <span>{{ title.name }}</span>
        </router-link>
        <span class="icon-between">/</span>
      </div>
      <div class="d-flex" v-else-if="key === (listMenu.length - 1)">
        <div class="title-not-link">
          <span>{{ title.name }}</span>
        </div>
      </div>
      <div class="d-flex" v-else>
        <router-link class="title-link" :to="title.route" tag="button">
          <span>{{ title.name }}</span>
        </router-link>
        <span class="icon-between">/</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TitlePageElement',
  props: ['menu'],
  computed: {
    ...mapState({
      listMenu: state => state.titleMenu
    })
  }
}
</script>
