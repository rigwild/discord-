<template>
  <div class="container">
    <textarea v-model="messageHistoryOutput" class="history" placeholder="Messages history" readonly></textarea>

    <div class="sendFrame">
      <textarea
        v-model="message"
        @keydown.enter.exact.prevent
        @keyup.enter.exact="cryptThenSendMessage"
        @keydown.enter.shift.exact="message += '\n'"
        @keydown.enter.ctrl.exact="message += '\n'"
        class="message"
        placeholder="Write a message..."
      ></textarea>
      <button @click="cryptThenSendMessage" class="sendBtn">Send</button>
    </div>

    <div class="secretFrame">
      <input v-model="secret" type="password" class="secret" placeholder="Secret key" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import { crypt, decrypt, toHumanDateTime } from '../utils'

export default Vue.extend({
  data() {
    return {
      webSocket: null,

      secret: '',
      message: '',
      messageHistory: []
    }
  },
  mounted() {
    this.webSocket = new WebSocket('ws://localhost:8080')
    this.webSocket.onmessage = event => this.decryptThenAddToHistory(event.data)
  },
  computed: {
    messageHistoryOutput() {
      return this.messageHistory.join('\n')
    }
  },
  methods: {
    cryptThenSendMessage() {
      if (!this.secret) return alert('Missing secret key!')

      const crypted = crypt(this.message, this.secret)
      this.webSocket.send(crypted)
      this.message = ''
    },

    decryptThenAddToHistory(cryptedMessage) {
      this.messageHistory.push(`${toHumanDateTime(new Date())} | ${decrypt(cryptedMessage, this.secret)}`)
    }
  }
})
</script>

<style scoped>
.container {
  font-family: Arial, Helvetica, sans-serif;
  width: 100%;
  width: 1200px;
  margin: 0 auto;
  margin-top: 25px;
}
textarea,
input,
button {
  padding: 7px;
  background-color: #424242;
  border: none;
  color: #e0e0e0;
  font-size: 16px;
}
.history {
  width: 100%;
  height: 500px;
  border-radius: 12px 12px 0 0;
}
.message {
  width: 100%;
  height: 50px;
  border-radius: 0 0 0 12px;
}
.sendBtn {
  margin-left: 5px;
  border-radius: 0 0 12px 0;
}
.sendFrame {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  width: 100%;
}
.secretFrame {
  text-align: center;
}
</style>
