# Setup Fitur "Login" & "Galeri Publik" (Supabase Auth)

Dua fitur baru ini jalan di atas Supabase yang sama dengan fitur komentar
(lihat `KOMENTAR_SETUP.md` dulu kalau belum pernah setup Supabase sama sekali).

- **Login** (halaman Tentang) — pengunjung bisa masuk lewat Google/Facebook/Apple.
- **Galeri publik** (halaman Karya) — semua orang bisa LIHAT gambarnya, tapi
  cuma **satu akun admin** (kamu sendiri) yang bisa MENAMBAHKAN gambar lewat URL.
  Kalau yang login bukan akun admin (atau belum login sama sekali), form tambah
  gambar tidak akan muncul di halaman — fiturnya memang dihilangkan, bukan cuma
  disembunyikan doang.

Total waktu setup: ±15-20 menit (paling lama di bagian daftar developer akun
Google/Facebook/Apple).

## 1. Tentukan email admin

Email inilah yang menentukan siapa yang dianggap "admin" setelah login — harus
**sama persis** dengan email dari akun Google/Facebook/Apple yang nanti kamu
pakai login sebagai pemilik situs.

Isi di `.env`:

```
VITE_ADMIN_EMAIL=emailkamu@gmail.com
```

## 2. Aktifkan provider login di Supabase

Dashboard project → menu **Authentication** → **Providers**. Aktifkan minimal
satu provider (boleh cuma Google dulu, Facebook/Apple menyusul kapan-kapan —
tombol yang provider-nya belum aktif tetap akan memunculkan pesan error kalau
diklik, jadi lebih baik nonaktifkan dulu di UI kalau belum sempat disetel).

Untuk tiap provider, kamu butuh **Client ID** dan **Client Secret** dari
konsol developer masing-masing:

- **Google** → [Google Cloud Console](https://console.cloud.google.com/) →
  APIs & Services → Credentials → buat OAuth Client ID (tipe "Web application").
- **Facebook** → [Facebook for Developers](https://developers.facebook.com/) →
  buat App → tambah produk "Facebook Login".
- **Apple** → [Apple Developer](https://developer.apple.com/) → butuh akun
  Apple Developer Program (berbayar) → buat Services ID untuk "Sign in with Apple".

Supabase menampilkan **Callback URL** khusus di tiap kartu provider (bentuknya
`https://xxxxxxxx.supabase.co/auth/v1/callback`) — salin URL itu dan tempel ke
kolom "Authorized redirect URI" (Google) / "Valid OAuth Redirect URIs"
(Facebook) / "Return URLs" (Apple) di masing-masing konsol developer di atas.
Lalu tempel Client ID & Client Secret yang kamu dapat ke kartu provider di
Supabase dan simpan.

## 3. Set Site URL & Redirect URL di Supabase

Dashboard → **Authentication** → **URL Configuration**:

- **Site URL** → isi alamat situs kamu (mis. `http://localhost:5173` saat
  development, atau domain aslinya setelah deploy).
- **Redirect URLs** → tambahkan alamat yang sama (boleh tambah keduanya,
  localhost untuk development dan domain asli untuk production).

## 4. Buat tabel `gallery_images`

Dashboard → **SQL Editor** → **New query** → tempel SQL ini → **Run**.
**Ganti `emailkamu@gmail.com` di bawah dengan email admin yang sama persis
seperti di langkah 1** (ini yang jadi pertahanan sesungguhnya di sisi server —
bukan cuma pengecekan di kode front-end):

```sql
create table if not exists gallery_images (
  id uuid primary key default gen_random_uuid(),
  url text not null check (char_length(url) between 1 and 2000),
  created_at timestamptz not null default now()
);

alter table gallery_images enable row level security;

-- Siapa saja (termasuk yang belum login) boleh melihat semua gambar di galeri
create policy "Public read access"
  on gallery_images for select
  to public
  using (true);

-- HANYA akun dengan email persis di bawah ini yang boleh menambahkan gambar
create policy "Admin insert access"
  on gallery_images for insert
  to authenticated
  with check (auth.jwt() ->> 'email' = 'emailkamu@gmail.com');

-- HANYA akun admin yang sama yang boleh menghapus gambar (dipakai tombol hapus
-- yang muncul saat hover, khusus saat login sebagai admin)
create policy "Admin delete access"
  on gallery_images for delete
  to authenticated
  using (auth.jwt() ->> 'email' = 'emailkamu@gmail.com');
```

## 5. Aktifkan Realtime untuk tabel ini

Dashboard → **Database** → **Replication** → cari tabel `gallery_images` →
aktifkan togglenya. Ini yang membuat gambar baru dari admin muncul otomatis di
layar semua pengunjung tanpa perlu refresh.

## 6. Restart dev server

Setelah `.env` diisi (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`,
`VITE_ADMIN_EMAIL`), jalankan ulang `npm run dev` (Vite hanya membaca env saat
start).

## Catatan

- Sebelum provider di-setup, tombol login di halaman Tentang tetap tampil tapi
  akan menampilkan toast error kalau diklik — belum ada cara elegan untuk tahu
  provider mana yang sudah aktif tanpa memanggil API Supabase, jadi cukup
  aktifkan providernya di langkah 2 sebelum dipromosikan ke pengunjung.
- Kalau `VITE_ADMIN_EMAIL` kosong atau tidak diisi, tidak akan ada satu pun
  akun yang dianggap admin — form tambah gambar tidak akan muncul untuk siapa
  pun, termasuk kamu sendiri, sampai variabel ini diisi dan cocok dengan email
  login kamu.
- Perlindungan yang sesungguhnya ada di RLS policy langkah 4 (`auth.jwt() ->>
  'email' = ...`), bukan di kode front-end. Jadi walaupun seseorang mengubah
  kode di browser mereka, mereka tetap tidak akan bisa insert/delete ke tabel
  ini kalau emailnya tidak cocok.
