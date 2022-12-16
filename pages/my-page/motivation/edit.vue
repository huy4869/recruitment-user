<template>
  <div class="cv-page">
    <BannerElement :banner="$t('page.my_page')" title="my page" :subBanner="$t('content.web_cv')"></BannerElement>
    <TitlePageElement class="show-pc"></TitlePageElement>
    <div class="cv-content">
      <MenuLeftElement menu-active="web-cv"></MenuLeftElement>
      <div class="right-content-element">
        <div class="edit-cv-element">
          <div class="edit-cv-title">{{ $t('motivation.edit') }}</div>
          <div class="edit-cv-content edit-form-content">
            <div class="card-text-title card-title-mobile"> {{ $t('motivation.edit') }}</div>
            <el-form
              ref="accountForm"
              :model="accountForm"
              :rules="accountRules"
              autocomplete="off"
              label-position="left"
            >
              <div class="edit-form-input">
                <BorderElement :middle="true"></BorderElement>
                <el-row class="d-flex form-label-input">
                  <el-col :md="6" :sm="24" class="col-label">
                    <div class="label"><span>{{ $t('motivation.name') }}</span></div>
                  </el-col>
                  <el-col :md="18" :sm="24">
                    <div class="content-input">
                      <el-row class="d-flex">
                        <el-col :md="20" :sm="24">
                          <el-form-item label="" prop="motivation" :error="(error.key === 'motivation') ? error.value : ''">
                            <el-input
                              ref="motivation"
                              v-model="accountForm.motivation"
                              :placeholder="$t('motivation.name')"
                              :autosize="{ minRows: 5, maxRows: 12}"
                              name="motivation"
                              type="textarea"
                              maxlength="2000"
                              tabindex="2"
                              @focus="resetValidate('motivation')"
                            />
                          </el-form-item>
                          <div class="sm-text">{{ $t('my_page.currently') }}{{ contentLength }}{{ $t('my_page.characters') }}</div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <BorderElement :middle="true"></BorderElement>
                <el-row class="d-flex form-label-input">
                  <el-col :md="6" :sm="24" class="col-label">
                    <div class="label"><span>{{ $t('motivation.note') }}</span></div>
                  </el-col>
                  <el-col :md="18" :sm="24">
                    <div class="content-input">
                      <el-row class="d-flex">
                        <el-col :md="20" :sm="24">
                          <el-form-item label="" prop="noteworthy" :error="(error.key === 'noteworthy') ? error.value : ''">
                            <el-input
                              ref="alias_name"
                              v-model="accountForm.noteworthy"
                              :placeholder="$t('motivation.note')"
                              :autosize="{ minRows: 5, maxRows: 12}"
                              name="noteworthy"
                              type="textarea"
                              maxlength="2000"
                              tabindex="2"
                              @focus="resetValidate('noteworthy')"
                            />
                          </el-form-item>
                          <div class="sm-text">{{ $t('my_page.currently') }}{{ experienceLength }}{{ $t('my_page.characters') }}</div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <BorderElement :middle="true"></BorderElement>
              </div>
            </el-form>
          </div>
        </div>
        <div id="btn-center" class="text-center">
          <el-button class="card-button" @click="handleRouter('/my-page/motivation')">{{ $t('my_page.back') }}</el-button>
          <el-button class="card-button btn-right" type="danger" @click.native="update" >{{ $t('my_page.save') }}</el-button>
        </div>
        <ConfirmModal
          v-show="confirmModal"
          :text="$t('confirm_modal.back_confirm')"
          @close="closeConfirmModal"
          @handleRouter="handleRouter('/my-page/motivation')">
        </ConfirmModal>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import BannerElement from '~/components/layout/BannerElement'
