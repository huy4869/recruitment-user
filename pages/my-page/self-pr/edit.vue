<template>
  <div class="cv-page self-pr-page">
    <BannerElement :banner="$t('page.my_page')" title="my page" :subBanner="$t('content.web_cv')"></BannerElement>
    <TitlePageElement class="show-pc"></TitlePageElement>
    <div class="cv-content">
      <MenuLeftElement menu-active="web-cv" sub-active="self-pr"></MenuLeftElement>
      <div class="right-content-element edit-pr-form">
        <div class="edit-cv-element">
          <el-form
            ref="accountForm"
            :model="accountForm"
            :rules="accountRules"
            autocomplete="off"
            label-position="left"
          >
            <!-- EDIT SKILL SHEET -->
            <div class="edit-cv-title">{{ $t('self_pr.skill_sheet') }}</div>
            <div class="edit-cv-content edit-form-content" id="skill-sheet">
                <div class="card-text-title card-title-mobile"> {{ $t('self_pr.skill_sheet') }}</div>
                <div class="edit-form-input">
                  <div  v-for="(skill, key) in accountForm.skills" :key="key">
                    <BorderElement :col-size="5" :middle="true"></BorderElement>
                    <el-row class="form-label-input self-skill">
                      <div class="skill-item">
                        <el-col :md="5" :sm="24" class="col-label left-item">
                          <div class="label"><span>{{ skill.name }}</span></div>
                        </el-col>
                        <el-col :md="19" :sm="24">
                          <div class="content-input pr-slider">
                            <el-row class="d-flex">
                              <el-col :md="20" :sm="24">
                                <el-form-item class="skill-slider" label="" :error="(error.key === 'skills') ? error.value : ''">
                                  <el-slider
                                    v-model="skill.level"
                                    :step="1"
                                    :max="5"
                                    :min="1"
                                    :marks="marks"
                                  >
                                  </el-slider>
                                </el-form-item>
                              </el-col>
                            </el-row>
                          </div>
                        </el-col>
                      </div>
                    </el-row>
                  </div>
                  <BorderElement :col-size="5" :middle="true"></BorderElement>
                </div>
              </div>
            <!-- EDIT SELF PR -->
            <div class="edit-cv-title">{{ $t('self_pr.edit') }}</div>
            <div class="edit-cv-content edit-form-content">
                <div class="card-text-title card-title-mobile"> {{ $t('self_pr.edit') }}</div>
                <div class="edit-form-input">
                  <BorderElement :middle="true"></BorderElement>
                  <el-row class="d-flex form-label-input">
                    <el-col :md="5" :sm="24" class="col-label">
                      <div class="label"><span>{{ $t('self_pr.business_content') }}</span></div>
                    </el-col>
                    <el-col :md="19" :sm="24">
                      <div class="content-input">
                        <el-row class="d-flex">
                          <el-col :md="24" :sm="24">
                            <el-form-item label="" prop="favorite_skill" :error="(error.key === 'favorite_skill') ? error.value : ''">
                              <el-input
                                ref="favorite_skill"
                                v-model="accountForm.favorite_skill"
                                :placeholder="$t('self_pr.enter_business_content')"
                                :autosize="{ minRows: 5, maxRows: 12}"
                                name="favorite_skill"
                                type="textarea"
                                maxlength="2000"
                                tabindex="2"
                                @focus="resetValidate('favorite_skill')"
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
                    <el-col :md="5" :sm="24" class="col-label">
                      <div class="label">
                        <span class="break-space">{{ $t('self_pr.experience_knowledge') }}</span>
                      </div>
                    </el-col>
                    <el-col :md="19" :sm="24">
                      <div class="content-input">
                        <el-row class="d-flex">
                          <el-col :md="24" :sm="24">
                            <el-form-item label="" prop="experience_knowledge" :error="(error.key === 'experience_knowledge') ? error.value : ''">
                              <el-input
                                ref="alias_name"
                                v-model="accountForm.experience_knowledge"
                                :placeholder="$t('self_pr.enter_experience')"
                                :autosize="{ minRows: 5, maxRows: 12}"
                                name="experience_knowledge"
                                type="textarea"
                                maxlength="2000"
                                tabindex="2"
                                @focus="resetValidate('experience_knowledge')"
                              />
                            </el-form-item>
                            <div class="sm-text">{{ $t('my_page.currently') }}{{ experienceLength }}{{ $t('my_page.characters') }}</div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                  </el-row>
                  <BorderElement :middle="true"></BorderElement>
                  <el-row class="d-flex form-label-input">
                    <el-col :md="5" :sm="24" class="col-label">
                      <div class="label"><span>{{ $t('self_pr.pr') }}</span></div>
                    </el-col>
                    <el-col :md="19" :sm="24">
                      <div class="content-input">
                        <el-row class="d-flex">
                          <el-col :md="24" :sm="24">
                            <el-form-item label="" prop="self_pr" :error="(error.key === 'self_pr') ? error.value : ''">
                              <el-input
                                ref="self_pr"
                                v-model="accountForm.self_pr"
                                :placeholder="$t('self_pr.enter_pr')"
                                :autosize="{ minRows: 5, maxRows: 12}"
                                name="self_pr"
                                type="textarea"
                                maxlength="2000"
                                tabindex="2"
                                @focus="resetValidate('self_pr')"
                              />
                            </el-form-item>
                            <div class="sm-text">{{ $t('my_page.currently') }}{{ prLength }}{{ $t('my_page.characters') }}</div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                  </el-row>
                  <BorderElement :middle="true"></BorderElement>
                </div>
            </div>
          </el-form>
        </div>
        <div id="btn-center" class="text-center">
          <el-button class="card-button" @click="handleRouter('/my-page/self-pr')">{{ $t('my_page.back') }}</el-button>
          <el-button class="card-button btn-right" type="danger" @click.native="update" >{{ $t('my_page.edit') }}</el-button>
        </div>
        <ConfirmModal
          v-show="confirmModal"
          :text="$t('confirm_modal.back_confirm')"
          @close="closeConfirmModal"
          @handleRouter="handleRouter('/my-page/self-pr')">
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
  USER_SELF_PR,
  USER_SELF_PR_UPDATE
} from '~/store/store.const'
import BorderElement from '~/components/my-page/BorderElement'
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
      self_pr: {},
      marks: {
        1: this.$t('self_pr.weak'),
        2: '',
        3: this.$t('self_pr.normal'),
        4: '',
        5: this.$t('self_pr.good')
      },
      accountForm: {
        favorite_skill: '',
        experience_knowledge: '',
        self_pr: '',
        level: '',
        listType: { 1: [], 2: [], 3: [], 4: [], 5: [] },
        skills: [
          { type: 1, name: this.$t('self_pr.cut'), level: 1 },
          { type: 2, name: this.$t('self_pr.eyebrows'), level: 1 },
          { type: 3, name: this.$t('self_pr.perm'), level: 1 },
          { type: 4, name: this.$t('self_pr.plow'), level: 1 },
          { type: 5, name: this.$t('self_pr.shampoo'), level: 1 }
        ],
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      accountRules: {
        favorite_skill: [
          { validator: validAreaLength, message: this.$t('validation.area_length', { _field_: this.$t('self_pr.business_content') }), trigger: 'blur' }
        ],
        experience_knowledge: [
          { validator: validAreaLength, message: this.$t('validation.area_length', { _field_: this.$t('self_pr.experience_knowledge') }), trigger: 'blur' }
        ],
        self_pr: [
          { validator: validAreaLength, message: this.$t('validation.area_length', { _field_: this.$t('self_pr.pr') }), trigger: 'blur' }
        ]
      },
      confirmModal: false,
      clonedAccountForm: {}
    }
  },
  computed: {
    contentLength() {
      return this.showLengthTextarea(this.accountForm.favorite_skill)
    },
    experienceLength() {
      return this.showLengthTextarea(this.accountForm.experience_knowledge)
    },
    prLength() {
      return this.showLengthTextarea(this.accountForm.self_pr)
    }
  },
  watch: {
    async self_pr() {
      await this.getSelfPrData()
      this.clonedAccountForm = _.cloneDeep(this.accountForm)
    }
  },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.my_page'), route: '/my-page/top-page' },
      { name: this.$t('page.web_cv'), route: '/my-page/web-cv' },
      { name: this.$t('my_page.self_pr'), route: '/my-page/self-pr' },
      { name: this.$t('self_pr.edit') }
    ])
    this.getSelfPr()
  },
  methods: {
    showLengthTextarea(value) {
      if (value) {
        return ('000' + value.length).slice(-4)
      }
      return '0000'
    },
    async getSelfPr() {
      this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const response = await this.$store.dispatch(USER_SELF_PR)
        const { data, status_code } = response
        if (status_code === 200) {
          this.self_pr = data
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
      if (_.isEqual(this.accountForm, this.clonedAccountForm)) {
        this.handleRouter('/my-page/self-pr')
      } else {
        this.confirmModal = true
      }
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
            const response = await this.$store.dispatch(USER_SELF_PR_UPDATE, {
              ...dto
            })
            if (response.status_code === 200) {
              await this.$store.commit(INDEX_SET_SUCCESS, {
                show: true,
                text: response.messages
              })
              this.accountForm = this.clonedAccountForm
              this.handleRouter('/my-page/self-pr')
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
    getSelfPrData() {
      for (const item in this.self_pr) {
        this.accountForm[item] = this.self_pr[item]
      }
    }
  }
}
</script>
