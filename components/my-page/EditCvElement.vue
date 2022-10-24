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
                <el-col :md="6" :sm="14" class="col-label">
                  <div class="label"><span>{{ $t('my_page.image_avatar') }}</span></div>
                </el-col>
                <el-col :md="18" :sm="24">
                  <div class="content-input image-avatar">
                    <el-form-item label="" prop="imageAvatar" :error="(error.key === 'imageAvatar') ? error.value : ''">
                      <img id="img-avatar" class="show-image" :src="imageAvatarShow ? imageAvatarShow : '/assets/icon/icon_user_default.svg'" alt="">
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
                <el-col :md="6" :sm="14" class="col-label">
                  <div class="label"><span>{{ $t('my_page.image_detail') }}</span></div>
                </el-col>
                <el-col :md="18" :sm="24">
                  <div class="content-input detail-image">
                    <el-form-item label="" prop="imageDetail" :error="(error.key === 'imageDetail') ? error.value : ''">
                      <input id="upload-detail" ref="fileUploadDetail" class="d-none" type="file" max="3" multiple @change="onFileChangeDetail">
                      <div class="button-upload">
                        <button type="button"><label for="upload-detail">{{ $t('my_page.upload_image_detail') }}</label></button>
                      </div>
                      <div v-if="imageDetailShow.length" class="d-flex">
                        <div v-for="(detail, index) in imageDetailShow" :key="index" class="show-detail">
                          <img id="img-intro" class="show-image" :src="detail ? detail : '/assets/icon/icon_user_default.svg'" alt="">
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
                <el-col :md="6" :sm="14" class="col-label">
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
                <el-col :md="6" :sm="14" class="col-label">
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
                <el-col :md="6" :sm="14" class="col-label">
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
              <el-col :md="6" :sm="14" class="col-label">
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
                        <el-autocomplete
                          ref="birthday"
                          v-model.trim="accountForm.year"
                          :placeholder="$t('YYYY')"
                          :fetch-suggestions="queryYear"
                          name="year"
                          type="text"
                          tabindex="2"
                          :maxlength="4"
                          oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                          pattern="[0-9]*"
                          inputmode="numeric"
                          @focus="resetValidate('birthday')"
                        />
                      </el-col>
                      <span class="text-normal birthday">{{ $t('form.year') }}</span>
                      <el-col :md="4" :sm="12" class="birth-month">
                        <el-autocomplete
                          ref="birthday"
                          v-model.trim="accountForm.month"
                          :placeholder="$t('MM')"
                          :fetch-suggestions="queryMonth"
                          name="month"
                          type="text"
                          :maxlength="2"
                          tabindex="2"
                          oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                          pattern="[0-9]*"
                          inputmode="numeric"
                          @focus="resetValidate('birthday')"
                        />
                      </el-col>
                      <span class="text-normal birthday">{{ $t('form.month') }}</span>
                      <el-col :md="4" :sm="12" class="birth-day">
                        <el-autocomplete
                          ref="birthday"
                          v-model.trim="accountForm.day"
                          :placeholder="$t('DD')"
                          :fetch-suggestions="queryDay"
                          name="day"
                          type="text"
                          tabindex="2"
                          :maxlength="2"
                          oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                          pattern="[0-9]*"
                          inputmode="numeric"
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
              <el-col :md="6" :sm="14" class="col-label">
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
              <el-col :md="6" :sm="14" class="col-label">
                <div class="label">
                  <span>{{ $t('my_page.gender') }}</span>
                </div>
                <div class="required">{{ $t('form.required') }}</div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="">
                    <el-form-item label="" prop="gender_id" :error="(error.key === 'gender_id') ? error.value : ''">
                      <el-col v-for="(gender, key) in listGender" :key="key" :xl="3" :md="4"  :sm="7" :xs="6" class="birth-year">
                        <el-radio
                          ref="gender"
                          v-model="accountForm.gender_id"
                          :label="gender.id"
                          class="round-checkbox"
                          name="gender"
                          type="text"
                          tabindex="2"
                          show-word-limit
                          @focus="resetValidate('gender_id')"
                        >
                          {{ gender.name }}
                        </el-radio>
                      </el-col>
                    </el-form-item>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <BorderElement :middle="true"></BorderElement>
            <el-row class="d-flex form-label-input">
              <el-col :md="6" :sm="14" class="col-label">
                <div class="label"><span>{{ $t('my_page.phone') }}</span></div>
                <div class="required">{{ $t('form.required') }}</div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="tel" :error="(error.key === 'tel') ? error.value : ''">
                        <el-input
                          ref="alias_name"
                          v-model.trim="accountForm.tel"
                          :placeholder="placeholder.phone"
                          name="tel"
                          type="text"
                          tabindex="2"
                          maxlength="13"
                          @focus="resetValidate('tel')"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <BorderElement :middle="true"></BorderElement>
            <el-row class="d-flex form-label-input">
              <el-col :md="6" :sm="14" class="col-label">
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
                          :disabled="true"
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
              <el-col :md="6" :sm="14" class="col-label">
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
              <el-col :md="6" :sm="14" class="col-label">
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
              <el-col :md="6" :sm="14" class="col-label">
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
              <el-col :md="6" :sm="14" class="col-label">
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
              <el-col :md="6" :sm="14" class="col-label">
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
                          maxlength="7"
                          tabindex="2"
                          oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                          pattern="[0-9]*"
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
              <el-col :md="6" :sm="14" class="col-label">
                <div class="label"><span>{{ $t('my_page.prefectures') }}</span></div>
                <div class="required">{{ $t('form.required') }}</div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="province_id" :error="(error.key === 'province_id') ? error.value : ''">
                        <el-select v-model="accountForm.province_id" :placeholder="$t('my_page.prefectures')">
                          <el-option
                            v-for="item in listProvinceDistrict"
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
              <el-col :md="6" :sm="14" class="col-label">
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
              <el-col :md="6" :sm="14" class="col-label">
                <div class="label"><span>{{ $t('my_page.building_name') }}</span></div>
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
    <div id="btn-center" class="text-center">
      <el-button class="card-button" @click="showConfirmModal">{{ $t('my_page.back') }}</el-button>
      <el-button class="card-button btn-right" type="danger" @click="update">{{ $t('my_page.save') }}</el-button>
    </div>
    <ConfirmModal
      v-show="confirmModal"
      :text="$t('confirm_modal.back_confirm')"
      @close="closeConfirmModal"
      @handleRouter="handleRouter('/my-page/info')">
    </ConfirmModal>
  </div>
