# SuperSpin — Faza 2 Setup

## 1. Instaliraj dependencies
```bash
npm install
```

## 2. Postavi environment varijable
Otvori `.env` fajl i zamijeni:
- `VITE_SUPABASE_URL` → tvoj Supabase Project URL
- `VITE_SUPABASE_ANON_KEY` → tvoj Supabase anon key

## 3. Pokreni lokalno
```bash
npm run dev
```

## 4. Build za produkciju
```bash
npm run build
```
Ovo kreira `dist/` folder.

## 5. Deploy na Cloudflare Pages
- Zipuj `dist/` folder
- Cloudflare → Workers & Pages → Create deployment → Upload zip
- Ili: poveži GitHub repo za auto-deploy

## Cloudflare Pages Environment Variables
U Cloudflare → Workers & Pages → superspin → Settings → Environment Variables dodaj:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Supabase Auth Settings
U Supabase → Authentication → URL Configuration dodaj:
- Site URL: `https://superspin.online`
- Redirect URLs: `https://superspin.online/auth/callback`
