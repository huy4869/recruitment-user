import { handleApi } from '@/utils/handleApi'

export const state = () => ({
  statePage: 'top_page',
  showDetailMessage: false
})

export const mutations = {
  setStatePage(state, page) {
    state.statePage = page
  },
  setShowDetailMessage(state, status) {
    state.showDetailMessage = status
  }
}

export const actions = {
  getListWorkHistory(context, resource) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/work-history'))
    })
  },
  getBasicInfo(context, resource) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/profile'))
    })
  },
  updateBasicInfo(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/profile/update', data), context)
    })
  },
  uploadAvatar(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/upload-image', data), context)
    })
  }
}
