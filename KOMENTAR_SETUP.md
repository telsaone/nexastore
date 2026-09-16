# Setup Fitur "Komentar Pengunjung" (Supabase)

Fitur komentar di halaman **Hubungi Saya** bersifat publik — komentar dari satu
pengunjung akan terlihat oleh semua pengunjung lain. Karena situs ini murni
front-end (tanpa server sendiri), penyimpanannya pakai **Supabase**
(database Postgres gratis, plus API-nya langsung bisa dipanggil dari browser).

Total waktu setup: ±5 menit, gratis (free tier Supabase cukup untuk ini).

## 1. Buat project Supabase

1. Buka https://supabase.com → daftar/masuk → **New Project**.
2. Isi nama project bebas, buat password database (simpan, tapi tidak dipakai di kode ini), pilih region terdekat.
3. Tunggu sampai project selesai dibuat (~1-2 menit).

## 2. Buat tabel `comments`

Di dashboard project → menu **SQL Editor** → **New query** → tempel SQL ini → **Run**:

```sql
create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 60),
  message text not null check (char_length(message) between 1 and 500),
  created_at timestamptz not null default now()
);

alter table comments enable row level security;

-- Siapa saja boleh membaca semua komentar (dinding komentar publik)
create policy "Public read access"
  on comments for select
  to anon
  using (true);

-- Siapa saja boleh menambah komentar baru (form di halaman Hubungi Saya)
create policy "Public insert access"
  on comments for insert
  to anon
  with check (true);
```

> Catatan: tidak ada policy `update`/`delete` untuk publik, jadi pengunjung
> tidak bisa mengedit atau menghapus komentar orang lain. Kalau nanti perlu
> moderasi (hapus komentar spam), lakukan langsung dari **Table Editor** di
> dashboard Supabase.

## 3. Aktifkan Realtime untuk tabel ini

Dashboard → **Database** → **Replication** → cari tabel `comments` → aktifkan
togglenya. Ini yang membuat komentar pengunjung lain muncul otomatis tanpa
perlu refresh halaman.

## 4. Ambil URL & anon key

Dashboard → **Project Settings** → **API**:
- **Project URL** → salin ke `VITE_SUPABASE_URL`
- **anon public** key → salin ke `VITE_SUPABASE_ANON_KEY`

(Anon key ini memang didesain aman dipakai di kode sisi browser — akses ke
data tetap dibatasi oleh RLS policy di atas, bukan oleh kerahasiaan key ini.)

## 5. Isi file `.env`

Salin `.env.example` menjadi `.env` di root proyek, lalu isi:

```
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

Restart `npm run dev` setelah mengisi `.env` (Vite hanya membaca env saat start).

Sebelum langkah ini diisi, bagian komentar di halaman Hubungi Saya akan
menampilkan kartu "belum diaktifkan" — bukan error, jadi aman untuk deploy
lebih dulu dan disetel belakangan.

## 6. Saat deploy (Vercel/Netlify/dst.)

Tambahkan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` yang sama di menu
Environment Variables platform hosting-nya, lalu redeploy.
