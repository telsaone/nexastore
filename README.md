# NexaStore — Marketplace Produk Digital

Website marketplace produk digital (template, source code, UI kit, preset, asset, e-book) dibangun dengan **React + Vite + TypeScript + Tailwind CSS + React Router + Lucide React**, dengan aksen animasi bergaya **React Bits** (spotlight card, split text reveal, gradient text, fade-in on scroll).

## Menjalankan proyek

```bash
npm install
npm run dev       # mode development, buka http://localhost:5173
npm run build     # build produksi (type-check + bundle ke folder dist/)
npm run preview   # preview hasil build produksi
```

> Proyek ini murni front-end dan menggunakan **localStorage** sebagai mock backend (autentikasi, keranjang, wishlist, produk, dan order). Tidak ada server/API eksternal yang diperlukan.

## Akun demo (mock authentication)

| Peran   | Email                | Password   |
|---------|-----------------------|------------|
| Admin   | admin@nexastore.id    | admin123   |
| Seller  | seller@nexastore.id   | seller123  |
| Buyer   | buyer@nexastore.id    | buyer123   |

Kamu juga bisa mendaftar akun baru sebagai Pembeli atau Penjual dari halaman **Register**.

## Struktur folder

```
src/
├── components/
│   ├── layout/      # Navbar, Footer, Layout
│   ├── product/     # ProductCard, ProductGrid, SearchBar, CategoryFilter
│   ├── reactbits/   # SpotlightCard, SplitText, GradientText, FadeInSection
│   └── ui/          # Button, Badge, Loading, EmptyState, ProtectedRoute, dst
├── context/         # AuthContext, ProductsContext, CartContext, WishlistContext, OrdersContext, ToastContext
├── data/            # products.ts (14 produk dummy), categories.ts, users.ts (seed)
├── lib/             # storage.ts (localStorage helper), format.ts (format harga/tanggal)
├── pages/           # Home, Products, ProductDetail, Cart, Checkout, Auth, UserDashboard,
│                     # Wishlist, SellerDashboard, AdminDashboard, NotFound
├── types/           # Tipe TypeScript global
├── App.tsx
└── main.tsx
```

## Fitur utama

- Pencarian & filter produk berdasarkan kategori, sort harga/rating/terbaru
- Product card dengan harga, diskon, rating, dan tombol wishlist
- Keranjang belanja & alur checkout dengan mock payment (kartu, e-wallet, transfer bank)
- Riwayat pembelian dengan tombol "unduh" (simulasi) di dashboard pengguna
- Dashboard Penjual: tambah/edit/hapus produk sendiri + statistik penjualan
- Dashboard Admin: kelola pengguna (suspend/hapus), kelola seluruh produk, lihat semua pesanan
- Protected routes berbasis role (buyer/seller/admin) menggunakan `ProtectedRoute`
- Toast notification, loading skeleton, empty state, dan error state di seluruh halaman
- Sepenuhnya responsif dan dioptimalkan untuk mobile

## Catatan

- Gambar produk menggunakan placeholder dari `picsum.photos` — ganti dengan aset asli sesuai kebutuhan produksi.
- Karena ini adalah demo front-end, refresh halaman tidak menghapus data (tersimpan di localStorage browser), tapi membersihkan cache/localStorage akan mereset semua data ke kondisi awal.
