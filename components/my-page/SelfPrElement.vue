<template>
  <div class="right-content-element">
    <div v-if="checkNoData" >
      <NoDataElement :text="$t('common.message_no_data.self_pr')"></NoDataElement>
      <div id="btn-no-data" class="text-center">
        <el-button class="card-button btn-right btn-back" @click="handleRouter('/my-page/web-cv')" >{{ $t('my_page.back') }}</el-button>
        <el-button class="card-button btn-right btn-register" type="danger" @click="handleRouter('self-pr/edit')" >{{ $t('my_page.register') }}</el-button>
      </div>
    </div>
    <div v-else>
      <div class="edit-cv-element">
        <!-- EDIT SKILL SHEET -->
        <div class="edit-pr-item">
          <div class="edit-pr-title">{{ $t('self_pr.skill_sheet') }}</div>
          <div class="edit-cv-content edit-form-content skill-sheet-index" id="skill-sheet">
            <div class="card-text-title card-title-mobile"> {{ $t('self_pr.skill_sheet') }}</div>
            <div class="edit-form-input">
              <div v-for="(skill, key) in self_pr.skills" :key="key">
                <BorderElement :col-size="5" :middle="true"></BorderElement>
                <el-row class="form-label-input self-skill">
                  <div class="skill-item">
                    <el-col :md="5" :sm="24" class="col-label left-item">
                      <div class="label"><span>{{ skill.name }}</span></div>
                    </el-col>
                    <el-col :md="19" :sm="24">
                      <div class="content-input pr-slider">
                        <el-row class="d-flex">
                          <el-col :md="20" :sm="24">
                            <div class="skill-slider">
                              <el-slider
                                disabled
                                v-model="skill.level"
                                :step="1"
                                :max="5"
                                :min="1"
                                :marks="marks"
                              >
                              </el-slider>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                  </div>
                </el-row>
              </div>
              <BorderElement :col-size="5" :middle="true"></BorderElement>
            </div>
          </div>
        </div>
        <!-- EDIT SELF PR -->
        <div class="edit-pr-item">
          <div class="edit-pr-title">{{ $t('self_pr.title') }}</div>
          <div class="edit-cv-content edit-form-content edit-info-content">
            <div class="card-text-title card-title-mobile"> {{ $t('self_pr.title') }}</div>
            <div class="edit-form-input">
              <el-row class="d-flex">
                <el-col :md="5" :sm="12" :xs="9" class="col-label left-item">
                  <div class="label"><span>{{ $t('self_pr.business_content') }}</span></div>
                </el-col>
                <el-col :md="19" :sm="24" :xs="15">
                  <div class="content-pr">
                    <el-row class="">
                      <el-col :md="20" :sm="24">
                        {{ self_pr.favorite_skill }}
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
              <el-row class="d-flex">
                <el-col :md="5" :sm="12" :xs="9" class="col-label left-item">
                  <div class="label">
                    <span>{{ $t('self_pr.experience') }}{{ $t('self_pr.skill') }}</span>
                  </div>
                </el-col>
                <el-col :md="19" :sm="24" :xs="15">
                  <div class="content-pr">
                    <el-row class="d-flex">
                      <el-col :md="20" :sm="24">
                        {{ self_pr.experience_knowledge }}
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
              <el-row class="d-flex last-input">
                <el-col :md="5" :sm="12" :xs="9" class="col-label left-item">
                  <div class="label"><span>{{ $t('self_pr.pr') }}</span></div>
                </el-col>
                <el-col :md="19" :sm="24" :xs="15">
                  <div class="content-pr">
                    <el-row class="d-flex">
                      <el-col :md="20" :sm="24">
                        {{ self_pr.self_pr }}
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
      <div id="btn-center" class="text-center">
        <el-button class="card-button" @click="handleRouter('/my-page/web-cv')">{{ $t('my_page.back') }}</el-button>
        <el-button class="card-button btn-right" type="danger" @click="handleRouter('self-pr/edit')" >{{ $t('my_page.edit') }}</el-button>
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
    self_pr: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    checkNoData() {
      let check = false
      if (this.self_pr.skills) {
        this.self_pr.skills.forEach((element) => {
          if (element.level !== 1) {
            check = true
          }
        })
      }
      if (!this.self_pr.favorite_skill && !this.self_pr.experience_knowledge && !this.self_pr.self_pr && !check) {
        return true
      }
      return false
    }
  },
  data() {
    return {
      marks: {
        1: this.$t('self_pr.weak'),
        2: '',
        3: this.$t('self_pr.normal'),
        4: '',
        5: this.$t('self_pr.good')
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
