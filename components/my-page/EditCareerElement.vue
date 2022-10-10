<template>
  <div>
    <div class="edit-cv-element">
      <div class="edit-cv-title">{{ $t('my_page.edit_basic_information') }}</div>
      <div class="edit-cv-content edit-form-content">
        <div class="card-text-title card-title-mobile"> {{ $t('my_page.edit_basic_information') }}</div>
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
                 <div class="label"><span>{{ $t('career.store_name') }}</span></div>
                 <div class="required">{{ $t('form.required') }}</div>
               </el-col>
               <el-col :md="18" :sm="24">
                 <div class="content-input">
                   <el-row class="d-flex">
                     <el-col :md="20" :sm="24">
                       <el-form-item label="" prop="store_name" :error="(error.key === 'store_name') ? error.value : ''">
                         <el-input
                           ref="store_name"
                           v-model="accountForm.store_name"
                           :placeholder="$t('career.store_name')"
                           name="store_name"
                           type="text"
                           tabindex="2"
                           show-word-limit
                           @focus="resetValidate('store_name')"
                         />
                       </el-form-item>
                     </el-col>
                   </el-row>
                 </div>
               </el-col>
             </el-row>
            <BorderElement :middle="true"></BorderElement>
            <el-row class="d-flex form-label-input">
              <el-col :md="6" :sm="24" class="col-label">
                <div class="label"><span>{{ $t('career.company_name') }}</span></div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="company_name" :error="(error.key === 'company_name') ? error.value : ''">
                        <el-input
                          ref="company_name"
                          v-model="accountForm.company_name"
                          :placeholder="$t('career.enter_company_name')"
                          name="company_name"
                          type="text"
                          tabindex="2"
                          show-word-limit
                          @focus="resetValidate('company_name')"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <BorderElement :middle="true"></BorderElement>
             <el-row class="d-flex form-label-input">
               <el-col :md="6" :sm="24" class="col-label">
                 <div class="label">
                   <span>{{ $t('career.period_start') }}</span>
                 </div>
                 <div class="required">{{ $t('form.required') }}</div>
               </el-col>
               <el-col :md="18" :sm="24">
                 <div class="content-input">
                   <el-form-item label="" prop="birthday" :error="(error.key === 'birthday') ? error.value : ''">
                     <el-row class="enroll-checkbox">
                       <el-checkbox v-model="accountForm.enroll">{{ $t('my_page.enroll') }}</el-checkbox>
                     </el-row>
                     <el-row class="d-flex">
                       <el-col :md="3" :sm="12" class="birth-year">
                         <el-input
                           ref="birthday"
                           v-model.trim="accountForm.year"
                           :placeholder="$t('YYYY')"
                           name="birthday"
                           type="text"
                           tabindex="2"
                           maxlength="4"
                           oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                           pattern="[0-9]*"
                           inputmode="numeric"
                           @focus="resetValidate('birthday')"
                         />
                       </el-col>
                       <span class="text-normal birthday">{{ $t('form.year') }}</span>
                       <el-col :md="3" :sm="12" class="birth-month">
                         <el-input
                           ref="birthday.month"
                           v-model.trim="accountForm.month"
                           :placeholder="$t('MM')"
                           name="birthday"
                           type="text"
                           maxlength="2"
                           tabindex="2"
                           oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                           pattern="[0-9]*"
                           inputmode="numeric"
                           @focus="resetValidate('birthday')"
                         />
                       </el-col>
                       <span class="text-normal birthday">{{ $t('form.month') }}</span>
                       <span style="margin: 0 20px 0 10px">~</span>
                       <el-col :md="3" :sm="12" class="birth-year">
                         <el-input
                           ref="birthday"
                           v-model.trim="accountForm.year"
                           :placeholder="$t('YYYY')"
                           name="birthday"
                           type="text"
                           tabindex="2"
                           maxlength="4"
                           oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                           pattern="[0-9]*"
                           inputmode="numeric"
                           @focus="resetValidate('birthday')"
                         />
                       </el-col>
                       <span class="text-normal birthday">{{ $t('form.year') }}</span>
                       <el-col :md="3" :sm="12" class="birth-month">
                         <el-input
                           ref="birthday.month"
                           v-model.trim="accountForm.month"
                           :placeholder="$t('MM')"
                           name="birthday"
                           type="text"
                           maxlength="2"
                           tabindex="2"
                           oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                           pattern="[0-9]*"
                           inputmode="numeric"
                           @focus="resetValidate('birthday')"
                         />
                       </el-col>
                       <span class="text-normal birthday">{{ $t('form.month') }}</span>
                     </el-row>
                   </el-form-item>
                 </div>
               </el-col>
             </el-row>
            <BorderElement :middle="true"></BorderElement>
             <el-row class="d-flex form-label-input">
               <el-col :md="6" :sm="24" class="col-label">
                 <div class="label"><span>{{ $t('career.occupation') }}</span></div>
                 <div class="required">{{ $t('form.required') }}</div>
               </el-col>
               <el-col :md="18" :sm="24">
                 <div class="content-input">
                   <el-row class="d-flex">
                     <el-col :md="10" :sm="24">
                       <el-form-item label="" prop="occupation" :error="(error.key === 'occupation') ? error.value : ''">
                         <el-select v-model="accountForm.occupationSelect" :placeholder="$t('career.enter_occupation')">
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
               <el-col :md="6" :sm="24" class="col-label">
                 <div class="label"><span>{{ $t('career.position_offices') }}</span></div>
                 <div class="required">{{ $t('form.required') }}</div>
               </el-col>
               <el-col :md="18" :sm="24">
                 <div class="content-input">
                   <el-row class="d-flex">
                     <el-col :md="20" :sm="24">
                       <el-form-item label="" prop="position_offices" :error="(error.key === 'position_offices') ? error.value : ''">
                         <el-select v-model="accountForm.position_offices" size="large" multiple>
                           <el-option
                             v-for="item in positions"
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
               <el-col :md="6" :sm="24" class="col-label">
                 <div class="label"><span>{{ $t('career.period_end') }}</span></div>
                 <div class="required">{{ $t('form.required') }}</div>
               </el-col>
               <el-col :md="18" :sm="24">
                 <div class="content-input">
                   <el-row class="d-flex">
                     <el-col :md="10" :sm="24">
                       <el-form-item label="" prop="period_end" :error="(error.key === 'period_end') ? error.value : ''">
                         <el-select v-model="accountForm.period_end" :placeholder="$t('career.enter_emp_status')">
                           <el-option
                             v-for="item in emp_status"
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
               <el-col :md="6" :sm="24" class="col-label">
                 <div class="label"><span>{{ $t('career.business_content') }}</span></div>
               </el-col>
               <el-col :md="18" :sm="24">
                 <div class="content-input">
                   <el-row class="d-flex">
                     <el-col :md="20" :sm="24">
                       <el-form-item label="" prop="business_content" :error="(error.key === 'business_content') ? error.value : ''">
                         <el-input
                           ref="alias_name"
                           v-model="accountForm.business_content"
                           :placeholder="$t('career.business_content')"
                           :autosize="{ minRows: 5, maxRows: 10}"
                           name="business_content"
                           type="textarea"
                           maxlength="2000"
                           tabindex="2"
                           @focus="resetValidate('business_content')"
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
                 <div class="label">
                   <span>
                     {{ $t('career.experience_accumulation1') }}<br>
                     {{ $t('career.experience_accumulation2') }}<br>
                     {{ $t('career.experience_accumulation3') }}
                   </span>
                 </div>
               </el-col>
               <el-col :md="18" :sm="24">
                 <div class="content-input">
                   <el-row class="d-flex">
                     <el-col :md="20" :sm="24">
                       <el-form-item label="" prop="experience" :error="(error.key === 'experience') ? error.value : ''">
                         <el-input
                           ref="alias_name"
                           v-model="accountForm.experience"
                           :placeholder="$t('career.experience')"
                           :autosize="{ minRows: 5, maxRows: 10}"
                           name="experience"
                           type="textarea"
                           maxlength="2000"
                           tabindex="2"
                           @focus="resetValidate('experience')"
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
      <el-button class="card-button" @click="showConfirmModal">{{ $t('my_page.back') }}</el-button>
      <el-button class="card-button btn-right" type="danger" @click="handleRouter('cv')">{{ $t('my_page.save') }}</el-button>
    </div>
    <ConfirmModal
      v-show="confirmModal"
      :text="$t('confirm_modal.back_confirm')"
      @close="closeConfirmModal"
      @handleRouter="handleRouter('/my_page/info')">
    </ConfirmModal>
  </div>
