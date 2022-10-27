<template>
  <div class="right-content-element">
    <div id="self-pr" class="edit-cv-element">
      <div class="edit-cv-title">{{ $t('self_pr.title') }}</div>
      <div class="edit-cv-content edit-info-content">
        <div class="card-text-title card-title-mobile"> {{ $t('self_pr.title') }}</div>
          <div class="edit-form-input">
            <BorderElement :middle="true"></BorderElement>
            <el-row class="d-flex">
              <el-col :md="6" :sm="12" :xs="9" class="col-label-pr">
                <div class="label"><span>{{ $t('self_pr.business_content') }}</span></div>
              </el-col>
              <el-col :md="18" :sm="24" :xs="15">
                <div class="content-pr">
                  <el-row class="">
                    <el-col :md="20" :sm="24">
                      {{ self_pr.favorite_skill }}
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <BorderElement :middle="true"></BorderElement>
            <el-row class="d-flex">
              <el-col :md="6" :sm="12" :xs="9" class="col-label-pr">
                <div class="label">
                  <span>
                    {{ $t('self_pr.experience') }}<br>
                    {{ $t('self_pr.skill') }}
                  </span>
                </div>
              </el-col>
              <el-col :md="18" :sm="24" :xs="15">
                <div class="content-pr">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      {{ self_pr.experience_knowledge }}
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <BorderElement :middle="true"></BorderElement>
            <el-row class="d-flex">
              <el-col :md="6" :sm="12" :xs="9" class="col-label-pr">
                <div class="label"><span>{{ $t('self_pr.pr') }}</span></div>
              </el-col>
              <el-col :md="18" :sm="24" :xs="15">
                <div class="content-pr">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      {{ self_pr.self_pr }}
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <BorderElement :middle="true"></BorderElement>

          </div>
      </div>
    </div>
    <div id="btn-center" class="text-center">
      <el-button class="card-button" @click="handleRouter('/my-page#web_cv')">{{ $t('my_page.back') }}</el-button>
      <el-button class="card-button btn-right" type="danger" @click="handleRouter('self-pr/edit')" >{{ $t('my_page.edit') }}</el-button>
    </div>
  </div>
</template>

<script>
import BorderElement from './BorderElement'

export default {
  name: 'EditCvElement',
  components: { BorderElement },
  props: {
    self_pr: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleRouter(route) {
      this.$router.push(route)
    }
  }
}
</script>
