import { createClient } from 'redis'

const {
  REDIS_USERNAME: username,
  REDIS_PASSWORD: password,
  REDIS_HOST: host,
  REDIS_PORT: port,
} = process.env

export const connection = createClient({
  url: "rediss://iccredis.redis.cache.windows.net:6380",
  //password: "0SItI0tLy1ODHHZqHUhjIwpe3DGeSFYiyAzCaJVtEYs=",
  password: "ePFDKgpvsrJlrdozTbKQAj9dehbTPCtpBAzCaGegfWc=",

});
await connection.connect()

export const subscriber = connection.duplicate()
await subscriber.connect()

export const publisher = connection.duplicate()
await publisher.connect()
