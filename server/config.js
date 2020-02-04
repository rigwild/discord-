import path from 'path'
import dotenvSafe from 'dotenv-safe'

dotenvSafe.config({
  path: path.resolve(__dirname, '..', '.server.env'),
  example: path.resolve(__dirname, '..', '.server.env.example')
})

export const { secret, serverPort, discordChannelId, discordToken } = process.env
