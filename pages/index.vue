<template>
  <div>
    <div class="show-pc">
      <IndexPageElement></IndexPageElement>
    </div>
    <div class="show-sp">
      <IndexPageMobileElement></IndexPageMobileElement>
    </div>
  </div>
</template>

<script>
import IndexPageElement from '../components/home/IndexPageElement'
import IndexPageMobileElement from '../components/home/IndexPageMobileElement'

export default {
  name: 'IndexPage',
  components: { IndexPageMobileElement, IndexPageElement }
}
</script>
