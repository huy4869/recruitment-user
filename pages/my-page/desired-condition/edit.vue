<template>
  <div class="cv-page">
    <TitlePageElement class="show-pc"></TitlePageElement>
    <BannerElement :banner="$t('page.web_cv')"></BannerElement>
    <div class="cv-content">
      <MenuLeftElement menu-active="desired_condition"></MenuLeftElement>
      <EditDesiredElement
        :list-province="listProvince"
        :list-work-types="listWorkTypes"
        :list-job-types="listJobTypes"
        :list-salary="listSalary"
        :list-job-experience="listJobExperience"
        :list-job-features="listJobFeatures"
        :list-age="listAge"
        :list-days="listDays"
        :desired="desired"
      ></EditDesiredElement>
    </div>
  </div>
</template>

<script>
import BannerElement from '~/components/layout/BannerElement'
import TitlePageElement from '~/components/layout/TitlePageElement'
import MenuLeftElement from '~/components/my-page/MenuLeftElement'
import { DESIRED_DETAIL, INDEX_SET_LOADING, INDEX_SET_TITLE_MENU, MASTER_GET_DATA } from '~/store/store.const'
import EditDesiredElement from '~/components/my-page/EditDesiredElement'
export default {
  name: 'EditDesiredPage',
  components: { EditDesiredElement, TitlePageElement, BannerElement, MenuLeftElement },
  data() {
    return {
      listProvince: [],
      listWorkTypes: [],
      listJobTypes: [],
      listSalary: [],
      listJobExperience: [],
      listJobFeatures: [],
      listAge: [],
      listDays: [],
      desired: {}
    }
  },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.my_page'), route: '/my-page' },
      { name: this.$t('page.web_cv'), route: '/my-page#web_cv' }
    ])
    this.getMasterData()
    this.getDesired()
  },
  methods: {
    async getMasterData() {
      const dataResources = [
        'resources[m_job_types]={"model": "MJobType"}',
        'resources[m_provinces]={"model": "MProvince"}',
        'resources[m_work_types]={"model": "MWorkType"}',
        'resources[m_salary_types]={}',
        'resources[m_job_experiences]={"model": "MJobExperience"}',
        'resources[m_job_features]={}',
        'resources[age]={}',
        'resources[days_of_week]={}'
      ]
      const dataMasterData = await this.$store.dispatch(MASTER_GET_DATA, dataResources.join('&'))
      this.listJobTypes = dataMasterData.data.m_job_types
      this.listWorkTypes = dataMasterData.data.m_work_types
      this.listProvince = dataMasterData.data.m_provinces
      this.listSalary = dataMasterData.data.m_salary_types
      this.listJobExperience = dataMasterData.data.m_job_experiences
      this.listJobFeatures = dataMasterData.data.m_job_features
      this.listAge = dataMasterData.data.age
      this.listDays = dataMasterData.data.days_of_week
    },
    async getDesired() {
      this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const response = await this.$store.dispatch(DESIRED_DETAIL)
        const { data, status_code } = response
        if (status_code === 200) {
          this.desired = data
        }
      } catch (e) {
        this.$store.commit(INDEX_SET_LOADING, false)
      }
      this.$store.commit(INDEX_SET_LOADING, false)
    }
  }
}
</script>
