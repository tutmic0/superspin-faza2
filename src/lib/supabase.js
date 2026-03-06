import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Auth
export const signInWithTwitter = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'twitter',
    options: {
    redirectTo: `https://superspin.online/auth/callback`    }
  })
  if (error) console.error(error)
}

export const signOut = async () => {
  await supabase.auth.signOut()
}

export const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Giveaways
export const createGiveaway = async ({ title, description, prize_count, duration_hours, organizer_id, organizer_name, organizer_avatar }) => {
  const ends_at = new Date(Date.now() + duration_hours * 60 * 60 * 1000).toISOString()
  const { data, error } = await supabase
    .from('giveaways')
    .insert({ title, description, prize_count, duration_hours, ends_at, organizer_id, organizer_name, organizer_avatar, status: 'active' })
    .select()
    .single()
  if (error) throw error
  return data
}

export const getGiveaway = async (id) => {
  const { data, error } = await supabase
    .from('giveaways')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export const getActiveGiveaways = async () => {
  const { data, error } = await supabase
    .from('giveaways')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export const closeGiveaway = async (id) => {
  const { error } = await supabase
    .from('giveaways')
    .update({ status: 'closed' })
    .eq('id', id)
  if (error) throw error
}

// Participants
export const joinGiveaway = async ({ giveaway_id, user_id, username, avatar_url }) => {
  const { data, error } = await supabase
    .from('participants')
    .upsert({ giveaway_id, user_id, username, avatar_url }, { onConflict: 'giveaway_id,user_id' })
    .select()
    .single()
  if (error) throw error
  return data
}

export const getParticipants = async (giveaway_id) => {
  const { data, error } = await supabase
    .from('participants')
    .select('*')
    .eq('giveaway_id', giveaway_id)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}

// Winners
export const saveWinner = async ({ giveaway_id, user_id, username, avatar_url, prize_number }) => {
  const { data, error } = await supabase
    .from('winners')
    .insert({ giveaway_id, user_id, username, avatar_url, prize_number })
    .select()
    .single()
  if (error) throw error
  return data
}

export const getWinners = async (giveaway_id) => {
  const { data, error } = await supabase
    .from('winners')
    .select('*')
    .eq('giveaway_id', giveaway_id)
    .order('prize_number', { ascending: true })
  if (error) throw error
  return data
}
