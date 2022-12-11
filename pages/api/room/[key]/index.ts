import { Message } from 'components/messages/messages-panel'
import type { NextApiRequest, NextApiResponse } from 'next'
import { connection } from 'server/redis.mjs'
import { json } from 'stream/consumers'

const handler = async (req: NextApiRequest, res: NextApiResponse<null>) => {
  const roomKey = req.query.key

  if (req.method === 'POST') 
  {
    const messages = await connection.get(`messages:${roomKey}`)
    if (!messages) 
    {
     let data = {
        name : 'ICCGroup33',
        colour : '#FF0000',
        content : 'ICCAssignment'
      }

      let canvas = {
        type : 'Pen',
        color : '#FF0000',
        thickness : '2',
        points: {
          x: Math.random() * 2.5,
          y: Math.random() * 2.5
        }
      }

      console.log('^^^^^^^^^^^^^^^^^^^^^6')
      await connection.set(`messages:${roomKey}` , JSON.stringify(data))
      await connection.set(`canvas:${roomKey}`, JSON.stringify(canvas))
      console.log('^^^^^^^^^^^^^^^^^^^^^6')
    }
  }

  res.send(null)
}

export default handler
