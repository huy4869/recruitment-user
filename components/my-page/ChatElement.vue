<template>
  <div class="chat-page-element">
    <div>
      <div v-if="showMessageSP" class="back-to-list-user" @click="backToListUser">
        <img src="/assets/icon/icon_arrow_back.svg" alt="">
        <span>{{ userActive.store_name }}</span>
      </div>
      <div class="chat-page-content">
        <div class="show-pc">
          <div class="form-chat">
            <div class="list-form-chat">
              <div class="form-search">
                <el-input
                  v-model="search"
                  :placeholder="$t('common.search')"
                  name="search"
                  type="text"
                  tabindex="2"
                  show-word-limit
                >
                  <img slot="prefix" src="/assets/icon/icon_search_input.svg" alt="">
                </el-input>
              </div>
              <div ref="scrollListUser" class="list-user">
                <div
                  v-for="(user, index) in listUsers"
                  :key="index"
                  @click="changeActive(user, index)"
                >
                  <div v-if="checkSearch(user.store_name)" :class="['user-message-item', {'user-active': (index === indexActive)}, {'user-unread': !user.be_readed}]">
                    <div class="d-flex">
                      <div class="user-avatar">
                        <ShowAvatarElement :user="{ avatar: user.store_banner, name: user.store_name, id: user.store_id }"></ShowAvatarElement>
                      </div>
                      <div class="message-content">
                        <div class="d-flex justify-between">
                          <div class="user-name">{{ user.store_name }}</div>
                          <div class="message-date">{{ user.send_time }}</div>
                        </div>
                        <div class="d-flex justify-between">
                          <div class="last-message">
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
            </div>
            <div class="content-form-chat">
              <div class="form-message" ref="scrollListMessage">
                <div v-for="(message, index) in listMessages" :key="index">
                  <FormChatElement :message="message" :store_id="userActive.store_id"></FormChatElement>
                </div>
              </div>
              <div v-if="!is_delete_store" class="input-chat">
                <el-form
                  ref="chatForm"
                  :model="chatForm"
                  :rules="chatRules"
                  autocomplete="off"
                  label-position="left"
                  @submit.native.prevent
                >
                  <el-form-item class="message-chat-input" label="" prop="message" :error="(error.key === 'message') ? error.value : ''">
                    <el-input
                      ref="message"
                      v-model="chatForm.message"
                      :placeholder="$t('my_page.enter_message')"
                      name="message"
                      type="textarea"
                      tabindex="2"
                      @keypress.enter.native="checkSendMessage"
                      @focus="resetValidate('message')"
                      maxlength="1000"
                      autosize
                    />
                    <div class="button-send" @click="sendMessage">
                      <span>{{ $t('my_page.send') }}</span>
                      <img src="/assets/icon/icon_send_message.svg" alt="">
                    </div>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else class="deleted-store text-center">
                <span class="delete-message">
                {{ $t('common.deleted_store')}}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="show-sp">
          <div class="form-chat">
            <div v-show="!showMessageSP" class="list-form-chat">
              <div class="form-search">
                <el-input
                  v-model="search"
                  :placeholder="$t('common.search')"
                  name="search"
                  type="text"
                  tabindex="2"
                  show-word-limit
                >
                  <img slot="prefix" src="/assets/icon/icon_search_input.svg" alt="">
                </el-input>
              </div>
              <div ref="scrollListUserMobile" class="list-user">
                <div v-for="(user, index) in listUsers" :key="index" @click="showDetailSp(user, index, true)">
                  <div v-if="checkSearch(user.store_name)" :class="['user-message-item', {'user-active': (index === indexActive)}, {'user-unread': !user.be_readed}]">
                    <div class="d-flex">
                      <div class="user-avatar">
                        <ShowAvatarElement :user="{ avatar: user.avatar, name: user.store_name, id: user.store_id }"></ShowAvatarElement>
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
            </div>
            <div v-show="showMessageSP" class="content-form-chat">
              <div class="form-message" ref="scrollListMessageMobile">
                <div v-for="(message, index) in listMessages" :key="index">
                  <FormChatElement :message="message" :store_id="userActive.store_id"></FormChatElement>
                </div>
              </div>
              <div v-if="!is_delete_store" class="input-chat">
                <el-form
                  ref="chatForm"
                  :model="chatForm"
                  :rules="chatRules"
                  autocomplete="off"
                  label-position="left"
                  @submit.native.prevent
                >
                  <el-form-item class="message-chat-input" label="" prop="message" :error="(error.key === 'message') ? error.value : ''">
                    <el-input
                      ref="message"
                      v-model="chatForm.message"
                      :placeholder="$t('my_page.enter_message')"
                      name="message"
                      type="textarea"
                      tabindex="2"
                      @keypress.enter.native="checkSendMessage"
                      @focus="resetValidate('message')"
                      maxlength="1000"
                      autosize
                    />
                    <div class="button-send" @click="sendMessage">
                      <span>{{ $t('my_page.send') }}</span>
                      <img src="/assets/icon/icon_send_message.svg" alt="">
                    </div>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else class="deleted-store-sp text-center">
                <span class="delete-message">
                {{ $t('common.deleted_store')}}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import {
  INDEX_SET_LOADING,
  CHAT_LIST,
  MY_PAGE_SET_SHOW_DETAIL_MESSAGE,
  CHAT_CREATE_MESSAGE,
  CHAT_DETAIL_CHAT,
  INDEX_SET_ERROR,
  SET_SHOW_MESSAGE_SP
} from '../../store/store.const'
import ShowAvatarElement from '../element-ui/ShowAvatarElement'
import FormChatElement from './FormChatElement'
export default {
  name: 'ChatElement',
  components: { ShowAvatarElement, FormChatElement },
  data() {
    const validFormLength = (rule, value, callback) => {
      if (value && value.length > 1000) {
        callback(new Error(this.$t('validation.max_length_text', { _field_: this.$t('my_page.message'), _max_: 1000 })))
      } else {
        callback()
      }
    }
    return {
      listUsers: [],
      userActive: {},
      indexActive: '',
      showDetailMessage: false,
      search: '',
      message: '',
      lastUpdated: '2022年09月26日更新',
      listMessages: [],
      chatForm: {
        message: '',
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      chatRules: {
        message: [
          { validator: validFormLength, trigger: 'blur' }
        ]
      },
      is_delete_store: false
    }
  },
  watch: {
    showMessageSP(newValue, oldValue) {
      if (!this.showMessageSP) {
        setTimeout(() => this.scrollToElementSp(), 500)
      }
    }
  },
  computed: {
    ...mapState({
      showMessageSP: state => state.showMessageSP
    })
  },
  async created() {
    await this.$store.commit(INDEX_SET_LOADING, true)
    await this.getDataUser()
    this.$store.commit(MY_PAGE_SET_SHOW_DETAIL_MESSAGE, false)
    if (this.$route.query.store) {
      this.listUsers.forEach((item, index) => {
        if (Number(this.$route.query.store) === item.store_id) {
          this.changeActive(item, index, false)
        }
      })
    }
    this.$store.commit(SET_SHOW_MESSAGE_SP, false)
    await this.$store.commit(INDEX_SET_LOADING, false)
  },
  methods: {
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.chatForm.fields.find((f) => f.prop === ref).clearValidate()
      this.chatForm.errors[ref] = ''
    },
    async showDetailSp(user, index, mobile) {
      await this.changeActive(user, index, mobile)
      await this.$store.commit(SET_SHOW_MESSAGE_SP, true)
    },
    async changeActive(user, index, mobile) {
      if (user) {
        await this.changeDateMessage(user, index, mobile)
        this.scrollToElement()
      }
    },
    async changeDateMessage(user, index, mobile) {
      this.indexActive = index
      this.userActive = user
      const dataResponse = await this.$store.dispatch(CHAT_DETAIL_CHAT, user.store_id)
      if (dataResponse.status_code === 200) {
        this.is_delete_store = dataResponse.data.is_delete_store
        const dataMessages = []
        let check = ''
        let user = ''
        let message = {}
        let send_time = ''
        const data = dataResponse.data.data
        for (const y in data) {
          dataMessages.push({ is_date_now: true, date_show: y })
          for (let i = 0; i <= data[y].length - 1; i++) {
            message = data[y][i]
            message.color = this.userActive.color
            check = data[y][i].initial_time
            user = data[y][i].is_from_user
            send_time = data[y][i].send_time
            if (i < data[y].length - 1) {
              message.show_date = false
              if (user !== data[y][i + 1].is_from_user) {
                message.show_date = true
              }
              if (check !== data[y][i + 1].initial_time) {
                if (send_time !== data[y][i + 1].send_time) {
                  message.show_date = true
                }
              }
            } else {
              message.show_date = true
            }
            dataMessages.push(message)
          }
        }
        this.listMessages = dataMessages
        this.listUsers[index].be_readed = 1
      }
      if (mobile) {
        this.$store.commit(MY_PAGE_SET_SHOW_DETAIL_MESSAGE, true)
      }
    },
    backToListUser() {
      this.$store.commit(SET_SHOW_MESSAGE_SP, false)
      this.$store.commit(MY_PAGE_SET_SHOW_DETAIL_MESSAGE, false)
    },
    async getDataUser() {
      const dataResponse = await this.$store.dispatch(CHAT_LIST)
      if (dataResponse.status_code === 200) {
        const listUsers = []
        dataResponse.data.forEach((item) => {
          listUsers.push(item)
        })
        this.listUsers = listUsers
        await this.changeActive(this.listUsers[0], 0, false)
      }
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
    scrollToElementListUser() {
      const userDisplayMobile = this.$refs.scrollListUserMobile
      const userDisplay = this.$refs.scrollListUser
      userDisplay.scrollTo({ top: 0, behavior: 'smooth' })
      userDisplayMobile.scrollTo({ top: 0, behavior: 'smooth' })
    },
    scrollToElementSp() {
      const userDisplayMobile = this.$refs.scrollListUserMobile
      userDisplayMobile.scrollTo({ top: 0, behavior: 'smooth' })
    },
    checkSearch(name) {
      if (this.search) {
        return name.includes(this.search)
      }
      return true
    },
    sendMessage() {
      this.error = { key: null, value: '' }
      this.$refs.chatForm.validate(async valid => {
        if (valid) {
          const message = _.cloneDeep(this.chatForm.message)
          this.chatForm.message = ''
          if (message === '') {
            return
          }
          try {
            await this.$store.commit(INDEX_SET_LOADING, true)
            const dataMessage = {
              content: message,
              store_id: this.userActive.store_id
            }
            const dataResponse = await this.$store.dispatch(CHAT_CREATE_MESSAGE, dataMessage)
            if (dataResponse.status_code === 200) {
              await this.listMessages.push(dataResponse.data)
              this.listUsers[this.indexActive].content = this.chatForm.message
              this.scrollToElement()
              await this.getDataUser()
              this.scrollToElementListUser()
            }
            if (dataResponse.status_code === 500) {
              await this.$store.commit(INDEX_SET_ERROR, {
                show: true,
                text: this.$t('content.EXC_001')
              })
            }
            if (dataResponse.status_code === 400) {
              this.is_delete_store = true
            }
          } catch (err) {
            await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('content.EXC_001') })
          }
          await this.$store.commit(INDEX_SET_LOADING, false)
        }
      })
    },
    checkSendMessage(event) {
      if (event.key === 'Enter') {
        if (!event.shiftKey) {
          event.preventDefault()
          this.sendMessage()
        }
      }
    }
  }
}
</script>
