# HEM∆ — Blood Management Network

HEM∆ is a premium, real-time blood management platform designed to streamline the lifecycle of blood products from donation to transfusion. It connects donors, hospitals, and blood banks through a unified, high-performance interface.

## 🚀 Teammate Overview

This repository currently contains the **Frontend** implementation of the HEM∆ platform. The UI is built with a focus on premium aesthetics, smooth animations (Framer Motion), and data-driven dashboards.

### 🛠 Tech Stack
- **Framework:** React 18+ (via Vite)
- **Styling:** Vanilla CSS (CSS Variables) + Framer Motion
- **Icons:** Lucide React
- **Charts:** Recharts
- **Navigation:** React Router DOM v6
- **Asset Management:** Static assets (like `kerala-map.png`) are located in `/public`.

---

## 🏗 Project Structure

```text
frontend/
├── public/                 # Static assets (maps, logos)
├── src/
│   ├── assets/             # Global styles and branding
│   ├── components/         # Reusable UI components
│   │   ├── admin/          # Admin-specific layouts
│   │   ├── donor/          # Donor portal elements
│   │   ├── hospital/       # Hospital portal elements
│   │   └── bloodbank/      # Blood bank portal elements
│   ├── pages/              # Portal pages & Landing pages
│   │   ├── admin/          # 15+ Advanced Admin screens
│   │   ├── donor/          # Donor portal screens
│   │   ├── hospital/       # Hospital portal screens
│   │   └── bloodbank/      # Blood bank portal screens
│   ├── data/               # Mock data & Analytics seeds
│   └── App.jsx             # Main router
└── ...
```

---

## 🔑 Portals & Access

| Portal | Base Route | Key Features |
|---|---|---|
| **Admin** | `/admin/*` | Global inventory, hospital/bank approvals, audit logs, reports, system settings. |
| **Blood Bank** | `/bloodbank/*` | Local stock management, donation intake, health checks, issue management. |
| **Hospital** | `/hospital/*` | Blood requests, patient tracking, order history, billing & payments. |
| **Donor** | `/donor/*` | Schedule donations, health check history, nearby blood bank discovery. |

---

## 🎨 Design System

We use a specific "Dark Premium" design language:
- **Red (Primary):** `var(--red)` (`#D90025`)
- **Background:** `var(--bg)` (`#0A0A12`)
- **Card Background:** `var(--card)` (`#0F0F17`)
- **Typography:** Satoshi (Headings) & Inter (Body)
- **Animations:** Use `motion.div` for page transitions (typically `initial={{ opacity: 0, y: 16 }}`).

---

## 📊 Mock Data System

The frontend is currently driven by a comprehensive mock data system located in `src/data/`.
- `mockData.js`: Core data for users, hospitals, and blood banks.
- `adminMockData.js`: Advanced data for admin analytics, audit logs, and system-wide tracking.

*Note: Use these to populate UI components until the backend API integration phase.*

---

## 📍 Geographical Integration

The **Kerala Network Map** (`kerala-map.png`) is used in the Admin Dashboard and Donor "Find Bank" pages. It is styled with CSS filters (`sepia`, `brightness`, `hue-rotate`) to align with the dark theme without requiring custom SVG manipulation for every update.

---

## 🚦 Getting Started

1. **Install Dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```

3. **Login Redirection:**
   The `Login.jsx` component is configured to redirect users based on their selected role. Admin portal entry is via `/admin/dashboard`.

---

## 📝 Roadmap
- [x] Phase 1-5: Portal UI Development
- [x] Phase 6: Admin Portal & System Settings
- [ ] Phase 7: Backend API Integration
- [ ] Phase 8: Real-time Notification System (WebSockets)
