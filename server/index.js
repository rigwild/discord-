import WebSocketServer from './WebSocketServer'
import DiscordClient from './DiscordClient'
import { serverPort, secret } from './config'
import { crypt } from '../utils'

const start = async () => {
  try {
    await Promise.all([
      WebSocketServer.start().then(() => console.log(`WebSocket server is listening on port ${serverPort}.`)),
      DiscordClient.start().then(() => console.log('Discord client was started.'))
    ])
  }
  catch (error) {
    console.error('zuijhfuyzehfuhyzekuyfghazeyuhfgezyuk')
    console.error(error)
  }

  console.log(crypt('hello', secret))
}

start()
