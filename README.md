# Velora AI Studio

A premium, lightweight AI video generation web application built with React, Tailwind CSS, and Firebase.

## Features

- **Text to Video** - Generate cinematic videos from text prompts
- **Image to Video** - Animate static images with AI
- **AI Animation** - Create fluid motion graphics
- **Thumbnail Generator** - Generate eye-catching thumbnails
- **Cinematic Effects** - Apply premium filters and effects

## Tech Stack

- **React 18** + TypeScript
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool
- **Firebase** - Authentication & Firestore database
- **Razorpay** - Payment integration (India)
- **Framer Motion** - Smooth animations
- **Lucide React** - Modern icons

## Quick Start

### 1. Clone & Install

```bash
git clone <your-repo>
cd velora-ai-studio
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env.local
```

Fill in your Firebase and Razorpay credentials in `.env.local`.

### 3. Setup Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable Authentication (Email/Password + Google)
4. Enable Firestore Database
5. Copy your config to `.env.local`

### 4. Setup Razorpay

1. Create a Razorpay account at [razorpay.com](https://razorpay.com)
2. Get your API keys from the dashboard
3. Add the key ID to `.env.local`

### 5. Run Development Server

```bash
npm run dev
```

### 6. Build for Production

```bash
npm run build
```

## Deployment (Vercel)

1. Push to GitHub
2. Connect to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

## Project Structure

```
velora-ai-studio/
├── public/
│   ├── velora-logo.svg
│   └── velora-icon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AIToolsSection.tsx
│   │   ├── PricingSection.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── PricingPage.tsx
│   │   └── EarningsPage.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── lib/
│   │   └── firebase.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── .env.example
```

## Mobile Optimization

- Optimized for Samsung Galaxy Tab A9 and mobile devices
- Touch-friendly UI elements
- Responsive grid layouts
- Hardware-accelerated animations
- Optimized particle system for performance

## Pricing Plans

| Plan | Price | Videos | Quality |
|------|-------|--------|---------|
| Free | ₹0 | 5 videos | 720p |
| Starter | ₹99/mo | 50 videos | 1080p |
| Pro | ₹199/mo | Unlimited | 4K |

## License

MIT License - feel free to use for personal or commercial projects.
