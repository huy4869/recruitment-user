<template>
  <div class="card-component">
    <div class="favorite-job-element">
      <div class="card-text-title card-title-mobile"> {{ $t('my_page.basic_information') }}</div>
      <div class="card-main d-flex">
        <div class="job-title">
          <img v-if="!info.avatar" class="avatar-img" src="/assets/icon/icon_user_default.svg" alt="favorite-job">
          <img v-else class="avatar-img" :src="info.avatar" alt="favorite-job">
          <br>
          <div class="social-media">
            <img src="/assets/icon/fb.svg" alt="fb">
            <img src="/assets/icon/ebay.svg" alt="ebay">
            <img src="/assets/icon/ig.svg" alt="ig">
            <img src="/assets/icon/line.svg" alt="line">
          </div>
        </div>
        <div class="img-detail-mobile">
          <span class="img-title-mobile card-text-primary">{{ $t('my_page.image_detail') }}</span>
          <div class="img-detail">
            <img src="/assets/images/achie.png" alt="">
            <img src="/assets/images/achie.png" alt="">
            <img src="/assets/images/achie.png" alt="">
          </div>

        </div>
        <div class="job-box items-center">
          <div class="left-item">
            <p class="card-text-primary">
              {{ $t('my_page.name') }}
            </p>
          </div>
          <div class="right-item first-right-item">
            <p class="card-text-normal">
              午前9時〜午後5時
            </p>
          </div>
          <div class="left-item">
            <p class="card-text-primary">
              {{ $t('my_page.alias_name') }}
            </p>
          </div>
          <div class="right-item">
            <p class="card-text-normal">
              午前9時〜午後5時
            </p>
          </div>
          <div class="left-item">
            <p class="card-text-primary">
              {{ $t('my_page.birth') }}
            </p>
          </div>
          <div class="right-item">
            <p class="card-text-normal">
              午前9時〜午後5時
            </p>
          </div>
          <div class="left-item">
            <p class="card-text-primary">
              {{ $t('my_page.age') }}
            </p>
          </div>
          <div class="right-item">
            <p class="card-text-normal">
              午前9時〜午後5時
            </p>
          </div>
          <div class="left-item">
            <p class="card-text-primary">
              {{ $t('my_page.gender') }}
            </p>
          </div>
          <div class="right-item">
            <p class="card-text-normal">
              ・カット
              <br>
              。髪を
            </p>
          </div>
          <div class="left-item">
            <p class="card-text-primary">
              {{ $t('my_page.phone') }}
            </p>
          </div>
          <div class="right-item">
            <p class="card-text-normal">
              午前9時〜午後5時
            </p>
          </div>
          <div class="left-item">
            <p class="card-text-primary">
              {{ $t('my_page.email') }}
            </p>
          </div>
          <div class="right-item">
            <p class="card-text-normal">
              午前9時〜午後5時
            </p>
          </div>
          <div class="left-item">
            <p class="card-text-primary">
              {{ $t('my_page.address') }}
            </p>
          </div>
          <div class="right-item">
            <p class="card-text-normal">
              午前9時〜午後5時
            </p>
          </div>
          <div id="img-detail" class="left-item">
            <p class="card-text-primary">
              {{ $t('my_page.image_detail') }}
            </p>
          </div>
          <div id="img-detail" class="right-item">
            <div class="img-detail">
              <img src="/assets/images/achie.png" alt="">
              <img src="/assets/images/achie.png" alt="">
              <img src="/assets/images/achie.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="btn-center" class="text-center">
      <el-button class="card-button" @click="handleRouter('/my_page#web_cv')">{{ $t('my_page.back') }}</el-button>
      <el-button class="card-button btn-right" type="danger" @click="handleRouter('cv')">{{ $t('my_page.edit') }}</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'InfoElement',
  data() {
    return {
      info: {
        avatar: '/assets/images/avartar.png',
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
        address: ''
      }
    }
  },
  methods: {
    handleRouter(route) {
      this.$router.push(route)
    }
  }
}
</script>
