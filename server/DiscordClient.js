import Discord from 'discord.js'

import { discordChannelId, secret, discordToken } from './config'
import { decrypt } from '../utils'
import WebSocketServer from './WebSocketServer'

export class DiscordClient {
  constructor() {
    this.started = false
    this.discordClient = null
  }

  start() {
    return new Promise(resolve => {
      this.discordClient = new Discord.Client()

      this.discordClient.on('message', message => {
        // Check the messages comes from the selected chanel
        if (message.channel.id !== discordChannelId) return

        // Check if own message
        // Commented to show metadata on client
        // if (message.author.id === this.discordClient.user.id) return

        // Send new message to WebSocket clients
        // Message timestamp is calculted on the client (timezone hell)
        const sentMessage = message.member.nickname
          ? `${message.member.nickname} (${message.author.tag}): ${message.content}`
          : `${message.author.tag}: ${message.content}`
        WebSocketServer.cryptThenBroadcastMessage(sentMessage)
      })

      this.discordClient.login(discordToken)
      this.discordClient.on('ready', () => {
        this.started = true
        resolve()
      })
    })
  }

  decryptThenSendMessage(msg) {
    if (!this.started) throw new Error('Discord client was not started.')

    const channel = this.discordClient.channels.get(discordChannelId)

    if (!channel) throw new Error(`Channel ID=${discordChannelId} was not found.`)

    if (!(channel instanceof Discord.TextChannel))
      throw new Error(`Channel ID=${discordChannelId} is not a text channel.`)

    return channel.send(decrypt(msg, secret))
  }
}

export default new DiscordClient()
