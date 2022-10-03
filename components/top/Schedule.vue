<template>
  <div class="card-component schedule-element">
    <div class="title">
      <span class="schedule-day">今日</span>
      <span class="card-title">2022年08月01日（月）11:00 </span>
    </div>
    <hr>
    <div class="schedule-box d-flex">
      <img src="/assets/images/schedule.png" alt="schedule">
      <div class="schedule-content">
        <div class="item schedule-title">
          オープニングスタッフ募集☆週休２日
          オープニングスタッフ募集☆週休２日
          オープニングスタッフ募集☆週休２日
          オープニングスタッフ募集☆週休２日
          オープニングスタッフ募集☆週休２日
          オープニングスタッフ募集☆週休２日
          オープニングスタッフ募集☆週休２日
          オープニングスタッフ募集☆週休２日
          オープニングスタッフ募集☆週休２日
        </div>
        <div class="item card-subtitle">
          虎ノ門店舗 (デモ美容室)
        </div>
        <div class="item schedule-date">
          <span class="card-text-primary">{{ $t('schedule.date') }}</span>
          <span class="card-text-normal">2022年08月01日（月）  11:00</span>
        </div>
        <div class="item schedule-method">
          <span class="card-text-primary">{{ $t('schedule.method') }}</span>
          <span class="card-text-normal">対面</span>
        </div>
        <div class="item schedule-place">
          <span class="card-text-primary">{{ $t('schedule.place') }}</span>
          <span class="card-text-normal">東京店舗の事務所</span>
        </div>
        <div class="btn-group">
            <el-button class="schedule-button" type="danger">希望面接時間を変更</el-button>
            <el-button class="schedule-button">キャンセル</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ScheduleElement'
}
</script>
