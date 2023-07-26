import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { get, EdgeConfigValue, EdgeConfigClient, createClient} from '@vercel/edge-config';

export default function MessagesPage() {
  const { data: session } = useSession()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Record<string, unknown>[]>([])
  const [greeting, setGreeting] = useState<EdgeConfigValue | undefined>('')

  // Fetch messages from the database when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      // Fetch messages from your database here
      // setMessages(rows)
      //
      const beans = await createClient("https://edge-config.vercel.com/ecfg_4d3w9ewgw2tovdi4jdnc7ejig7nz?token=e7ec9599-90dd-4767-8246-2733e3357d49");

      const greetingValue = await beans.get('user1Name');
      setGreeting(greetingValue);
    }
    fetchMessages()
  }, [])

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    // Insert the new message into the database
    // Clear the message input and add the new message to the beginning of the list
    setMessage('')
    // setMessages((prevMessages) => [rows[0], ...prevMessages])
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
        {messages.map((message, index) => (
          <li key={index}>
            <p>{index}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
