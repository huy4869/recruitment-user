import { handleApi } from '../utils/handleApi'

export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  getListApplication(context, resource) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/applications`), context)
    })
  },
  getListApplicationApplied(context, resource) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/applications/applied?${resource}`), context)
    })
  },
  getListApplicationWaitingInterview(context, resource) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/applications/waiting-interview?${resource}`), context)
    })
  },
  postCancelApplication(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post(`/applications/cancel/${data}`), context)
    })
  },
  getDataApplication(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/job/${data}/application`), context)
    })
  },
  getDataDetailApplication(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get(`/applications/${data}`), context)
    })
  },
  postCreateApplication(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post(`/applications`, data), context)
    })
  },
  postUpdateApplication(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post(`/applications/${data.id}`, data.form), context)
    })
  }
}
