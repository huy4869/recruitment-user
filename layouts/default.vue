<template>
  <div>
    <div class="home">
      <nuxt />
    </div>
  </div>
</template>

<script>

export default {
  name: 'DefaultLayout',
  data() {
    return {
      categories: [
        {
          name: '',
          link: '',
          active: true,
          children: []
        }
      ],
      windowWidth: 0,
      showPhoneAni: true
    }
  }
}
</script>