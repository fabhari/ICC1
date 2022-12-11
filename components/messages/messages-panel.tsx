import AppLoader from 'components/app/app-loader'
import { useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'
import MessageInput from './message-input'
import MessageItem from './message-item'

export type Message = {
  username: string
  color: string
  content: string
}

type MessagesPanelProps = {
  myUsername: string
  myColor: string
  roomKey: string
  socket: Socket
}

const MessagesPanel = ({
  myUsername,
  myColor,
  socket,
  roomKey,
}: MessagesPanelProps) => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [messages, setMessages] = useState<Message[]>([])

  const messagesContainerElem = useRef<HTMLDivElement | null>(null)

  function addMessage(message: Message) {
    setMessages((messages) => messages.concat(message))
  }

  // Intialize socket connection
  useEffect(() => {
    socket.on(`message.${roomKey}`, (message: Message) => {
      addMessage(message)
    })
  }, [roomKey])

  function sendMessage(content: string) {
    const message: Message = {
      username: myUsername,
      color: myColor,
      content,
    }

    addMessage(message)

    socket.emit('message', {
      roomKey,
      message,
    })
  }

  useEffect(() => {
    async function fetchMessages() {
      const res = await fetch(`/api/room/${roomKey}/messages`)
      const fetchedMessages = await res.json()

      setMessages(fetchedMessages)
      setLoading(false)
    }

    if (roomKey) {
      fetchMessages()
    }
  }, [roomKey])

  // Scroll to bottom whenever new messages come
  useEffect(() => {
    messagesContainerElem.current?.scrollTo({
      top: messagesContainerElem.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages])

  return (
    <div className="mx-4 h-full">
      <h2 className="relative z-10 bg-white py-3 font-bold">Group Chat</h2>

      {isLoading ? (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <AppLoader dark />
        </div>
      ) : (
        <div
          ref={messagesContainerElem}
          className="absolute inset-x-0 bottom-0 mx-4 flex h-full flex-col gap-4 overflow-y-scroll pt-16 pb-24"
        >
          {messages.map(({ content, color, username }: Message, index) => (
            <div className="mr-2" key={index}>
              <MessageItem
                username={username}
                color={color}
                alignRight={username === myUsername}
              >
                {content}
              </MessageItem>
            </div>
          ))}
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 mx-4 mb-2">
        <MessageInput
          disabled={isLoading}
          onSend={(content: string) => sendMessage(content)}
        />
      </div>
    </div>
  )
}

export default MessagesPanel
