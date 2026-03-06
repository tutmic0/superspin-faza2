import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getActiveGiveaways, signInWithTwitter } from '../lib/supabase'

export default function Home({ user }) {
  const [giveaways, setGiveaways] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getActiveGiveaways().then(data => {
      setGiveaways(data || [])
      setLoading(false)
    })
  }, [])

  const timeLeft = (endsAt) => {
    const diff = new Date(endsAt) - new Date()
    if (diff <= 0) return 'Ended'
    const h = Math.floor(diff / 3600000)
    const m = Math.floor((diff % 3600000) / 60000)
    if (h > 24) return `${Math.floor(h/24)}d ${h%24}h`
    return `${h}h ${m}m`
  }

  return (
    <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '60px 40px' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <div style={{
          fontFamily: 'Orbitron', fontSize: '0.7rem', letterSpacing: '6px',
          color: 'var(--neon-blue)', marginBottom: '20px', textTransform: 'uppercase'
        }}>✦ The Ultimate Giveaway Platform ✦</div>

        <h1 style={{
          fontFamily: 'Orbitron', fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 900, lineHeight: 1.1, marginBottom: '24px'
        }}>
          <span style={{
            background: 'linear-gradient(135deg, var(--neon-blue), var(--neon-purple))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
          }}>Super</span>
          <span style={{
            background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-pink))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
          }}>Spin</span>
        </h1>

        <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.6 }}>
          Create giveaways, spin the wheel, find your winners — live on X.
        </p>

        {!user ? (
          <button onClick={signInWithTwitter} style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '16px 40px',
            background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-blue))',
            border: 'none', borderRadius: '50px', color: '#fff',
            fontFamily: 'Orbitron', fontSize: '0.85rem', fontWeight: 700,
            letterSpacing: '2px', cursor: 'pointer',
            boxShadow: '0 0 30px rgba(178,75,255,0.4)',
            transition: 'all 0.3s'
          }}>
            <span style={{ fontSize: '1.2rem' }}>𝕏</span> START WITH X
          </button>
        ) : (
          <button onClick={() => navigate('/create')} style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '16px 40px',
            background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-blue))',
            border: 'none', borderRadius: '50px', color: '#fff',
            fontFamily: 'Orbitron', fontSize: '0.85rem', fontWeight: 700,
            letterSpacing: '2px', cursor: 'pointer',
            boxShadow: '0 0 30px rgba(178,75,255,0.4)'
          }}>
            + CREATE GIVEAWAY
          </button>
        )}
      </div>

      {/* Active Giveaways */}
      <div>
        <div style={{
          fontFamily: 'Orbitron', fontSize: '0.65rem', letterSpacing: '4px',
          color: 'var(--neon-purple)', marginBottom: '24px', textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: '10px'
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--neon-purple)', boxShadow: '0 0 8px var(--neon-purple)', display: 'inline-block' }} />
          Active Giveaways
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', padding: '60px', fontFamily: 'Orbitron', fontSize: '0.8rem', letterSpacing: '3px' }}>
            LOADING...
          </div>
        ) : giveaways.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px 40px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px dashed rgba(255,255,255,0.08)',
            borderRadius: '20px'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎡</div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '1rem', letterSpacing: '1px' }}>No active giveaways yet</div>
            <div style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.85rem', marginTop: '8px' }}>Be the first to create one!</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {giveaways.map(g => (
              <div key={g.id} onClick={() => navigate(`/giveaway/${g.id}`)}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px', padding: '24px',
                  cursor: 'pointer', transition: 'all 0.3s',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(178,75,255,0.4)'
                  e.currentTarget.style.background = 'rgba(178,75,255,0.08)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(178,75,255,0.2)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Organizer */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  {g.organizer_avatar ? (
                    <img src={g.organizer_avatar} alt={g.organizer_name} style={{
                      width: 36, height: 36, borderRadius: '50%',
                      border: '2px solid var(--neon-purple)'
                    }} />
                  ) : (
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-blue))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.9rem', fontWeight: 700
                    }}>
                      {g.organizer_name?.charAt(0) || '?'}
                    </div>
                  )}
                  <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
                    @{g.organizer_name}
                  </span>
                </div>

                {/* Title */}
                <div style={{
                  fontFamily: 'Orbitron', fontSize: '1rem', fontWeight: 700,
                  color: '#fff', marginBottom: '12px', lineHeight: 1.3
                }}>{g.title}</div>

                {/* Description */}
                {g.description && (
                  <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', marginBottom: '16px', lineHeight: 1.5 }}>
                    {g.description}
                  </div>
                )}

                {/* Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '1rem' }}>🏆</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 700 }}>
                      {g.prize_count} prize{g.prize_count > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div style={{
                    padding: '4px 12px', borderRadius: '20px',
                    background: 'rgba(0,212,255,0.1)',
                    border: '1px solid rgba(0,212,255,0.2)',
                    fontSize: '0.75rem', color: 'var(--neon-blue)',
                    fontFamily: 'Orbitron', letterSpacing: '1px'
                  }}>
                    ⏱ {timeLeft(g.ends_at)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
