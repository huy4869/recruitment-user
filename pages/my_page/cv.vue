<template>
  <div>
    <EditCvElement></EditCvElement>
  </div>
</template>

<script>
import EditCvElement from '../../components/element-ui/EditCvElement'

export default {
  name: 'CvPage',
  components: { EditCvElement },
  data() {
    return {
      windowWidth: 0
    }
  }
}
</script>
