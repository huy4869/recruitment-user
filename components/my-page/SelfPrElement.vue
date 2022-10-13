<template>
  <div class="right-content-element">
    <div class="edit-cv-element">
      <div class="edit-cv-title">{{ $t('self_pr.title') }}</div>
      <div class="edit-cv-content edit-info-content">
        <div class="card-text-title card-title-mobile"> {{ $t('self_pr.title') }}</div>
          <div class="edit-form-input">
            <BorderElement :middle="true"></BorderElement>
            <el-row class="d-flex">
              <el-col :md="6" :sm="24" :xs="9" class="col-label-pr">
                <div class="label"><span>{{ $t('self_pr.business_content') }}</span></div>
              </el-col>
              <el-col :md="18" :sm="24" :xs="15">
                <div class="content-pr">
                  <el-row class="">
                    <el-col :md="20" :sm="24">
                      {{ self_pr.business_content }}
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <BorderElement :middle="true"></BorderElement>
            <el-row class="d-flex">
              <el-col :md="6" :sm="24" :xs="9" class="col-label-pr">
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
                      {{ self_pr.experience }}
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <BorderElement :middle="true"></BorderElement>
            <el-row class="d-flex">
              <el-col :md="6" :sm="24" :xs="9" class="col-label-pr">
                <div class="label"><span>{{ $t('self_pr.pr') }}</span></div>
              </el-col>
              <el-col :md="18" :sm="24" :xs="15">
                <div class="content-pr">
                  <el-row class="d-flex">
                    <el-col :md="20" :sm="24">
                      {{ self_pr.pr }}
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
  data() {
    return {
      self_pr: {
        business_content: '・ビューティー雑誌を読むこと\n' +
          'ヘアスタイルとメイクすること',
        experience: '・ビューティーサロンのプロモーション、サービス、製品に関する紹介、コンサルティング、情報を顧客に提供する。\n' +
          '・顧客のためのアドバイスと美容ケアのための美容サロンの代表的なイメージを選ばれとなった。\n' +
          '・美容をコンサルティング、顧客にサービスを使用するよう説得する。',
        pr: '・コミュニケーション能力が高いと言われます。\n' +
          '・プレゼンテーションスキル、チームワーク、独立した仕事もできる。\n' +
          '・美容相談が得意です。'
      }
    }
  },
  methods: {
    handleRouter(route) {
      this.$router.push(route)
    }
  }
}
</script>
