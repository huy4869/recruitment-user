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
                      <el-form-item label="" prop="location" :error="(error.key === 'location') ? error.value : ''">
                        <el-select v-model="accountForm.occupationSelect" :placeholder="$t('desired_condition.location')">
                          <el-option
                            v-for="item in occupation"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
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
                      <el-form-item label="" prop="type" :error="(error.key === 'type') ? error.value : ''">
                        <el-select v-model="accountForm.occupationSelect" :placeholder="$t('desired_condition.type')">
                          <el-option
                            v-for="item in occupation"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
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
                            v-for="item in ages"
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
                      <el-form-item class="salary-start" label="" prop="age" :error="(error.key === 'age') ? error.value : ''">
                        <el-input
                          ref="store_name"
                          v-model="accountForm.store_name"
                          :placeholder="$t('desired_condition.salary')"
                          name="store_name"
                          type="text"
                          tabindex="2"
                          show-word-limit
                        />
                      </el-form-item>
                    </el-col>
                    <span class="salary-range">~</span>
                    <el-col :md="4" :sm="15" :xs="15">
                      <el-form-item label="" prop="age" :error="(error.key === 'age') ? error.value : ''">
                        <el-input
                          ref="store_name"
                          v-model="accountForm.store_name"
                          :placeholder="$t('desired_condition.salary')"
                          name="store_name"
                          type="text"
                          tabindex="2"
                          show-word-limit
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :md="6" :sm="24">
                      <el-form-item class="salary-select" label="" prop="age" :error="(error.key === 'age') ? error.value : ''">
                        <el-select v-model="accountForm.salary" :placeholder="$t('desired_condition.age')">
                          <el-option
                            v-for="item in salary"
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
                      <el-form-item label="" prop="position" :error="(error.key === 'position') ? error.value : ''">
                        <el-select v-model="accountForm.occupationSelect" :placeholder="$t('desired_condition.enter_position')">
                          <el-option
                            v-for="item in occupation"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
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
                      <el-form-item label="" prop="experience" :error="(error.key === 'experience') ? error.value : ''">
                        <el-select v-model="accountForm.occupationSelect" :placeholder="$t('desired_condition.enter_experience')">
                          <el-option
                            v-for="item in occupation"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
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
                      <el-checkbox-group v-model="accountForm.job_features_ids">
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
      <el-button class="card-button btn-right" type="danger" @click.native="submit" >{{ $t('my_page.edit') }}</el-button>
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

export default {
  name: 'EditCvElement',
  components: { BorderElement },
  data() {
    return {
      accountForm: {
        job_features_ids: [],
        age: '',
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
      listRecruitmentFeatures: [
        { id: 1, name: '急募' },
        { id: 2, name: '10人以上募集' },
        { id: 3, name: '未経験者歓迎' },
        { id: 4, name: '経験者優遇' },
        { id: 5, name: '学歴不問' },
        { id: 6, name: '第二新卒歓迎' },
        { id: 7, name: 'フリーター歓迎' },
        { id: 8, name: '障がい者積極採用' },
        { id: 9, name: '女性活躍中' },
        { id: 10, name: '男性活躍中' },
        { id: 11, name: '年齢不問' },
        { id: 12, name: '20代以下活躍中' },
        { id: 13, name: '30代活躍中' },
        { id: 14, name: '40代以上活躍中' }
      ],
      listCompanyFeatures: [
        { id: 15, name: '転勤なし' },
        { id: 16, name: '海外勤務/出張あり' },
        { id: 17, name: '残業月10時間以内' },
        { id: 18, name: '残業月20時間以内' },
        { id: 19, name: '原則定時退社' },
        { id: 20, name: 'フレックスタイム制あり' },
        { id: 21, name: 'オフィスワーク' },
        { id: 22, name: '在宅勤務可' },
        { id: 23, name: '時短勤務可' },
        { id: 24, name: '英語を使う仕事' },
        { id: 25, name: '中国語を使う仕事' },
        { id: 26, name: 'その他の言語を使う仕事' },
        { id: 27, name: '短期/期間限定' },
        { id: 28, name: '賞与あり/インセンティブあり' },
        { id: 29, name: '実力主義/歩合制' },
        { id: 30, name: '月給25万円以上' }
      ],
      listStoreFeatures: [
        { id: 31, name: '服装自由' },
        { id: 32, name: '年間休日120日以上' },
        { id: 33, name: '完全週休2日制' },
        { id: 34, name: '土日休み' },
        { id: 35, name: '5日以上連続休暇取得可能' },
        { id: 36, name: 'マイカー通勤可' },
        { id: 37, name: 'オフィス内禁煙/分煙' },
        { id: 38, name: '社宅/家賃補助制度あり' },
        { id: 39, name: '交通費全額支給' },
        { id: 40, name: '産休/育休/介護休暇あり' },
        { id: 41, name: '資格取得支援あり' },
        { id: 42, name: '独立/開業支援' }
      ],
      confirmModal: false
    }
  },
  computed: {
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
    submit() {
      this.$refs.accountForm.validate(valid => {
        if (valid) {
          console.log('submit')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
