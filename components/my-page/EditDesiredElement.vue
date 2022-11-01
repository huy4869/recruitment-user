<template>
  <div class="right-content-element">
    <div class="edit-cv-element">
      <div class="edit-cv-title">{{ $t('desired_condition.edit') }}</div>
      <div class="edit-cv-content edit-form-content">
        <div class="card-text-title card-title-mobile"> {{ $t('desired_condition.edit') }}</div>
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
              <el-col :md="6" :sm="10" class="col-label">
                <div class="label"><span>{{ $t('desired_condition.location') }}</span></div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="province_id" :error="(error.key === 'province_id') ? error.value : ''">
                        <el-select v-model="accountForm.province_id" :placeholder="$t('desired_condition.location')">
                          <el-option
                            v-for="item in listProvince"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <BorderElement :middle="true"></BorderElement>
            <el-row class="d-flex form-label-input">
              <el-col :md="6" :sm="10" class="col-label">
                <div class="label"><span>{{ $t('desired_condition.type') }}</span></div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="work_type_ids" :error="(error.key === 'work_type_ids') ? error.value : ''">
                        <el-select v-model="accountForm.work_type_ids" multiple :placeholder="$t('desired_condition.type')">
                          <el-option
                            v-for="item in ListWorkType"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <BorderElement :middle="true"></BorderElement>
            <el-row class="d-flex form-label-input">
              <el-col :md="6" :sm="10" class="col-label">
                <div class="label"><span>{{ $t('desired_condition.age') }}</span></div>
              </el-col>
              <el-col :md="9" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="age" :error="(error.key === 'age') ? error.value : ''">
                        <el-select v-model="accountForm.age" :placeholder="$t('desired_condition.age')">
                          <el-option
                            v-for="item in listAge"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <BorderElement :middle="true"></BorderElement>
            <el-row class="d-flex form-label-input">
              <el-col :md="6" :sm="10" class="col-label">
                <div class="label"><span>{{ $t('desired_condition.salary') }}</span></div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="4" :sm="15" :xs="15">
                      <el-form-item class="salary-start" label="" prop="salary_min" :error="(error.key === 'salary_min') ? error.value : ''">
                        <el-input
                          ref="salary_min"
                          v-model="accountForm.salary_min"
                          :placeholder="$t('desired_condition.salary')"
                          name="salary_min"
                          type="text"
                          tabindex="2"
                          show-word-limit
                        />
                      </el-form-item>
                    </el-col>
                    <span class="salary-range">~</span>
                    <el-col :md="4" :sm="15" :xs="15">
                      <el-form-item label="" prop="salary_max" :error="(error.key === 'salary_max') ? error.value : ''">
                        <el-input
                          ref="salary_max"
                          v-model="accountForm.salary_max"
                          :placeholder="$t('desired_condition.salary')"
                          name="salary_max"
                          type="text"
                          tabindex="2"
                          show-word-limit
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :md="6" :sm="24">
                      <el-form-item class="salary-select" label="" prop="salary_type_id" :error="(error.key === 'salary_type_id') ? error.value : ''">
                        <el-select v-model="accountForm.salary_type_id" :placeholder="$t('desired_condition.age')">
                          <el-option
                            v-for="item in listSalary"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <BorderElement :middle="true"></BorderElement>
            <el-row class="d-flex form-label-input">
              <el-col :md="6" :sm="10" class="col-label">
                <div class="label"><span>{{ $t('desired_condition.position') }}</span></div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="job_type_ids" :error="(error.key === 'job_type_ids') ? error.value : ''">
                        <el-select v-model="accountForm.job_type_ids" :placeholder="$t('desired_condition.enter_position')">
                          <el-option
                            v-for="item in ListJobType"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <BorderElement :middle="true"></BorderElement>
            <el-row class="d-flex form-label-input">
              <el-col :md="6" :sm="10" class="col-label">
                <div class="label"><span>{{ $t('desired_condition.experience') }}</span></div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="job_experience_ids" :error="(error.key === 'job_experience_ids') ? error.value : ''">
                        <el-select v-model="accountForm.job_experience_ids" :placeholder="$t('desired_condition.enter_experience')">
                          <el-option
                            v-for="item in listJobExperience"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <BorderElement :middle="true"></BorderElement>
            <el-row class="d-flex form-label-input">
              <el-col :md="6" :sm="10" class="col-label">
                <div class="label"><span>{{ $t('desired_condition.features') }}</span></div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="">
                    <el-form-item label="" prop="job_features_ids" :error="(error.key === 'job_features_ids') ? error.value : ''">
                      <el-checkbox-group v-model="accountForm.job_feature_ids">
                        <div class="feature-group">
                          <div class="feature-title">※{{ $t('condition.recruitment_feature') }}</div>
                          <div class="checkbox-group">
                            <div v-for="(feature, index) in listRecruitmentFeatures" :key="index" class="checkbox-item">
                              <el-checkbox :label="feature.id">{{ feature.name }}</el-checkbox>
                            </div>
                          </div>
                        </div>
                        <div class="feature-group">
                          <div class="feature-title">※{{ $t('condition.company_feature') }}</div>
                          <div class="checkbox-group">
                            <div v-for="(feature, index) in listCompanyFeatures" :key="index" class="checkbox-item">
                              <el-checkbox :label="feature.id">{{ feature.name }}</el-checkbox>
                            </div>
                          </div>
                        </div>
                        <div class="feature-group">
                          <div class="feature-title">※{{ $t('condition.store_feature') }}</div>
                          <div class="checkbox-group">
                            <div v-for="(feature, index) in listStoreFeatures" :key="index" class="checkbox-item">
                              <el-checkbox :label="feature.id">{{ feature.name }}</el-checkbox>
                            </div>
                          </div>
                        </div>
                      </el-checkbox-group>
                    </el-form-item>
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
      <el-button class="card-button" @click="showConfirmModal">{{ $t('my_page.back') }}</el-button>
      <el-button class="card-button btn-right" type="danger" @click.native="handleUpdate" >{{ $t('my_page.edit') }}</el-button>
    </div>
    <ConfirmModal
      v-show="confirmModal"
      :text="$t('confirm_modal.back_confirm')"
      @close="closeConfirmModal"
      @handleRouter="handleRouter('/my-page#desired_condition')">
    </ConfirmModal>
  </div>
