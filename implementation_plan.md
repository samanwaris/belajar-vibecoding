# 🚛 LogiTrack — Front-End Implementation Plan
## Aplikasi Administrasi Transportasi Logistik

Dokumen ini merupakan rencana teknis dan desain untuk membangun tampilan depan (*Front-End*) aplikasi logistik. Fokus utama adalah **UI/UX & Navigasi**, mencakup dua sisi: **Web Dashboard (Admin/Dispatcher)** dan **Mobile-First App (Driver)**.

---

## Gambaran Umum

Aplikasi ini dibagi menjadi **2 antarmuka utama**:

| Interface | Target Pengguna | Platform |
|---|---|---|
| **Admin Dashboard** | Admin, Dispatcher | Web Browser (Desktop-first) |
| **Driver App** | Pengemudi | Mobile-first (bisa PWA atau React Native) |

Untuk *phase* pertama (Front-End), kita fokus pada **Admin Web Dashboard** terlebih dahulu, dengan desain responsif agar dapat diakses dari tablet.

---

## Tech Stack Front-End

| Kategori | Pilihan | Alasan |
|---|---|---|
| **Framework** | React 18 + Vite | Cepat, ekosistem besar, hot reload |
| **Styling** | Tailwind CSS v3 | Utility-first, cepat prototipe, dark mode mudah |
| **Routing** | React Router v6 | Standar de-facto React |
| **State Management** | Zustand | Ringan, mudah dipahami vs Redux |
| **Map** | React Leaflet / Mapbox GL JS | Open source & Mapbox untuk fitur premium |
| **Charts** | Recharts | React-native charts yang indah |
| **Icons** | Lucide React | Modern, konsisten |
| **UI Components** | Shadcn/ui | Headless + Tailwind, fully customizable |
| **Forms** | React Hook Form + Zod | Performant + type-safe validation |
| **Table** | TanStack Table v8 | Headless, sangat powerful untuk data grid |

---

## Arsitektur Navigasi & Routing

### Struktur URL (Route Map)

```
/                          → Redirect ke /dashboard
/login                     → Halaman Login

# === ADMIN / DISPATCHER ===
/dashboard                 → Dashboard Overview
/dashboard/map             → Live Fleet Map (fullscreen)

/orders                    → Daftar Pengiriman (Order List)
/orders/new                → Form Buat Order Baru
/orders/:id                → Detail Order
/orders/:id/track          → Tracking Status Order

/fleet                     → Manajemen Armada (Vehicle List)
/fleet/new                 → Form Tambah Kendaraan
/fleet/:id                 → Detail & History Kendaraan

/drivers                   → Manajemen Pengemudi
/drivers/new               → Form Tambah Driver
/drivers/:id               → Profil & Performa Driver

/assignments               → Dispatching & Penugasan
/assignments/new           → Form Assign Order ke Driver+Truck
/assignments/:id           → Detail Assignment

/pod                       → Proof of Delivery (e-POD) Review
/pod/:id                   → Detail & Validasi POD

/finance                   → Laporan Keuangan & Billing
/finance/invoices          → Daftar Invoice
/finance/invoices/new      → Buat Invoice Manual
/finance/invoices/:id      → Detail Invoice
/finance/costs             → Pencatatan Biaya Operasional

/reports                   → Laporan & Analytics
/reports/performance       → Performa Pengiriman
/reports/fleet             → Utilisasi Armada

/settings                  → Pengaturan Aplikasi
/settings/profile          → Profil & Akun
/settings/users            → Manajemen User
/settings/tariffs          → Pengaturan Tarif
```

---

## Struktur Layout Utama

### Layout Grid — Admin Dashboard

```
┌─────────────────────────────────────────────────────────┐
│                    TOP NAV BAR                          │
│  [Logo]   [Breadcrumb]          [Notif] [User Avatar]   │
├──────────┬──────────────────────────────────────────────┤
│          │                                              │
│  SIDE    │           MAIN CONTENT AREA                  │
│  NAV     │                                              │
│          │   ┌─────────────────────────────────────┐    │
│ [Icon]   │   │         PAGE HEADER                 │    │
│ Dashboard│   │  Page Title  [Action Buttons]        │    │
│          │   └─────────────────────────────────────┘    │
│ [Icon]   │                                              │
│ Orders   │   ┌─────────────────────────────────────┐    │
│          │   │                                     │    │
│ [Icon]   │   │         CONTENT BODY                │    │
│ Fleet    │   │   (Cards, Tables, Maps, Forms)      │    │
│          │   │                                     │    │
│ [Icon]   │   └─────────────────────────────────────┘    │
│ Drivers  │                                              │
│          │                                              │
│ [Icon]   │                                              │
│ Finance  │                                              │
│          │                                              │
│ [Icon]   │                                              │
│ Reports  │                                              │
│          │                                              │
│ [Icon]   │                                              │
│ Settings │                                              │
└──────────┴──────────────────────────────────────────────┘
```

