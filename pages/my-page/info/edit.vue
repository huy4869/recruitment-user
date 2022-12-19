<template>
  <div class="cv-page edit-info-element">
    <BannerElement :banner="$t('page.my_page')" title="my page" :subBanner="$t('content.web_cv')"></BannerElement>
    <TitlePageElement class="show-pc"></TitlePageElement>
    <div class="cv-content">
      <MenuLeftElement menu-active="web-cv"></MenuLeftElement>
      <div class="right-content-element">
        <div class="edit-cv-element">
          <div class="edit-cv-title">{{ $t('my_page.edit_basic_information') }}</div>
          <div class="edit-cv-content edit-form-content">
            <el-form
              ref="accountForm"
              :model="accountForm"
              :rules="accountRules"
              autocomplete="off"
              label-position="left"
            >
              <div class="edit-form-input">
                <el-row class="d-flex form-label-input form-image">
                  <el-col :md="6" :sm="14" class="col-label">
                    <div class="label"><span>{{ $t('my_page.image_avatar') }}</span></div>
                  </el-col>
                  <el-col :md="18" :sm="24">
                    <div class="content-input image-avatar" ref="imageAvatar">
                      <el-form-item label="" prop="imageAvatar" :error="(error.key === 'imageAvatar') ? error.value : ''">
                        <div class="d-flex show-avatar">
                          <div class="show-detail">
                            <img id="img-avatar" class="show-image" :src="imageAvatarShow ? imageAvatarShow : '/assets/icon/icon_user_default.svg'" alt="">
                            <img v-if="imageAvatarShow" class="image-close" src="/assets/icon/icon_close_image.svg" alt="" @click="removeAvatar">
                          </div>
                          <input id="upload-avatar" ref="fileUploadAvatar" class="d-none" type="file" @change="onFileChange" accept=".jpeg, .jpg, .png, .svg">
                          <div class="button-upload">
                            <button type="button"><label for="upload-avatar">{{ $t('my_page.update_profile_picture') }}</label></button>
                          </div>
                        </div>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="d-flex form-label-input form-image">
                  <el-col :md="6" :sm="14" class="col-label">
                    <div class="label"><span>{{ $t('my_page.image_detail') }}</span></div>
                  </el-col>
                  <el-col class="d-flex items-center" :md="18" :sm="24">
                    <div class="content-input detail-image">
                      <el-form-item label="" prop="imageDetail" ref="imageDetail" :error="(error.key === 'image') ? error.value : ''">
                        <input id="upload-detail" ref="fileUploadDetail" :class="{'disabledImg' : disableImgUp}" :disabled="disableImgUp" class="d-none" type="file" max="3" multiple @change="onFileChangeDetail" accept=".jpeg, .jpg, .png, .svg">
                        <div class="d-flex list-image-detail">
                          <div v-if="imageDetailShow.length" class="d-flex">
                            <div v-for="(detail, index) in imageDetailShow" :key="index" class="show-detail">
                              <img id="img-intro" class="show-image" :src="detail ? detail.url : '/assets/icon/icon_user_default.svg'" alt="">
                              <img class="image-close" src="/assets/icon/icon_close_image.svg" alt="" @click="removeImage(index)">
                            </div>
                          </div>
                          <div class="button-upload">
                            <button type="button"><label :class="{'disabledImg' : disableImgUp}" for="upload-detail">{{ $t('my_page.upload_image_detail') }}</label></button>
                          </div>
                        </div>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <div class="basic-information">
                  <span>{{ $t('my_page.basic_information') }}</span>
                </div>
                <el-row class="d-flex form-label-input">
                  <el-col :md="6" :sm="14" class="col-label">
                    <div class="label"><span>{{ $t('my_page.name') }}</span></div>
                    <div class="required">{{ $t('form.required') }}</div>
                  </el-col>
                  <el-col :md="18" :sm="24">
                    <div ref="first_name"></div>
                    <div class="content-input" ref="last_name">
                      <el-row class="d-flex">
                        <el-col :md="10" :sm="12" class="first-name">
                          <el-form-item label="" prop="first_name" :error="(error.key === 'first_name') ? error.value : ''">
                            <el-input
                              v-model="accountForm.first_name"
                              :placeholder="$t('my_page.first_name')"
                              name="first_name"
                              type="text"
                              tabindex="2"
                              maxlength="255"
                              @change="setAliasName"
                              @focus="resetValidate('first_name')"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :md="10" :sm="12" class="last-name">
                          <el-form-item label="" prop="last_name" :error="(error.key === 'last_name') ? error.value : ''">
                            <el-input
                              v-model="accountForm.last_name"
                              :placeholder="$t('my_page.last_name')"
                              name="last_name"
                              type="text"
                              tabindex="2"
                              maxlength="255"
                              @change="setAliasName"
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
                    <div class="content-input" ref="alias_name">
                      <el-row class="d-flex">
                        <el-col :md="20" :sm="24">
                          <el-form-item label="" prop="alias_name" :error="(error.key === 'alias_name') ? error.value : ''">
                            <el-input
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
                      <span>{{ $t('my_page.name') }}({{ $t('my_page.furigana') }})</span>
                    </div>
                    <div class="required">{{ $t('form.required') }}</div>
                  </el-col>
                  <el-col :md="18" :sm="24">
                    <div ref="furi_last_name"></div>
                    <div class="content-input" ref="furi_first_name">
                      <el-row class="d-flex">
                        <el-col :md="10" :sm="12" class="first-name">
                          <el-form-item label="" prop="furi_first_name" :error="(error.key === 'furi_first_name') ? error.value : ''">
                            <el-input
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
                    <div class="content-input content-datetime" ref="birthday">
                      <el-form-item label="" prop="birthday" :error="(error.key === 'birthday') ? error.value : ''">
                        <el-row class="d-flex">
                          <el-col :md="3" :sm="12" class="birth-year-info">
                            <el-select
                              v-model="accountForm.year"
                              :placeholder="$t('YYYY')"
                              @focus="resetValidate('birthday')"
                              @blur="validate('birthday')"
                            >
                              <el-option
                                v-for="item in linksYear"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </el-col>
                          <span class="text-normal birthday">{{ $t('form.year') }}</span>
                          <el-col :md="3" :sm="12" class="birth-month">
                            <el-select
                              v-model="accountForm.month"
                              :placeholder="$t('MM')"
                              @focus="resetValidate('birthday')"
                              @blur="validate('birthday')"
                            >
                              <el-option
                                v-for="item in linksMonth"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </el-col>
                          <span class="text-normal birthday">{{ $t('form.month') }}</span>
                          <el-col :md="3" :sm="12" class="birth-day">
                            <el-select
                              v-model="accountForm.day"
                              :placeholder="$t('MM')"
                              @focus="resetValidate('birthday')"
                              @blur="validate('birthday')"
                            >
                              <el-option
                                v-for="item in linksDay"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value">
                              </el-option>
                            </el-select>
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
                    <div class="content-input content-age" ref="age">
                      <el-row class="d-flex">
                        <el-col :md="4" :sm="24">
                          <el-form-item label="" prop="age" :error="(error.key === 'age') ? error.value : ''">
                            <el-input
                              v-model.trim="accountForm.age"
                              :placeholder="$t('my_page.age')"
                              disabled
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
                    <div class="content-input content-gender" ref="gender_id">
                      <el-row class="">
                        <el-form-item label="" prop="gender_id" :error="(error.key === 'gender_id') ? error.value : ''">
                          <el-radio-group class="d-flex" v-model="accountForm.gender_id">
                            <div class="form-gender-checkbox">
                              <el-col v-for="(gender, key) in listGender" :key="key" class="birth-year">
                                <el-radio
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
                            </div>
                          </el-radio-group>
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
                    <div class="content-input" ref="tel">
                      <el-row class="d-flex">
                        <el-col :md="20" :sm="24">
                          <el-form-item label="" prop="tel" :error="(error.key === 'tel') ? error.value : ''">
                            <el-input
                              v-model.trim="accountForm.tel"
                              :placeholder="placeholder.phone"
                              name="tel"
                              type="text"
                              tabindex="2"
                              title=""
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
                    <div class="content-input" ref="email">
                      <el-row class="d-flex">
                        <el-col :md="20" :sm="24">
                          <el-form-item label="" prop="email" :error="(error.key === 'email') ? error.value : ''">
                            <el-input
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
                    <div class="content-input" ref="line">
                      <el-row class="d-flex">
                        <el-col :md="20" :sm="24">
                          <el-form-item label="" prop="line" :error="(error.key === 'line') ? error.value : ''">
                            <el-input
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
                    <div class="content-input" ref="facebook">
                      <el-row class="d-flex">
                        <el-col :md="20" :sm="24">
                          <el-form-item label="" prop="facebook" :error="(error.key === 'facebook') ? error.value : ''">
                            <el-input
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
                    <div class="content-input" ref="instagram">
                      <el-row class="d-flex">
                        <el-col :md="20" :sm="24">
                          <el-form-item label="" prop="instagram" :error="(error.key === 'instagram') ? error.value : ''">
                            <el-input
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
                    <div class="content-input" ref="twitter">
                      <el-row class="d-flex">
                        <el-col :md="20" :sm="24">
                          <el-form-item label="" prop="twitter" :error="(error.key === 'twitter') ? error.value : ''">
                            <el-input
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
                    <div class="content-input" ref="postal_code">
                      <el-row class="d-flex">
                        <el-col :md="10" :sm="24">
                          <el-form-item label="" prop="postal_code" :error="(error.key === 'postal_code') ? error.value : ''">
                            <el-input
                              v-model.trim="accountForm.postal_code"
                              :placeholder="placeholder.post_code"
                              name="alias_name"
                              type="text"
                              tabindex="2"
                              pattern="[0-9]*"
                              title=""
                              @input="zipCodeInput"
                              @focus="resetValidate('postal_code')"
                              @blur="checkPostalCodeValid"
                              @change="checkPostalCode"
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
                    <div class="content-input" ref="province_id">
                      <el-row class="d-flex">
                        <el-col :md="20" :sm="24">
                          <el-form-item label="" prop="province_id" :error="(error.key === 'province_id') ? error.value : ''">
                            <el-select
                              v-model="accountForm.province_id"
                              :placeholder="$t('my_page.prefectures')"
                              @change="selectCity"
                              @focus="resetValidate('province_id')"
                              @visible-change="(event) => { checkValidate('province_id', event) }"
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
                    <div class="content-input" ref="province_city_id">
                      <el-row class="d-flex">
                        <el-col :md="20" :sm="24">
                          <el-form-item label="" prop="province_city_id" :error="(error.key === 'province_city_id') ? error.value : ''">
                            <el-select
                              :disabled="disabledProvinceCity"
                              v-model="accountForm.province_city_id"
                              :placeholder="$t('my_page.enter_province_city')"
                              @focus="resetValidate('province_city_id')"
                              @visible-change="(event) => { checkValidate('province_city_id', event) }"
                            >
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
                    <div class="content-input" ref="address">
                      <el-row class="d-flex">
                        <el-col :md="20" :sm="24">
                          <el-form-item label="" prop="address" :error="(error.key === 'address') ? error.value : ''">
                            <el-input
                              v-model="accountForm.address"
                              :placeholder="$t('my_page.city')"
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
                <el-row class="d-flex form-label-input">
                  <el-col :md="6" :sm="14" class="col-label">
                    <div class="label"><span>{{ $t('my_page.building_name') }}</span></div>
                  </el-col>
                  <el-col :md="18" :sm="24">
                    <div class="content-input" ref="building">
                      <el-row class="d-flex">
                        <el-col :md="20" :sm="24">
                          <el-form-item label="" prop="building" :error="(error.key === 'building') ? error.value : ''">
                            <el-input
                              v-model="accountForm.building"
                              :placeholder="$t('my_page.enter_address')"
                              name="building"
                              type="text"
                              tabindex="2"
                              maxlength="255"
                              @focus="resetValidate('building')"
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
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import BannerElement from '../../../components/layout/BannerElement'
import TitlePageElement from '../../../components/layout/TitlePageElement'
import MenuLeftElement from '../../../components/my-page/MenuLeftElement'
import BorderElement from '../../../components/my-page/BorderElement'
import {
  GET_ZIPCODE,
  INDEX_SET_ERROR, INDEX_SET_LOADING, INDEX_SET_SUCCESS,
  INDEX_SET_TITLE_MENU, MASTER_GET_DATA,
  MY_PAGE_SET_STATE_PAGE, USER_UPDATE_BASIC_INFO, USER_UPLOAD_AVATAR
} from '../../../store/store.const'
import {
  validEmail,
  validFullWidth, validHalfWidth
} from '../../../utils/validate'
import { LINKS_MONTH } from '@/constants/store'

