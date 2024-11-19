// import process from "process"

import { AxiosRequestConfig } from "axios"

const ServerInfo = {
  dev: {
    protocol: "http",
    host: "localhost",
    port: "3000",
    root: "/",
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,POST,PUT,DELETE,PATCH',
      "Access-Control-Allow-Headers": "X-Requested-With",
      'Access-Control-Allow-Credentials':true,
      'Content-type': 'application/json'
    }
  },
  prod: {
    protocol: "http",
    host: "localhost",
    port: "3000",
    root: "/",
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,POST,PUT,DELETE,PATCH',
      "Access-Control-Allow-Headers": "X-Requested-With",
      'Access-Control-Allow-Credentials':true,
      'Content-type': 'application/json'
    }
  },
}

export default function path () {
  // const server: any =
  //   !process.env['NODE_ENV'] || process.env['NODE_ENV'] === "development"
  //     ? ServerInfo.dev
  //     : ServerInfo.prod
  const server: any = ServerInfo.dev
  return `${server.protocol}://${server.host}:${server.port}${server.root}`
}

export const headers = () => {
  return { headers: ServerInfo.dev.headers }
}

