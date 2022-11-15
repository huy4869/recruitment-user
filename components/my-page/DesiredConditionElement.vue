<template>
  <div class="past-search-condition-element">
    <div class="past-search-condition-content">
      <div class="">
        <div v-if="checkCondition" >
          <NoDataElement :text="$t('common.message_no_data.preference')"></NoDataElement>
          <div id="btn-no-data" class="text-center">
            <el-button class="card-button btn-right" type="danger" @click="handleRouter('/my-page/desired-condition/edit')" >{{ $t('my_page.register') }}</el-button>
          </div>
        </div>
        <div v-else id="desired" >
          <div class="form-condition-element">
            <div class="show-pc">
              <div class="form-condition-title">
                <div class="past-search-condition-title">
                  <span>{{ $t('my_page.desired_condition') }}</span>
                </div>
              </div>
            </div>
            <div class="card-title-mobile"> {{ $t('my_page.desired_condition') }}</div>
            <div class="form-condition-content">
              <div class="d-flex justify-end">
                <div class="form-right"></div>
              </div>
              <div class="form-condition-item">
                <div class="form-left">{{ $t('desired_condition.location') }}</div>
                <div class="form-right"><span>{{ condition.province }}</span></div>
              </div>
              <div class="form-condition-item">
                <div class="form-left">{{ $t('desired_condition.type') }}</div>
                <div class="form-right"><span>{{ condition.work_type_string }}</span></div>
              </div>
              <div class="form-condition-item">
                <div class="form-left">{{ $t('desired_condition.age') }}</div>
                <div class="form-right"><span>{{ condition.age_name }}</span></div>
              </div>
              <div class="form-condition-item">
                <div class="form-left">{{ $t('desired_condition.salary') }}</div>
                <div class="form-right"><span>{{ condition.expected_salary }}</span></div>
              </div>
              <div class="form-condition-item">
                <div class="form-left">{{ $t('desired_condition.position') }}</div>
                <div class="form-right"><span>{{ condition.job_type_string }}</span></div>
              </div>
              <div class="form-condition-item">
                <div class="form-left">{{ $t('desired_condition.working_day') }}</div>
                <div class="form-right"><span>{{ workingDay }}</span></div>
              </div>
              <div class="form-condition-item">
                <div class="form-left">{{ $t('desired_condition.working_hour') }}</div>
                <div class="form-right"><span>{{ workingHour }}</span></div>
              </div>
              <div class="form-condition-item">
                <div class="form-left">{{ $t('desired_condition.experience') }}</div>
                <div class="form-right"><span>{{ condition.job_experience_strings }}</span></div>
              </div>
              <div class="form-condition-item">
                <div class="form-left">{{ $t('desired_condition.features') }}</div>
                <div class="form-right"><span>{{ condition.job_feature_string }}</span></div>
              </div>
            </div>
          </div>
          <div id="btn-center" class="text-center">
            <el-button class="card-button" @click="handleRouter('/my-page#desired_condition ')">{{ $t('my_page.back') }}</el-button>
            <el-button class="card-button btn-right" type="danger" @click="handleRouter('my-page/desired-condition/edit')" >{{ $t('my_page.edit') }}</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoDataElement from '../element-ui/NoDataElement'
import {
  DESIRED_DETAIL,
  INDEX_SET_LOADING,
  MASTER_GET_DATA
} from '@/store/store.const'

export default {
  name: 'DesiredConditionElement',
  components: { NoDataElement },
  data() {
    return {
      condition: {},
      listDays: [],
      workingDay: '',
      workingHour: ''
    }
  },
  async created() {
    await this.getMotivation()
    await this.getMasterData()
  },
  computed: {
    checkCondition() {
      let check = true
      for (const index in this.condition) {
        if (this.condition[index] && this.condition.working_hours.start_hours &&
          this.condition.working_hours.start_minutes && this.condition.working_hours.end_hours &&
          this.condition.working_hours.end_minutes && this.condition.working_hours.working_hours_format) {
          check = false
        }
      }
      return check
    }
  },
  watch: {
    listDays() {
      const text = []
      this.listDays.forEach((element) => {
        if (this.condition.working_days) {
          if (this.condition.working_days.includes(element.id)) {
            text.push(element.name)
          }
        }
      })
      this.workingDay = text.join('、')
    },
    condition() {
      this.workingHour = this.condition.working_hours.working_hours_format
    }
  },
  methods: {
    changePage(page) {
      this.page = page
    },
    async getMotivation() {
      this.$store.commit(INDEX_SET_LOADING, true)
      try {
        const response = await this.$store.dispatch(DESIRED_DETAIL)
        const { data, status_code } = response
        if (status_code === 200) {
          this.condition = data
        }
      } catch (e) {
        this.$store.commit(INDEX_SET_LOADING, false)
      }
      this.$store.commit(INDEX_SET_LOADING, false)
    },
    handleRouter(route) {
      this.$router.push(route)
    },
    async getMasterData() {
      const dataResources = [
        'resources[days_of_week]={}'
      ]
      const dataMasterData = await this.$store.dispatch(MASTER_GET_DATA, dataResources.join('&'))
      this.listDays = dataMasterData.data.days_of_week
    }
  }
}
</script>
