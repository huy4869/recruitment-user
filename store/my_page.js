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
  // work-history
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
  deleteWorkHistory(context, id) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post(`/work-history/${id}/delete`), context)
    })
  },
  // basic-info
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
  // self-pr
  getSelfPr(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/profile/pr'))
    })
  },
  updateSelfPr(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/profile/pr', data), context)
    })
  },
  // qualification
  getListQualification(context, resource) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/licenses-qualifications'), context)
    })
  },
  getQualificationByID(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/licenses-qualifications/${data}`))
    })
  },
  updateQualification(context, { id, data }) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post(`/licenses-qualifications/${id}`, data), context)
    })
  },
  createQualification(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/licenses-qualifications', data), context)
    })
  },
  deleteQualification(context, id) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post(`/licenses-qualifications/${id}/delete`), context)
    })
  },
  // edu
  getListEdu(context, resource) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/learning-history'), context)
    })
  },
  getEduByID(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/learning-history/${data}`))
    })
  },
  updateEdu(context, { id, data }) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post(`/learning-history/${id}`, data), context)
    })
  },
  createEdu(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/learning-history', data), context)
    })
  },
  deleteEdu(context, id) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post(`/learning-history/${id}/delete`), context)
    })
  },
  // Motivation
  getMotivation(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/profile/motivation'), context)
    })
  },
  updateMotivation(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/profile/motivation', data), context)
    })
  },
  // Desired
  getDesired(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/desired-condition'), context)
    })
  },
  updateDesired(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/desired-condition', data), context)
    })
  },
  createInquiry(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/contact/create', data), context)
    })
  },
  getPercentage(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/profile/percentage'), context)
    })
  }
}