---

## Desain Sistem (Design System)

### Color Palette — Dark Professional Theme

```
Primary:     #3B82F6  (Blue 500)    → Action buttons, links
Secondary:   #8B5CF6  (Violet 500) → Accent & highlights  
Success:     #10B981  (Emerald 500) → Delivered, Online, OK
Warning:     #F59E0B  (Amber 500)  → In-Transit, Pending
Danger:      #EF4444  (Red 500)    → Late, Error, Alert
Info:        #06B6D4  (Cyan 500)   → Info badges

Background:  #0F172A  (Slate 900)  → Main background
Surface:     #1E293B  (Slate 800)  → Cards & panels
Border:      #334155  (Slate 700)  → Dividers & borders
Text:        #F8FAFC  (Slate 50)   → Primary text
Muted:       #94A3B8  (Slate 400)  → Secondary/placeholder text
```

### Typography

```
Font Family: Inter (Google Fonts)
- Heading H1: 32px, Bold (700)
- Heading H2: 24px, SemiBold (600)
- Heading H3: 18px, SemiBold (600)
- Body:       14px, Regular (400)
- Small:      12px, Regular (400)
- Label:      11px, Medium (500), uppercase + letter-spacing
```

### Status Badge System

| Status | Warna | Ikon |
|---|---|---|
| Pending | Amber | ⏳ Clock |
| Assigned | Blue | 📋 Clipboard |
| In-Transit | Cyan | 🚛 Truck |
| Delivered | Emerald | ✅ Check Circle |
| Cancelled | Red | ❌ X Circle |
| Late / Delayed | Orange | ⚠️ Alert |

---

## Detail Per Halaman

### 1. 🏠 Dashboard Overview (`/dashboard`)

**Tujuan:** Memberikan gambaran performa hari ini dalam satu layar.

**Komponen:**

```
┌────────────────────────────────────────────────────────────┐
│ KPI Cards (Grid 4 kolom)                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│  │  Total   │ │ On-Time  │ │  Active  │ │ Revenue  │     │
│  │ Shipments│ │ Delivery │ │  Trucks  │ │  Today   │     │
│  │   142    │ │  94.3%   │ │  18/24   │ │ Rp 48M   │     │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘     │
├──────────────────────────────┬─────────────────────────────┤
│  Live Map (Mini)             │  Shipment Status Donut      │
│  [Peta dengan titik armada]  │  [Chart: Pending/Transit/   │
│                              │   Delivered breakdown]      │
├──────────────────────────────┴─────────────────────────────┤
│  Recent Orders Table (5 baris teratas)                     │
│  + Activity Feed (notifikasi terbaru di kanan)             │
└────────────────────────────────────────────────────────────┘
```

**Interaksi:**
- Klik KPI Card → navigate ke halaman terkait
- Klik titik armada di peta → popup info kendaraan
- Klik baris order → open order detail sheet/drawer

---

### 2. 🗺️ Live Fleet Map (`/dashboard/map`)

**Tujuan:** Monitoring posisi seluruh armada secara real-time.

**Fitur UI:**
- Peta fullscreen dengan sidebar panel armada di sisi kiri
- Setiap kendaraan ditampilkan dengan ikon truk berwarna sesuai status
- Klik ikon truk → Popup card berisi: nama driver, plat, order aktif, kecepatan, ETA
- Filter panel: semua armada / filter by status (idle, on trip, off duty)
- Auto-refresh setiap 30 detik (atau WebSocket jika backend mendukung)
- Tombol "Center All" untuk reset view peta

---

### 3. 📦 Order List (`/orders`)

**Tujuan:** Melihat & mengelola semua pengiriman.

**Fitur UI:**
- Table dengan kolom: Order ID, Pickup, Destination, Customer, Status, ETA, Action
- Filter bar: Status | Date Range | Driver | Vehicle
- Search: cari berdasarkan Order ID atau nama customer
- Pagination atau infinite scroll
- Tombol "Buat Order" di kanan atas (primary button)
- Bulk action: pilih banyak order → assign sekaligus

---

### 4. ➕ Form Buat Order (`/orders/new`)

**Tujuan:** Input data pengiriman baru.

**Step-by-step form (3 langkah / Wizard):**

