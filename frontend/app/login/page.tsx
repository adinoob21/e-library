'use client'
import { useState } from 'react'
import LoginForm from '../components/LoginForm'
import { useRouter } from 'next/navigation'

export default function StudentLogin() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)

  const handleSwitchType = () => {
    setIsAdmin(!isAdmin)
    router.push('/admin-login')
  }

  return <LoginForm type="student" onSwitchType={handleSwitchType} />
} 