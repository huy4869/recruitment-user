<template>
  <div class="right-content-element">
    <div v-if="!motivation.motivation && !motivation.noteworthy">
      <NoDataElement :text="$t('common.message_no_data.motive')"></NoDataElement>
      <div id="btn-no-data" class="text-center">
        <el-button class="card-button btn-right btn-back" @click="handleRouter('/my-page/web-cv')" >{{ $t('my_page.back') }}</el-button>
        <el-button class="card-button btn-right btn-register" type="danger" @click="handleRouter('motivation/edit')" >{{ $t('my_page.register') }}</el-button>
      </div>
    </div>
    <div v-else>
      <div class="edit-cv-element">
        <div class="edit-pr-item">
          <div class="edit-cv-title">{{ $t('motivation.title') }}</div>
          <div class="edit-cv-content edit-form-content edit-info-content">
          <div class="card-text-title card-title-mobile"> {{ $t('motivation.title') }}</div>
          <div class="edit-form-input">
            <BorderElement :middle="true"></BorderElement>
            <el-row class="d-flex">
              <el-col :md="5" :sm="12" :xs="9" class="col-label left-item">
                <div class="label"><span class="label-moti">{{ $t('motivation.name') }}</span></div>
              </el-col>
              <el-col :md="19" :sm="24" :xs="15">
                <div class="content-pr">
                  <el-row class="">
                    <el-col :md="20" :sm="24">
                      <span class="break-word break-space"> {{ motivation.motivation }}</span>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <el-row class="d-flex last-input">
              <el-col :md="5" :sm="12" :xs="9" class="col-label left-item">
                <div class="label">
                  <span class="label-moti">
                    {{ $t('motivation.note') }}
                  </span>
                </div>
              </el-col>
              <el-col :md="19" :sm="24" :xs="15">
                <div class="content-pr">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      <span class="break-word break-space"> {{ motivation.noteworthy }}</span>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <BorderElement :middle="true"></BorderElement>
          </div>
        </div>
        </div>
      </div>
      <div id="btn-center" class="text-center">
        <el-button class="card-button" @click="handleRouter('/my-page/web-cv')">{{ $t('my_page.back') }}</el-button>
        <el-button class="card-button btn-right" type="danger" @click="handleRouter('motivation/edit')" >{{ $t('my_page.edit') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import NoDataElement from '../element-ui/NoDataElement'
import BorderElement from './BorderElement'

export default {
  name: 'EditCvElement',
  components: { BorderElement, NoDataElement },
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