</template>

<script>
import { validEmail } from '../../utils/validate'
import BorderElement from './BorderElement'

export default {
  name: 'EditCvElement',
  components: { BorderElement },
  data() {
    const validFormEmail = (rule, value, callback) => {
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
    // const validFullWidthLength = (rule, value, callback, message) => {
    //   if (!validFullWidth(value)) {
    //     callback(new Error(this.$t('validation.max_length', { _field_: message })))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      accountForm: {
        business_content: '',
        experience: '',
        enroll: false,
        store_name: '',
        company_name: '',
        period_start: '',
        occupationSelect: '',
        position_offices: '',
        period_end: '',
        prefecturesSelect: '',
        errors: {}
      },
      occupation: [
        { value: 'ヘア', label: 'ヘア' },
        { value: 'ネイル・マツゲ', label: 'ネイル・マツゲ' },
        { value: '整体・カイロ・酸素・温浴', label: '整体・カイロ・酸素・温浴' },
        { value: 'フェイシャル・ボディ・脱毛', label: 'フェイシャル・ボディ・脱毛' },
        { value: '美容クリニック', label: '美容クリニック' },
        { value: 'その他', label: 'その他' }
      ],
      positions: [
        { value: 'ヘア', label: 'ヘア' },
        { value: 'ネイル・マツゲ', label: 'ネイル・マツゲ' },
        { value: '整体・カイロ・酸素・温浴', label: '整体・カイロ・酸素・温浴' },
        { value: 'フェイシャル・ボディ・脱毛', label: 'フェイシャル・ボディ・脱毛' },
        { value: '美容クリニック', label: '美容クリニック' },
        { value: 'その他', label: 'その他' }
      ],
      emp_status: [
        { value: '正社員', label: '正社員' },
        { value: '派遣社員', label: '派遣社員' },
        { value: '契約社員', label: '契約社員' },
        { value: 'アルバイト', label: 'アルバイト' },
        { value: 'その他', label: 'その他' }
      ],
      error: {
        key: null,
        value: ''
      },
      accountRules: {
        email: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('login.email') }), trigger: 'blur' },
          { validator: validFormEmail, trigger: 'blur' }
        ],
        password: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('login.password') }),
            trigger: 'blur'
          }
        ],
        first_name: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('my_page.first_name') }),
            trigger: 'blur'
          },
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.first_name') }), trigger: 'blur' }
        ],
        last_name: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('my_page.last_name') }),
            trigger: 'blur'
          },
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.last_name') }), trigger: 'blur' }
        ],
        alias_name: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.alias_name') }), trigger: 'blur' }
        ],
        phone: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('my_page.phone') }),
            trigger: 'blur'
          }
        ]
      },
      confirmModal: false
    }
  },
  computed: {
    contentLength() {
      return this.accountForm.business_content.length
    },
    experienceLength() {
      return this.accountForm.experience.length
    }
  },
  watch: {
    birthday(newValue, oldValue) {
      this.accountForm.birthday = 'birthday'
      if (this.accountForm.year.length === 4) {
        this.accountForm.age = this.accountForm.year - new Date().getFullYear()
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
    }
  }
}
</script>
