# Velora AI Studio - Deployment Guide

## Complete Setup & Deployment Instructions

---

## Step 1: Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git (optional, for version control)
- A Firebase account
- A Razorpay account (for payments)
- A Vercel account (for hosting)

---

## Step 2: Project Setup

```bash
# Extract the project
cd velora-ai-studio

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

---

## Step 3: Firebase Configuration

### 3.1 Create Firebase Project
1. Go to https://console.firebase.google.com
2. Click "Add Project"
3. Name it "velora-ai-studio"
4. Disable Google Analytics (optional)
5. Click "Create Project"

### 3.2 Enable Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get Started"
3. Enable "Email/Password" provider
4. Enable "Google" provider
5. For Google, add your domain to authorized domains

### 3.3 Enable Firestore
1. Go to "Firestore Database"
2. Click "Create Database"
3. Start in "test mode" (allow reads/writes)
4. Choose a region close to your users (e.g., asia-south1 for India)

### 3.4 Get Firebase Config
1. Go to Project Settings (gear icon)
2. Under "General", scroll to "Your apps"
3. Click the web app icon (</>)
4. Register app name: "velora-web"
5. Copy the config object

### 3.5 Add to .env.local
```
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## Step 4: Razorpay Configuration

### 4.1 Create Razorpay Account
1. Go to https://dashboard.razorpay.com
2. Sign up and complete KYC
3. Switch to "Test Mode" for development

### 4.2 Get API Keys
1. Go to Settings → API Keys
2. Generate new keys
3. Copy the "Key ID"

### 4.3 Add to .env.local
```
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id
```

### 4.4 Backend Integration (Required for Production)
The frontend code includes Razorpay checkout integration. For production, you need:

1. A backend server (Node.js/Express recommended)
2. Create an order endpoint:

```javascript
// Backend example (Node.js + Express)
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

app.post('/create-order', async (req, res) => {
  const { amount, currency = 'INR' } = req.body;

  const options = {
    amount: amount * 100, // paise
    currency,
    receipt: `receipt_${Date.now()}`
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

---

## Step 5: Run Locally

```bash
# Development server
npm run dev

# Open http://localhost:5173
```

---

## Step 6: Build for Production

```bash
# Create optimized build
npm run build

# Preview production build locally
npm run preview
```

---

## Step 7: Deploy to Vercel

### 7.1 Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/velora-ai-studio.git
git push -u origin main
```

### 7.2 Deploy on Vercel
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add Environment Variables (same as .env.local)
7. Click "Deploy"

### 7.3 Add Custom Domain (Optional)
1. In Vercel dashboard, go to Project Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions

---

## Step 8: Firebase Security Rules (Production)

After testing, update Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /users/{userId}/videos/{videoId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## Step 9: AI Video API Integration

The current implementation uses mock generation. To connect a real AI video API:

### Option A: Runway ML API
```typescript
// In DashboardPage.tsx, replace handleGenerate
const response = await fetch('https://api.runwayml.com/v1/generations', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${RUNWAY_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt,
    duration: parseInt(selectedDuration),
    ratio: '16:9'
  })
});
```

### Option B: Pika Labs API
### Option C: Stable Video Diffusion

Add the API integration in the `handleGenerate` function in `DashboardPage.tsx`.

---

## Step 10: Performance Optimization

### For Samsung Galaxy Tab A9 & Mobile:
1. The code already includes:
   - Reduced particle count on mobile
   - Hardware-accelerated CSS animations
   - Optimized images with lazy loading
   - Touch-friendly tap targets (min 44px)

### Additional Optimizations:
```bash
# Install additional packages for production
npm install -D @vitejs/plugin-legacy
```

Update `vite.config.ts`:
```typescript
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    })
  ],
})
```

---

## File Structure Summary

```
velora-ai-studio/
├── public/                  # Static assets
│   ├── velora-icon.svg      # Favicon
│   └── velora-logo.svg      # Logo
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.tsx       # Navigation bar
│   │   ├── HeroSection.tsx  # Landing hero
│   │   ├── AIToolsSection.tsx # AI tools grid
│   │   ├── PricingSection.tsx # Pricing cards
│   │   └── Footer.tsx       # Site footer
│   ├── pages/               # Route pages
│   │   ├── HomePage.tsx     # Landing page
│   │   ├── LoginPage.tsx    # Auth page
│   │   ├── DashboardPage.tsx # Main dashboard
│   │   ├── PricingPage.tsx  # Pricing + FAQ
│   │   └── EarningsPage.tsx # Monetization
│   ├── context/
│   │   └── AuthContext.tsx  # Firebase auth state
│   ├── lib/
│   │   └── firebase.ts      # Firebase config & helpers
│   ├── App.tsx              # Router setup
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles + Tailwind
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind theme
├── tsconfig.json            # TypeScript config
└── .env.example             # Environment template
```

---

## Troubleshooting

### Common Issues:

1. **Firebase Auth not working**
   - Check .env.local values
   - Ensure authorized domains include localhost and your domain
   - Check browser console for errors

2. **Razorpay not loading**
   - Verify Key ID is correct
   - Check if Razorpay script is loaded (add to index.html if needed)
   - Ensure backend order creation is working

3. **Build fails**
   - Run `npm install` again
   - Check TypeScript errors with `npx tsc --noEmit`
   - Ensure all imports are correct

4. **Mobile layout issues**
   - Test on actual device or Chrome DevTools mobile view
   - Check viewport meta tag in index.html
   - Verify Tailwind responsive classes

---

## Next Steps

1. ✅ Set up Firebase project
2. ✅ Configure environment variables
3. ✅ Test locally
4. ✅ Connect AI video API
5. ✅ Set up Razorpay backend
6. ✅ Deploy to Vercel
7. ✅ Add custom domain
8. ✅ Configure Firebase security rules
9. ✅ Set up monitoring (Sentry, etc.)
10. ✅ Launch!

---

## Support

For issues or questions:
- Firebase Docs: https://firebase.google.com/docs
- Razorpay Docs: https://razorpay.com/docs
- Vite Docs: https://vitejs.dev/guide
- Tailwind Docs: https://tailwindcss.com/docs

---

**Built with ❤️ by Velora AI Studio**
