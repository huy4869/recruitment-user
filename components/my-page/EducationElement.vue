<template>
  <div class="career-job-page-element">
    <div>
      <div v-if="listEdu.length" class="favorite-job-page-content">
        <div id="career-mobile" class="d-flex justify-between">
          <el-button type="danger" class="card-button" @click="handleRouter('education/create/' + (listEdu.length + 1))">
            <div class="d-flex">
              <img src="/assets/icon/add-white.svg" alt="">
              {{ $t('my_page.add_education') }}
            </div>
          </el-button>
          <el-button class="card-button btn-right" @click="handleRouter('/my-page/web-cv')">{{ $t('my_page.back') }}</el-button>
        </div>
        <div v-for="(job, index) in listEdu" :key="index">
          <EduElement :job="job" :index="index + 1" :show-status="true" @reloadList="reloadList"></EduElement>
        </div>
        <div id="career" class="d-flex justify-between">
          <el-button type="danger"  class="card-button" @click="handleRouter('education/create/' + (listEdu.length + 1))">
            <div class="d-flex">
              <img src="/assets/icon/add-white.svg" alt="">
              {{ $t('my_page.add_education') }}
            </div>
          </el-button>
          <el-button class="card-button btn-right" @click="handleRouter('/my-page/web-cv')">{{ $t('my_page.back') }}</el-button>
        </div>
      </div>
      <div v-else>
        <div id="career-mobile" class="d-flex justify-between">
          <el-button type="danger" class="card-button" @click="handleRouter('education/create/' + (listEdu.length + 1))">
            <div class="d-flex">
              <img src="/assets/icon/add-white.svg" alt="">
              {{ $t('my_page.add_education') }}
            </div>
          </el-button>
          <el-button class="card-button btn-right" @click="handleRouter('/my-page/web-cv')">{{ $t('my_page.back') }}</el-button>
        </div>
        <NoDataElement :text="$t('common.message_no_data.education_background')" :type="'career'"></NoDataElement>
      </div>
    </div>
  </div>
</template>

<script>
import NoDataElement from '../element-ui/NoDataElement'
import EduElement from './EduElement'
export default {
  name: 'EducationElement',
  components: { EduElement, NoDataElement },
  props: {
    listEdu: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleRouter(route) {
      this.$router.push(route)
    },
    reloadList() {
      this.$emit('reloadList')
    }
  }
}
</script>
