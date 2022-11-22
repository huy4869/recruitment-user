<template>
  <div class="card-component">
    <div class="favorite-job-element">
      <div class="card-text-title card-title-mobile"> {{ $t('my_page.basic_information') }}</div>
      <div class="card-main d-flex">
        <div class="job-title">
          <el-image
            class="avatar-img"
            :src="info.avatar ? info.avatar : '/assets/icon/icon_user_default.svg'"
            :preview-src-list="[(info.avatar ? info.avatar : '/assets/icon/icon_user_default.svg')]">
          </el-image>
          <br>
        </div>
        <div class="img-detail-mobile">
          <span class="img-title-mobile card-text-primary">{{ $t('my_page.image_detail') }}</span>
          <div class="img-detail">
            <img v-for="(img, key) in info.images" :key="key" :src="img.url" alt="">
          </div>

        </div>
        <div class="job-box items-center">
          <div class="left-item avatar-pc">
            <p class="card-text-primary">
              {{ $t('my_page.image_detail') }}
            </p>
          </div>
          <div class="right-item first-right-item avatar-pc">
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
              {{ info.full_name }}
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
              {{ info.birthday }}
            </p>
          </div>
          <div class="left-item">
            <p class="card-text-primary">
              {{ $t('my_page.age') }}
            </p>
          </div>
          <div class="right-item">
            <p class="card-text-normal">
              {{ info.age }}
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
              <span v-if="info.postal_code">〒</span>{{ zipCodeFormat(info.postal_code) }} {{ info.province_name }} {{ info.province_city_name }}{{info.address}}{{ info.building }}
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
          <a v-if="info.twitter" :href="info.twitter" target="_blank">
          <img src="/assets/icon/ebay.svg" alt="ebay">
          </a>
          <a v-if="info.instagram" :href="info.instagram" target="_blank">
          <img src="/assets/icon/ig.svg" alt="ig">
          </a>
          <a v-if="info.line" :href="info.line" target="_blank">
          <img src="/assets/icon/line.svg" alt="line">
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

export default {
  name: 'InfoElement',
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleRouter(route) {
      this.$router.push(route)
    },
    zipCodeFormat(zip) {
      return zip ? zip.toString().slice(0, 3) + '-' + zip.toString().slice(3) : ''
    }
  }
}
</script>