```
Step 1: Info Pengiriman
  - Shipper name, address, phone
  - Receiver name, address, phone
  - Pickup date & time picker
  - Special instructions (textarea)

Step 2: Detail Barang
  - Nama barang
  - Jenis kargo (dropdown: General, Refrigerated, Hazmat, Heavy)
  - Berat (kg), Volume (CBM), Jumlah (pcs/pallet)
  - Upload foto barang (optional)

Step 3: Review & Submit
  - Summary semua data
  - Estimasi biaya otomatis (berdasarkan jarak & tarif)
  - Tombol "Submit Order"
```

---

### 5. 📄 Order Detail (`/orders/:id`)

**Layout:** Split-panel atau tab-based

**Tabs:**
- **Overview:** Info lengkap pengiriman, status timeline
- **Tracking:** Peta + log pergerakan GPS
- **Documents:** POD photos, e-signature, dokumen lain
- **Billing:** Rincian biaya, status invoice
- **Activity Log:** Semua perubahan status dengan timestamp

**Status Timeline Component:**
```
  [🔵 Order Created] → [🟡 Assigned] → [🟢 Picked Up] → [🚛 In Transit] → [✅ Delivered]
```

---

### 6. 🚛 Fleet Management (`/fleet`)

**Table Columns:** Plat Nomor | Tipe | Kapasitas | Status | KIR Expire | Servis Berikutnya | Action

**Status Indikator:**
- 🟢 Available — siap beroperasi
- 🔵 On Trip — sedang dalam pengiriman
- 🟡 Maintenance — dalam perawatan
- 🔴 Off Duty — tidak aktif

**Alert System:**
- Badge merah pada kendaraan yang STNK/KIR-nya akan expired dalam 30 hari
- Notifikasi jadwal servis yang mendekati batas KM

---

### 7. 👤 Driver Management (`/drivers`)

**Card View (Grid)** — lebih visual dibanding tabel:

```
┌────────────────┐
│   [Avatar]     │
│  Budi Santoso  │
│  ⭐ 4.8/5.0    │
│  SIM: ✅ Valid  │
│  Status: 🟢    │
│  Active Orders │
│       3        │
│ [View Profile] │
└────────────────┘
```

**Driver Profile Page:**
- Bio & kontak
- Dokumen: SIM (expire date + alert), KTP
- Performa: On-time rate, total km, rating dari pelanggan
- History pengiriman (table)
- Earnings summary

---

### 8. 📋 Dispatching / Assignments (`/assignments`)

**Tujuan:** Menghubungkan order + driver + kendaraan.

