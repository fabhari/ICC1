import { Stroke } from 'components/drawing/drawing-panel'

import type { NextApiRequest, NextApiResponse } from 'next'
import { connection } from 'server/redis.mjs'

const handler = async (req: NextApiRequest, res: NextApiResponse<Stroke[]>) => {
  const roomKey = req.query.key

  let canvas = {
    type : 'Pen',
    color : '#FF0000',
    thickness : '2',
    points: {
      x: Math.random() * 2.5,
      y: Math.random() * 2.5
    }
  }

  let string = JSON.stringify(canvas)
  

  let genders = new Array<Stroke>();
  
  //genders.copyWithin(canvas)

 // const strokes = (await connection.get(`canvas:${roomKey}`)) as Stroke[]
  res.status(200).json(new Array<Stroke>(JSON.parse(string)))
}

export default handler
