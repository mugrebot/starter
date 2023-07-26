import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { db } from '@vercel/postgres'

export default function Home() {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  useEffect(() => {
    const connectToDb = async () => {
      const client = await db.connect()
      await client.sql`SELECT 1`
      console.log('Connected to the database')
    }

    connectToDb()
  }, [])

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  )
}
