<template>
  <div class="show-avatar-element">
    <div v-if="user.avatar">
      <img :src="user.avatar" alt="">
    </div>
    <div v-else class="d-flex show-avatar" :style="{ backgroundColor: user.color }">
      <span>
        {{ user.name ? user.name.slice(0, 1) : '' }}
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ShowAvatarElement',
  props: ['user']
}
</script>
