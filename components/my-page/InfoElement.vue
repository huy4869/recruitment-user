<template>
  <div class="card-component">
    <div class="favorite-job-element">
      <div class="card-text-title card-title-mobile"> {{ $t('my_page.basic_information') }}</div>
      <div class="show-public-avatar">
        <span>
          <span v-if="showAvatar">{{ $t('my_page.show_public_avatar') }}</span>
          <span v-else>{{ $t('my_page.show_none_public_avatar') }}</span>
          <el-switch v-model="showAvatar" @change="handleShowAvatar" />
        </span>
      </div>
      <div class="card-main d-flex">
        <div class="job-title">
          <el-image
            class="avatar-img"
            :src="info.avatar ? info.avatar : '/assets/icon/icon_user_default.svg'"
            :preview-src-list="[(info.avatar ? info.avatar : '/assets/icon/icon_user_default.svg')]">
          </el-image>
          <br>
        </div>
        <div class="job-box items-center">
          <div class="left-item">
            <p class="card-text-primary">
              {{ $t('my_page.image_detail') }}
            </p>
          </div>
          <div class="right-item first-right-item">
            <div class="img-detail">
              <img v-for="(img, key) in info.images" :key="key" :src="img.url" alt="img-detail">
            </div>
          </div>
          <div class="left-item">
            <p class="card-text-primary">
              {{ $t('my_page.name') }}
            </p>
          </div>
          <div class="right-item">
            <p class="card-text-normal">
              <span class="bold">{{ info.full_name }}</span>({{ info.full_name_furi }})
            </p>
          </div>
          <div class="left-item">
            <p class="card-text-primary">
              {{ $t('my_page.alias_name') }}
            </p>
          </div>
          <div class="right-item">
            <p class="card-text-normal">
              {{ info.alias_name }}
            </p>
          </div>
          <div class="left-item">
            <p class="card-text-primary">
              {{ $t('my_page.birth') }}
            </p>
          </div>
          <div class="right-item">
            <p class="card-text-normal">
              {{ info.birthday_format }}
            </p>
          </div>
          <div class="left-item">
            <p class="card-text-primary">
              {{ $t('my_page.age') }}
            </p>
          </div>
          <div class="right-item">
            <p class="card-text-normal">
              {{ info.age ? (info.age) + $t('common.age') : '' }}
            </p>
          </div>
          <div class="left-item">
            <p class="card-text-primary">
              {{ $t('my_page.gender') }}
            </p>
          </div>
          <div class="right-item">
            <p class="card-text-normal">
              {{ info.gender_name }}
            </p>
          </div>
          <div class="left-item">
            <p class="card-text-primary">
              {{ $t('my_page.phone') }}
            </p>
          </div>
          <div class="right-item">
            <p class="card-text-normal">
              {{ info.tel }}
            </p>
          </div>
          <div class="left-item">
            <p class="card-text-primary">
              {{ $t('my_page.email') }}
            </p>
          </div>
          <div class="right-item">
            <p class="card-text-normal">
              {{ info.email }}
            </p>
          </div>
          <div class="left-item">
            <p class="card-text-primary">
              {{ $t('my_page.address') }}
            </p>
          </div>
          <div class="right-item">
            <p class="card-text-normal">
              <span v-if="info.postal_code">〒</span>{{ zipCodeFormat(info.postal_code) }} {{ info.province_name }}{{ info.province_city_name }}{{info.address}}{{ info.building }}
            </p>
          </div>
          <div class="left-item">
            <p class="card-text-primary">
              {{ $t('my_page.sns_social') }}
            </p>
          </div>
          <div id="img-detail1" class="right-item">
            <div class="social-media">
              <a v-if="info.facebook" :href="info.facebook" target="_blank">
                <img src="/assets/icon/fb.svg" alt="fb">
              </a>
              <a v-else class="disable-item" disabled>
                <img src="/assets/icon/fb_disable.svg" alt="fb">
              </a>
              <a v-if="info.twitter" :href="info.twitter" target="_blank">
                <img src="/assets/icon/ebay.svg" alt="ebay">
              </a>
              <a v-else class="disable-item" disabled>
                <img src="/assets/icon/ebay_disable.svg" alt="fb">
              </a>
              <a v-if="info.instagram" :href="info.instagram" target="_blank">
                <img src="/assets/icon/ig.svg" alt="ig">
              </a>
              <a v-else class="disable-item" disabled>
                <img src="/assets/icon/ig_disable.svg" alt="fb">
              </a>
              <a v-if="info.line" :href="info.line" target="_blank">
                <img src="/assets/icon/line.svg" alt="line">
              </a>
              <a v-else class="disable-item" disabled>
                <img src="/assets/icon/line_disable.svg" alt="fb">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="btn-center" class="text-center">
      <el-button class="card-button" @click="handleRouter('/my-page/web-cv')">{{ $t('my_page.back') }}</el-button>
      <el-button class="card-button btn-right" type="danger" @click="handleRouter('info/edit')">{{ $t('my_page.edit') }}</el-button>
    </div>
  </div>
</template>

<script>

import { INDEX_SET_ERROR, INDEX_SET_LOADING, INDEX_SET_SUCCESS, USER_UPDATE_BASIC_INFO } from '@/store/store.const'

export default {
  name: 'InfoElement',
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showAvatar: this.$auth.user.is_public_avatar
    }
  },
  methods: {
    handleRouter(route) {
      this.$router.push(route)
    },
    zipCodeFormat(zip) {
      return zip ? zip.toString().slice(0, 3) + '-' + zip.toString().slice(3) : ''
    },
    async handleShowAvatar() {
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const response = await this.$store.dispatch(USER_UPDATE_BASIC_INFO, {
          is_public_avatar: this.showAvatar ? 1 : 0
        })
        if (response.status_code === 200) {
          await this.$store.commit(INDEX_SET_SUCCESS, {
            show: true,
            text: response.messages
          })
          await this.$auth.fetchUser()
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
  }
}
</script>
