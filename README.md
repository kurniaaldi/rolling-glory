# Rolling Glory Frontend Web Developer Test

## 📦 Project Overview

A simple web application that displays a list of products and their details using data from a public API.

This application is built using **Next.js (App Router)** and **React 19**, with full support for filtering, sorting, responsive design, and SEO meta tag integration.

---

## 🚀 Features

- ✅ Product listing & detail page
- ✅ Rating stars with 0.5 precision
- ✅ Stock status indicators (In Stock, Stock < 5, Sold Out)
- ✅ Special icons (New, Best Seller, Hot Item)
- ✅ Wishlist functionality (add/remove)
- ✅ Sort products (Newest, Rating)
- ✅ Filter products (Rating 4+, In Stock)
- ✅ SEO meta tags title, description & thumbnail for product detail pages
- ✅ Responsive design for mobile & desktop
- ✅ Server-side rendering for product detail (SEO optimized)

---

## 🧱 Tech Stack

| Tech                | Reason                                                       |
| ------------------- | ------------------------------------------------------------ |
| **Next.js (React)** | Framework pilihan utama modern web, SSR dan CSR siap pakai.  |
| **Tailwind CSS**    | Utility-first styling dengan produktivitas tinggi.           |
| **Axios**           | Untuk HTTP request yang simpel dan konsisten.                |
| **TypeScript**      | Type safety, autocompletion, dan maintainability lebih baik. |

---

## ✨ Design Adjustments & Additional Features

Beberapa penyesuaian telah dilakukan dari desain awal agar lebih sesuai dengan struktur data dari API dan meningkatkan pengalaman pengguna:

### 1. 🖼️ Image Carousel di Halaman Product Detail

- Berdasarkan struktur data `images: string[]`, setiap produk dapat memiliki lebih dari satu gambar.
- Untuk mengakomodasi ini, **carousel/slider component** ditambahkan di halaman detail produk agar user bisa melihat semua gambar produk dengan navigasi yang nyaman.
- Fallback gambar juga ditambahkan jika `images` kosong atau tidak valid.

### 2. 🔢 Pagination pada Product List

- Data `meta` dari API (`currentPage`, `totalPages`, `totalItems`, dll.) digunakan untuk membangun kontrol pagination di halaman list.
- Tombol `Prev`, `Next`, dan `Page Number` dibuat secara dinamis.
- Komponen pagination sepenuhnya reusable dan disesuaikan dengan struktur `App Router` Next.js.

---

## 📈 SEO Strategy

SEO telah dioptimalkan melalui:

- ✅ **`generateMetadata` API bawaan Next.js 13+** untuk mendukung server-side rendering meta tags.
- ✅ Tag meta seperti `og:title`, `og:description`, `og:image`, dan `og:url` ditambahkan secara dinamis di halaman detail produk.
- ✅ Mendukung tampilan **thumbnail saat link dibagikan** di WhatsApp, Facebook, Twitter, dll.
- ✅ Struktur semantic HTML digunakan (heading tags, sections).
- ✅ Responsif dan mobile-first untuk pengalaman pengguna yang optimal di semua device.

---

## ⚙️ Local Setup Instructions

### Setup

1. Clone repo
2. `npm install`
3. create file .env

# .env

NEXT_PUBLIC_BASE_URL_CLIENT=http://localhost:3000 (change url sesuai dengan hostingan)
NEXT_PUBLIC_BASE_URL_API=https://recruitment.dev.rollingglory.com/api/v2/gifts

4. `npm run dev`
