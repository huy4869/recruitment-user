import { handleApi } from '../utils/handleApi'
export const state = () => ({
})

export const getters = {}

export const mutations = {
}

export const actions = {
  updateProfile(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/auth/profile-update', data), context)
    })
  },
  uploadAvatar(context, data) {
    return new Promise((resolve, reject) => {
      handleApi(resolve, reject, this.$axios.post('/auth/upload-avatar', data), context)
    })
  }
}
