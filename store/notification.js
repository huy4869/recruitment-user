import { handleApi } from '../utils/handleApi'

export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  listNotification(context, query) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/notifications'), context)
    })
  }
}
