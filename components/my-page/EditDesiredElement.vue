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
              <el-col :md="6" :sm="10" :xs="12" class="col-label">
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
              <el-col :md="6" :sm="10" :xs="12" class="col-label">
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
              <el-col :md="6" :sm="10" :xs="12" class="col-label">
                <div class="label"><span>{{ $t('desired_condition.age') }}</span></div>
              </el-col>
              <el-col :md="9" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="age_id" :error="(error.key === 'age_id') ? error.value : ''">
                        <el-select v-model="accountForm.age_id" :placeholder="$t('desired_condition.age')">
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
              <el-col :md="6" :sm="10" :xs="12" class="col-label">
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
              <el-col :md="6" :sm="10" :xs="12" class="col-label">
                <div class="label"><span>{{ $t('desired_condition.position') }}</span></div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="job_type_ids" :error="(error.key === 'job_type_ids') ? error.value : ''">
                        <el-select v-model="accountForm.job_type_ids" multiple :placeholder="$t('desired_condition.enter_position')">
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
              <el-col :md="6" :sm="10" :xs="12" class="col-label">
                <div class="label"><span>{{ $t('desired_condition.experience') }}</span></div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="job_experience_ids" :error="(error.key === 'job_experience_ids') ? error.value : ''">
                        <el-select v-model="accountForm.job_experience_ids" multiple :placeholder="$t('desired_condition.enter_experience')">
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
              <el-col :md="6" :sm="10" :xs="12" class="col-label">
                <div class="label"><span>{{ $t('desired_condition.working_day') }}</span></div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="">
                    <el-form-item label="" prop="working_days" :error="(error.key === 'working_days') ? error.value : ''">
                      <el-checkbox-group v-model="accountForm.working_days">
                        <div class="checkbox-days">
                          <div v-for="(feature, index) in listDays" :key="index" class="checkbox-item">
                            <el-checkbox :label="feature.id">{{ feature.name }}</el-checkbox>
                          </div>
                        </div>
                      </el-checkbox-group>
                    </el-form-item>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <BorderElement :middle="true"></BorderElement>
            <el-row class="d-flex form-label-input">
              <el-col :md="6" :sm="10" class="col-label">
                <div class="label"><span>{{ $t('desired_condition.working_day') }}</span></div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex period-desired">
                    <el-col :md="12" :sm="24" class="start-time">
                      <el-form-item label="" prop="start_working_hour" :error="(error.key === 'start_working_hour') ? error.value : ''">
                        <el-row class="d-flex">
                          <span class="text-normal birthday">{{ $t('desired_condition.start_time') }}</span>
                          <el-col :sm="7" :xs="9" class="birth-year">
                            <el-input
                              ref="start_working_hour"
                              v-model.trim="accountForm.working_hours.start_hours"
                              name="year"
                              type="text"
                              tabindex="2"
                              maxlength="2"
                              oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                              pattern="[0-9]*"
                              inputmode="numeric"
                              @focus="resetValidate('start_working_hour')"
                            />
                          </el-col>
                          <span class="text-normal birthday">:</span>
                          <el-col :sm="7" :xs="9" class="birth-month">
                            <el-input
                              ref="start_working_hour"
                              v-model.trim="accountForm.working_hours.start_minutes"
                              name="start_working_hour"
                              type="text"
                              maxlength="2"
                              tabindex="2"
                              oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                              pattern="[0-9]*"
                              inputmode="numeric"
                              @focus="resetValidate('start_working_hour')"
                            />
                          </el-col>
                        </el-row>
                      </el-form-item>
                    </el-col>
                    <el-col :md="12" :sm="24" class="birth-year">
                      <el-form-item label="" prop="end_working_hour" :error="(error.key === 'end_working_hour') ? error.value : ''">
                        <el-row class="d-flex">
                          <span class="text-normal birthday">{{ $t('desired_condition.end_time') }}</span>
                          <el-col  :sm="7" :xs="9" class="birth-year">
                            <el-input
                              ref="end_working_hour"
                              v-model.trim="accountForm.working_hours.end_hours"
                              name="birthday"
                              type="text"
                              tabindex="2"
                              maxlength="2"
                              oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                              pattern="[0-9]*"
                              inputmode="numeric"
                              @focus="resetValidate('end_working_hour')"
                            />
                          </el-col>
                          <span class="text-normal birthday">:</span>
                          <el-col  :sm="7" :xs="9" class="birth-month">
                            <el-input
                              ref="end_working_hour"
                              v-model.trim="accountForm.working_hours.end_minutes"
                              name="birthday"
                              type="text"
                              maxlength="2"
                              tabindex="2"
                              oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                              pattern="[0-9]*"
                              inputmode="numeric"
                              @focus="resetValidate('end_working_hour')"
                            />
                          </el-col>
                        </el-row>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <BorderElement :middle="true"></BorderElement>
            <el-row class="d-flex form-label-input">
              <el-col :md="6" :sm="10" :xs="12" class="col-label">
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
    listDays: {
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
        age_id: '',
        salary_type_id: '',
        job_type_ids: [],
        job_experience_ids: [],
        job_feature_ids: [],
        salary_min: '',
        salary_max: '',
        working_days: [],
        working_hours: {
          start_hours: '',
          start_minutes: '',
          end_hours: '',
          end_minutes: '',
          working_hours_format: ''
        },
        start_working_hour: '',
        end_working_hour: '',
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      accountRules: {
      },
      listRecruitmentFeatures: [],
      listCompanyFeatures: [],
      listStoreFeatures: [],
      confirmModal: false,
      ListWorkType: [],
      ListJobType: []
    }
  },
  computed: {
    start_working_hour() {
      return this.accountForm.working_hours.start_hours && this.accountForm.working_hours.start_minutes
    },
    end_working_hour() {
      return this.accountForm.working_hours.end_hours && this.accountForm.working_hours.end_minutes
    },
    working_day() {
      return this.accountForm.working_days
    }
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
      for (const item in this.desired) {
        this.accountForm[item] = this.desired[item]
      }
    },
    'accountForm.salary_min'() {
      if (!this.accountForm.min && !this.accountForm) {
        this.accountForm.salary_type_id = ''
      }
    },
    start_working_hour() {
      this.accountForm.start_working_hour = this.start_working_hour
    },
    end_working_hour() {
      this.accountForm.end_working_hour = this.end_working_hour
    },
    'accountForm.working_hours.start_hours'() {
      if ((this.accountForm.working_hours.start_hours && !this.accountForm.working_hours.start_minutes) || (!this.accountForm.working_hours.start_hours && this.accountForm.working_hours.start_minutes)) {
        this.accountRules.start_working_hour = [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('desired_condition.start_time') }), trigger: 'blur' }
        ]
        this.$refs.accountForm.validateField('start_working_hour')
      } else if (this.accountForm.working_hours.start_hours && this.accountForm.working_hours.start_minutes) {
        this.accountForm.start_working_hour = this.accountForm.working_hours.start_hours + '' + this.accountForm.working_hours.start_minutes
        this.resetValidate('start_working_hour')
      }
    },
    'accountForm.working_hours.start_minutes'() {
      if ((this.accountForm.working_hours.start_hours && !this.accountForm.working_hours.start_minutes) || (!this.accountForm.working_hours.start_hours && this.accountForm.working_hours.start_minutes)) {
        this.accountRules.start_working_hour = [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('desired_condition.start_time') }), trigger: 'blur' }
        ]
        this.$refs.accountForm.validateField('start_working_hour')
      } else if (this.accountForm.working_hours.start_hours && this.accountForm.working_hours.start_minutes) {
        this.accountForm.start_working_hour = this.accountForm.working_hours.start_hours + '' + this.accountForm.working_hours.start_minutes
        this.resetValidate('start_working_hour')
      }
    },
    'accountForm.working_hours.end_hours'() {
      if ((this.accountForm.working_hours.end_hours && !this.accountForm.working_hours.end_minutes) || (!this.accountForm.working_hours.end_hours && this.accountForm.working_hours.end_minutes)) {
        this.accountRules.end_working_hour = [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('desired_condition.end_time') }), trigger: 'blur' }
        ]
        this.$refs.accountForm.validateField('end_working_hour')
      } else if (this.accountForm.working_hours.end_hours && this.accountForm.working_hours.end_minutes) {
        this.accountForm.end_working_hour = this.accountForm.working_hours.end_hours + '' + this.accountForm.working_hours.end_minutes
        this.resetValidate('end_working_hour')
      }
    },
    'accountForm.working_hours.end_minutes'() {
      if ((this.accountForm.working_hours.end_hours && !this.accountForm.working_hours.end_minutes) || (!this.accountForm.working_hours.end_hours && this.accountForm.working_hours.end_minutes)) {
        this.accountRules.end_working_hour = [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('desired_condition.end_time') }), trigger: 'blur' }
        ]
        this.$refs.accountForm.validateField('end_working_hour')
      } else if (this.accountForm.working_hours.end_hours && this.accountForm.working_hours.end_minutes) {
        this.accountForm.end_working_hour = this.accountForm.working_hours.end_hours + '' + this.accountForm.working_hours.end_minutes
        this.resetValidate('end_working_hour')
      }
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
            if (!(this.accountForm.salary_min && this.accountForm.salary_max && this.accountForm.salary_type_id)) {
              dto.salary_max = ''
              dto.salary_min = ''
              dto.salary_type_id = ''
            }

            const response = await this.$store.dispatch(DESIRED_UPDATE, dto)
            switch (response.status_code) {
              case 200:
                await this.$store.commit(INDEX_SET_SUCCESS, {
                  show: true,
                  text: response.messages
                })
                this.$router.push('/my-page#desired_condition')
                break
              case 422:
                for (const [key] of Object.entries(response.data)) {
                  this.error = { key, value: response.data[key][0] }
                }
                break
              default:
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
