import { startHttpServer, httpServer } from './httpServer'
import WebSocketServer from './WebSocketServer'
import DiscordClient from './DiscordClient'
import { serverPort } from './config'

const start = async () => {
  await startHttpServer()
  console.log(`HTTP server is listening on http://localhost:${serverPort}.`)

  await Promise.all([
    WebSocketServer.start(httpServer).then(() => console.log(`WebSocket server is listening on port ${serverPort}.`)),
    DiscordClient.start().then(() => console.log('Discord client was started.'))
  ])
}

start()
