# Cara Pakai Data Hub API dengan NPM dan Username

---

## ✅ Perubahan yang Telah Dilakukan

1. ✅ **Email** → **Username** (tidak perlu @domain lagi)
2. ✅ Username default: **JabesNelma**
3. ✅ Semua perintah bisa dijalankan dengan **npm**
4. ✅ Database sudah di-update

---

## 🚀 Cara Pakai (Langkah demi Langkah)

### 1. Install Dependencies (jika belum)
```bash
npm install
```

### 2. Setup Database
```bash
npm run db:push
```

### 3. Buat User Admin (Username: JabesNelma)
```bash
curl -X POST http://localhost:3000/api/admin/seed \
  -H "Content-Type: application/json" \
  -d '{
    "username": "JabesNelma",
    "password": "password123",
    "seedKey": "admin-setup-key"
  }'
```

**Catatan:** Jika Anda tidak menulis username, sistem akan otomatis pakai **"JabesNelma"** sebagai username.

**Respons:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clxxxxxxx",
      "username": "JabesNelma",
      "role": "admin"
    },
    "categories": [...],
    "types": [...]
  },
  "message": "Admin user and default data seeded successfully"
}
```

### 4. Login dengan Username dan Password
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "JabesNelma",
    "password": "password123"
  }'
```

**Respons:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clxxxxxxx",
      "username": "JabesNelma",
      "role": "admin"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  },
  "message": "Login successful"
}
```

Simpan `accessToken` untuk digunakan di API lain!

---

## 📝 Contoh Penggunaan API

### 5. Buat Data Entry Baru
```bash
curl -X POST http://localhost:3000/api/data \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "categoryId": "category-id",
    "typeId": "type-id",
    "title": "Data Saya",
    "content": {
      "nama": "Contoh Data",
      "nilai": 100
    },
    "source": "laptop-saya"
  }'
```

### 6. Lihat Semua Data (Public - tidak perlu login)
```bash
curl http://localhost:3000/api/data
```

### 7. Lihat Categories (Public - tidak perlu login)
```bash
curl http://localhost:3000/api/categories
```

### 8. Lihat Data Types (Public - tidak perlu login)
```bash
curl http://localhost:3000/api/types
```

---

## 📋 Perintah NPM yang Tersedia

```bash
# Jalankan server development
npm run dev

# Build untuk production
npm run build

# Jalankan server production
npm run start

# Cek kualitas kode
npm run lint

# Push schema ke database
npm run db:push

# Generate Prisma Client
npm run db:generate

# Reset database
npm run db:reset
```

---

## 🎯 Ringkasan Autentikasi

| Field | Sebelum | Sesudah |
|-------|---------|---------|
| **Login** | Email (@domain) | Username saja |
| **Default** | admin@example.com | JabesNelma |
| **Format** | email + password | username + password |

---

## 🔐 Keamanan

**Ubah password dan seedKey di file `.env` sebelum production!**

File `.env`:
```env
DATABASE_URL="file:./db/custom.db"
JWT_SECRET="ubah-sesuai-keinginan-anda-min-32-karakter"
JWT_REFRESH_SECRET="ubah-juga-sesuai-keinginan-anda-min-32-karakter"
SEED_KEY="ubah-seed-key-anda"
NODE_ENV="development"
```

---

## 📌 Catatan Penting

1. **Username tidak perlu @domain** - cukup "JabesNelma"
2. **Password buat kuat** - minimal 8 karakter, campur huruf/angka/simbol
3. **seedKey harus sesuai** - default di `.env` adalah `"admin-setup-key"`
4. **Semua npm perintah** - tidak perlu bun lagi
5. **Public read access** - data bisa dibaca tanpa login
6. **Admin only write** - hanya admin bisa create/update/delete data

---

## 🆘 Troubleshooting

### Error: "User already exists"
**Solusi:** Username sudah ada, pakai username lain atau reset database:
```bash
npm run db:reset
```

### Error: "Invalid seed key"
**Solusi:** Cek file `.env`, pastikan `seedKey` sesuai dengan yang Anda kirim

### Server tidak berjalan
**Solusi:**
```bash
# Stop jika sudah jalan
Ctrl + C

# Jalankan lagi
npm run dev
```

### Database error
**Solusi:**
```bash
# Push ulang schema
npm run db:push

# Atau reset database
npm run db:reset
```

---

## 📖 Lebih Lanjut

Untuk dokumentasi lengkap, buka:
- **README.md** - Dokumentasi lengkap
- **API.md** - Spesifikasi API
- **QUICKSTART.md** - Panduan quick start
- Buka di browser: http://localhost:3000

---

**Selamat menggunakan Data Hub API! 🎉**
