# CHEQQME One

A modern, mobile-first frontend portal for browsing, searching, and managing data from the CHEQQME Laravel + Filament backend.

## ✨ Features

- **Next.js 14** with App Router and TypeScript
- **shadcn/ui** components with Radix and TailwindCSS
- **Dark/Light/System** theme support with persistence
- **PWA Support** - Install as native app on mobile
- **Mobile-First Design** - Fully responsive and optimized for mobile
- **Laravel Sanctum** authentication integration
- **API Integration** with reusable utilities
- **Error Handling** and loading states

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Running Laravel backend at `data.cheqqme.com`

### Installation

1. **Clone and install dependencies:**

   ```bash
   git clone <repository-url>
   cd cheqqme-one
   npm install
   ```

2. **Configure environment:**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local`:

   ```env
   NEXT_PUBLIC_API_URL=https://data.cheqqme.com/api
   NEXT_PUBLIC_APP_NAME=CHEQQME One
   NEXT_PUBLIC_APP_URL=https://one.cheqqme.com
   ```

3. **Run development server:**

   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## 📱 PWA Installation

### Mobile (iOS/Android)

1. Open the app in your mobile browser
2. Tap the "Add to Home Screen" option
3. The app will install as a native app

### Desktop

1. Open the app in Chrome/Edge
2. Look for the install icon in the address bar
3. Click to install as a desktop app

## 🔧 Development

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard page
│   ├── projects/          # Projects management
│   ├── clients/           # Clients management
│   ├── documents/         # Documents management
│   ├── settings/          # User settings
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── app-header.tsx    # Main navigation
│   ├── theme-provider.tsx # Theme management
│   └── protected-route.tsx # Auth protection
├── hooks/                 # Custom React hooks
│   └── use-auth.tsx      # Authentication hook
├── lib/                   # Utility libraries
│   ├── api.ts            # API client with auth
│   └── utils.ts          # General utilities
└── types/                 # TypeScript type definitions
    └── index.ts          # API and data types
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

### Adding New Components

Use the shadcn/ui CLI to add components:

```bash
npx shadcn@latest add [component-name]
```

## 🔗 Backend Integration

### API Endpoints

The app expects these Laravel API endpoints:

```bash
# Authentication
POST /api/auth/login          # Login user
POST /api/auth/register       # Register user
POST /api/auth/logout         # Logout user
GET  /api/user               # Get current user

# Dashboard
GET  /api/dashboard/stats     # Dashboard statistics

# Resources
GET  /api/projects           # List projects
GET  /api/clients            # List clients
GET  /api/documents          # List documents
```

### Authentication Flow

1. **Login:** User credentials → Laravel Sanctum token
2. **Storage:** Token stored in cookies + localStorage
3. **API Calls:** Token automatically attached to requests
4. **Logout:** Token cleared from storage and backend

### API Client Usage

```typescript
import { fetchWithAuth } from "@/lib/api";

// GET request
const response = await fetchWithAuth.get<ProjectType[]>("/projects");

// POST request
const newProject = await fetchWithAuth.post("/projects", projectData);

// Set/clear tokens
fetchWithAuth.setToken(token);
fetchWithAuth.clearToken();
```

## 🎨 Theming

The app supports dark/light/system themes using `next-themes`:

```typescript
import { useTheme } from "next-themes";

const { theme, setTheme } = useTheme();
setTheme("dark" | "light" | "system");
```

Theme persistence is automatic across sessions.

## 📦 Deployment

### Vercel (Recommended)

1. **Connect repository to Vercel**
2. **Set environment variables:**
   ```env
   NEXT_PUBLIC_API_URL=https://data.cheqqme.com/api
   NEXT_PUBLIC_APP_NAME=CHEQQME One
   NEXT_PUBLIC_APP_URL=https://one.cheqqme.com
   ```
3. **Deploy** - Automatic deployments on push

### Custom Domain Setup

1. **Add domain to Vercel:** `one.cheqqme.com`
2. **Configure DNS:** Point domain to Vercel
3. **SSL:** Automatic via Vercel

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 🔒 Security

- **HTTPS Only:** All API calls use HTTPS
- **Token Security:** Sanctum tokens with httpOnly cookies
- **CORS:** Configured for `one.cheqqme.com` domain
- **Environment Variables:** Sensitive data in environment

## 🐛 Troubleshooting

### Common Issues

**API Connection Issues:**

- Verify `NEXT_PUBLIC_API_URL` is correct
- Check CORS settings on Laravel backend
- Ensure backend is accessible from frontend domain

**Authentication Issues:**

- Clear browser cookies and localStorage
- Verify Sanctum configuration on backend
- Check network tab for 401 errors

**Build Issues:**

- Clear `.next` folder and rebuild
- Check all environment variables are set
- Verify all dependencies are installed

### Development Tips

- Use browser dev tools for network debugging
- Check console for error messages
- Use React DevTools for component debugging
- Monitor API responses in Network tab

## 📝 License

[Your License Here]

## 🤝 Contributing

[Contributing Guidelines Here]

---

Built with ❤️ using Next.js, shadcn/ui, and TailwindCSS
