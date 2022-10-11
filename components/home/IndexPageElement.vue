<template>
  <div class="index-home-page">
    <div class="index-banner">
      <div class="banner-page-element">
        <div class="banner-title" v-html="$t('home.banner_title')"></div>
        <div class="form-search-banner">
          <div class="all-job">
            <span>{{ $t('home.all_job_opening') }}</span>
            <span class="all-subject">158,798{{ $t('common.subject') }}</span>
          </div>
          <div class="form-select-search">
            <div class="select-title">
              <div>{{ $t('home.find_a_job') }}</div>
              <div class="choose-job">{{ $t('home.search_by_condition') }}</div>
            </div>
            <div class="form-select">
              <div class="form-condition">
                <el-select v-model="condition" :placeholder="$t('home.search_by_prefecture')">
                  <el-option
                    v-for="item in listCondition"
                    :key="item.key"
                    :label="item.name"
                    :value="item.key">
                  </el-option>
                  <img slot="suffix" src="/assets/icon/icon_dropdown_full.svg" alt="">
                </el-select>
              </div>
              <div class="image-form-search">
                <img src="/assets/icon/icon_add_primary.svg" alt="">
              </div>
              <div class="form-prefecture">
                <el-select v-model="prefecture" :placeholder="$t('home.choose_a_job')">
                  <el-option
                    v-for="item in listPrefecture"
                    :key="item.key"
                    :label="item.name"
                    :value="item.key">
                  </el-option>
                </el-select>
              </div>
              <div class="button-filter">
                <button type="button" class="el-button el-button--danger">
                  <img src="/assets/icon/icon_search_button.svg" alt="">
                  <span>{{ $t('common.search') }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="index-home-content">
      <div class="form-list-job">
        <div class="new-job-posting">
          <div class="new-job-title">
            <div class="title">
              <img src="/assets/images/icon_home_sub_title.svg" alt="">
              {{ $t('home.new_job_posting') }}
              <div class="total-new-job">
                {{ $t('home.new_job') }}
              </div>
              <div class="all-job">16,712{{ $t('common.subject') }}</div>
            </div>
            <div class="button-see-all">
              <span>{{ $t('home.see_all_job') }}</span>
              <img src="/assets/icon/icon_arrow.svg" alt="">
            </div>
          </div>
          <div class="new-job-content">
            <VueSlickCarousel v-bind="settings">
              <div v-for="(job, index) in listJobs" :key="index">
                <HomeJobElement :job="job"></HomeJobElement>
              </div>
            </VueSlickCarousel>
          </div>
        </div>
        <div class="recommended-job">
          <div class="recommended-job-title">
            <div class="title">
              <img src="/assets/images/icon_home_sub_title1.svg" alt="">
              {{ $t('home.recommended_job') }}
            </div>
            <div class="button-see-all">
              <span>{{ $t('home.see_all_job') }}</span>
              <img src="/assets/icon/icon_arrow.svg" alt="">
            </div>
          </div>
          <div class="recommended-job-content">
            <div v-for="(job, index) in listRecommendJobs" :key="index">
              <RecommendJobElement :job="job"></RecommendJobElement>
            </div>
          </div>
        </div>
        <div class="search-from-popular">
          <div class="search-from-popular-title">
            <div class="title">
              <img src="/assets/images/icon_home_sub_title2.svg" alt="">
              {{ $t('home.search_from_popular') }}
            </div>
          </div>
          <div class="search-from-popular-content">
            <div v-for="(search, index) in listSearch" :key="index" class="search-from-popular-item">
              <div class="search-from-popular-button">{{ search.name }}</div>
              <div class="search-next">
                <img src="/assets/icon/icon_next_search.svg" alt="">
              </div>
              <div class="search-list-category">
                <div v-for="(name, key) in search.detail" :key="key">
                  {{ name }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="search-by-employment">
          <div class="search-by-employment-title">
            <div class="title">
              <img src="/assets/images/icon_home_sub_title3.svg" alt="">
              {{ $t('home.search_from_popular') }}
            </div>
          </div>
          <div class="search-by-employment-content">
            <div class="search-by-employment-category">
              <div v-for="(name, key) in listSearchEmployment" :key="key">
                {{ name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-list-new">
        <div class="form-list-new-title">
          <div>{{ $t('home.most_popular_job') }}</div>
        </div>
        <div class="form-list-new-content">
          <div v-for="(job, index) in listMostPopularJobs" :key="index" class="new-item">
            <div class="new-item-image">
              <img :src="job.image" alt="">
            </div>
            <div class="new-item-content">
              <div class="job-name">{{ job.name }}</div>
              <div class="store-name">{{ job.store_name }}</div>
              <div class="job-info">
                <img src="/assets/icon/icon_place.svg" alt="">
                <span>{{ job.address }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="form-list-new-see-all">
          <div class="button-see-all">
            <span>{{ $t('home.see_all_job') }}</span>
            <img src="/assets/icon/icon_arrow_secondary.svg" alt="">
          </div>
        </div>
        <div class="form-list-new-social">
          <div><img src="/assets/icon/icon_facebook.svg" alt=""></div>
          <div><img src="/assets/icon/icon_twitter.svg" alt=""></div>
          <div><img src="/assets/icon/icon_instagram.svg" alt=""></div>
          <div><img src="/assets/icon/icon_line.svg" alt=""></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import HomeJobElement from './HomeJobElement'
import RecommendJobElement from './RecommendJobElement'

export default {
  name: 'IndexPageElement',
  components: { HomeJobElement, VueSlickCarousel, RecommendJobElement },
  data() {
    return {
      condition: '',
      prefecture: '',
      listCondition: [],
      listPrefecture: [],
      listJobs: [],
      listMostPopularJobs: [],
      listRecommendJobs: [],
      listSearchEmployment: ['正社員', '派遣社員', '契約社員', ' アルバイト', ' その他'],
      listSearch: [
        {
          'name': 'ヘアの人気エリアで検索',
          'detail': ['東京', '鹿児島', '千葉', '長崎', '和歌山県', '広島県', '大分県']
        },
        {
          'name': 'ネイル・マツゲの人気エリアで検索',
          'detail': ['東京', '鹿児島', '千葉', '長崎', '和歌山県', '広島県', '大分県']
        },
        {
          'name': '整体・カイロ・酸素・温浴の人気エリアで検索 ',
          'detail': ['東京', '鹿児島', '千葉', '長崎', '和歌山県', '広島県', '大分県']
        },
        {
          'name': '美容クリニックの人気エリアで検索',
          'detail': ['東京', '鹿児島 ', '長崎県', '和歌山県', '広島県', '大分県']
        },
        {
          'name': 'その他の人気エリアで検索',
          'detail': ['東京', '鹿児島', '千葉', '長崎', '長崎県', '和歌山県', '広島県', '大分県']
        }
      ],
      settings: {
        'arrows': false,
        'dots': true,
        'focusOnSelect': true,
        'infinite': false,
        'speed': 500,
        'slidesToShow': 3,
        'slidesToScroll': 3,
        'touchThreshold': 5
      }
    }
  },
  created() {
    this.getDataJob()
    this.getRecommendJob()
    this.getMostPopularJob()
  },
  methods: {
    getDataJob() {
      for (let x = 0; x <= 12; x++) {
        this.listJobs.push({
          image: '/assets/images/home_job_default.svg',
          name: ['★入社祝金100万円支給！/選べる保障/完週2日30万円★', 'オープニングスタッフ募集☆週休２日＋歩合６０％', '業務委託が初めての方でも<週休2日×35万円保障>で安心'][Math.floor(Math.random() * 3)],
          address: ['〒100-0001東京都千代田区大手町１－２－３', '東京都千代田区', '東京都千代田区'][Math.floor(Math.random() * 3)],
          store_name: ['虎ノ門店舗 (デモ美容室)', 'デモ美容室 - 虎ノ門店舗', 'デモ美容室 - 虎ノ門店舗'][Math.floor(Math.random() * 3)],
          salary: ['10~20万/月収', '250~400万/収'][Math.floor(Math.random() * 2)],
          features: ['正社員', '派遣社員', 'アルバイト', 'その他'],
          date: '午前9時〜午後5時',
          place: ['https://meet.google.com/gpg-ftjc-demo', '〒1000001 東京都千代田区千代田１－２－４', '01234567890'][Math.floor(Math.random() * 3)]
        })
      }
    },
    getRecommendJob() {
      for (let x = 0; x <= 4; x++) {
        this.listRecommendJobs.push({
          image: '/assets/images/home_job_default.svg',
          name: ['★入社祝金100万円支給！/選べる保障/完週2日30万円★', 'オープニングスタッフ募集☆週休２日＋歩合６０％', '業務委託が初めての方でも<週休2日×35万円保障>で安心'][Math.floor(Math.random() * 3)],
          address: ['〒100-0001東京都千代田区大手町１－２－３', '東京都千代田区', '東京都千代田区'][Math.floor(Math.random() * 3)],
          store_name: ['虎ノ門店舗 (デモ美容室)', 'デモ美容室 - 虎ノ門店舗', 'デモ美容室 - 虎ノ門店舗'][Math.floor(Math.random() * 3)],
          salary: ['10~20万/月収', '250~400万/収'][Math.floor(Math.random() * 2)],
          features: ['正社員', '派遣社員', 'アルバイト', 'その他'],
          date: '午前9時〜午後5時',
          work_type: ['ヘア、ネイル・マツゲ、整体・カイロ・酸素・温浴', 'ヘア、ネイル・マツゲ、整体・カイロ・酸素・温浴'][Math.floor(Math.random() * 2)],
          place: ['https://meet.google.com/gpg-ftjc-demo', '〒1000001 東京都千代田区千代田１－２－４', '01234567890'][Math.floor(Math.random() * 3)]
        })
      }
    },
    getMostPopularJob() {
      for (let x = 0; x <= 9; x++) {
        this.listMostPopularJobs.push({
          image: '/assets/images/home_job_default.svg',
          store_name: ['虎ノ門店舗 (デモ美容室)', 'デモ美容室 - 虎ノ門店舗', 'デモ美容室 - 虎ノ門店舗'][Math.floor(Math.random() * 3)],
          name: ['★入社祝金100万円支給！/選べる保障/完週2日30万円★', 'オープニングスタッフ募集☆週休２日＋歩合６０％', '業務委託が初めての方でも<週休2日×35万円保障>で安心'][Math.floor(Math.random() * 3)],
          address: ['〒100-0001東京都千代田区大手町１－２－３', '東京都千代田区', '東京都千代田区'][Math.floor(Math.random() * 3)]
        })
      }
    }
  }
}
</script>
