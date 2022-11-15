<template>
  <div v-if="message" class="form-chat-element">
    <div v-if="message.is_date_now" class="show-date">
      <div class="border-date"></div>
      <div class="date-time">{{ message.date_show }}</div>
    </div>
    <div v-else-if="message.is_from_user" class="content-chat content-chat-right">
      <div class="d-flex justify-end form-chat-message">
        <div class="show-message">
          <div class="message-chat">{{ message.content }}</div>
        </div>
        <div v-if="message.show_date" class="message-date">{{ message.send_time }}</div>
      </div>
    </div>
    <div v-else class="content-chat content-chat-left" >
      <div class="d-flex justify-start">
        <div class="d-flex">
          <div class="show-user-image">
            <ShowAvatarElement :user="{ avatar: message.store_banner, name: message.store_name }"></ShowAvatarElement>
          </div>
          <div class="show-message">
            <div class="user-name">{{ message.store_name }}</div>
            <div class="message-chat">{{ message.content }}</div>
            <div v-if="message.show_date" class="message-date">{{ message.send_time }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShowAvatarElement from '../element-ui/ShowAvatarElement'
export default {
  name: 'FormChatElement',
  props: ['message'],
  components: { ShowAvatarElement }
}
</script>
