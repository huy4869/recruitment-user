<template>
  <div class="form-condition-element">
    <div class="show-pc">
      <div class="form-condition-title">
        <div class="form-condition-date">{{ condition.created_at }}</div>
        <div class="form-condition-button">
          <el-button type="primary" class="form-search" plain @click="changeToSearch">
            <img src="/assets/icon/icon_search_blue.svg" alt="">
            {{ $t('common.search') }}
          </el-button>
          <el-button type="danger" class="form-delete" plain @click="removeSearchJob(condition.id)">
            <img src="/assets/icon/icon_delete.svg" alt="">
            {{ $t('common.delete') }}
          </el-button>
        </div>
      </div>
    </div>
    <div class="show-sp">
      <div class="form-condition-title">
        <div class="form-condition-date">{{ condition.created_at }}</div>
        <div class="form-condition-button">
          <el-button type="primary" class="form-search" plain>
            <img src="/assets/icon/icon_search_blue.svg" alt="" @click="changeToSearch">
          </el-button>
          <el-button type="danger" class="form-delete" plain @click="removeSearchJob(condition.id)">
            <img src="/assets/icon/icon_delete.svg" alt="">
          </el-button>
        </div>
      </div>
    </div>
    <div class="form-condition-content">
      <div class="d-flex justify-end">
        <div class="form-right"></div>
      </div>
      <div v-for="(detail, index) in $t('condition.list')" :key="index">
        <div v-if="condition.content[index]" class="form-condition-item">
          <div class="form-left">{{ detail }}</div>
          <div class="form-right"><span>{{ showTextList(index) }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'FormConditionElement',
  props: ['condition'],
  methods: {
    showTextList(key) {
      if (key === 'text') {
        return this.condition.content[key]
      }
      if (this.condition.content[key] === undefined) {
        return ''
      }
      return this.condition.content[key].map((item) => item.name).join('、')
    },
    removeSearchJob(id) {
      this.$emit('removeSearchJob', id)
    },
    changeToSearch() {
      this.$emit('changeToSearch', '/search')
    }
  }
}
</script>
