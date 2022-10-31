import { handleApi } from '../utils/handleApi'

export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  listFavorite(context, query) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/favorite-job?' + query), context)
    })
  },
  listNewJobs(context, query) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/job/news'), context)
    })
  },
  listMostViewJobs(context, query) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/job/most-views'), context)
    })
  },
  listRecommendJobs(context, query) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/job/recommends'), context)
    })
  },
  listRecentJobs(context, query) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/job/recent'), context)
    })
  },
  listSuggestJobs(context, id) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/job/suggest/' + id), context)
    })
  },
  getDetailJob(context, id) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/job/' + id), context)
    })
  },
  removeFavoriteJob(context, id) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.delete('/favorite-job/delete/' + id), context)
    })
  },
  addFavoriteJob(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/favorite-job', data), context)
    })
  },
  listJob(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/job?' + data), context)
    })
  },
  // search job
  listSearchJob(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/search-jobs?' + data), context)
    })
  },
  removeSearchJob(context, id) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.delete('/search-jobs/delete/' + id), context)
    })
  },
  createFeedback(context, { id, data }) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post(`/feedback/${id}`, data), context)
    })
  }
}
