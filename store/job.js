import { handleApi } from '../utils/handleApi'

export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  listFavorite(context, query) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.get('/job/favorite-job'), context)
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
  }
}
