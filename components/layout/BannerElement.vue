<template>
  <div v-if="banner" class="banner-element">
    <div class="banner-title">{{ banner }}</div>
    <div v-if="subBanner" class="sub-banner-title">{{ subBanner }}</div>
  </div>
</template>

<script>
export default {
  name: 'BannerElement',
  props: ['banner', 'subBanner']
}
</script>
