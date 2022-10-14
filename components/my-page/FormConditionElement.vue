<template>
  <div class="form-condition-element">
    <div class="show-pc">
      <div class="form-condition-title">
        <div class="form-condition-date">{{ condition.date }}</div>
        <div class="form-condition-button">
          <el-button type="primary" class="form-search" plain>
            <img src="/assets/icon/icon_search_blue.svg" alt="">
            {{ $t('common.search') }}
          </el-button>
          <el-button type="danger" class="form-delete" plain>
            <img src="/assets/icon/icon_delete.svg" alt="">
            {{ $t('common.delete') }}
          </el-button>
        </div>
      </div>
    </div>
    <div class="show-sp">
      <div class="form-condition-title">
        <div class="form-condition-date">{{ condition.date }}</div>
        <div class="form-condition-button">
          <el-button type="primary" class="form-search" plain>
            <img src="/assets/icon/icon_search_blue.svg" alt="">
          </el-button>
          <el-button type="danger" class="form-delete" plain>
            <img src="/assets/icon/icon_delete.svg" alt="">
          </el-button>
        </div>
      </div>
    </div>
    <div class="form-condition-content">
      <div class="d-flex justify-end">
        <div class="form-right"></div>
      </div>
      <div v-for="(detail, index) in condition.detail" :key="index">
        <div v-if="detail" class="form-condition-item">
          <div class="form-left">{{ $t('condition.' + index) }}</div>
          <div class="form-right"><span>{{ detail }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'FormConditionElement',
  props: ['condition']
}
</script>
