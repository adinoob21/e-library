'use client'
import { useState } from 'react'
import LoginForm from '../components/LoginForm'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(true)

  const handleSwitchType = () => {
    setIsAdmin(!isAdmin)
    router.push('/login')
  }

  return <LoginForm type="admin" onSwitchType={handleSwitchType} />
} 