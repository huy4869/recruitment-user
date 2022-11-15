<template>
  <div class="inquiry-page">
    <TitlePageElement class="show-pc"></TitlePageElement>
    <BannerElement :banner="$t('page.inquiry')"></BannerElement>
    <InquiryElement></InquiryElement>
  </div>
</template>

<script>
import InquiryElement from '../components/element-ui/InquiryElement'
import BannerElement from '~/components/layout/BannerElement'
import TitlePageElement from '~/components/layout/TitlePageElement'
import {
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  INDEX_SET_TITLE_MENU,
  INQUIRY_CREATE,
  INQUIRY_PHONE_NUMBER
} from '~/store/store.const'
import { validEmail, validHalfWidth, validPhoneNumber } from '~/utils/validate'

export default {
  name: 'InquiryPage',
  components: { TitlePageElement, BannerElement, InquiryElement },
  data() {
    const validAreaLength = (rule, value, callback, message) => {
      if (value && value.length > 1000) {
        callback(new Error(this.$t('validation.short_area_length', { _field_: message })))
      } else {
        callback()
      }
    }
    const validFormEmail = (rule, value, callback) => {
      if (value && value.length > 255) {
        callback(new Error(this.$t('validation.max_length', { _field_: this.$t('login.email') })))
      }
      if (value.search(' ') !== -1) {
        callback(new Error(this.$t('validation.com002', { _field_: this.$t('login.email') })))
      }
      if (!validHalfWidth(value)) {
        callback(new Error(this.$t('validation.halfwidth_email_length', { _field_: this.$t('login.email') })))
      }
      if (!validEmail(value)) {
        callback(new Error(this.$t('validation.email', { _field_: this.$t('login.email') })))
      } else {
        callback()
      }
    }
    const validFormLength = (rule, value, callback, message) => {
      if (value && value.length > 255) {
        callback(new Error(this.$t('validation.max_length', { _field_: message })))
      } else {
        callback()
      }
    }
    const validPhone = (rule, value, callback) => {
      if (value && (value.length > 13 || value.length < 10 || !value.startsWith(0))) {
        callback(new Error(this.$t('validation.phone_length', { _field_: this.$t('inquiry.phone') })))
      } else if (!validPhoneNumber(value)) {
        callback(new Error(this.$t('validation.phone', { _field_: this.$t('inquiry.phone') })))
      } else {
        callback()
      }
    }
    return {
      accountForm: {
        email: '',
        content: '',
        name: '',
        tel: '',
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      accountRules: {
        email: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('inquiry.email') }), trigger: 'blur' },
          { validator: validFormEmail, trigger: 'blur' }
        ],
        name: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('inquiry.name') }), trigger: 'blur' }
        ],
        tel: [
          { validator: validPhone, trigger: 'blur' }
        ],
        content: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('inquiry.content') }), trigger: 'blur' },
          { validator: validAreaLength, message: this.$t('validation.area_length', { _field_: this.$t('inquiry.content') }), trigger: 'blur' }
        ]
      },
      phone: ''
    }
  },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.inquiry'), route: '/my-page' }
    ])
    this.getPhoneNumber()
  },
  methods: {
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.accountForm.fields.find((f) => f.prop === ref).clearValidate()
      this.accountForm.errors[ref] = ''
    },
    submit() {
      this.error = { key: null, value: '' }
      this.$refs.accountForm.validate(async valid => {
        if (valid) {
          try {
            await this.$store.commit(INDEX_SET_LOADING, true)
            const dto = this.accountForm
            const response = await this.$store.dispatch(INQUIRY_CREATE, {
              ...dto
            })
            if (response.status_code === 200) {
              await this.$store.commit(INDEX_SET_SUCCESS, {
                show: true,
                text: response.messages
              })
              this.accountForm = {
                email: '',
                content: '',
                name: '',
                tel: '',
                errors: {}
              }
            } else {
              await this.$store.commit(INDEX_SET_ERROR, {
                show: true,
                text: response.messages
              })
            }
            await this.$store.commit(INDEX_SET_LOADING, false)
          } catch (err) {
            await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
          }
          await this.$store.commit(INDEX_SET_LOADING, false)
        }
      })
    },
    async getPhoneNumber() {
      this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const response = await this.$store.dispatch(INQUIRY_PHONE_NUMBER)
        const { data, status_code } = response
        if (status_code === 200) {
          this.phone = data
        }
      } catch (e) {
        this.$store.commit(INDEX_SET_LOADING, false)
      }
      this.$store.commit(INDEX_SET_LOADING, false)
    }
  }
}
</script>
