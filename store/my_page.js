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
  getWorkHistoryByID(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/work-history/${data}`))
    })
  },
  updateWorkHistory(context, { id, data }) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post(`/work-history/${id}`, data), context)
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
  },
  getSelfPr(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/profile/pr'))
    })
  },
  updateSelfPr(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/profile/pr', data), context)
    })
  }
}
