import { Link, useNavigate } from 'react-router-dom'
import { signInWithTwitter, signOut } from '../lib/supabase'

export default function Navbar({ user }) {
  const navigate = useNavigate()

  const avatar = user?.user_metadata?.avatar_url
  const username = user?.user_metadata?.user_name || user?.user_metadata?.name

  return (
    <nav style={{
      position: 'relative', zIndex: 10,
      padding: '16px 40px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderBottom: '1px solid var(--border)',
      backdropFilter: 'blur(10px)',
      background: 'rgba(5,5,16,0.6)'
    }}>
      <Link to="/" style={{
        fontFamily: 'Orbitron', fontSize: '1.5rem', fontWeight: 900,
        background: 'linear-gradient(135deg, var(--neon-blue), var(--neon-purple))',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        backgroundClip: 'text', letterSpacing: '2px'
      }}>
        Super<span style={{
          background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-pink))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
        }}>Spin</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {user ? (
          <>
            <button onClick={() => navigate('/create')} style={{
              padding: '10px 24px',
              background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-blue))',
              border: 'none', borderRadius: '50px', color: '#fff',
              fontFamily: 'Orbitron', fontSize: '0.7rem', fontWeight: 700,
              letterSpacing: '2px', cursor: 'pointer',
              boxShadow: '0 0 20px rgba(178,75,255,0.4)',
              transition: 'all 0.3s'
            }}>+ CREATE</button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {avatar && <img src={avatar} alt={username} style={{
                width: 36, height: 36, borderRadius: '50%',
                border: '2px solid var(--neon-purple)',
                boxShadow: '0 0 10px rgba(178,75,255,0.4)'
              }} />}
              <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                @{username}
              </span>
            </div>

            <button onClick={signOut} style={{
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border)',
              borderRadius: '8px', color: 'rgba(255,255,255,0.4)',
              fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.3s'
            }}>Logout</button>
          </>
        ) : (
          <button onClick={signInWithTwitter} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 24px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '50px', color: '#fff',
            fontFamily: 'Rajdhani', fontSize: '1rem', fontWeight: 600,
            cursor: 'pointer', transition: 'all 0.3s'
          }}>
            <span style={{ fontSize: '1.1rem' }}>𝕏</span> Login with X
          </button>
        )}
      </div>
    </nav>
  )
}
