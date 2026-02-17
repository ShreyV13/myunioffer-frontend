# myunioffer.ai Frontend

AI-powered personal statement coaching and interview preparation for UK university applications.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required variables:
- `VITE_FIREBASE_API_KEY` - Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN` - Firebase auth domain
- `VITE_FIREBASE_PROJECT_ID` - Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID` - Firebase app ID
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key (pk_test_...)
- `VITE_API_URL` - Backend API URL

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Firebase** - Authentication & Database
- **Stripe** - Payments

## Project Structure

```
src/
├── main.jsx           # Entry point
├── App.jsx            # Root component with routing
├── index.css          # Global styles
├── firebase.js        # Firebase configuration
├── contexts/
│   └── AuthContext.jsx # Authentication state
└── pages/
    ├── Landing.jsx    # Marketing landing page
    ├── Login.jsx      # Sign in
    ├── Signup.jsx     # Registration
    ├── ForgotPassword.jsx
    ├── Chat.jsx       # Main chat interface
    ├── Settings.jsx   # User settings
    ├── Pricing.jsx    # Subscription plans
    └── Success.jsx    # Post-payment
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Netlify

1. Run `npm run build`
2. Deploy `dist/` folder
3. Add environment variables

## Backend

This frontend connects to the myunioffer.ai backend API:
- **URL**: https://uniprep-backend-dtlq.onrender.com
- **Endpoints**: /chat, /create-checkout-session, /verify-payment, etc.

## Features

- ✅ Personal Statement coaching with AI
- ✅ Interview preparation with 250+ real questions
- ✅ 5 subject specializations
- ✅ User authentication (Firebase)
- ✅ Subscription payments (Stripe)
- ✅ Daily message limits by tier
- ✅ Mobile responsive design

## License

Proprietary - myunioffer.ai
