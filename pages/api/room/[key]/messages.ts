import { Message } from 'components/messages/messages-panel'
import { JsonWebKeyInput } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'
import { type } from 'os'
import { connection } from 'server/redis.mjs'
import { json } from 'stream/consumers'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Message[]>
) => {
  const roomKey = req.query.key

  
  // let  response =  (await ) 

  // response =  JSON.parse(response)
  connection.get(
    `messages:${roomKey}`
  ).then((obj)=>
  {


  let responseObj =  {
    username: "Let's Chat",
    color: '#FF0000',
    content: ''
  } 
  let genders = new Array<Message>();
  //genders.push(responseObj)
  

  // console.log(response)
  console.log('------Inot Messagees------')
  // const messages = (await connection.json.get(
  //   `messages:${roomKey}`
  // )) as Message[]

  res.status(200).json(genders)
})
}

export default handler
