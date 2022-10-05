<template>
  <div class="favorite-job-element job-element">
    <div class="job-title d-flex">
      <img src="/assets/images/favorite-job.png" alt="favorite-job">
      <div class="title-left">
        <div class="card-title">★入社祝金100万円支給！/選べる保障/完週2日30万円★</div>
        <div class="card-subtitle">虎ノ門店舗 (デモ美容室)</div>
        <el-button type="primary" class="btn-blue">面接待ち</el-button>
      </div>
    </div>
    <div class="job-box items-center">
      <div class="left-item">
        <p class="card-text-primary">
          {{ $t('favorite_job.place') }}
        </p>
      </div>
      <div class="right-item first-right-item">
        <p class="card-text-normal">
          午前9時〜午後5時
        </p>
      </div>
      <div class="left-item">
        <p class="card-text-primary">
          {{ $t('favorite_job.recruitment_type') }}
        </p>
      </div>
      <div class="right-item">
        <p class="card-text-normal">
          午前9時〜午後5時
        </p>
      </div>
      <div class="left-item">
        <p class="card-text-primary">
          {{ $t('favorite_job.salary') }}
        </p>
      </div>
      <div class="right-item">
        <p class="card-text-normal">
          午前9時〜午後5時
        </p>
      </div>
      <div class="left-item">
        <p class="card-text-primary">
          {{ $t('favorite_job.working_hours') }}
        </p>
      </div>
      <div class="right-item">
        <p class="card-text-normal">
          午前9時〜午後5時
        </p>
      </div>
      <div class="left-item">
        <p class="card-text-primary">
          {{ $t('favorite_job.holiday') }}
        </p>
      </div>
      <div class="right-item">
        <p class="card-text-normal">
          午前9時〜午後5時
        </p>
      </div>
      <div class="left-item">
        <p class="card-text-primary">
          {{ $t('favorite_job.description') }}
        </p>
      </div>
      <div class="right-item">
        <p class="card-text-normal text-ellipsis">
          ・カット
          <br>
          全体のバランスを見ながらカットaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaを行います。髪を塗らした状態だけではなく、乾かし...
          全体のバランスを見ながらカットaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaを行います。髪を塗らした状態だけではなく、乾かし...
          全体のバランスを見ながらカットaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaを行います。髪を塗らした状態だけではなく、乾かし...
          全体のバランスを見ながらカットaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaを行います。髪を塗らした状態だけではなく、乾かし...
        </p>
      </div>
      <div class="left-item">
        <p class="card-text-primary">
          {{ $t('favorite_job.status') }}
        </p>
      </div>
      <div class="right-item">
        <div class="item-status d-flex">
          <p class="text-status">
            午前9時〜午後5時
          </p>
          <p class="text-status">
            午前9時〜午後5時
          </p>
        </div>
      </div>
    </div>
    <div class="d-flex justify-end cursor-pointer">
      <img class="union-icon" src="/assets/icon/union.svg" alt="union">
      <p class="text-primary-blue">{{ $t('favorite_job.remove') }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'JobElement'
}
</script>
