import http from 'http'
import path from 'path'
import handler from 'serve-handler'

import { serverPort } from './config'

export const httpServer = http.createServer((req, res) =>
  handler(req, res, {
    public: path.resolve(__dirname, '..', 'dist'),
    directoryListing: false
  })
)

export const startHttpServer = () => new Promise(resolve => httpServer.listen(serverPort, resolve))