**Kanban Board View (Drag & Drop):**

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   UNASSIGNED│  │  ASSIGNED   │  │  ON-TRIP    │
│             │  │             │  │             │
│  [Order Card│  │  [Order Card│  │  [Order Card│
│   ORD-001]  │  │   ORD-003]  │  │   ORD-005]  │
│             │  │  Driver: X  │  │  Driver: Y  │
│  [Order Card│  │  Truck: B12]│  │  ETA: 14:30]│
│   ORD-002]  │  │             │  │             │
└─────────────┘  └─────────────┘  └─────────────┘
```

**Assign Flow:**
1. Klik order card
2. Sidebar muncul: pilih driver (filter by available), pilih kendaraan
3. Preview rute di mini-map
4. Klik Confirm → order pindah ke kolom "Assigned"

---

### 9. 📸 e-POD Review (`/pod`)

**Tujuan:** Admin memvalidasi bukti pengiriman dari pengemudi.

**List View:** Table dengan filter: Pending Review | Approved | Rejected

**Detail POD (`/pod/:id`):**
- Photo gallery (bukti pengiriman)
- E-signature display
- Geolocation: tampilkan koordinat di peta (validasi geofencing)
- Timestamp pengiriman vs jadwal
- Tombol: ✅ Approve | ❌ Reject (dengan komentar)

---

### 10. 💰 Finance & Billing (`/finance`)

**Sub-halaman:**

**Invoice List:**
- Filter: Unpaid | Paid | Overdue
- Table: Invoice #, Customer, Amount, Due Date, Status
- Bulk action: kirim email reminder

**Invoice Detail:**
- Preview invoice (bisa di-print / export PDF)
- Line items: biaya pengiriman, surcharge, diskon
- Payment history
- Tombol: Send Invoice | Mark as Paid

**Cost Management:**
- Form input biaya: Jenis biaya (BBM/Tol/Makan/Dll), Amount, Order terkait, Pengemudi
- Summary biaya per trip

---

## Komponen Shared (Reusable)

| Komponen | Deskripsi |
|---|---|
| `<StatusBadge>` | Badge berwarna sesuai status enum |
| `<KpiCard>` | Card KPI dengan nilai, icon, trend |
| `<DataTable>` | Table dengan sort, filter, pagination |
| `<MapView>` | Wrapper Leaflet/Mapbox dengan marker custom |
| `<Timeline>` | Status timeline horizontal/vertikal |
| `<DocumentViewer>` | Gallery foto + zoom |
| `<SignatureCanvas>` | Komponen tanda tangan (untuk mobile) |
| `<DateRangePicker>` | Pilih rentang tanggal |
| `<ConfirmDialog>` | Modal konfirmasi aksi penting |
| `<EmptyState>` | Tampilan jika data kosong |
| `<LoadingSkeleton>` | Skeleton loading animation |

---

## UX Patterns & Micro-interactions

1. **Skeleton Loading** — semua data-fetch pakai skeleton, bukan spinner
2. **Optimistic UI** — status berubah langsung di UI sebelum konfirmasi server
3. **Toast Notifications** — feedback singkat: "Order berhasil dibuat!", "Driver ditugaskan"
4. **Drawer/Sheet** — detail kecil muncul dari sisi kanan (bukan full navigation)
5. **Command Palette** (Ctrl+K) — pencarian global cepat seperti Linear/Notion
6. **Keyboard Shortcuts** — N untuk buat order baru, / untuk search
7. **Responsive Breakpoints**:
   - Desktop: sidebar terbuka penuh (240px)
   - Tablet: sidebar ikon saja (64px), collapsible
   - Mobile: bottom navigation bar (5 ikon)

---

## Struktur Folder Project

```
src/
├── app/                    # Route pages
│   ├── (auth)/
│   │   └── login/
│   ├── dashboard/
│   ├── orders/
│   ├── fleet/
│   ├── drivers/
│   ├── assignments/
│   ├── pod/
│   ├── finance/
│   └── reports/
├── components/
│   ├── ui/                 # Shadcn base components
│   ├── shared/             # Komponen reusable domain-specific
│   ├── layout/             # AppShell, Sidebar, Navbar
│   └── charts/             # Recharts wrappers
├── hooks/                  # Custom React hooks
├── stores/                 # Zustand state stores
├── services/               # API calls (axios/fetch)
├── lib/                    # Utilities, helpers, formatters
├── types/                  # TypeScript interfaces
└── constants/              # Enum, status maps, route paths
```

---

## Fase Pengerjaan

### Phase 1 — Foundation (Week 1-2)
- [ ] Setup project Vite + React + TypeScript + Tailwind
- [ ] Implementasi design system (colors, typography, tokens)
- [ ] Build layout shell: Sidebar, TopNav, AppShell
- [ ] Halaman Login
- [ ] Dashboard Overview (dengan mock data)

### Phase 2 — Core Modules (Week 3-5)
- [ ] Order List, Form Buat Order, Order Detail
- [ ] Fleet Management (list + detail)
- [ ] Driver Management (list + profil)
- [ ] Assignment / Dispatching Board

### Phase 3 — Advanced Features (Week 6-8)
- [ ] Integrasi Live Map (Leaflet/Mapbox)
- [ ] e-POD Review module
- [ ] Finance & Invoicing
- [ ] Reports & Charts

### Phase 4 — Polish & Mobile (Week 9-10)
- [ ] Responsive design (tablet & mobile)
- [ ] PWA setup untuk driver (mobile-first)
- [ ] Micro-animations & transisi
- [ ] Performance optimization

---

## Open Questions

> [!IMPORTANT]
> Pertanyaan-pertanyaan berikut perlu dijawab sebelum memulai eksekusi:

1. **Tech Stack Konfirmasi:** Apakah menggunakan **React + Vite + TypeScript + Tailwind**? Atau ada preferensi lain (Next.js, Vue, dll.)?
2. **Map Provider:** **Leaflet (gratis)** atau **Mapbox** (butuh API key, fitur lebih kaya)?
3. **Fase Pertama:** Apakah kita mulai dari **mock data** dulu, atau langsung connect ke backend API?
4. **Driver App:** Apakah driver app dibuat **PWA** (dalam satu project yang sama) atau aplikasi terpisah (React Native)?
5. **Bahasa:** Apakah UI label menggunakan **Bahasa Indonesia** atau **Bahasa Inggris**?
6. **Mulai Fase:** Apakah langsung mulai dari **Phase 1** (setup + dashboard), atau ada prioritas modul tertentu?

---

## Verification Plan

Setelah implementasi:
- Uji semua route dapat diakses tanpa error
- Uji tampilan di resolusi: 1920px (desktop), 1024px (tablet), 375px (mobile)
- Uji dark mode consistency di semua halaman
- Uji semua status badge & color palette tampil sesuai
- Screenshot tiap halaman untuk review visual
