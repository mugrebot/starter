import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { sql } from '@vercel/postgres'

export default function MessagesPage() {
  const { data: session } = useSession()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  // Fetch messages from the database when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      const { rows } = await sql`SELECT * FROM messages ORDER BY created_at DESC`
      setMessages(rows)
    }
    fetchMessages()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Insert the new message into the database
    const { rows } = await sql`
      INSERT INTO messages (text, user_id)
      VALUES (${message}, ${session.user.id})
      RETURNING *
    `

    // Clear the message input and add the new message to the beginning of the list
    setMessage('')
    setMessages((prevMessages) => [rows[0], ...prevMessages])
  }

  if (!session) {
    return <p>You must be signed in to post a message.</p>
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type="submit">Post Message</button>
      </form>

      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>
    </div>
  )
}
