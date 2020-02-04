# discord-client-crypted-microservice
A microservice to chat on Discord using client-side encryption (makes MITM SSL proxies useless).

## Install
```sh
git clone https://github.com/rigwild/discord-client-crypted-microservice
cd discord-client-crypted-microservice
yarn
```

## Build
```sh
yarn client:build
```

## Configuration
Copy [`.server.env.example`](`.server.env.example`) to `.server.env`.

| Variable | Description |
| -------- | ----------- |
| `secret` | AES secret used to encrypt/decrypt messages, should be long and secure |
| `serverPort` | HTTP/WS port the server will listen on |
| `discordChannelId` | Discord channel ID to chat with |
| `discordToken` | Discord bot (or user) authentication token |

## Start
```sh
yarn server:start
```

## License
[The MIT License](./LICENSE).
