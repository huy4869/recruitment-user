<template>
  <div class="chat-page-element">
    <div>
      <div class="chat-page-title">
        <span>{{ $t('my_page.chat') }}</span>
      </div>
      <div v-if="showDetailMessage" class="back-to-list-user" @click="backToListUser">
        <img src="/assets/icon/icon_arrow.svg" alt="">
        <span>{{ userActive.name }}</span>
      </div>
      <div class="chat-page-content">
        <div class="show-pc">
          <div class="form-chat">
            <div class="list-form-chat">
              <div class="form-search">
                <el-input
                  v-model.trim="search"
                  :placeholder="$t('common.search')"
                  name="search"
                  type="text"
                  tabindex="2"
                  show-word-limit
                >
                  <img slot="prefix" src="/assets/icon/icon_search_input.svg" alt="">
                </el-input>
              </div>
              <div class="list-user">
                <div v-for="(user, index) in listUsers" :key="index" :class="['user-message-item', {'user-active': (index === indexActive)}]" @click="changeActive(user, index)">
                  <div v-if="checkSearch(user.store_name)" class="d-flex">
                    <div class="user-avatar">
                      <ShowAvatarElement :user="{ avatar: user.store_banner, name: user.store_name }"></ShowAvatarElement>
                    </div>
                    <div class="message-content">
                      <div class="d-flex justify-between">
                        <div class="user-name">{{ user.store_name }}</div>
                        <div class="message-date">{{ user.send_time }}</div>
                      </div>
                      <div class="d-flex justify-between">
                        <div :class="['last-message', { 'not-read': !user.be_readed }]">
                          {{ user.content }}
                        </div>
                        <div v-if="!user.be_readed" class="message-status">
                          <span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="content-form-chat">
              <div class="form-message" ref="scrollListMessage">
                <div v-for="(message, index) in listMessages" :key="index">
                  <FormChatElement :message="message"></FormChatElement>
                </div>
              </div>
              <div class="input-chat">
                <div class="d-flex justify-between">
                  <input v-model="message" type="text" :placeholder="$t('my_page.enter_message')">
                  <div class="button-send" @click="sendMessage">
                    <span>{{ $t('my_page.send') }}</span>
                    <img src="/assets/icon/icon_send_message.svg" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="show-sp">
          <div class="form-chat">
            <div v-if="!showDetailMessage" class="list-form-chat">
              <div class="form-search">
                <el-input
                  v-model.trim="search"
                  :placeholder="$t('common.search')"
                  name="search"
                  type="text"
                  tabindex="2"
                  show-word-limit
                >
                  <img slot="prefix" src="/assets/icon/icon_search_input.svg" alt="">
                </el-input>
              </div>
              <div class="list-user">
                <div v-for="(user, index) in listUsers" :key="index" :class="['user-message-item', {'user-active': (index === indexActive)}]" @click="changeActive(user, index, true)">
                  <div  v-if="checkSearch(user.store_name)" class="d-flex">
                    <div class="user-avatar">
                      <ShowAvatarElement :user="{ avatar: user.avatar, name: user.store_name }"></ShowAvatarElement>
                    </div>
                    <div class="message-content">
                      <div class="d-flex justify-between">
                        <div class="user-name">{{ user.name }}</div>
                        <div class="message-date">{{ user.last_updated }}</div>
                      </div>
                      <div class="d-flex justify-between">
                        <div :class="['last-message', { 'not-read': user.status_read }]">
                          {{ user.last_message }}
                        </div>
                        <div v-if="user.status_read" class="message-status">
                          <span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="content-form-chat">
              <div class="form-message" ref="scrollListMessageMobile">
                <div v-for="(message, index) in listMessages" :key="index">
                  <FormChatElement :message="message"></FormChatElement>
                </div>
              </div>
              <div class="input-chat">
                <div class="d-flex justify-between">
                  <input v-model="message" type="text" :placeholder="$t('my_page.enter_message')">
                  <div class="button-send" @click="sendMessage">
                    <span>{{ $t('my_page.send') }}</span>
                    <img src="/assets/icon/icon_send_message.svg" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  INDEX_SET_LOADING,
  CHAT_LIST,
  MY_PAGE_SET_SHOW_DETAIL_MESSAGE,
  CHAT_CREATE_MESSAGE,
  CHAT_DETAIL_CHAT
} from '../../store/store.const'
import ShowAvatarElement from '../element-ui/ShowAvatarElement'
import FormChatElement from './FormChatElement'
export default {
  name: 'ChatElement',
  components: { ShowAvatarElement, FormChatElement },
  data() {
    return {
      total: 3,
      listUsers: [],
      userActive: {},
      indexActive: 3,
      showDetailMessage: false,
      search: '',
      message: '',
      lastUpdated: '2022年09月26日更新',
      listMessages: []
    }
  },
  async created() {
    await this.getDataUser()
    this.$store.commit(MY_PAGE_SET_SHOW_DETAIL_MESSAGE, false)
  },
  methods: {
    async changeActive(user, index, mobile) {
      await this.changeDateMessage(user, index, mobile)
      this.scrollToElement()
    },
    async changeDateMessage(user, index, mobile) {
      this.indexActive = index
      this.userActive = user
      const dataResponse = await this.$store.dispatch(CHAT_DETAIL_CHAT, user.store_id)
      if (dataResponse.status_code === 200) {
        const dataMessages = []
        for (let x = dataResponse.data.length; x >= 0; x--) {
          dataMessages.push(dataResponse.data[x])
        }
        this.listMessages = dataMessages
        this.listUsers[index].be_readed = 1
      }
      if (mobile) {
        this.showDetailMessage = true
        this.$store.commit(MY_PAGE_SET_SHOW_DETAIL_MESSAGE, true)
      }
    },
    backToListUser() {
      this.showDetailMessage = false
      this.$store.commit(MY_PAGE_SET_SHOW_DETAIL_MESSAGE, false)
    },
    async getDataUser() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const dataResponse = await this.$store.dispatch(CHAT_LIST)
      if (dataResponse.status_code === 200) {
        this.listUsers = dataResponse.data
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    scrollToElement() {
      const messageDisplayMobile = this.$refs.scrollListMessageMobile
      const messageDisplay = this.$refs.scrollListMessage
      if (messageDisplay) {
        messageDisplay.scrollTop = messageDisplay.scrollHeight
      }
      if (messageDisplayMobile) {
        messageDisplayMobile.scrollTop = messageDisplayMobile.scrollHeight
      }
    },
    checkSearch(name) {
      if (this.search) {
        return name.includes(this.search)
      }
      return true
    },
    async sendMessage() {
      const dataMessage = {
        content: this.message,
        store_id: this.userActive.store_id
      }
      const dataResponse = await this.$store.dispatch(CHAT_CREATE_MESSAGE, dataMessage)
      if (dataResponse.status_code === 200) {
        await this.listMessages.push(dataResponse.data)
        this.listUsers[this.indexActive].content = this.message
        this.message = ''
        this.scrollToElement()
      }
    }
  }
}
</script>
