<template>
  <div class="container">
    <input v-model="message" />
    <input v-model="key" />

    <button @click="doIt">Do it</button>

    <p>{{ crypted }}</p>
    <p>{{ decrypted }}</p>
  </div>
</template>

<script>
import Vue from 'vue'

import { crypt, decrypt } from '../utils'

export default Vue.extend({
  data() {
    return {
      message: '',
      key: '',
      crypted: '',
      decrypted: ''
    }
  },
  methods: {
    doIt() {
      this.crypted = crypt(this.message, this.key)
      this.decrypted = decrypt(this.crypted, this.key)
      console.log(this.crypted, this.decrypted)
    }
  }
})
</script>

<style scoped>
.container {
  color: green;
}
</style>
