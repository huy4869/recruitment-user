<template>
  <div class="header-common">
    <div class="header-container">
      <div class="header-logo" @click="$router.push('/')">
        <img src="/assets/images/logo.svg" alt="">
      </div>
      <div class="header-content">
        <div class="button-action show-pc">
          <div @click="changeToLink('/search')">
            <img src="/assets/icon/icon_search.svg" alt="">
            <span>{{ $t('header.search') }}</span>
          </div>
        </div>
        <div class="button-action show-pc">
          <div class="border-default"></div>
          <div @click="changeToLink('/notification')">
            <img src="/assets/icon/icon_notification.svg" alt="">
            <span>{{ $t('header.notification') }}</span>
          </div>
        </div>
        <div v-if="!loggedIn" class="button-action show-pc">
          <div class="border-default"></div>
          <div class="form-icon" @click="changeToLink('/register')">
            <img src="/assets/icon/icon_register.svg" alt="">
            <span>{{ $t('header.member_register') }}</span>
          </div>
        </div>
        <div v-if="!loggedIn" class="show-sp header-sp">
          <div class="button-action">
            <div class="form-icon" @click="changeToLink('/register')">
              <img src="/assets/icon/icon_register.svg" alt="">
              <span>{{ $t('header.member_register_mobile') }}</span>
            </div>
          </div>
          <div class="button-action">
            <div class="form-icon" @click="changeToLink('/login')">
              <img src="/assets/icon/icon_login_mobile.svg" alt="">
              <span>{{ $t('login.title') }}</span>
            </div>
          </div>
        </div>
        <div v-if="!loggedIn" class="button-login show-pc">
          <el-button type="danger" @click="changeToLink('/login')">
            <img src="/assets/icon/icon_login.svg" alt="">
            {{ $t('login.title') }}
          </el-button>
        </div>
        <div v-if="loggedIn" class="content-user">
          <div class="d-flex cursor-pointer"  @click="changeToLink('/my-page')">
            <img class="avatar" :src="user.avatar ? user.avatar : '/assets/images/user_default.svg'" alt="">
            <span>{{ $t('header.name') + (user.alias_name || user.email)}}</span>
          </div>
          <img class="cursor-pointer" src="/assets/icon/icon_drop_more.svg" alt="">
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
