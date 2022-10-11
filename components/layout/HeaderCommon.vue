<template>
  <div class="header-common">
    <div class="header-container">
      <div class="header-logo" @click="$router.push('/')">Logo</div>
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
        <div v-if="!$auth.loggedIn" class="button-register show-pc">
          <span>{{ $t('header.member_register') }}</span>
        </div>
        <div v-if="!$auth.loggedIn" class="button-login">
          <el-button type="danger">
            {{ $t('login.title') }}
          </el-button>
        </div>
        <div v-if="$auth.loggedIn">
          <img src="/assets/images/user_default.svg" alt="">
          <span>{{ $t('header.name') }}たろ君</span>
          <img src="/assets/icon/icon_dropdown.svg" alt="">
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
      user: this.$auth.user
    }
  }
}
</script>