</template>

<script>
import { validEmail, validFullWidth, validPhoneNumber } from '../../utils/validate'
import BorderElement from './BorderElement'
import {
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  MASTER_GET_DATA,
  USER_UPDATE_BASIC_INFO, USER_UPLOAD_AVATAR
} from '@/store/store.const'

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
    const validFullWidthLength = (rule, value, callback, message) => {
      if (!validFullWidth(value)) {
        callback(new Error(this.$t('validation.max_length', { _field_: message })))
      } else {
        callback()
      }
    }
    const validPostCode = (rule, value, callback) => {
      if (value && value.length < 6) {
        callback(new Error(this.$t('validation.postcode_length', { _field_: this.$t('my_page.post_code') })))
      } else {
        callback()
      }
    }
    const validPhone = (rule, value, callback) => {
      if (value && (value.length > 13 || value.length < 10 || !value.startsWith(0))) {
        callback(new Error(this.$t('validation.phone_length', { _field_: this.$t('my_page.phone') })))
      } else if (!validPhoneNumber(value)) {
        callback(new Error(this.$t('validation.phone', { _field_: this.$t('my_page.phone') })))
      } else {
        callback()
      }
    }
    const validBirthDay = (rule, value, callback) => {
      const year = (new Date().getFullYear()).toString()
      const month = (new Date().getMonth() + 1).toString()
      const day = (new Date().getDate()).toString()
      if (this.accountForm.year > year) {
        callback(new Error(this.$t('validation.birthday', { _field_: this.$t('my_page.birth') })))
      } else if (this.accountForm.year === year.toString()) {
        console.log('tha cho toi')
        if (this.accountForm.month > month) {
          callback(new Error(this.$t('validation.birthday', { _field_: this.$t('my_page.birth') })))
        }
        if (this.accountForm.month === month && this.accountForm.day > day) {
          callback(new Error(this.$t('validation.birthday', { _field_: this.$t('my_page.birth') })))
        }
      }
      callback()
    }
    return {
      imageAvatarShow: this.$auth.user.avatar,
      imageAvatar: '',
      imageDetailShow: [],
      file: '',
      listGender: [],
      listProvinceDistrict: [],
      linksYear: [],
      linksMonth: [],
      linksDay: [],
      accountForm: {
        first_name: this.$auth.user.first_name,
        last_name: this.$auth.user.last_name,
        furi_first_name: this.$auth.user.furi_first_name,
        furi_last_name: this.$auth.user.furi_last_name,
        alias_name: this.$auth.user.alias_name,
        birthday: '',
        year: '',
        month: '',
        day: '',
        age: this.$auth.user.age,
        gender_id: this.$auth.user.gender_id,
        tel: this.$auth.user.tel,
        email: this.$auth.user.email,
        line: this.$auth.user.line,
        facebook: this.$auth.user.facebook,
        instagram: this.$auth.user.instagram,
        twitter: this.$auth.user.twitter,
        postal_code: this.$auth.user.postal_code,
        province_id: this.$auth.user.province_id,
        city: this.$auth.user.city,
        address: this.$auth.user.address,
        avatar: '',
        images: [],
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
          { validator: validFullWidthLength, message: this.$t('validation.fullwidth_length', { _field_: this.$t('my_page.furi_first_name') }), trigger: 'blur' }
        ],
        furi_last_name: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('my_page.furi_last_name') }),
            trigger: 'blur'
          },
          { validator: validFullWidthLength, message: this.$t('validation.fullwidth_length', { _field_: this.$t('my_page.furi_last_name') }), trigger: 'blur' }
        ],
        tel: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('my_page.phone') }),
            trigger: 'blur'
          },
          { validator: validPhone, trigger: 'blur' }
        ],
        birthday: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('my_page.birth') }),
            trigger: 'blur'
          },
          { validator: validBirthDay, trigger: 'blur' }
        ],
        gender_id: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('my_page.gender') }),
            trigger: 'blur'
          }
        ],
        province_id: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('my_page.gender') }),
            trigger: 'blur'
          }
        ],
        line: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.line') }), trigger: 'blur' }
        ],
        facebook: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.facebook') }), trigger: 'blur' }
        ],
        instagram: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.instagram') }), trigger: 'blur' }
        ],
        twitter: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.twitter') }), trigger: 'blur' }
        ],
        post_code: [
          { validator: validPostCode, message: this.$t('validation.postcode_length', { _field_: this.$t('my_page.post_code') }), trigger: 'blur' }
        ],
        city: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('my_page.city') }),
            trigger: 'blur'
          },
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.city') }), trigger: 'blur' }
        ],
        building_name: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.city') }), trigger: 'blur' }
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
      },
      confirmModal: false
    }
  },
  computed: {
    birthday() {
      return this.accountForm.year && this.accountForm.month && this.accountForm.day
    }
  },
  watch: {
    'accountForm.day'() {
      if (this.accountForm.day && this.accountForm.year && this.accountForm.month) {
        this.accountForm.birthday = this.accountForm.year + '-' + this.accountForm.month + '-' + this.accountForm.day
        this.resetValidate('birthday')
      } else {
        this.accountForm.age = ''
        this.accountForm.birthday = ''
      }
    },
    'accountForm.month'() {
      if (this.accountForm.month && this.accountForm.year && this.accountForm.day) {
        this.accountForm.birthday = this.accountForm.year + '-' + this.accountForm.month + '-' + this.accountForm.day
        this.resetValidate('birthday')
      } else {
        this.accountForm.birthday = ''
        this.accountForm.age = ''
      }
    },
    'accountForm.year'() {
      if (this.accountForm.year && this.accountForm.month && this.accountForm.day) {
        if (this.accountForm.year.length === 4) {
          if (new Date().getFullYear() - this.accountForm.year === 0) {
            this.accountForm.age = 1
          } else {
            this.accountForm.age = new Date().getFullYear() - this.accountForm.year
          }
        }
        this.accountForm.birthday = this.accountForm.year + '-' + this.accountForm.month + '-' + this.accountForm.day
        this.resetValidate('birthday')
      } else {
        this.accountForm.birthday = ''
        this.accountForm.age = ''
      }
    },
    birthday(newValue, oldValue) {
      if (this.accountForm.year.length === 4) {
        if (new Date().getFullYear() - this.accountForm.year === 0) {
          this.accountForm.age = 1
        } else {
          this.accountForm.age = new Date().getFullYear() - this.accountForm.year
        }
      }
    }
  },
  created() {
    this.getGenderMaster()
    this.getProvinceMaster()
    this.getBirthDay()
  },
  mounted() {
    this.loadAllYear()
    this.loadAllMonth()
    this.loadAllDay()
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
      this.file = file
      this.upLoadFile('avatar_banner')
      this.$refs.fileUploadAvatar.value = null
    },
    async onFileChangeDetail(e) {
      const dataImageDetailShow = []
      for (let x = 0; x < e.target.files.length; x++) {
        dataImageDetailShow.push(URL.createObjectURL(e.target.files[x]))
        const formData = new FormData()
        formData.append('image', e.target.files[x])
        formData.append('type', 'avatar_detail')
        const response = await this.$store.dispatch(USER_UPLOAD_AVATAR, formData)
        this.accountForm.avatar = response.data.url
      }
      this.imageDetailShow = dataImageDetailShow
      this.$refs.fileUploadDetail.value = null
    },
    async upLoadFile(type) {
      const formData = new FormData()
      formData.append('image', this.file)
      formData.append('type', type)
      const response = await this.$store.dispatch(USER_UPLOAD_AVATAR, formData)
      this.accountForm.avatar = response.data.url
    },
    removeImage(index) {
      this.imageDetailShow = this.imageDetailShow.filter(function(item, key) {
        return key !== index
      })
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
    queryYear(queryString, cb) {
      const links = this.linksYear
      const results = queryString ? links.filter(this.createFilter(queryString)) : links
      // call callback function to return suggestions
      cb(results)
    },
    queryMonth(queryString, cb) {
      const links = this.linksMonth
      const results = queryString ? links.filter(this.createFilter(queryString)) : links
      // call callback function to return suggestions
      cb(results)
    },
    queryDay(queryString, cb) {
      const links = this.linksDay
      const results = queryString ? links.filter(this.createFilter(queryString)) : links
      // call callback function to return suggestions
      cb(results)
    },
    createFilter(queryString) {
      return (link) => {
        return (link.value.toString().indexOf(queryString.toString()) === 0)
      }
    },
    loadAllYear() {
      for (let i = new Date().getFullYear(); i >= 1900; i--) {
        this.linksYear.push({ value: i.toString() })
      }
    },
    loadAllMonth() {
      for (let i = 1; i <= 12; i++) {
        this.linksMonth.push({ value: i.toString() })
      }
    },
    loadAllDay() {
      for (let i = 1; i <= 31; i++) {
        this.linksDay.push({ value: i.toString() })
      }
    },
    getGenderMaster() {
      const dataResources = [
        'resources[m_genders]={"model": "Gender"}'
      ]
      this.$store.dispatch(MASTER_GET_DATA, dataResources).then(res => {
        this.listGender = res.data.m_genders
      })
    },
    getProvinceMaster() {
      const dataResources = [
        'resources[m_province_districts]={"model": "MProvinceDistrict"}'
      ]
      this.$store.dispatch(MASTER_GET_DATA, dataResources).then(res => {
        this.listProvinceDistrict = res.data.m_province_districts
      })
    },
    getBirthDay() {
      const birthday = this.$auth.user.birthday.split('-')
      this.accountForm.year = birthday[0]
      this.accountForm.month = birthday[1]
      this.accountForm.day = birthday[2]
    },
    update() {
      this.error = { key: null, value: '' }
      this.$refs.accountForm.validate(async valid => {
        if (valid) {
          try {
            await this.$store.commit(INDEX_SET_LOADING, true)
            const dto = this.accountForm
            const response = await this.$store.dispatch(USER_UPDATE_BASIC_INFO, dto)
            if (response.status_code === 200) {
              await this.$store.commit(INDEX_SET_SUCCESS, {
                show: true,
                text: response.messages
              })
              await this.$auth.fetchUser()
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
