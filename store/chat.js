import { handleApi } from '../utils/handleApi'

export const state = () => ({
  chatWithShop: true,
  shopTop: {},
  switchChat: false,
  unreadMessage: ''
})

export const getters = {}

export const mutations = {
  setChatWithShop(state, shop) {
    state.shopTop = JSON.parse(JSON.stringify(shop))
    state.chatWithShop = !state.chatWithShop
  },

  setShopTop(state) {},
  setSwitchChat(state, value) {
    state.switchChat = value
  },
  setUnreadMessage(state, value) {
    state.unreadMessage = value
  }
}

export const actions = {
  fetchRooms(context, query) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/chats/shops?' + new URLSearchParams(query).toString()), context)
    })
  },
  fetchMessage(context, query) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('chats/messages?' + new URLSearchParams(query).toString()), context)
    })
  },
  sendMessage(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('chats/store', data), context)
    })
  },
  fetchUnreadMessage(context) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('chats/unread-total'), context)
    })
  }
}
