<template>
  <div class="past-search-condition-element">
    <div class="past-search-condition-content">
      <div class="">
        <div id="desired" class="form-condition-element">
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
              <div class="form-right"><span>{{ condition.location }}</span></div>
            </div>
            <div class="form-condition-item">
              <div class="form-left">{{ $t('desired_condition.type') }}</div>
              <div class="form-right"><span>{{ condition.location }}</span></div>
            </div>
            <div class="form-condition-item">
              <div class="form-left">{{ $t('desired_condition.age') }}</div>
              <div class="form-right"><span>{{ condition.location }}</span></div>
            </div>
            <div class="form-condition-item">
              <div class="form-left">{{ $t('desired_condition.salary') }}</div>
              <div class="form-right"><span>{{ condition.location }}</span></div>
            </div>
            <div class="form-condition-item">
              <div class="form-left">{{ $t('desired_condition.position') }}</div>
              <div class="form-right"><span>{{ condition.location }}</span></div>
            </div>
            <div class="form-condition-item">
              <div class="form-left">{{ $t('desired_condition.experience') }}</div>
              <div class="form-right"><span>{{ condition.location }}</span></div>
            </div>
            <div class="form-condition-item">
              <div class="form-left">{{ $t('desired_condition.features') }}</div>
              <div class="form-right"><span>{{ condition.location }}</span></div>
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
</template>

<script>
export default {
  name: 'DesiredConditionElement',
  data() {
    return {
      condition: {}
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
      this.condition = {
        location: '東京都、千葉県'
      }
    },
    handleRouter(route) {
      this.$router.push(route)
    }
  }
}
</script>