</template>

<script>
import BorderElement from './BorderElement'
import { INDEX_SET_ERROR, INDEX_SET_LOADING, INDEX_SET_SUCCESS, DESIRED_UPDATE } from '@/store/store.const'

export default {
  name: 'EditCvElement',
  components: { BorderElement },
  props: {
    listProvince: {
      type: Array,
      default: () => []
    },
    listWorkTypes: {
      type: Array,
      default: () => []
    },
    listJobTypes: {
      type: Array,
      default: () => []
    },
    listSalary: {
      type: Array,
      default: () => []
    },
    listJobExperience: {
      type: Array,
      default: () => []
    },
    listJobFeatures: {
      type: Array,
      default: () => []
    },
    listAge: {
      type: Array,
      default: () => []
    },
    desired: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      accountForm: {
        province_id: '',
        work_type_ids: [],
        age: '',
        salary_type_id: '',
        job_type_ids: [],
        job_experience_ids: [],
        job_feature_ids: [],
        salary_min: '',
        salary_max: '',
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      accountRules: {
      },
      occupation: [
        { value: 'ヘア', label: 'ヘア' },
        { value: 'ネイル・マツゲ', label: 'ネイル・マツゲ' },
        { value: '整体・カイロ・酸素・温浴', label: '整体・カイロ・酸素・温浴' },
        { value: 'フェイシャル・ボディ・脱毛', label: 'フェイシャル・ボディ・脱毛' },
        { value: '美容クリニック', label: '美容クリニック' },
        { value: -1, label: 'その他' }
      ],
      ages: [
        { id: 1, name: '20代以上' },
        { id: 2, name: '30代以上' },
        { id: 3, name: '40代以上' },
        { id: 4, name: '50代以上' }
      ],
      salary: [
        { id: 1, name: '円/時給' },
        { id: 2, name: '円/日給' },
        { id: 3, name: '万円/月収' },
        { id: 4, name: '万円/年収' }
      ],
      listRecruitmentFeatures: [],
      listCompanyFeatures: [],
      listStoreFeatures: [],
      confirmModal: false,
      ListWorkType: [],
      ListJobType: []
    }
  },
  computed: {
  },
  watch: {
    listWorkTypes() {
      this.ListWorkType = this.listWorkTypes.filter(function(obj) {
        return !obj.is_other
      })
    },
    listJobTypes() {
      this.ListJobType = this.listJobTypes.filter(function(obj) {
        return !obj.is_other
      })
    },
    listJobFeatures() {
      this.listRecruitmentFeatures = this.listJobFeatures[0].feature
      this.listCompanyFeatures = this.listJobFeatures[1].feature
      this.listStoreFeatures = this.listJobFeatures[2].feature
    },
    desired() {
      // for (const item in this.desired) {
      //   this.accountForm[item] = this.desired[item]
      // }
    }
  },
  methods: {
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
    handleUpdate() {
      this.error = { key: null, value: '' }
      this.$refs.accountForm.validate(async valid => {
        if (valid) {
          try {
            await this.$store.commit(INDEX_SET_LOADING, true)
            const dto = this.accountForm

            const response = await this.$store.dispatch(DESIRED_UPDATE, dto)
            if (response.status_code === 200) {
              await this.$store.commit(INDEX_SET_SUCCESS, {
                show: true,
                text: response.messages
              })
              this.$router.push('/my-page#desired_condition')
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
    }
  }
}
</script>
