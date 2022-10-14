<template>
  <div class="past-search-condition-element">
    <div class="past-search-condition-title">
      <span>{{ $t('my_page.past_search_condition') }}</span>
    </div>
    <div class="past-search-condition-content">
      <div class="past-search-button">
        <el-button type="danger">
          <img src="/assets/icon/icon_search_button.svg" alt="">
          {{ $t('my_page.search_by_other_condition') }}
        </el-button>
      </div>
      <div class="past-search-condition-form">
        <div class="form-condition-list" v-for="(condition, key) in listConditions" :key="key">
          <FormConditionElement :condition="condition"></FormConditionElement>
        </div>
      </div>
      <PaginationElement :current-page="page" :last-page="lastPage" @change="changePage"></PaginationElement>
    </div>
  </div>
</template>

<script>
import PaginationElement from '../element-ui/PaginationElement'
import FormConditionElement from './FormConditionElement'
export default {
  name: 'PastSearchConditionElement',
  components: { PaginationElement, FormConditionElement },
  data() {
    return {
      listConditions: [],
      page: 1,
      lastPage: 10
    }
  },
  created() {
    this.getDataConditions()
  },
  methods: {
    changePage(page) {
      this.page = page
    },
    getDataConditions() {
      for (let x = 0; x <= 5; x++) {
        this.listConditions.push({
          date: ['2022年08月09日 09:40（日）', '2022年08月10日 11:00（日）', '2022年08月09日 09:40（日)'][Math.floor(Math.random() * 3)],
          detail: {
            occupation: ['ヘア、ネイル・マツゲ', 'ヘア、ネイル・マツゲ', 'ヘア、ネイル・マツゲ', 'ヘア、ネイル・マツゲ'][Math.floor(Math.random() * 4)],
            work_location: ['甲信越・北陸、岡山県、兵庫県', '甲信越・北陸、岡山県、兵庫県'][Math.floor(Math.random() * 2)],
            keyword: ['アルバイト', ''][Math.floor(Math.random() * 2)],
            employment_status: ['アルバイト、契約社員 、その他', 'アルバイト、契約社員 、その他'][Math.floor(Math.random() * 2)],
            experience: ['正社員、免許・資格不問 、通信生（見習い）相談可', ''][Math.floor(Math.random() * 2)],
            sort_by: ['新着順', '新着順'][Math.floor(Math.random() * 2)],
            feature: ['フリーター歓迎、賞与あり/インセンティブあり、原則定時退社', 'フリーター歓迎、賞与あり/インセンティブあり、原則定時退社'][Math.floor(Math.random() * 2)]
          },
          status: [true, false][Math.floor(Math.random() * 2)]
        })
      }
    }
  }
}
</script>
