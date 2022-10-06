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
            <BorderElement :middle="false"></BorderElement>
              <el-row class="d-flex form-label-input">
                <el-col :md="6" :sm="24" class="col-label">
                  <div class="label"><span>{{ $t('my_page.image_avatar') }}</span></div>
                </el-col>
                <el-col :md="18" :sm="24">
                  <div class="content-input image-avatar">
                    <el-form-item label="" prop="imageAvatar" :error="(error.key === 'imageAvatar') ? error.value : ''">
                      <img class="show-image" id="img-avatar" :src="imageAvatarShow ? imageAvatarShow : '/assets/icon/icon_user_default.svg'" alt="">
                      <input id="upload-avatar" ref="fileUploadAvatar" class="d-none" type="file" @change="onFileChange">
                      <div class="button-upload">
                        <button type="button"><label for="upload-avatar">{{ $t('my_page.update_profile_picture') }}</label></button>
                      </div>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            <BorderElement :middle="true"></BorderElement>
              <el-row class="d-flex form-label-input">
                <el-col :md="6" :sm="24" class="col-label">
                  <div class="label"><span>{{ $t('my_page.image_detail') }}</span></div>
                </el-col>
                <el-col :md="18" :sm="24">
                  <div class="content-input detail-image">
                    <el-form-item label="" prop="imageDetail" :error="(error.key === 'imageDetail') ? error.value : ''">
                      <input id="upload-detail" ref="fileUploadDetail" class="d-none" type="file" multiple @change="onFileChangeDetail">
                      <div class="button-upload">
                        <button type="button"><label for="upload-detail">{{ $t('my_page.upload_image_detail') }}</label></button>
                      </div>
                      <div v-if="imageDetailShow.length" class="d-flex">
                        <div v-for="(detail, index) in imageDetailShow" :key="index" class="show-detail">
                          <img class="show-image" id="img-intro" :src="detail ? detail : '/assets/icon/icon_user_default.svg'" alt="">
                          <img class="image-close" src="/assets/icon/icon_close_image.svg" alt="" @click="removeImage(index)">
                        </div>
                      </div>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            <BorderElement :middle="false"></BorderElement>
            <div class="basic-information">
              <span>{{ $t('my_page.basic_information') }}</span>
            </div>
              <el-row class="d-flex form-label-input">
                <el-col :md="6" :sm="24" class="col-label">
                  <div class="label"><span>{{ $t('my_page.name') }}</span></div>
                  <div class="required">{{ $t('form.required') }}</div>
                </el-col>
                <el-col :md="18" :sm="24">
                  <div class="content-input">
                    <el-row class="d-flex">
                      <el-col :md="10" :sm="12" class="first-name">
                        <el-form-item label="" prop="first_name" :error="(error.key === 'first_name') ? error.value : ''">
                          <el-input
                              ref="first_name"
                              v-model="accountForm.first_name"
                              :placeholder="$t('my_page.first_name')"
                              name="first_name"
                              type="text"
                              tabindex="2"
                              show-word-limit
                              @focus="resetValidate('first_name')"
                            />
                        </el-form-item>
                      </el-col>
                      <el-col :md="10" :sm="12" class="last-name">
                        <el-form-item label="" prop="last_name" :error="(error.key === 'last_name') ? error.value : ''">
                          <el-input
                            ref="last_name"
                            v-model="accountForm.last_name"
                            :placeholder="$t('my_page.last_name')"
                            name="last_name"
                            type="text"
                            tabindex="2"
                            show-word-limit
                            @focus="resetValidate('last_name')"
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
                  <div class="label"><span>{{ $t('my_page.alias_name') }}</span></div>
                </el-col>
                <el-col :md="18" :sm="24">
                  <div class="content-input">
                    <el-row class="d-flex">
                      <el-col :md="20" :sm="24">
                        <el-form-item label="" prop="alias_name" :error="(error.key === 'alias_name') ? error.value : ''">
                          <el-input
                            ref="alias_name"
                            v-model="accountForm.alias_name"
                            :placeholder="$t('my_page.enter_alias_name')"
                            name="alias_name"
                            type="text"
                            tabindex="2"
                            show-word-limit
                            @focus="resetValidate('alias_name')"
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
                    <span>{{ $t('my_page.name') }}<br class="show-pc"/>({{ $t('my_page.furigana') }})</span>
                  </div>
                  <div class="required">{{ $t('form.required') }}</div>
                </el-col>
                <el-col :md="18" :sm="24">
                  <div class="content-input">
                      <el-row class="d-flex">
                        <el-col :md="10" :sm="12" class="first-name">
                          <el-form-item label="" prop="furi_first_name" :error="(error.key === 'furi_first_name') ? error.value : ''">
                            <el-input
                              ref="furi_first_name"
                              v-model="accountForm.furi_first_name"
                              :placeholder="$t('my_page.furi_first_name')"
                              name="furi_first_name"
                              type="text"
                              tabindex="2"
                              show-word-limit
                              @focus="resetValidate('furi_first_name')"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :md="10" :sm="12" class="last-name">
                          <el-form-item label="" prop="furi_last_name" :error="(error.key === 'furi_last_name') ? error.value : ''">
                            <el-input
                              ref="furi_last_name"
                              v-model="accountForm.furi_last_name"
                              :placeholder="$t('my_page.furi_last_name')"
                              name="furi_last_name"
                              type="text"
                              tabindex="2"
                              show-word-limit
                              @focus="resetValidate('furi_last_name')"
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
                  <span>{{ $t('my_page.birth') }}</span>
                </div>
                <div class="required">{{ $t('form.required') }}</div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-form-item label="" prop="birthday" :error="(error.key === 'birthday') ? error.value : ''">
                    <el-row class="d-flex">
                      <el-col :md="4" :sm="12" class="birth-year">
                        <el-input
                          ref="birthday"
                          v-model.trim="accountForm.birthday"
                          :placeholder="$t('YYYY')"
                          name="birthday"
                          type="text"
                          tabindex="2"
                          show-word-limit
                          @focus="resetValidate('birthday')"
                        />
                      </el-col>
                      <span class="text-normal birthday">{{ $t('form.year') }}</span>
                      <el-col :md="4" :sm="12" class="birth-month">
                        <el-input
                          ref="birthday"
                          v-model.trim="accountForm.birthday"
                          :placeholder="$t('MM')"
                          name="birthday"
                          type="text"
                          tabindex="2"
                          show-word-limit
                          @focus="resetValidate('birthday')"
                        />
                      </el-col>
                      <span class="text-normal birthday">{{ $t('form.month') }}</span>
                      <el-col :md="4" :sm="12" class="birth-day">
                        <el-input
                          ref="birthday"
                          v-model.trim="accountForm.birthday"
                          :placeholder="$t('DD')"
                          name="birthday"
                          type="text"
                          tabindex="2"
                          show-word-limit
                          @focus="resetValidate('birthday')"
                        />
                      </el-col>
                      <span class="text-normal birthday">{{ $t('form.day') }}</span>
                    </el-row>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <BorderElement :middle="true"></BorderElement>
            <el-row class="d-flex form-label-input">
              <el-col :md="6" :sm="24" class="col-label">
                <div class="label"><span>{{ $t('my_page.age') }}</span></div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="4" :sm="24">
                      <el-form-item label="" prop="age" :error="(error.key === 'age') ? error.value : ''">
                        <el-input
                          ref="age"
                          v-model.trim="accountForm.age"
                          :placeholder="$t('my_page.age')"
                          name="age"
                          type="text"
                          tabindex="2"
                          show-word-limit
                          @focus="resetValidate('age')"
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
                  <span>{{ $t('my_page.gender') }}</span>
                </div>
                <div class="required">{{ $t('form.required') }}</div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-form-item label="" prop="gender" :error="(error.key === 'gender') ? error.value : ''">
                    <el-row class="d-flex">
                      <el-col :md="1" :sm="3" :xs="2" class="birth-year">
                        <el-checkbox
                          ref="gender"
                          v-model.trim="accountForm.gender"
                          class="round-checkbox"
                          name="gender"
                          type="text"
                          tabindex="2"
                          show-word-limit
                          @focus="resetValidate('gender')"
                        />
                      </el-col>
                      <span class="text-normal gender">{{ $t('form.male') }}</span>
                      <el-col :md="1" :sm="3" :xs="2" class="birth-month">
                        <el-checkbox
                          ref="gender"
                          v-model.trim="accountForm.furi_last_name"
                          class="round-checkbox"
                          :placeholder="$t('MM')"
                          name="gender"
                          type="text"
                          tabindex="2"
                          show-word-limit
                          @focus="resetValidate('gender')"
                        />
                      </el-col>
                      <span class="text-normal gender">{{ $t('form.female') }}</span>
                      <el-col :md="1" :sm="3" :xs="2" class="birth-day">
                        <el-checkbox
                          ref="gender"
                          v-model.trim="accountForm.furi_last_name"
                          class="round-checkbox"
                          :placeholder="$t('DD')"
                          name="gender"
                          type="text"
                          tabindex="2"
                          show-word-limit
                          @focus="resetValidate('gender')"
                        />
                      </el-col>
                      <span class="text-normal gender">{{ $t('form.other') }}</span>
                    </el-row>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <BorderElement :middle="true"></BorderElement>
            <el-row class="d-flex form-label-input">
              <el-col :md="6" :sm="24" class="col-label">
                <div class="label"><span>{{ $t('my_page.phone') }}</span></div>
                <div class="required">{{ $t('form.required') }}</div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="phone" :error="(error.key === 'phone') ? error.value : ''">
                        <el-input
                          ref="alias_name"
                          v-model.trim="accountForm.phone"
                          :placeholder="placeholder.phone"
                          name="phone"
                          type="text"
                          tabindex="2"
                          show-word-limit
                          @focus="resetValidate('phone')"
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
                <div class="label"><span>{{ $t('my_page.email') }}</span></div>
                <div class="required">{{ $t('form.required') }}</div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="email" :error="(error.key === 'email') ? error.value : ''">
                        <el-input
                          ref="email"
                          v-model.trim="accountForm.email"
                          :placeholder="placeholder.email"
                          name="email"
                          type="text"
                          tabindex="2"
                          show-word-limit
                          @focus="resetValidate('email')"
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
                <div class="label"><span>{{ title.line }}</span></div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="line" :error="(error.key === 'line') ? error.value : ''">
                        <el-input
                          ref="line"
                          v-model.trim="accountForm.line"
                          :placeholder="placeholder.line"
                          name="line"
                          type="text"
                          tabindex="2"
                          show-word-limit
                          @focus="resetValidate('line')"
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
                <div class="label"><span>{{ title.facebook }}</span></div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="facebook" :error="(error.key === 'facebook') ? error.value : ''">
                        <el-input
                          ref="facebook"
                          v-model.trim="accountForm.facebook"
                          :placeholder="placeholder.facebook"
                          name="facebook"
                          type="text"
                          tabindex="2"
                          show-word-limit
                          @focus="resetValidate('facebook')"
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
                <div class="label"><span>{{ title.instagram }}</span></div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="instagram" :error="(error.key === 'instagram') ? error.value : ''">
                        <el-input
                          ref="alias_name"
                          v-model.trim="accountForm.instagram"
                          :placeholder="placeholder.instagram"
                          name="instagram"
                          type="text"
                          tabindex="2"
                          show-word-limit
                          @focus="resetValidate('instagram')"
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
                <div class="label"><span>{{ title.twitter }}</span></div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="twitter" :error="(error.key === 'twitter') ? error.value : ''">
                        <el-input
                          ref="alias_name"
                          v-model.trim="accountForm.twitter"
                          :placeholder="placeholder.twitter"
                          name="alias_name"
                          type="text"
                          tabindex="2"
                          show-word-limit
                          @focus="resetValidate('twitter')"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <BorderElement :middle="true"></BorderElement>
            <div class="basic-information">
              <span>{{ $t('my_page.address') }}</span>
            </div>
            <el-row class="d-flex form-label-input">
              <el-col :md="6" :sm="24" class="col-label">
                <div class="label"><span>{{ $t('my_page.post_code') }}</span></div>
              </el-col>
              <el-col :md="18" :sm="24" :xs="12">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="10" :sm="24">
                      <el-form-item label="" prop="post_code" :error="(error.key === 'post_code') ? error.value : ''">
                        <el-input
                          ref="alias_name"
                          v-model.trim="accountForm.post_code"
                          :placeholder="placeholder.post_code"
                          name="alias_name"
                          type="text"
                          tabindex="2"
                          show-word-limit
                          @focus="resetValidate('post_code')"
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
                <div class="label"><span>{{ $t('my_page.prefectures') }}</span></div>
                <div class="required">{{ $t('form.required') }}</div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="prefectures" :error="(error.key === 'prefectures') ? error.value : ''">
                        <el-select v-model="accountForm.prefecturesSelect">
                          <el-option
                            v-for="item in prefectures"
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
                <div class="label"><span>{{ $t('my_page.city') }}</span></div>
                <div class="required">{{ $t('form.required') }}</div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="city" :error="(error.key === 'city') ? error.value : ''">
                        <el-input
                          ref="city"
                          v-model="accountForm.city"
                          :placeholder="$t('my_page.city')"
                          name="city"
                          type="text"
                          tabindex="2"
                          show-word-limit
                          @focus="resetValidate('city')"
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
                <div class="label"><span>{{ $t('my_page.building_name') }}</span></div>
                <div class="required">{{ $t('form.required') }}</div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="building_name" :error="(error.key === 'building_name') ? error.value : ''">
                        <el-input
                          ref="building_name"
                          v-model="accountForm.building_name"
                          :placeholder="$t('my_page.enter_address')"
                          name="building_name"
                          type="text"
                          tabindex="2"
                          show-word-limit
                          @focus="resetValidate('building_name')"
                        />
                      </el-form-item>
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
    <div class="text-center">
      <el-button class="card-button" @click="handleRouter('/my_page')">{{ $t('my_page.back') }}</el-button>
      <el-button class="card-button btn-right" type="danger" @click="handleRouter('cv')">{{ $t('my_page.edit') }}</el-button>
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
    const validFormLength = (rule, value, callback, message) => {
      if (value && value.length > 2) {
        callback(new Error(this.$t('validation.max_length', { _field_: message })))
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
        prefecturesSelect: '',
        errors: {}
      },
      prefectures: [
        { value: '東京都', label: '東京都' },
        { value: '東京都1', label: '東京都1' },
        { value: '東京都2', label: '東京都2' },
        { value: '東京都3', label: '東京都3' }
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
        furi_first_name: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('my_page.furi_first_name') }),
            trigger: 'blur'
          },
          { validator: validFormLength, message: this.$t('validation.fullwidth_length', { _field_: this.$t('my_page.furi_first_name') }), trigger: 'blur' }
        ],
        furi_last_name: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('my_page.furi_last_name') }),
            trigger: 'blur'
          },
          { validator: validFormLength, message: this.$t('validation.fullwidth_length', { _field_: this.$t('my_page.furi_last_name') }), trigger: 'blur' }
        ]
      },
      placeholder: {
        phone: '000123001',
        email: 'example@example.com',
        line: 'line.me/ti/p/z73demo',
        facebook: 'facebook.com/example',
        instagram: 'instagram.com/example',
        twitter: 'twitter.com/example',
        post_code: '0000000'
      },
      title: {
        line: 'LINE ID',
        facebook: 'Facebook',
        instagram: 'Instagram',
        twitter: 'Twitter'
      }
    }
  },
  created() {
    this.accountForm.prefecturesSelect = this.prefectures[0].value
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
