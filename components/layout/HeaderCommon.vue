<template>
  <div class="header-common">
    <div class="header-container">
      <div class="header-logo" @click="$router.push('/')">
        <img src="/assets/images/logo.svg" alt="">
      </div>
      <div class="header-content">
        <div class="button-action show-pc">
          <div>
            <img src="/assets/icon/icon_search.svg" alt="">
            <span>{{ $t('header.search') }}</span>
          </div>
        </div>
        <div class="button-action show-pc">
          <div>
            <img src="/assets/icon/icon_notification.svg" alt="">
            <span>{{ $t('header.search') }}</span>
          </div>
        </div>
        <div v-if="!loggedIn" class="button-register show-pc" @click="changeToLink('/register')">
          <span>{{ $t('header.member_register') }}</span>
        </div>
        <div v-if="!loggedIn" class="button-login">
          <el-button type="danger" @click="changeToLink('/login')">
            {{ $t('login.title') }}
          </el-button>
        </div>
        <div v-if="loggedIn" class="content-user">
          <img class="avatar" src="/assets/images/user_default.svg" alt="" @click="changeToLink('/my-page')">
          <span>{{ $t('header.name') }}たろ君</span>
          <img src="/assets/icon/icon_drop_more.svg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HeaderCommon',
  data() {
    return {
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn
    }
  },
  methods: {
    changeToLink(link) {
      this.$router.push(link)
    }
  }
}
</script>
