import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AuthCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const handleCallback = async () => {
      await supabase.auth.getSession()
      // Check if we came from a giveaway page
      const returnTo = localStorage.getItem('returnTo')
      if (returnTo) {
        localStorage.removeItem('returnTo')
        navigate(returnTo)
      } else {
        navigate('/')
      }
    }
    handleCallback()
  }, [navigate])

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '80vh', flexDirection: 'column', gap: '16px'
    }}>
      <div style={{ fontFamily: 'Orbitron', color: 'var(--neon-purple)', fontSize: '1rem', letterSpacing: '4px' }}>
        AUTHENTICATING...
      </div>
    </div>
  )
}
