<template>
  <div class="right-content-element">
    <div id="self-pr" class="edit-cv-element">
      <div class="edit-cv-title">{{ $t('motivation.title') }}</div>
      <div class="edit-cv-content edit-info-content">
        <div class="card-text-title card-title-mobile"> {{ $t('motivation.title') }}</div>
        <div class="edit-form-input">
          <BorderElement :middle="true"></BorderElement>
          <el-row class="d-flex">
            <el-col :md="6" :sm="12" :xs="9" class="col-label-pr">
              <div class="label"><span>{{ $t('motivation.name') }}</span></div>
            </el-col>
            <el-col :md="18" :sm="24" :xs="15">
              <div class="content-pr">
                <el-row class="">
                  <el-col :md="20" :sm="24">
                    {{ motivation.motivation }}
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
                    {{ $t('motivation.note') }}
                  </span>
              </div>
            </el-col>
            <el-col :md="18" :sm="24" :xs="15">
              <div class="content-pr">
                <el-row class="d-flex">
                  <el-col :md="20" :sm="24">
                    {{ motivation.noteworthy }}
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
      <el-button class="card-button btn-right" type="danger" @click="handleRouter('motivation/edit')" >{{ $t('my_page.edit') }}</el-button>
    </div>
  </div>
</template>

<script>
import BorderElement from './BorderElement'

export default {
  name: 'EditCvElement',
  components: { BorderElement },
  props: {
    motivation: {
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
