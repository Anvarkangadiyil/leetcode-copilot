import type { ChatHistory } from '@/types/chatHistory';
import { openDB} from 'idb'
import type { DBSchema } from 'idb';


interface ChatDB extends DBSchema {
  chats: {
    key: string
    value: { problemName: string; chatHistory: ChatHistory[] }
  }
}

const dbPromise = openDB<ChatDB>('chat-db', 1, {
  upgrade(db) {
    db.createObjectStore('chats', { keyPath: 'problemName' })
  },
})

export const saveChatHistory = async (
  problemName: string,
  history: ChatHistory[]
) => {
  const db = await dbPromise
  await db.put('chats', { problemName, chatHistory: history })
}

export const getChatHistory = async (
  problemName: string,
  limit: number,
  offset: number
) => {
  const db = await dbPromise
  const chatData = await db.get('chats', problemName)
  if (!chatData) return { totalMessageCount: 0, chatHistory: [] }

  const { chatHistory } = chatData
  const totalMessageCount = chatHistory.length


  const slicedHistory = chatHistory.slice(
    Math.max(totalMessageCount - offset - limit, 0),
    totalMessageCount - offset
  )
  return {
    totalMessageCount,
    chatHistory: slicedHistory,
    allChatHistory: chatHistory || [],
  }
}

export const clearChatHistory = async (problemName: string) => {
  const db = await dbPromise
  await db.delete('chats', problemName)
}

export const LIMIT_VALUE = 10