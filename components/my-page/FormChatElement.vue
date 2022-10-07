<template>
  <div class="form-chat-element">
    <div v-if="message.state === 'send'" class="content-chat content-chat-right">
      <div class="d-flex justify-end">
        <div>
          <div class="message-chat">{{ message.message }}</div>
          <div class="message-date">{{ message.date }}</div>
        </div>
      </div>
    </div>
    <div v-if="message.state === 'date'" class="show-date">
      <div class="border-date"></div>
      <div class="date-time">{{ message.date }}</div>
    </div>
    <div v-if="message.state === 'user'" class="content-chat content-chat-left" >
      <div class="d-flex justify-start">
        <div class="d-flex">
          <div class="show-user-image">
            <ShowAvatarElement :user="message"></ShowAvatarElement>
          </div>
          <div class="show-message">
            <div class="user-name">{{ message.name }}</div>
            <div class="message-chat">{{ message.message }}</div>
            <div class="message-date">{{ message.date }}</div>
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
