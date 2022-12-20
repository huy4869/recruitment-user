<template>
  <div class="past-search-condition-element">
    <div class="past-search-condition-title">
      <span>{{ $t('my_page.past_search_condition') }}</span>
    </div>
    <div class="past-search-condition-content">
      <div class="past-search-button">
        <el-button class="d-flex items-center" type="danger" @click="changeToLink('/search')">
          <img src="/assets/icon/icon_search_button.svg" alt="">
          {{ $t('my_page.search_by_other_condition') }}
        </el-button>
      </div>
      <div v-if="listConditions.length" class="past-search-condition-form">
        <div class="form-condition-list" v-for="(condition, key) in listConditions" :key="key">
          <FormConditionElement :condition="condition" @removeSearchJob="confirmRemoveSearchJob" @changeToSearch="changeToLink"></FormConditionElement>
        </div>
      </div>
      <div v-else>
        <NoDataElement :text="$t('common.message_no_data.search_condition')"></NoDataElement>
      </div>
      <div v-if="lastPage >= 1 && listConditions.length">
        <PaginationElement :current-page="page" :last-page="lastPage" @change="changePage"></PaginationElement>
      </div>
      <el-dialog class="popup-confirm" :visible.sync="dialogCancel" width="570px">
        <div class="image-confirm text-center">
          <img src="/assets/icon/Cancel.svg" alt="">
        </div>
        <div class="content-confirm text-center">
          {{ $t('content.CON_003') }}
        </div>
        <div slot="footer" class="dialog-footer text-center">
          <el-button @click="dialogCancel = false">{{ $t('confirm_modal.no') }}</el-button>
          <el-button type="danger" @click="removeSearchJob(applyActive)">{{ $t('confirm_modal.yes') }}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  JOB_LIST_SEARCH_JOB,
  INDEX_SET_LOADING,
  JOB_REMOVE_SEARCH_JOB,
  INDEX_SET_SUCCESS,
  INDEX_SET_ERROR
} from '../../store/store.const'
import NoDataElement from '../element-ui/NoDataElement'
import PaginationElement from '../element-ui/PaginationElement'
import FormConditionElement from './FormConditionElement'
export default {
  name: 'PastSearchConditionElement',
  components: { PaginationElement, FormConditionElement, NoDataElement },
  data() {
    return {
      dialogCancel: false,
      applyActive: '',
      listConditions: [],
      page: 1,
      lastPage: 1
    }
  },
  async created() {
    await this.getDataConditions()
  },
  methods: {
    changeToLink(link) {
      this.$router.push(link)
    },
    changePage(page) {
      this.page = page
      this.getDataConditions()
    },
    async getDataConditions() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const dataRequest = [
        'page=' + this.page,
        'per_page=10'
      ]
      const dataResponse = await this.$store.dispatch(JOB_LIST_SEARCH_JOB, dataRequest.join('&'))
      if (dataResponse.status_code === 200) {
        this.listConditions = dataResponse.data.data
        this.lastPage = dataResponse.data.total_page
      }
      if (dataResponse.status_code === 500) {
        await this.$store.commit(INDEX_SET_ERROR, {
          show: true,
          text: this.$t('content.EXC_001')
        })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    confirmRemoveSearchJob(id) {
      this.applyActive = id
      this.dialogCancel = true
    },
    async removeSearchJob(id) {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const response = await this.$store.dispatch(JOB_REMOVE_SEARCH_JOB, id)
      if (response.status_code === 200) {
        await this.$store.commit(INDEX_SET_SUCCESS, {
          show: true,
          text: response.messages
        })
        this.applyActive = ''
        this.dialogCancel = false
      }
      if (response.status_code === 500) {
        await this.$store.commit(INDEX_SET_ERROR, {
          show: true,
          text: this.$t('content.EXC_001')
        })
      }
      await this.getDataConditions()
      await this.$store.commit(INDEX_SET_LOADING, false)
    }
  }
}
</script>
