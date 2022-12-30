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
        <div v-if="loggedIn" class="button-action show-pc">
          <div class="border-default"></div>
          <div @click="changeToLink('/chat')">
            <img src="/assets/icon/icon_chat.svg" alt="">
            <span>{{ $t('my_page.chat') }}</span>
          </div>
        </div>
        <div class="button-action show-pc">
          <div class="border-default"></div>
          <div v-if="totalNotification > 0" @click="changeToLink('/notification')">
            <el-badge class="mark" :value="totalNotification">
              <img src="/assets/icon/icon_notification.svg" alt="">
            </el-badge>
            <span class="noti-text-badge">{{ $t('header.notification') }}</span>
          </div>
          <div v-else @click="changeToLink('/notification')">
            <img src="/assets/icon/icon_notification.svg" alt="">
            <span class="noti-text">{{ $t('header.notification') }}</span>
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
          <el-button type="primary" @click="changeToLink('/login')">
            <img src="/assets/icon/icon_login.svg" alt="">
            {{ $t('login.title') }}
          </el-button>
        </div>
        <div v-if="loggedIn" class="show-action-user">
          <el-dropdown trigger="click">
            <div class="content-user items-center">
              <div class="d-flex cursor-pointer">
                <img class="avatar" :src="user.avatar ? user.avatar : '/assets/images/user_default.svg'" alt="">
                <span>{{ checkName(user.alias_name || (user.first_name + user.last_name)) + $t('common.dear') }}</span>
              </div>
              <img class="cursor-pointer" src="/assets/icon/icon_drop_more.svg" alt="">
            </div>
            <el-dropdown-menu slot="dropdown" class="show-dropdown-user">
              <el-dropdown-item>
                <div class="d-flex cursor-pointer show-action" @click="changeToLink('/my-page/top-page')">
                  <img src="/assets/icon/icon_my_page.svg" alt="">
                  <span>{{ $t('page.my_page') }}</span>
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div class="d-flex cursor-pointer show-action" @click="logout">
                  <img src="/assets/icon/icon_logout.svg" alt="">
                  <span>{{ $t('page.logout') }}</span>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { INDEX_SET_ERROR, INDEX_SET_LOADING, NOTIFICATION_COUNT } from '@/store/store.const'

export default {
  name: 'HeaderCommon',
  data() {
    return {
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
      totalNotification: ''
    }
  },
  watch: {
    '$auth.user': {
      handler() {
        this.user = this.$auth.user
      },
      deep: true
    }
  },
  created() {
    if (this.loggedIn) {
      this.countNotification()
    }
  },
  methods: {
    changeToLink(link) {
      this.$router.push(link)
    },
    async logout() {
      await this.$router.push('/logout')
    },
    checkName(value) {
      const name = value
      if (name.length > 6) {
        return name.slice(0, 6) + '...'
      }
      return name
    },
    async countNotification() {
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const response = await this.$store.dispatch(NOTIFICATION_COUNT)
        switch (response.status_code) {
          case 200:
            this.totalNotification = response.data.count
            break
          case 500:
            await this.$store.commit(INDEX_SET_ERROR, {
              show: true,
              text: this.$t('content.EXC_001')
            })
            break
          default:
            await this.$store.commit(INDEX_SET_ERROR, {
              show: true,
              text: response.messages
            })
            break
        }
        await this.$store.commit(INDEX_SET_LOADING, false)
      } catch (err) {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    }
  }
}
</script>
