<template>
  <div class="career-job-page-element">
    <div>
      <div v-if="listQualification.length" class="favorite-job-page-content">
        <div id="career-mobile" class="d-flex justify-between">
          <el-button type="danger" class="card-button" @click="handleRouter('qualification/create/'+ (listQualification.length + 1))">
            <img src="/assets/icon/add-white.svg" alt="">
            {{ $t('my_page.add_experience') }}
          </el-button>
          <el-button class="card-button btn-right" @click="handleRouter('/my-page#web_cv')">{{ $t('my_page.back') }}</el-button>
        </div>
        <div v-for="(job, index) in listQualification" :key="index">
          <QualifyElement :job="job" :index="index + 1" :show-status="true"></QualifyElement>
        </div>
        <div id="career" class="d-flex justify-between">
          <el-button type="danger"  class="card-button" @click="handleRouter('qualification/create/'+ (listQualification.length + 1))">
            <img src="/assets/icon/add-white.svg" alt="">
            {{ $t('my_page.add_experience') }}
          </el-button>
          <el-button class="card-button btn-right" @click="handleRouter('/my-page#web_cv')">{{ $t('my_page.back') }}</el-button>
        </div>
      </div>
      <div v-else>
        <div id="career-mobile" class="d-flex justify-between">
          <el-button type="danger" class="card-button" @click="handleRouter('qualification/create/'+ (listQualification.length + 1))">
            <img src="/assets/icon/add-white.svg" alt="">
            {{ $t('my_page.add_experience') }}
          </el-button>
          <el-button class="card-button btn-right" @click="handleRouter('/my-page#web_cv')">{{ $t('my_page.back') }}</el-button>
        </div>
        <NoDataElement :text="$t('common.no_data')" :type="'career'"></NoDataElement>
      </div>
    </div>
  </div>
</template>

<script>
import NoDataElement from '../element-ui/NoDataElement'
import QualifyElement from './QualifyElement'
export default {
  name: 'FavoriteJobElement',
  components: { QualifyElement, NoDataElement },
  props: {
    listQualification: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      total: 3,
      showViewAllJob: true,
      lastUpdated: '2022年09月26日更新'
    }
  },
  created() {
  },
  methods: {
    handleRouter(route) {
      this.$router.push(route)
    }
  }
}
</script>