export default {
  name: 'CvPage',
  middleware: 'auth',
  components: { TitlePageElement, BannerElement, MenuLeftElement, BorderElement },
  data() {
    const validFormEmail = (rule, value, callback) => {
      if (value && value.length > 255) {
        callback(new Error(this.$t('validation.halfwidth_email_length', { _field_: this.$t('login.email') })))
      }
      if (value.search(' ') !== -1) {
        callback(new Error(this.$t('validation.com002', { _field_: this.$t('login.email') })))
      }
      if (!validHalfWidth(value)) {
        callback(new Error(this.$t('validation.halfwidth_length', { _field_: this.$t('login.email') })))
      }
      if (!validEmail(value)) {
        callback(new Error(this.$t('validation.email', { _field_: this.$t('login.email') })))
      } else {
        callback()
      }
    }
    const validRequired = (rule, value, callback, message) => {
      if (!value || value.trim() === '') {
        callback(new Error(message))
      } else {
        callback()
      }
    }
    const validCheckHalfWidth = (rule, value, callback, message) => {
      if (value && !validHalfWidth(value)) {
        callback(new Error(this.$t('validation.com003', { _field_: message })))
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
      if (value && (value.length > 13 || value.length < 10 || !value.startsWith(0))) {
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
        address: this.$auth.user.address,
        building: this.$auth.user.building,
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
          { validator: validRequired, message: this.$t('validation.required', { _field_: this.$t('my_page.first_name') }), trigger: 'blur' },
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.first_name') }), trigger: 'blur' }
        ],
        last_name: [
          { validator: validRequired, message: this.$t('validation.required', { _field_: this.$t('my_page.last_name') }), trigger: 'blur' },
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.last_name') }), trigger: 'blur' }
        ],
        alias_name: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.alias_name') }), trigger: 'blur' }
        ],
        furi_first_name: [
          { validator: validRequired, message: this.$t('validation.required', { _field_: this.$t('my_page.furi_first_name') }), trigger: 'blur' },
          { validator: validFullWidthLength, message: this.$t('validation.fullwidth_length', { _field_: this.$t('my_page.furi_first_name') }), trigger: 'blur' }
        ],
        furi_last_name: [
          { validator: validRequired, message: this.$t('validation.required', { _field_: this.$t('my_page.furi_last_name') }), trigger: 'blur' },
          { validator: validFullWidthLength, message: this.$t('validation.fullwidth_length', { _field_: this.$t('my_page.furi_last_name') }), trigger: 'blur' }
        ],
        tel: [
          { validator: validRequired, message: this.$t('validation.required', { _field_: this.$t('my_page.phone') }), trigger: 'blur' },
          { validator: validPhone, trigger: 'blur' }
        ],
        birthday: [
          {
            required: true,
            message: this.$t('validation.required_select', { _field_: this.$t('my_page.birth') }),
            trigger: 'blur'
          },
          { validator: validBirthDay, trigger: 'blur' }
        ],
        gender_id: [
          {
            required: true,
            message: this.$t('validation.required_select', { _field_: this.$t('my_page.gender') }),
            trigger: 'change'
          }
        ],
        province_id: [
          {
            required: true,
            message: this.$t('validation.required_select', { _field_: this.$t('my_page.prefectures') }),
            trigger: 'blur'
          }
        ],
        province_city_id: [
          {
            required: true,
            message: this.$t('validation.required_select', { _field_: this.$t('my_page.province_city') }),
            trigger: 'blur'
          }
        ],
        line: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.line') }), trigger: 'blur' },
          { validator: validCheckHalfWidth, message: this.$t('validation.com003', { _field_: this.$t('my_page.line') }), trigger: 'blur' }
        ],
        facebook: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.facebook') }), trigger: 'blur' },
          { validator: validCheckHalfWidth, message: this.$t('validation.com003', { _field_: this.$t('my_page.facebook') }), trigger: 'blur' }
        ],
        instagram: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.instagram') }), trigger: 'blur' },
          { validator: validCheckHalfWidth, message: this.$t('validation.com003', { _field_: this.$t('my_page.instagram') }), trigger: 'blur' }
        ],
        twitter: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.twitter') }), trigger: 'blur' },
          { validator: validCheckHalfWidth, message: this.$t('validation.com003', { _field_: this.$t('my_page.twitter') }), trigger: 'blur' }
        ],
        postal_code: [
          { validator: validPostCode, message: this.$t('validation.postcode_length', { _field_: this.$t('my_page.post_code') }), trigger: 'blur' }
        ],
        address: [
          { validator: validRequired, message: this.$t('validation.required', { _field_: this.$t('my_page.city') }), trigger: 'blur' },
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.city') }), trigger: 'blur' }
        ],
        building: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.building_name') }), trigger: 'blur' }
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
      confirmModal: false,
      clonedAccountForm: {},
      checkZipcode: false,
      disabledProvinceCity: false
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
    },
    disableImgUp() {
      return this.imageDetailShow.length >= 3
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
    },
    imageDetailShow() {
      if (this.imageDetailShow.length) {
        if (this.error.key === 'image') {
          this.error.value = ''
        }
      }
    },
    imageAvatarShow() {
      if (this.imageAvatarShow) {
        if (this.error.key === 'imageAvatar') {
          this.error.value = ''
        }
      }
    },
    'accountForm.province_id'() {
      if (!this.accountForm.province_id) {
        this.disabledProvinceCity = true
      } else {
        this.disabledProvinceCity = false
      }
    }
  },
  async created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.my_page'), route: '/my-page/top-page' },
      { name: this.$t('page.web_cv'), route: '/my-page/web-cv' },
      { name: this.$t('my_page.basic_information'), route: '/my-page/info' },
      { name: this.$t('my_page.edit_basic_information') }
    ])
    await this.$auth.fetchUser()
    await this.getGenderMaster()
    await this.getProvinceMaster()
    await this.getBirthDay()
    await this.loadAllDay()
    await this.loadAllMonth()
    await this.loadAllYear()
    this.clonedAccountForm = _.cloneDeep(this.accountForm)
    if (!this.accountForm.province_id) {
      this.disabledProvinceCity = true
    }
  },
  methods: {
    validateForm() {
      this.$refs.accountForm.validate(valid => {
        this.isValid = valid
      })
    },
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.accountForm.fields.find((f) => f.prop === ref).clearValidate()
      this.accountForm.errors[ref] = ''
    },
    validate(ref) {
      this.$refs.accountForm.validateField(ref)
    },
    checkValidate(ref, event) {
      if (!event) {
        this.$refs.accountForm.validateField(ref)
      }
    },
    checkFile(file) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.svg)$/i
      if (file.size >= 20000000) {
        return this.$t('validation.err003')
      }
      if (!['image/jpeg', 'image/png', 'image/jpg', 'image/svg'].includes(file.type) && !allowedExtensions.exec(file.name)) {
        return this.$t('validation.err005')
      }
      return ''
    },
    async onFileChange(e) {
      const file = e.target.files[0]
      const valid = this.checkFile(file)
      if (valid) {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: valid })
      } else {
        this.imageAvatarShow = URL.createObjectURL(file)
        this.file = file
        await this.upLoadFile('avatar_banner')
      }
      this.$refs.fileUploadAvatar.value = null
    },
    async onFileChangeDetail(e) {
      for (let x = 0; x < e.target.files.length; x++) {
        const valid = this.checkFile(e.target.files[x])
        if (valid) {
          await this.$store.commit(INDEX_SET_ERROR, { show: true, text: valid })
          return
        }
      }
      for (let x = 0; x < e.target.files.length; x++) {
        const formData = new FormData()
        formData.append('image', e.target.files[x])
        formData.append('type', 'avatar_detail')
        const data = await this.$store.dispatch(USER_UPLOAD_AVATAR, formData)
        switch (data.status_code) {
          case 200:
            if (this.imageDetailShow.length < 3) {
              this.imageDetailShow.push({
                url: data.data.url
              })
            }
            if (this.imageDetailShow.length >= 3) {
              this.$refs.fileUploadDetail.value = null
              return
            }
            break
          case 422:
            for (const [key] of Object.entries(data.data)) {
              this.error = { key, value: data.data[key][0] }
            }
            break
          case 500:
            await this.$store.commit(INDEX_SET_ERROR, {
              show: true,
              text: this.$t('content.EXC_001')
            })
            break
          default:
            await this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.messages })
            break
        }

        if (this.imageDetailShow.length > 3) {
          this.imageDetailShow.splice(3, this.imageDetailShow.length - 3)
        }
      }
      this.$refs.fileUploadDetail.value = null
    },
    async upLoadFile(type) {
      const formData = new FormData()
      formData.append('image', this.file)
      formData.append('type', type)

      const data = await this.$store.dispatch(USER_UPLOAD_AVATAR, formData)
      switch (data.status_code) {
        case 200:
          this.accountForm.avatar = data.data.url
          break
        case 422:
          for (const [key] of Object.entries(data.data)) {
            this.error = { key: key === 'image' ? 'imageAvatar' : key, value: data.data[key][0] }
          }
          break
        case 500:
          await this.$store.commit(INDEX_SET_ERROR, {
            show: true,
            text: this.$t('content.EXC_001')
          })
          break
        default:
          await this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.messages })
          break
      }
    },
    removeImage(index) {
      this.imageDetailShow = this.imageDetailShow.filter(function(item, key) {
        return key !== index
      })
    },
    removeAvatar() {
      this.imageAvatarShow = ''
      this.accountForm.avatar = ''
    },
    handleRouter(route) {
      this.$router.push(route)
    },
    showConfirmModal() {
      this.handleRouter('/my-page/info')
    },
    closeConfirmModal() {
      this.confirmModal = false
    },
    queryYear(queryString, cb) {
      cb(this.linksYear)
    },
    queryMonth(queryString, cb) {
      cb(this.linksMonth)
    },
    queryDay(queryString, cb) {
      cb(this.linksDay)
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
        if (res.status_code === 200) {
          if (res.data.province_districts.length) {
            this.listProvinceDistrict = res.data.province_districts
            const listCity = {}
            this.listProvinceDistrict.forEach((district) => {
              district.provinces.forEach((provinces) => {
                listCity[provinces.id] = provinces
              })
            })
            this.listProvinces = listCity
          } else {
            this.listProvinces = [{ name: this.$t('my_page.prefectures'), disabled: true }]
          }
        } else if (res.status_code === 500) {
          this.listProvinces = [{ name: this.$t('my_page.prefectures'), disabled: true }]
        }
      })
    },
    getBirthDay() {
      const birthday = this.$auth.user.birthday ? this.$auth.user.birthday.split('-') : ''
      this.accountForm.year = birthday[0]
      this.accountForm.month = birthday[1]
      this.accountForm.day = birthday[2]
    },
    scrollToElement(key) {
      const el = this.$refs[key]
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    update() {
      if (this.error.key) {
        this.scrollToElement(this.error.key)
        return
      }
      this.$refs.accountForm.validate(async(valid, key) => {
        if (valid) {
          try {
            await this.$store.commit(INDEX_SET_LOADING, true)
            const dto = this.accountForm
            dto.images = this.imageDetailShow
            dto.postal_code = dto.postal_code ? dto.postal_code.replace(/[^0-9]/g, '') : dto.postal_code
            const response = await this.$store.dispatch(USER_UPDATE_BASIC_INFO, dto)
            this.zipCodeInput()
            if (response.status_code === 200) {
              await this.$store.commit(INDEX_SET_SUCCESS, {
                show: true,
                text: response.messages
              })
              await this.$auth.fetchUser()
              this.accountForm = this.clonedAccountForm
              this.$router.push('/my-page/info')
            } else if (response.status_code === 422) {
              for (const [key] of Object.entries(response.data)) {
                this.error = { key, value: response.data[key][0] }
              }
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
        } else {
          this.scrollToElement(Object.keys(key)[0])
        }
      })
    },
    zipCodeInput() {
      const x = this.accountForm.postal_code.replace(/\D/g, '').match(/(\d{0,3})(\d{0,4})/)
      this.accountForm.postal_code = !x[2] ? x[1] : '' + x[1] + '-' + x[2]
    },
    phoneInput() {
      const x = this.accountForm.tel.replace(/\D/g, '').match(/(\d{0,3})(\d{0,4})(\d{0,4})/)
      this.accountForm.tel = !x[2] ? x[1] : '' + x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '')
    },
    zipCodeFormat(zip) {
      return zip ? zip.toString().slice(0, 3) + '-' + zip.toString().slice(3) : ''
    },
    selectCity(value) {
      this.listProvinceCity = this.listProvinces[value].province_city
      this.accountForm.province_city_id = ''
    },
    daysInMonth(month, year) {
      return new Date(Number(year), Number(month), 0).getDate()
    },
    setAliasName() {
      this.accountForm.first_name = this.accountForm.first_name.trim()
      this.accountForm.last_name = this.accountForm.last_name.trim()
      let fullName = this.accountForm.first_name + ' ' + this.accountForm.last_name
      if (fullName.length > 255) {
        fullName = fullName.slice(0, 255)
      }
      this.accountForm.alias_name = fullName
    },
    async checkPostalCode() {
      try {
        if (this.accountForm.postal_code.length === 8) {
          await this.$store.commit(INDEX_SET_LOADING, true)
          let dto = _.cloneDeep(this.accountForm.postal_code)
          dto = dto.replace(/[^0-9]/g, '')
          const data = await this.$store.dispatch(GET_ZIPCODE, dto)
          let province_city_id = 0
          switch (data.status_code) {
            case 200:
              if (data.data.length === undefined) {
                this.accountForm.province_id = data.data.province_id
                this.listProvinceCity = this.listProvinces[data.data.province_id].province_city
                for (const key in this.listProvinceCity) {
                  if (this.listProvinceCity[key].id === data.data.province_city_id) {
                    province_city_id = Number(key)
                  }
                }
                this.accountForm.province_city_id = this.listProvinceCity[province_city_id].id
              } else if (data.data.length === 0) {
                this.error = {
                  key: 'postal_code',
                  value: this.$t('validation.com015', { _field_: this.$t('my_page.post_code') })
                }
              }
              break
            case 422:
              for (const [key] of Object.entries(data.data)) {
                this.error = { key, value: data.data[key][0] }
              }
              break
            case 500:
              await this.$store.commit(INDEX_SET_ERROR, {
                show: true,
                text: this.$t('content.EXC_001')
              })
              break
            default:
              await this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.messages })
              break
          }
        }
        await this.$store.commit(INDEX_SET_LOADING, false)
      } catch (err) {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
    },
    async checkPostalCodeValid() {
      try {
        if (this.accountForm.postal_code.length === 8) {
          let dto = _.cloneDeep(this.accountForm.postal_code)
          dto = dto.replace(/[^0-9]/g, '')
          const data = await this.$store.dispatch(GET_ZIPCODE, dto)
          switch (data.status_code) {
            case 200:
              if (data.data.length === 0) {
                this.error = {
                  key: 'postal_code',
                  value: this.$t('validation.com015', { _field_: this.$t('my_page.post_code') })
                }
              }
              break
            case 422:
              for (const [key] of Object.entries(data.data)) {
                this.error = { key, value: data.data[key][0] }
              }
              break
            case 500:
              await this.$store.commit(INDEX_SET_ERROR, {
                show: true,
                text: this.$t('content.EXC_001')
              })
              break
            default:
              await this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.messages })
              break
          }
        }
      } catch (err) {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
    }
  },
  async beforeRouteLeave(to, from, next) {
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
      await this.$store.commit(MY_PAGE_SET_STATE_PAGE, 'web-cv')
    } else {
      next()
    }
  }
}
</script>
