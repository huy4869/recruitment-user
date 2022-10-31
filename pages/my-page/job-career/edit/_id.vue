<template>
  <div class="cv-page">
    <TitlePageElement class="show-pc"></TitlePageElement>
    <BannerElement :banner="$t('page.web_cv')"></BannerElement>
    <div class="cv-content">
      <MenuLeftElement menu-active="web_cv"></MenuLeftElement>
      <EditCareerElement
        :job="job"
        :m_job_types="m_job_types"
        :m_position_offices="m_position_offices"
        :m_work_types="m_work_types"
      ></EditCareerElement>
    </div>
  </div>
</template>

<script>
import BannerElement from '~/components/layout/BannerElement'
import TitlePageElement from '~/components/layout/TitlePageElement'
import MenuLeftElement from '~/components/my-page/MenuLeftElement'
import { INDEX_SET_LOADING, INDEX_SET_TITLE_MENU, MASTER_GET_DATA, WORK_HISTORY_DETAIL } from '~/store/store.const'
import EditCareerElement from '~/components/my-page/EditCareerElement'
export default {
  name: 'JobCareerPage',
  components: { EditCareerElement, TitlePageElement, BannerElement, MenuLeftElement },
  data() {
    return {
      job: {},
      m_job_types: [],
      m_position_offices: [],
      m_work_types: []
    }
  },
  created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, [
      { name: this.$t('page.home'), route: '/' },
      { name: this.$t('page.my_page'), route: '/my-page' },
      { name: this.$t('page.web_cv'), route: '/my-page#web_cv' },
      { name: this.$t('my_page.job_career'), route: '/my-page/job-career' },
      { name: this.$t('my_page.job_career') + this.$route.params.id + this.$t('my_page.edit') }
    ])
    this.getDataJob()
    this.getMasterData()
  },
  methods: {
    async getDataJob() {
      this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const response = await this.$store.dispatch(WORK_HISTORY_DETAIL, this.$route.query.id)
        const { data, status_code } = response
        if (status_code === 200) {
          this.job = data
        }
      } catch (e) {
        this.$store.commit(INDEX_SET_LOADING, false)
      }
      this.$store.commit(INDEX_SET_LOADING, false)
    },
    async getMasterData() {
      const dataResources = [
        'resources[m_job_types]={}',
        'resources[m_work_types]={}',
        'resources[m_position_offices]={"model": "MPositionOffice"}'
      ]
      await this.$store.dispatch(MASTER_GET_DATA, dataResources.join('&')).then(res => {
        this.m_job_types = res.data.m_job_types
        this.m_position_offices = res.data.m_position_offices
        this.m_work_types = res.data.m_work_types
      })
    }
  }
}
</script>
