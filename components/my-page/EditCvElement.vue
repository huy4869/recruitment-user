<template>
  <div class="edit-cv-element">
    <div class="edit-cv-title">{{ $t('my_page.edit_basic_information') }}</div>
    <div class="edit-cv-content">
      <el-form
        ref="accountForm"
        :model="accountForm"
        :rules="accountRules"
        autocomplete="off"
        label-position="left"
      >
        <div class="edit-form-input">
          <BorderElement :middle="false"></BorderElement>
          <el-form-item label="" prop="imageAvatar" :error="(error.key === 'imageAvatar') ? error.value : ''">
            <el-row class="d-flex">
              <el-col :span="6" class="col-label">
                <div class="label"><span>{{ $t('my_page.image_avatar') }}</span></div>
              </el-col>
              <el-col :span="18">
                <div class="content-input image-avatar">
                  <img class="show-image" :src="imageAvatarShow ? imageAvatarShow : '/assets/icon/icon_user_default.svg'" alt="">
                  <input class="d-none" ref="fileUploadAvatar" type="file" id="upload-avatar" @change="onFileChange">
                  <div class="button-upload">
                    <button type="button"><label for="upload-avatar">{{ $t('my_page.update_profile_picture') }}</label></button>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-form-item>
          <BorderElement :middle="true"></BorderElement>
          <el-form-item label="" prop="imageDetail" :error="(error.key === 'imageDetail') ? error.value : ''">
            <el-row class="d-flex">
              <el-col :span="6" class="col-label">
                <div class="label"><span>{{ $t('my_page.image_detail') }}</span></div>
              </el-col>
              <el-col :span="18">
                <div class="content-input detail-image">
                  <input class="d-none" ref="fileUploadDetail" type="file" id="upload-detail" @change="onFileChangeDetail" multiple>
                  <div class="button-upload">
                    <button type="button"><label for="upload-detail">{{ $t('my_page.update_profile_picture') }}</label></button>
                  </div>
                  <div class="d-flex">
                    <div v-for="(detail, index) in imageDetailShow" :key="index" class="show-detail">
                      <img class="show-image" :src="detail ? detail : '/assets/icon/icon_user_default.svg'" alt="">
                      <img class="image-close" src="/assets/icon/icon_close_image.svg" alt="" @click="removeImage(index)">
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-form-item>
          <BorderElement :middle="false"></BorderElement>
          <div class="basic-information">
            <span>{{ $t('my_page.basic_information') }}</span>
          </div>
          <el-form-item label="" prop="name" :error="(error.key === 'name') ? error.value : ''">
            <el-row class="d-flex">
              <el-col :span="6" class="col-label">
                <div class="label"><span>{{ $t('my_page.name') }}</span></div>
                <div class="required">{{ $t('form.required') }}</div>
              </el-col>
              <el-col :span="18">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :span="10" class="first-name">
                      <el-input
                        ref="first_name"
                        v-model.trim="accountForm.first_name"
                        :placeholder="$t('my_page.first_name')"
                        name="first_name"
                        type="text"
                        tabindex="2"
                        show-word-limit
                        @focus="resetValidate('first_name')"
                      />
                    </el-col>
                    <el-col :span="10" class="last-name">
                      <el-input
                        ref="last_name"
                        v-model.trim="accountForm.last_name"
                        :placeholder="$t('my_page.last_name')"
                        name="last_name"
                        type="text"
                        tabindex="2"
                        show-word-limit
                        @focus="resetValidate('last_name')"
                      />
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </el-form-item>
          <BorderElement :middle="true"></BorderElement>
          <el-form-item label="" prop="aliasName" :error="(error.key === 'alias_name') ? error.value : ''">
            <el-row class="d-flex">
              <el-col :span="6" class="col-label">
                <div class="label"><span>{{ $t('my_page.alias_name') }}</span></div>
              </el-col>
              <el-col :span="18">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :span="20">
                      <el-input
                        ref="alias_name"
                        v-model.trim="accountForm.alias_name"
                        :placeholder="$t('my_page.enter_alias_name')"
                        name="alias_name"
                        type="text"
                        tabindex="2"
                        show-word-limit
                        @focus="resetValidate('alias_name')"
                      />
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </el-form-item>
          <BorderElement :middle="true"></BorderElement>
          <el-form-item label="" prop="name" :error="(error.key === 'name') ? error.value : ''">
            <el-row class="d-flex">
              <el-col :span="6" class="col-label">
                <div class="label">
                  <span>{{ $t('my_page.name') }}<br/>({{ $t('my_page.furigana') }})</span>
                </div>
                <div class="required">{{ $t('form.required') }}</div>
              </el-col>
              <el-col :span="18">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :span="10" class="first-name">
                      <el-input
                        ref="furi_first_name"
                        v-model.trim="accountForm.furi_first_name"
                        :placeholder="$t('my_page.furi_first_name')"
                        name="furi_first_name"
                        type="text"
                        tabindex="2"
                        show-word-limit
                        @focus="resetValidate('furi_first_name')"
                      />
                    </el-col>
                    <el-col :span="10" class="last-name">
                      <el-input
                        ref="furi_last_name"
                        v-model.trim="accountForm.furi_last_name"
                        :placeholder="$t('my_page.furi_last_name')"
                        name="furi_last_name"
                        type="text"
                        tabindex="2"
                        show-word-limit
                        @focus="resetValidate('furi_last_name')"
                      />
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </el-form-item>
          <BorderElement :middle="true"></BorderElement>
        </div>
      </el-form>
    </div>
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
        callback(new Error(this.$t('validation.phone')))
      } else {
        callback()
      }
    }
    return {
      imageAvatarShow: '',
      imageAvatar: '',
      imageDetailShow: [],
      accountForm: {
        first_name: '',
        last_name: '',
        furi_first_name: '',
        furi_last_name: '',
        alias_name: '',
        birthday: '',
        age: '',
        gender_id: '',
        tel: '',
        email: '',
        line: '',
        facebook: '',
        instagram: '',
        twitter: '',
        postal_code: '',
        province_id: '',
        city: '',
        address: '',
        password: '',
        remember: '',
        errors: {}
      },
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
        remember: []
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
    onFileChange(e) {
      const file = e.target.files[0]
      this.imageAvatarShow = URL.createObjectURL(file)
      this.$refs.fileUploadAvatar.value = null
    },
    onFileChangeDetail(e) {
      const dataImageDetailShow = []
      for (let x = 0; x < e.target.files.length; x++) {
        dataImageDetailShow.push(URL.createObjectURL(e.target.files[x]))
      }
      this.imageDetailShow = dataImageDetailShow
      this.$refs.fileUploadDetail.value = null
    },
    removeImage(index) {
      this.imageDetailShow = this.imageDetailShow.filter(function(item, key) {
        return key !== index
      })
    }
  }
}
</script>
