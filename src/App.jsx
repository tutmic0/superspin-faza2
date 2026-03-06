import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import Home from './pages/Home'
import CreateGiveaway from './pages/CreateGiveaway'
import GiveawayPage from './pages/GiveawayPage'
import AuthCallback from './pages/AuthCallback'
import Navbar from './components/Navbar'
import Aurora from './components/Aurora'

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--dark-bg)' }}>
      <div style={{ fontFamily: 'Orbitron', color: 'var(--neon-purple)', fontSize: '1.2rem', letterSpacing: '4px' }}>LOADING...</div>
    </div>
  )

  return (
    <BrowserRouter>
      <Aurora />
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/create" element={<CreateGiveaway user={user} />} />
        <Route path="/giveaway/:id" element={<GiveawayPage user={user} />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </BrowserRouter>
  )
}