import TitlePageElement from '~/components/layout/TitlePageElement'
import MenuLeftElement from '~/components/my-page/MenuLeftElement'
import {
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  INDEX_SET_TITLE_MENU,
  MOTIVATION_UPDATE,
  MOTIVATION_USER
} from '~/store/store.const'
import BorderElement from '@/components/my-page/BorderElement'
export default {
  name: 'EditSelfPrPage',
  components: { BorderElement, TitlePageElement, BannerElement, MenuLeftElement },
  beforeRouteLeave(to, from, next) {
    const dataClone = this.clonedAccountForm
    const data = _.cloneDeep(this.accountForm)
    dataClone.errors = {}
    data.errors = {}
    if (!_.isEqual(data, dataClone)) {
      this.$confirm(this.$t('content.CON_002'), {
        confirmButtonText: this.$t('confirm_modal.yes'),
        cancelButtonText: this.$t('confirm_modal.no'),
        type: 'warning'
      })
        .then(function() {
          next()
        })
        .catch(function() {
          next(false)
        })
    } else {
      next()
    }
  },
  middleware: 'auth',
  data() {
    const validAreaLength = (rule, value, callback, message) => {
      if (value && value.length > 2000) {
        callback(new Error(this.$t('validation.area_length', { _field_: message })))
      } else {
        callback()
      }
    }
    return {
      motivation: {},
      accountForm: {
        motivation: '',
        noteworthy: '',
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      accountRules: {
        motivation: [
          { validator: validAreaLength, message: this.$t('validation.area_length', { _field_: this.$t('motivation.name') }), trigger: 'blur' }
        ],
        noteworthy: [
          { validator: validAreaLength, message: this.$t('validation.area_length', { _field_: this.$t('motivation.note') }), trigger: 'blur' }
        ]
      },
      confirmModal: false,
      clonedAccountForm: {}
    }
  },
  computed: {
    contentLength() {
      return this.showLengthTextarea(this.accountForm.motivation)
    },
    experienceLength() {
      return this.showLengthTextarea(this.accountForm.noteworthy)
    }
  },
  watch: {
    async motivation() {
      await this.getMotiInfo()
      this.clonedAccountForm = _.cloneDeep(this.accountForm)
    }
  },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.my_page'), route: '/my-page/top-page' },
      { name: this.$t('page.web_cv'), route: '/my-page/web-cv' },
      { name: this.$t('my_page.motivation'), route: '/my-page/motivation' },
      { name: this.$t('motivation.edit') }
    ])
    this.getMotivation()
  },
  methods: {
    showLengthTextarea(value) {
      if (value) {
        return ('000' + value.length).slice(-4)
      }
      return '0000'
    },
    async getMotivation() {
      this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const response = await this.$store.dispatch(MOTIVATION_USER)
        const { data, status_code } = response
        if (status_code === 200) {
          this.motivation = data
        }
      } catch (e) {
        this.$store.commit(INDEX_SET_LOADING, false)
      }
      this.$store.commit(INDEX_SET_LOADING, false)
    },
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.accountForm.fields.find((f) => f.prop === ref).clearValidate()
      this.accountForm.errors[ref] = ''
    },
    handleRouter(route) {
      this.$router.push(route)
    },
    showConfirmModal() {
      this.confirmModal = true
    },
    closeConfirmModal() {
      this.confirmModal = false
    },
    update() {
      this.error = { key: null, value: '' }
      this.$refs.accountForm.validate(async valid => {
        if (valid) {
          try {
            await this.$store.commit(INDEX_SET_LOADING, true)
            const dto = this.accountForm
            const response = await this.$store.dispatch(MOTIVATION_UPDATE, {
              ...dto
            })
            if (response.status_code === 200) {
              await this.$store.commit(INDEX_SET_SUCCESS, {
                show: true,
                text: response.messages
              })
              this.accountForm = this.clonedAccountForm
              this.handleRouter('/my-page/motivation')
            } else if (response.status_code === 500) {
              await this.$store.commit(INDEX_SET_ERROR, {
                show: true,
                text: this.$t('content.EXC_001')
              })
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
    getMotiInfo() {
      for (const item in this.motivation) {
        this.accountForm[item] = this.motivation[item]
      }
    }
  }
}
</script>
