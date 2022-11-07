<template>
  <div class="right-content-element">
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
                    <div class="d-flex show-avatar">
                      <div class="show-detail">
                        <img id="img-avatar" class="show-image" :src="imageAvatarShow ? imageAvatarShow : '/assets/icon/icon_user_default.svg'" alt="">
                        <img v-if="imageAvatarShow" class="image-close" src="/assets/icon/icon_close_image.svg" alt="" @click="imageAvatarShow = ''">
                      </div>
                      <input id="upload-avatar" ref="fileUploadAvatar" class="d-none" type="file" @change="onFileChange">
                      <div class="button-upload">
                        <button type="button"><label for="upload-avatar">{{ $t('my_page.update_profile_picture') }}</label></button>
                      </div>
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
                        <img id="img-intro" class="show-image" :src="detail ? detail.url : '/assets/icon/icon_user_default.svg'" alt="">
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
                          maxlength="255"
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
                          maxlength="255"
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
                          maxlength="255"
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
                          maxlength="255"
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
                          maxlength="255"
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
                          oninput="this.value=this.value.replace(/[^0-9]/g,'');"
                          pattern="[0-9]*"
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
                          pattern="[0-9]*"
                          @input="phoneInput"
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
                          maxlength="255"
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
                          maxlength="255"
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
                          maxlength="255"
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
                          maxlength="255"
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
                          ref="twitter"
                          v-model.trim="accountForm.twitter"
                          :placeholder="placeholder.twitter"
                          name="twitter"
                          type="text"
                          tabindex="2"
                          maxlength="255"
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
                      <el-form-item label="" prop="postal_code" :error="(error.key === 'postal_code') ? error.value : ''">
                        <el-input
                          ref="alias_name"
                          v-model.trim="accountForm.postal_code"
                          :placeholder="placeholder.post_code"
                          name="alias_name"
                          type="text"
                          tabindex="2"
                          pattern="[0-9]*"
                          @input="zipCodeInput"
                          @focus="resetValidate('postal_code')"
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
                        <el-select
                          v-model="accountForm.province_id"
                          :placeholder="$t('my_page.prefectures')"
                          @change="selectCity"
                        >
                          <el-option
                            v-for="item in listProvinces"
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
                <div class="label"><span>{{ $t('my_page.province_city') }}</span></div>
                <div class="required">{{ $t('form.required') }}</div>
              </el-col>
              <el-col :md="18" :sm="24">
                <div class="content-input">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <el-form-item label="" prop="province_city_id" :error="(error.key === 'province_city_id') ? error.value : ''">
                        <el-select v-model="accountForm.province_city_id" :placeholder="$t('my_page.enter_province_city')">
                          <el-option
                            v-for="item in listProvinceCity"
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
                          maxlength="255"
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
                      <el-form-item label="" prop="address" :error="(error.key === 'address') ? error.value : ''">
                        <el-input
                          ref="address"
                          v-model="accountForm.address"
                          :placeholder="$t('my_page.enter_address')"
                          name="address"
                          type="text"
                          tabindex="2"
                          maxlength="255"
                          @focus="resetValidate('address')"
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
      <el-button :disabled="disabledButton" class="card-button btn-right" type="danger" @click="update">{{ $t('my_page.save') }}</el-button>
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
import { validEmail, validFullWidth } from '../../utils/validate'
import BorderElement from './BorderElement'
import {
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  MASTER_GET_DATA,
  USER_UPDATE_BASIC_INFO, USER_UPLOAD_AVATAR
} from '@/store/store.const'
import { LINKS_MONTH } from '@/constants/store'

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
      if (value && value.length < 8) {
        callback(new Error(this.$t('validation.postcode_length', { _field_: this.$t('my_page.post_code') })))
      } else {
        callback()
      }
    }
    const validPhone = (rule, value, callback) => {
      if (value && (value.length > 18 || value.length < 12 || !value.startsWith(0))) {
        callback(new Error(this.$t('validation.phone_length', { _field_: this.$t('my_page.phone') })))
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
      imageDetailShow: this.$auth.user.images,
      file: '',
      listGender: [],
      listProvinceDistrict: [],
      listProvinces: [],
      listProvinceCity: [],
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
        postal_code: this.zipCodeFormat(this.$auth.user.postal_code),
        province_id: this.$auth.user.province_id,
        province_city_id: this.$auth.user.province_city_id,
        city: this.$auth.user.city,
        address: this.$auth.user.address,
        avatar: this.$auth.user.avatar,
        images: this.$auth.user.images,
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
            message: this.$t('validation.required', { _field_: this.$t('my_page.prefectures') }),
            trigger: 'blur'
          }
        ],
        province_city_id: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('my_page.province_city') }),
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
        postal_code: [
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
        address: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.city') }), trigger: 'blur' }
        ]

      },
      placeholder: {
        phone: '000-1000-0000',
        email: 'example@example.com',
        line: 'line.me/ti/p/z73demo',
        facebook: 'facebook.com/example',
        instagram: 'instagram.com/example',
        twitter: 'twitter.com/example',
        post_code: '000-0000'
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
    },
    numberOfDays() {
      return this.daysInMonth(this.accountForm.month, this.accountForm.year)
    },
    disabledButton() {
      return this.accountForm.first_name === '' || this.accountForm.last_name === '' ||
        this.accountForm.furi_first_name === '' || this.accountForm.furi_last_name === '' ||
        this.accountForm.tel === '' || this.accountForm.birthday === '' ||
        this.accountForm.gender_id === '' || this.accountForm.province_id === '' ||
        this.accountForm.province_city_id === '' || this.accountForm.city === ''
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
        if (this.accountForm.year && this.accountForm.year.length === 4) {
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
      if (this.accountForm.year && this.accountForm.year.length === 4) {
        if (new Date().getFullYear() - this.accountForm.year === 0) {
          this.accountForm.age = 1
        } else {
          this.accountForm.age = new Date().getFullYear() - this.accountForm.year
        }
      }
    },
    listProvinces() {
      this.listProvinceCity = this.$auth.user.province_id ? this.listProvinces[this.$auth.user.province_id].province_city : ''
    },
    numberOfDays() {
      this.loadAllDay()
    }
  },
  async created() {
    await this.$auth.fetchUser()
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
      for (let x = 0; x < e.target.files.length; x++) {
        const formData = new FormData()
        formData.append('image', e.target.files[x])
        formData.append('type', 'avatar_detail')
        const response = await this.$store.dispatch(USER_UPLOAD_AVATAR, formData)
        this.imageDetailShow.push({
          url: response.data.url
        })
      }
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
      this.accountForm.images = this.accountForm.images.filter(function(item, key) {
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
      this.linksMonth = LINKS_MONTH
    },
    loadAllDay() {
      for (let i = 1; i <= this.numberOfDays; i++) {
        if (i < 10) {
          i = '0' + i
        }
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
        'resources[province_districts]={}'
      ]
      this.$store.dispatch(MASTER_GET_DATA, dataResources).then(res => {
        this.listProvinceDistrict = res.data.province_districts
        const listCity = {}
        this.listProvinceDistrict.forEach((district) => {
          district.provinces.forEach((provinces) => {
            listCity[provinces.id] = provinces
          })
        })
        this.listProvinces = listCity
      })
    },
    getBirthDay() {
      const birthday = this.$auth.user.birthday ? this.$auth.user.birthday.split('-') : ''
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
            dto.postal_code = dto.postal_code ? dto.postal_code.replace(/[^0-9]/g, '') : dto.postal_code
            const response = await this.$store.dispatch(USER_UPDATE_BASIC_INFO, dto)
            if (response.status_code === 200) {
              await this.$store.commit(INDEX_SET_SUCCESS, {
                show: true,
                text: response.messages
              })
              await this.$auth.fetchUser()
              this.$router.push('/my-page/info')
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
    zipCodeInput() {
      const x = this.accountForm.postal_code.replace(/\D/g, '').match(/(\d{0,3})(\d{0,4})/)
      this.accountForm.postal_code = !x[2] ? x[1] : '' + x[1] + '-' + x[2]
    },
    phoneInput() {
      const x = this.accountForm.tel.replace(/\D/g, '').match(/(\d{0,3})(\d{0,4})(\d{0,5})/)
      this.accountForm.tel = !x[2] ? x[1] : '' + x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '')
    },
    zipCodeFormat(zip) {
      return zip ? zip.toString().slice(0, 3) + '-' + zip.toString().slice(3) : ''
    },
    selectCity(value) {
      this.listProvinceCity = this.listProvinces[value].province_city
      this.accountForm.province_city_id = this.listProvinceCity[0].id
    },
    daysInMonth(month, year) {
      return new Date(Number(year), Number(month), 0).getDate()
    }
  }
}
</script>
