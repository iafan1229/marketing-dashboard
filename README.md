# Dashboard Builder

A web application for easily creating dashboards with interactive charts.

## 🌐 Demo

[https://dashboard-builder-two.vercel.app/](https://dashboard-builder-two.vercel.app/)

## 📸 Screenshots

### Main Page

![Main Page](https://postfiles.pstatic.net/MjAyNTA3MjRfMjYx/MDAxNzUzMzMwNTQzNDQ1._WWqpUtaHyWbzhVMb3V2jjJ5-h2CN3LaZA5Gr-igjS4g.28twoacLIMas5wLq7nDw-LUzQ4IlcQY9OD-duNsIAwYg.PNG/1.png?type=w773)

### Dashboard List

![Dashboard List](https://postfiles.pstatic.net/MjAyNTA3MjRfMjM0/MDAxNzUzMzMwNTQzMzc2.3nM-ziO8OzwSWceogv6OWpiZKTXT2pfxAW2d68LQV1Qg.VczoouMw_IqPToMjs4Mj_MCimWXRk_kGGtvrL3CdY_sg.PNG/2.png?type=w3840)

### Dashboard Detail View

![Dashboard Detail View](https://postfiles.pstatic.net/MjAyNTA3MjRfMjM0/MDAxNzUzMzMwNTQzMzgz.zi6Sb7girqjzISYhgc-CRR5B8AI7J5VPsdbw4QRqYBog.peXpLScUbPsQ5t3bhcUcJw6lbAOET2NBVuqLWw2-oo4g.PNG/3.png?type=w3840)

## ✨ Key Features

- **Dashboard Creation**: Build custom dashboards with multiple charts
- **Chart Variety**: Support for bar charts, line charts, and number displays
- **Real-time Data**: Dynamic data visualization through Mock API
- **Google Authentication**: Simple login with NextAuth.js
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS 4.x
- **Charts**: Recharts
- **Authentication**: NextAuth.js
- **State Management**: Zustand
- **Development**: MSW (Mock Service Worker)

## 📊 How to Use

1. **Browse Dashboards**: View existing dashboards without authentication
2. **Google Login**: Sign in to create dashboards
3. **Create Dashboard**:
   - Enter dashboard title
   - Add and configure charts (title, type, data source)
   - Preview and create
4. **View Results**: Visualize charts with real-time mock data

## 📈 Chart Types

- **Bar Charts**: Compare data across categories (signups by region, etc.)
- **Line Charts**: Display time-series data (orders over time, etc.)
- **Number Charts**: Show single metrics (total revenue, etc.)

## 🎯 Project Structure

```
src/
├── app/                    # Next.js pages
├── components/
│   ├── features/          # Feature components
│   └── ui/                # Common UI components
├── lib/                   # Utilities
├── mocks/                 # Mock API handlers
└── types/                 # Type definitions
```

## 🔧 Development Tools

- **MSW**: API mocking in development environment
- **Mock Data**: Regional signups, orders over time, total revenue, etc.
- **TypeScript**: Type safety
- **ESLint**: Code quality management

## 🎨 Design

- **Brand Colors**: Mint(#7fdccb), Purple(#bb54a8)
- **Responsive**: Mobile-first design
- **UI Components**: Reusable component system
