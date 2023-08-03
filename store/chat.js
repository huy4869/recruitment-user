import { handleApi } from '../utils/handleApi'

export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  listChat(context, query) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/chat/list'), context)
    })
  },
  getDetailChat(context, store_id) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/chat/list-detail/' + store_id), context)
    })
  },
  createMessage(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/chat/create', data), context)
    })
  }
}
