<template>
  <div>
    <HeaderCommon></HeaderCommon>
    <div class="home">
      <nuxt />
    </div>
    <FooterCommon></FooterCommon>
    <LoadingBar></LoadingBar>
  </div>
</template>

<script>
import LoadingBar from '../components/LoadingBar'
import HeaderCommon from '../components/layout/HeaderCommon'
import FooterCommon from '../components/layout/FooterCommon'
export default {
  name: 'DefaultLayout',
  components: { FooterCommon, HeaderCommon, LoadingBar }
}
</script>
