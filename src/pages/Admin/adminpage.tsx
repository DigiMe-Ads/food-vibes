import { useEffect, useState } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '../../firebase'
import AdminLogin from '../../components/admin/AdminLogin'
import AdminLayout from '../../components/admin/AdminLayout'

export default function AdminPage() {
  const [user, setUser] = useState<User | null | undefined>(undefined)

  useEffect(() => onAuthStateChanged(auth, setUser), [])

  if (user === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 text-sm text-neutral-400">
        Loading…
      </div>
    )
  }

  return user ? <AdminLayout email={user.email} /> : <AdminLogin />
}
