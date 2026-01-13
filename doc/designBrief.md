### UI Implementation Brief: MRO Financial Dashboard

**1. Objective**
Build a high-fidelity, responsive ERP dashboard based on the "Qiespend" design. The interface must support a seamless transition between Dark (default) and Light modes using a class-based toggle system.

**2. Layout & Token Rules**

- **Grid Strategy:** Use a `12-column` grid or Flexbox for the main dashboard body.
- **Sidebar:** Fixed width of `260px` on `lg` screens. On `md` and smaller, implement a slide-over mobile menu triggered by a hamburger.
- **Color Tokens:**
  - `bg-primary`: Use **#0D0D0D** (Dark) / **#F9FAFB** (Light).
  - `surface`: Use **#1E1E1E** (Dark) / **#FFFFFF** (Light).
  - `accent`: Use **#D9FF21** (Neon Lime) for primary CTAs and active states.
- **Glassmorphism:** The "Upgrade Pro" card in the sidebar should use a `backdrop-blur-md` with a semi-transparent background.

**3. Component Breakdown**

- **KPI Row:** Three identical cards at the top. Ensure font-weight is `bold` for the currency values.
- **Spending Limits Card:** Custom component featuring segmented progress bars. Each segment color corresponds to the category (use a muted gray for the background track).
- **Balance Chart:** Implement using a charting library (e.g., Chart.js or Recharts). The 'April' bar must use the `accent` color with a subtle outer glow; all other bars are `gray-700`.
- **Transaction Table:**
  - Header must remain sticky on scroll.
  - Status badges: Use low-opacity backgrounds with high-opacity text (e.g., `bg-emerald-500/10 text-emerald-500`).
  - Avatars: `32px` diameter, rounded-full.

**4. Responsive Logic**

- **Mobile (<768px):** Stack all cards vertically. Move the search bar into a collapsible header.
- **Tablet (768px - 1024px):** Show the KPI cards in a 2x2 grid (wrapping the third). Sidebar becomes an icon-only rail.
- **Desktop (>1024px):** Full 3-column layout as seen in the mockup.

**5. Tabulator Integration (DataGrid)**
Since Tabulator operates outside Vue's reactive DOM, follow these steps:

- **Initialization:** Use the `onMounted` lifecycle hook to initialize the table on a `ref` element.
- **Custom Formatters:** - Create a `statusFormatter` to render Tailwind-styled badges (e.g., `bg-emerald-500/10 text-emerald-500` for 'Received').
  - Use an `avatarFormatter` for the 'To' column to display user images alongside names.
- **Dark Mode CSS:** Override Tabulator's default CSS in your global styles. Set `.tabulator`, `.tabulator-header`, and `.tabulator-row` backgrounds to transparent or `#1E1E1E`, and borders to `#262626`.
