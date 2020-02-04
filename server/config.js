import path from 'path'
import dotenvSafe from 'dotenv-safe'

dotenvSafe.config({
  path: path.resolve(__dirname, '..', '.env.server'),
  example: path.resolve(__dirname, '..', '.env.server.example')
})

export const {
  secret,
  serverPort,
  discordChannelId,
  discordToken
} = process.env
