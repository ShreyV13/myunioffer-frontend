# MYUNIOFFER.AI — COMPLETE HANDOFF DOCUMENT
## Updated: Monday March 30, 2026 — 7:30pm
## Launch Date: Tuesday March 31, 2026

---

# TABLE OF CONTENTS

1. How to Start a New Chat
2. How the AI Assistant Should Work With You
3. Project Overview
4. Full File Structure and Locations
5. Backend — Complete Technical Reference
6. Frontend — Complete Technical Reference
7. Pricing — Full Breakdown
8. Token Economics — Complete Cost Model
9. Stripe Configuration
10. Waitlist System
11. Infrastructure (Render, Vercel, Firebase)
12. Launch Checklist
13. All Design Decisions Made
14. Testimonials (Exact Quotes — Do Not Edit)
15. Demo Conversations (Landing Page)
16. Content & Marketing Plan
17. Email Templates
18. Pending Items
19. Known Issues
20. Emergency Procedures

---

# 1. HOW TO START A NEW CHAT

Paste this at the start of every new conversation:

"I'm building myunioffer.ai, an AI-powered UK university application coaching platform. We launch tomorrow March 31 2026. Read the handoff document at ~/Desktop/business/uniprepai/myunioffer/frontend/HANDOFF.md and the transcript journal at /mnt/transcripts/journal.txt for full context. The transcripts from previous sessions are at /mnt/transcripts/2026-03-29-12-45-38-myunioffer-launch-sprint-mar2026.txt and /mnt/transcripts/2026-03-30-16-31-03-myunioffer-launch-sprint-full.txt"

If you're asking about a specific page or feature, add what you want to do. For example: "I want to tweak the landing page animations" or "There's a bug with the Stripe checkout."

---

# 2. HOW THE AI ASSISTANT SHOULD WORK WITH YOU

## Communication Style
- Run terminal commands directly. Don't explain what you're going to do, just do it.
- Use python3 scripts for multi-step file edits (replacing blocks of code, multiple changes at once).
- Use sed for single-line changes.
- When showing a preview, add temp routes to App.jsx, test, then git checkout App.jsx to revert.
- Push format: `git checkout src/App.jsx && git add . && git commit -m "message" && git push`
- Always copy .jsx changes to BOTH the main file AND the -release.jsx backup.

## File Editing Rules
- For saved-release pages: always update both Landing.jsx AND Landing-release.jsx (same for About and Pricing).
- Never use em dashes in .jsx files. Use commas or rephrase.
- The word "Recruiting" should never appear anywhere.
- "5 specialist agents" should always be "Subject-specific coaching."
- "Top UK university" should be "UK university."
- "Beta tester" should be "Early user."
- Always use `../../contexts/AuthContext` as the import path in saved-release pages (two levels up).

## Preview Workflow
To preview saved-release pages locally:
```bash
cd ~/Desktop/business/uniprepai/myunioffer/frontend/src && python3 -c "
import subprocess
subprocess.run(['git', 'checkout', 'App.jsx'], cwd='.')
content = open('App.jsx', 'r').read()
content = content.replace(
    \"import WaitlistLanding from './pages/WaitlistLanding';\",
    \"import WaitlistLanding from './pages/WaitlistLanding';\\nimport NewLanding from './pages/saved-release/Landing';\\nimport AboutPage from './pages/saved-release/About';\\nimport PricingPage from './pages/saved-release/Pricing';\"
)
content = content.replace(
    '<Route path=\"/privacy\" element={<Privacy />} />',
    '<Route path=\"/new\" element={<NewLanding />} />\\n      <Route path=\"/about-new\" element={<AboutPage />} />\\n      <Route path=\"/pricing-new\" element={<PricingPage />} />\\n      <Route path=\"/privacy\" element={<Privacy />} />'
)
open('App.jsx', 'w').write(content)
print('Routes added')
"
cd ~/Desktop/business/uniprepai/myunioffer/frontend && npx vite
```
Then visit localhost:5173/new, /about-new, /pricing-new.

When done previewing, revert:
```bash
cd ~/Desktop/business/uniprepai/myunioffer/frontend && git checkout src/App.jsx
```

---

# 3. PROJECT OVERVIEW

myunioffer.ai is an AI-powered UK university application coaching platform. It coaches students through personal statements and mock interviews using Claude Haiku 4.5, tailored to their specific subject.

- **Founder:** Shrey Verma (LSE, PPE)
- **Team:** Pavan Kovuri (Warwick, Economics), Suhas Parsaboina (KCL, Medicine), Adyan Shahid (Cambridge, CS), Girish Radhakrishnan (Imperial, Chemical Engineering)
- **Waitlist:** ~120+ signups
- **Instagram:** ~25 followers
- **Launch date:** Tuesday March 31, 2026

---

# 4. FULL FILE STRUCTURE AND LOCATIONS

## Repositories
- **Frontend:** ~/Desktop/business/uniprepai/myunioffer/frontend/
  - GitHub: github.com/ShreyV13/myunioffer-frontend
  - Hosted: Vercel (auto-deploys on push to main)
- **Backend:** ~/Desktop/business/uniprepai/myunioffer/backend/
  - GitHub: github.com/ShreyV13/uniprep-backend
  - Hosted: Render (auto-deploys on push to main)
- **Waitlist manager:** ~/Desktop/business/uniprepai/myunioffer/waitlist_manager.py

## Frontend Key Files
| File | Purpose |
|------|---------|
| src/App.jsx | Router — all page routes defined here |
| src/contexts/AuthContext.jsx | Firebase auth context |
| src/pages/WaitlistLanding.jsx | Current live landing page (pre-launch) |
| src/pages/saved-release/Landing.jsx | NEW launch landing page |
| src/pages/saved-release/Landing-release.jsx | Backup of launch landing page |
| src/pages/saved-release/About.jsx | NEW about/team page |
| src/pages/saved-release/About-release.jsx | Backup of about page |
| src/pages/saved-release/About-backup-team.jsx | Backup of accordion team design |
| src/pages/saved-release/Pricing.jsx | NEW pricing page |
| src/pages/saved-release/Pricing-release.jsx | Backup of pricing page |
| src/pages/saved-release/swap-to-live.py | Script to swap pages for launch |
| src/pages/saved-release/SWAP-INSTRUCTIONS.md | Launch day instructions |
| public/team-shrey.jpg | Shrey's photo |
| public/team-pavan.jpg | Pavan's photo |
| public/team-suhas.jpg | Suhas's photo |
| public/team-girish.jpg | Girish's photo |
| public/ (no team-adyan.jpg) | Adyan's photo is MISSING |

## Backend Key Files
| File | Purpose |
|------|---------|
| main.py | The entire backend — FastAPI server, Claude API calls, Stripe, Firebase, all endpoints |
| requirements.txt | Python dependencies |
| .env (ON RENDER ONLY) | Environment variables — Stripe key, Claude key, Firebase credentials |

---

# 5. BACKEND — COMPLETE TECHNICAL REFERENCE

## Tech Stack
- Python 3.11, FastAPI, Uvicorn
- Claude Haiku 4.5 (model: claude-haiku-4-5-20251001) via Anthropic API
- Firebase Firestore for user data and chat history
- Stripe for payments

## All Endpoints
| Endpoint | Method | Purpose |
|----------|--------|---------|
| /chat | POST | Non-streaming chat (used by older clients) |
| /chat-stream | POST | Streaming chat (primary endpoint) |
| /create-checkout-session | POST | Creates Stripe checkout session |
| /webhook | POST | Stripe webhook for payment events |
| /create-portal-session | POST | Stripe customer portal for subscription management |
| /health | GET | Health check |

## System Prompt
Embedded in main.py. Tells Claude it is a specialist coaching AI for UK university applications. Key rules in the system prompt:
- Response length: ~400 words maximum
- Always finish cleanly
- Offer to continue if more to say
- Subject-specific coaching based on what the student tells it
- Never write the PS for the student, always coach

## AI Context Window
- AI only sees the **last 6 messages** of conversation history
- This prevents runaway token costs on long chats
- Message 25 costs the same as message 7

## Firebase Chat Persistence
- Both /chat and /chat-stream load conversation history from Firebase when in-memory cache is empty (after server restart)
- Checks users/{uid}/savedChats for matching sessionId
- Means users don't lose chat history when Render restarts

## Auto-Continue on Truncation
- If Claude hits max_tokens (stop_reason == "max_tokens"), backend makes a follow-up API call asking Claude to wrap up in 2-3 sentences
- Works in both streaming and non-streaming
- Fallback appends "...I have more thoughts on this. Want me to continue?"

## Cost-Weighted Token Tracking
This is the CRITICAL system that controls costs.

**Formula:** `budget_usage += input_tokens + (output_tokens * 5)`

This uses exact API token counts from `response.usage.input_tokens` and `response.usage.output_tokens`. No estimation anywhere.

**Why multiply output by 5:** Anthropic charges $1/million input tokens and $5/million output tokens. Multiplying output by 5 normalises both to the same unit: 1 budget unit = $0.000001 cost.

**Daily budgets (cost-weighted):**
| Plan | Budget | Max daily cost | Max monthly cost |
|------|--------|---------------|-----------------|
| Free | 50,000 | $0.05 | $1.50 |
| PS / Interview | 275,000 | $0.275 | $8.25 |
| Premium | 400,000 | $0.40 | $12.00 |

**Message limits (secondary cap, token budget is the real limiter):**
| Plan | PS messages | Interview messages |
|------|------------|-------------------|
| Free | 2 | 2 |
| PS Coach | 100 | 2 |
| Interview Prep | 2 | 100 |
| Premium | 999 | 999 |

**Display:** Paid users do NOT see message counts. `isUnlimited` checks `userProfile?.plan === 'premium'`. All paid plans hide the counter.

---

# 6. FRONTEND — COMPLETE TECHNICAL REFERENCE

## Tech Stack
- React + Vite + Tailwind CSS
- Framer Motion for animations
- React Router for navigation
- Firebase Auth for user authentication

## Design System
- **Font:** font-display (custom display font) for headings, system font for body
- **Primary colour:** Coral gradient (#f9a08c to #e74d32), class: gradient-primary
- **Gradient text:** class: gradient-text
- **Cards:** class: card
- **Buttons:** class: btn-primary
- **Animation easing:** [0.16, 1, 0.3, 1] (deceleration curve — elements slow down as they arrive)
- **Viewport triggers:** Always use `viewport={{ once: true, margin: "-80px" }}` so animations start before elements are fully in view

## Landing Page Sections (in order)
1. **Top bar** — dark banner with "120+ students already signed up"
2. **Nav** — How It Works, Why Us, Testimonials (anchor), Pricing, About Us, Log In, Get Started
3. **Hero** — Parallax floating blobs, staggered "Get into your / dream university." title, shimmer effect on gradient text, animated coral underline, stats bar with counting numbers
4. **Problem section** — "The application process is broken." Three columns with animated top bars, gradient text highlights on key phrases, hover reveals showing "what we do instead"
5. **Subject marquee** — Continuous horizontal scroll of 26 subjects
6. **Demo section** — "See it in action." 6-tab chat carousel (Medicine PS, Economics Interview, CS PS, Architecture PS, Music PS, PPE Interview). Dark terminal design with traffic lights. Messages appear one by one with typing indicator. Before/after PS snippet below.
7. **How It Works** — Left-line vertical timeline with animated circles and cards sliding in. Coral gradient line draws down. Dot pattern background.
8. **Why Us** — Mixed layout: wide card with coral left accent + two-column cards with coral top bars + animated stats bar with counting numbers
9. **Pricing teaser** — "Start free. Upgrade when you're ready." with link to pricing page
10. **Testimonials** — Horizontal auto-scrolling marquee of exact unedited quotes
11. **FAQ** — Alternating slide-in cards, click to expand
12. **CTA** — "Your application is too important to wing it." Floating frosted shapes behind coral gradient
13. **Footer** — Simple links

## About Page Sections
1. **Hero** — Parallax blobs, staggered "We got in. Now we're helping you get in." with gradient text, animated underline
2. **Stats bar** — Counting numbers: 5 unis, 5 subjects, 1000+ resources, 120+ students
3. **Our Story** — Interactive tabs: "Where we started", "What we realised", "What we did about it". Each tab has a stat highlight card. AnimatePresence transitions between tabs.
4. **University badge bar** — LSE, Warwick, KCL, Cambridge, Imperial badges with hover effects
5. **Team section** — Expandable accordion cards. Photo, name, uni badge, role, course visible. Click to expand: bio, contribution, subject tags. No orange top lines.
6. **Support** — Minimal email link
7. **CTA** — Coral gradient with floating shapes

### Team Photo Cropping
Each team member has `photoScale` and `photoPos` properties:
| Member | photoScale | photoPos |
|--------|-----------|---------|
| Shrey | 1.25 | "25% 25%" |
| Pavan | (none) | "0 0%" |
| Suhas | 5.3 | "52% 52%" |
| Girish | 2 | "center 10%" |
| Adyan | (no photo) | N/A |

### Team Order
Shrey, Pavan, Suhas, Girish, Adyan (Adyan last as he contributes least)

## Pricing Page Sections
1. **Hero** — Floating blobs, gradient text "to chance.", animated divider, stats bar with counters
2. **Plan cards** — 4 cards in a grid (Free, PS, Interview, Premium). Hover lift. Premium has coral border and "Best Value" badge.
3. **1-on-1 Sessions** — £29.99, 60 min, Google Form booking link
4. **Value anchoring** — £200+/month crossed out, animated scale-in, then £8.99/month gradient text
5. **Comparison table** — myunioffer.ai vs Private tutors vs Premium agencies
6. **Guarantees** — Cancel anytime, Stripe secure, Launch pricing
7. **Free tier reminder** — "Not ready to commit?"

## Pricing Page — Stripe Checkout Flow
The pricing page has a working `handleSubscribe` function:
1. User clicks Subscribe
2. Frontend POSTs to /create-checkout-session with user_id, user_email, plan_id
3. Backend checks Firestore waitlist for email match
4. If waitlist: applies WAITLIST_EARLY_ACCESS coupon automatically
5. If not waitlist: enables manual promo code entry
6. Returns Stripe checkout URL
7. Frontend redirects to Stripe

---

# 7. PRICING — FULL BREAKDOWN

| Plan | Sticker Price | With Sales Coupon (£1 off) | Waitlist 1st Month (£3 off) |
|------|--------------|---------------------------|----------------------------|
| Free | £0 | N/A | N/A |
| PS Coach | £8.99/mo | £7.99/mo | £5.99 first month |
| Interview Prep | £8.99/mo | £7.99/mo | £5.99 first month |
| Premium | £12.99/mo | £11.99/mo | £9.99 first month |
| 1-on-1 Session | £29.99 one-time | N/A | N/A |

---

# 8. TOKEN ECONOMICS — COMPLETE COST MODEL

## Claude Haiku 4.5 Pricing
- Input: $1.00 per million tokens
- Output: $5.00 per million tokens

## Cost Per Message (typical)
- System prompt: ~3,000 input tokens (sent every message)
- History (6 messages): 300–4,800 input tokens depending on message lengths
- User message: 50–1,000 input tokens
- AI response: 50–600 output tokens (800 with auto-continue)

## Margin Analysis (all profitable at worst case)

### PS/Interview — Budget 275,000 — Price £8.99 (£7.99 with coupon)
| Scenario | Messages/day | Monthly cost | Margin (no coupon) | Margin (coupon) |
|----------|-------------|-------------|-------------------|-----------------|
| Long input, max output | 20 | $8.22 | +$3.20 | +$1.93 |
| Long input, short output | 37 | $8.24 | +$3.18 | +$1.91 |
| Short input, long output | 34 | $8.16 | +$3.26 | +$1.99 |
| Short input, short output | 76 | $8.21 | +$3.21 | +$1.94 |
| Waitlist 1st month (£5.99) | worst | $8.22 | — | -$0.61 |

### Premium — Budget 400,000 — Price £12.99 (£11.99 with coupon)
| Scenario | Messages/day | Monthly cost | Margin (no coupon) | Margin (coupon) |
|----------|-------------|-------------|-------------------|-----------------|
| Long input, long output | 33 | $11.68 | +$4.82 | +$3.55 |
| Long input, short output | 54 | $12.00 | +$4.50 | +$3.23 |
| Short input, long output | 50 | $12.00 | +$4.50 | +$3.23 |
| Short input, short output | 111 | $11.99 | +$4.51 | +$3.24 |
| Waitlist 1st month (£9.99) | worst | $12.00 | — | +$0.69 |

---

# 9. STRIPE CONFIGURATION

## Price IDs
Same price IDs as before launch, amounts were updated in Stripe dashboard. The IDs are stored in Render environment variables as STRIPE_PRICE_PS, STRIPE_PRICE_INTERVIEW, STRIPE_PRICE_PREMIUM.

## Coupons
| Coupon ID | Amount | Duration | Applies To | Customer-Facing Code | Expires |
|-----------|--------|----------|-----------|---------------------|---------|
| WAITLIST_EARLY_ACCESS | £3 off | First month only | Auto-applied if email in waitlist | No | July 31, 2026 |
| SHREY | £1 off | Forever | Manual promo code | Yes | Never |
| PAVAN | £1 off | Forever | Manual promo code | Yes | Never |
| GIRISH | £1 off | Forever | Manual promo code | Yes | Never |
| SUHAS | £1 off | Forever | Manual promo code | Yes | Never |

## How Waitlist Discount Works
1. User goes to checkout
2. Backend queries Firestore `waitlist` collection for their email
3. If found: adds `discounts: [{"coupon": "WAITLIST_EARLY_ACCESS"}]` to the Stripe session
4. If not found: adds `allow_promotion_codes: true` so they can manually enter SHREY/PAVAN/etc
5. These are MUTUALLY EXCLUSIVE branches — a user either gets the waitlist discount OR can enter a promo code, never both

---

# 10. WAITLIST SYSTEM

- Waitlist signups stored in Firestore `waitlist` collection
- Each document has an `email` field
- Export command: `cd ~/Desktop/business/uniprepai/myunioffer && python3 waitlist_manager.py export`
- Count command: `python3 waitlist_manager.py count`
- Currently ~120+ signups
- Emails managed through Brevo

---

# 11. INFRASTRUCTURE

## Render (Backend)
- URL: https://uniprep-backend-dtlq.onrender.com
- Free tier: 750 hours/month, resets April 1
- Cron job: CURRENTLY DISABLED to save hours. Re-enable on launch morning.
- Deploy sometimes shows "timed out" but server runs fine (cosmetic Render issue)
- Environment variables stored in Render dashboard (Stripe key, Anthropic key, Firebase credentials)
- No .env file locally — keys only exist on Render

## Vercel (Frontend)
- Auto-deploys from GitHub on push to main
- Takes 2-3 minutes to deploy after push
- Custom domain: myunioffer.com

## Firebase
- Auth: email/password signup and login
- Firestore collections:
  - `users/{uid}` — user profile, plan, token usage
  - `users/{uid}/savedChats` — saved conversation history
  - `waitlist` — waitlist email signups

---

# 12. LAUNCH CHECKLIST — TUESDAY MARCH 31

## Morning (8am):
1. Re-enable cron job in Render dashboard (Settings > Cron Jobs)
2. Run swap script:
```bash
cd ~/Desktop/business/uniprepai/myunioffer/frontend && python3 src/pages/saved-release/swap-to-live.py && git add . && git commit -m "LAUNCH: swap to live pages" && git push
```
3. Wait 2-3 minutes for Vercel to deploy
4. Test: visit myunioffer.com, check landing, about, pricing pages all load
5. Test: sign up with a test account, go to pricing, click subscribe, verify Stripe checkout loads with correct price
6. Send launch email via Brevo
7. Post launch announcement on Instagram (8-9am)

## Midday:
8. Post on LinkedIn
9. Post on Reddit (r/6thForm, r/UniUK)
10. Post on The Student Room

## If something breaks:
- Revert frontend: `cd ~/Desktop/business/uniprepai/myunioffer/frontend && git revert HEAD && git push`
- Check Render logs: dashboard.render.com
- Check Vercel: vercel.com/dashboard

---

# 13. ALL DESIGN DECISIONS MADE

## Animations
- All animations use `[0.16, 1, 0.3, 1]` deceleration easing (elements slow down as they arrive, no snap)
- All viewport triggers use `margin: "-80px"` so animations start before elements are fully in view
- Section headings have animated coral dividers that draw themselves
- Stats bars use counting number animations
- Hero has floating parallax gradient blobs
- "dream university." has a gradient shimmer animation
- Problem cards have hover reveals showing "what we do instead"
- Testimonials auto-scroll horizontally like the subject marquee
- FAQ items slide in from alternating sides
- CTA sections have floating frosted glass shapes

## Content Rules
- No em dashes anywhere in .jsx files
- No "Recruiting" entries
- No "5 specialist agents" — use "Subject-specific coaching"
- No "top UK university" — use "UK university"
- 45min sessions changed to 60min
- "Beta tester" changed to "Early user"
- Waitlist count: 120+ (update as needed)
- Refund text: subtle footer/FAQ mentions only, not prominent
- No slandering teachers — the "gap" card focuses on generic advice, not teacher quality

## Pages Removed from Landing Page
- Team section (moved to About page, nav links to it)
- Our Story section (demo section proves credibility better)

---

# 14. TESTIMONIALS (EXACT QUOTES — DO NOT EDIT)

These are real quotes from early users. Do not change a single character, including grammar mistakes and informal spelling:

1. 'Its great, it helped so much with figuring out the next steps like for what supercurriculars I should be doing next by building on what ive done so far'
2. 'And its also not just a yes-man like chatgpt, its critical of my plans'
3. 'i had no idea what supercurriculars to do but it gave me unique suggestions after I gave what i had already done. Like it based it off my interests'
4. 'I actually have a plan after using it even tho i had nothing figured out before'
5. 'The ai site responds within a few seconds, the quality of information that it responds with is helpful, if you ask the right questions the site guides you step by step'
6. 'the site is rlly good!!'

---

# 15. DEMO CONVERSATIONS (LANDING PAGE)

The demo section has 6 tabbed conversations. Each uses real AI responses (trimmed for conciseness). The subjects are:

1. **Medicine (PS)** — Student has GP work experience, discovers the lonely patient story is their strongest material
2. **Economics (Interview)** — Cambridge mock interview, carbon tax question, student progresses from surface-level to regressivity/externalities analysis
3. **Computer Science (PS)** — Student undersells chess project, AI identifies alpha-beta pruning as strong PS material
4. **Architecture (PS)** — Student finds beauty in a brutalist car park, AI recognises the observation about shadows and framing as fundamentally architectural
5. **Music (PS)** — Student struggles with Chopin Ballade coda, AI identifies the gap between technical competence and musical intention as the PS angle
6. **PPE (Interview)** — Oxford mock, teacher retraining question, student identifies education as right vs service tension

### Before/After PS Snippet (below demo)
- **Before:** "I have always been passionate about medicine since a young age. Seeing my grandmother suffer in hospital made me realise I wanted to help people and make a difference in the world."
- **After:** "When my grandmother was in hospital, the geriatrician knelt beside her bed and switched to simpler words because her English was fading. The junior doctor behind her was scribbling notes. I remember thinking those two people were doing completely different jobs in the same room, and I wanted to understand why."
- **Tagline:** "Same student. Same experience. One sounds like everyone else. The other sounds like them."

---

# 16. CONTENT & MARKETING PLAN

## Saved Ideas
- **Reel: "£6,000 vs £8.99"** — Split screen comparison. Left: what a private consultant charges. Right: what the AI does for £8.99.
- **Launch day post** — Clean graphic with "we're live" and the URL. Pin to top of grid.

## Post-Launch Content
- Film and post launch content
- Post on LinkedIn, Reddit, The Student Room
- Instagram stories showing the product in action

---

# 17. EMAIL TEMPLATES

## Monday Pre-Launch Email (March 30, 8am) — READY
- Subject: "We launch tomorrow."
- Saved as: monday-email-v3.html
- Content: Welcome new members, brief intro, discount tease without explaining mechanics, free tier mention

## Tuesday Launch Email (March 31) — NEEDS SETUP IN BREVO
- Subject: "We're live. Your discount is waiting."
- Content: Explain automatic discount (same email = auto-applied at checkout), £3 off first month, free tier details, link to sign up
- IMPORTANT: Explain that the discount applies when they subscribe with the SAME email they used for the waitlist. No code needed.

---

# 18. PENDING ITEMS

## Before Launch (March 31):
- [ ] Test full signup-to-payment flow end to end
- [ ] Re-enable cron job morning of March 31
- [ ] Run swap-to-live.py script
- [ ] Set up and schedule launch day email in Brevo
- [ ] Create Instagram launch post

## Post-Launch:
- [ ] Google Analytics event tracking
- [ ] File upload via plus button in chat (user requested feature)
- [ ] Rate My PS tool (viral feature idea)
- [ ] Get Adyan's photo for About page
- [ ] Film and post launch content
- [ ] Post on LinkedIn, Reddit, The Student Room

---

# 19. KNOWN ISSUES

1. **Render "timed out" on deploy:** Cosmetic. Server runs fine. Just ignore.
2. **Adyan has no photo:** Shows placeholder icon on About page. Get his photo and save as public/team-adyan.jpg, then add `photo: "/team-adyan.jpg"` to his entry in About.jsx.
3. **Mobile timeline line:** Was fixed to show on mobile, but test to confirm.
4. **Gradient text clipping:** The "g" in "you get in" on the About page hero was being clipped. Fixed with `pb-2` on the gradient text element. If it happens elsewhere, add padding-bottom.
5. **Import paths in saved-release:** Files in saved-release need `../../contexts/AuthContext` (two levels up). If you get an import error, check this first.

---

# 20. EMERGENCY PROCEDURES

## Frontend is broken after push:
```bash
cd ~/Desktop/business/uniprepai/myunioffer/frontend && git revert HEAD && git push
```

## Backend is broken after push:
```bash
cd ~/Desktop/business/uniprepai/myunioffer/backend && git revert HEAD && git push
```

## Server is down / not responding:
1. Go to dashboard.render.com
2. Click on the uniprep-backend service
3. Click "Manual Deploy" > "Deploy latest commit"
4. Wait 3-5 minutes

## Stripe checkout not working:
1. Check Render logs for errors
2. Verify price IDs in Render environment variables match Stripe dashboard
3. Verify coupon IDs exist in Stripe (WAITLIST_EARLY_ACCESS)

## Users can't log in:
1. Check Firebase console (console.firebase.google.com)
2. Verify Authentication is enabled
3. Check Firestore rules allow read/write

## Cost is too high / losing money:
Lower the daily token budgets in main.py:
```python
DAILY_TOKEN_BUDGETS = {
    "free": 50000,
    "ps": 275000,      # Lower this
    "interview": 275000, # Lower this
    "premium": 400000    # Lower this
}
```
Push to backend. Users get fewer messages per day but your costs drop immediately.

---

END OF HANDOFF DOCUMENT

---

# 22. TOKEN TRACKING - VERIFIED IMPLEMENTATION

## How It Works (confirmed from code)

### Cost-Weighted Formula
```python
cost_weighted = input_tokens + (output_tokens * 5)
```
Uses exact API counts: `response.usage.input_tokens` and `response.usage.output_tokens`. No estimation.

### Where Tracking Happens
- Non-streaming (/chat): `generate_response()` returns (text, cost_weighted). Calls `add_token_usage()` with cost_weighted value.
- Streaming (/chat-stream): Tracks via `token_tracker` dict during stream. Calculates `cost_weighted = token_tracker["input"] + (token_tracker["output"] * 5)` after stream completes.
- Auto-continue tokens are included in both paths.

### Daily Budgets (in main.py)
```python
DAILY_TOKEN_BUDGETS = {
    "free": 50000,
    "ps": 275000,
    "interview": 275000,
    "premium": 400000
}
```

### Message Limits (secondary cap)
```python
TIER_LIMITS = {
    "free": {"ps": 2, "interview": 2},
    "ps": {"ps": 100, "interview": 2},
    "interview": {"ps": 2, "interview": 100},
    "premium": {"ps": 999, "interview": 999}
}
```

### Budget to Dollar Mapping
Each budget unit = $0.000001 in cost to you.
- 275,000 budget = max $0.275/day = ~$8.25/month
- 400,000 budget = max $0.40/day = ~$12.00/month

### Messages Per Day (verified calculations)

**PS/Interview (275,000 budget):**
| Scenario | Input/msg | Output/msg | Cost units/msg | Messages/day |
|----------|-----------|-----------|---------------|-------------|
| Long input, long output | 8,800 | 600 | 11,800 | 23 |
| Long input, short output | 7,150 | 50 | 7,400 | 37 |
| Short input, long output | 5,000 | 600 | 8,000 | 34 |
| Short input, short output | 3,350 | 50 | 3,600 | 76 |

**Premium (400,000 budget):**
| Scenario | Input/msg | Output/msg | Cost units/msg | Messages/day |
|----------|-----------|-----------|---------------|-------------|
| Long input, long output | 8,800 | 600 | 11,800 | 33 |
| Long input, short output | 7,150 | 50 | 7,400 | 54 |
| Short input, long output | 5,000 | 600 | 8,000 | 50 |
| Short input, short output | 3,350 | 50 | 3,600 | 111 |

### Input Token Breakdown Per Message
| Component | Tokens |
|-----------|--------|
| System prompt (coaching rules, confidentiality, formatting) | ~3,000 |
| History (6 messages, short) | ~300 |
| History (6 messages, long) | ~4,800 |
| User message (short) | ~50 |
| User message (max 4500 chars) | ~1,000 |
| AI output (short) | ~50 |
| AI output (long) | ~600 |
| AI output (auto-continue max) | ~800 |

---

# 23. COMPLETE PRICING STRUCTURE

## Stripe Prices
| Plan | Monthly Price | Stripe Price ID | Notes |
|------|-------------|----------------|-------|
| Free | £0 | N/A | No Stripe involved |
| PS Coach | £8.99 | Same ID, amount updated in dashboard | Was £7.99, changed to £8.99 |
| Interview Prep | £8.99 | Same ID, amount updated in dashboard | Was £7.99, changed to £8.99 |
| Premium | £12.99 | Same ID, amount updated in dashboard | Was £11.99, changed to £12.99 |
| 1-on-1 Session | £29.99 | Google Form booking | Not Stripe subscription |

## Stripe Coupons
| Coupon ID | Amount | Duration | How Applied | Expires |
|-----------|--------|----------|------------|---------|
| WAITLIST_EARLY_ACCESS | £3 off | First month only | Auto if email in waitlist | July 31, 2026 |
| SHREY | £1 off | Forever | Manual promo code at checkout | Never |
| PAVAN | £1 off | Forever | Manual promo code at checkout | Never |
| GIRISH | £1 off | Forever | Manual promo code at checkout | Never |
| SUHAS | £1 off | Forever | Manual promo code at checkout | Never |

Waitlist discount redemption limit: 150.

## Effective Prices After Discounts
| Scenario | PS/Interview | Premium |
|----------|-------------|---------|
| No discount | £8.99 | £12.99 |
| Sales coupon (£1 off forever) | £7.99 | £11.99 |
| Waitlist first month (£3 off) | £5.99 | £9.99 |
| Waitlist + sales coupon | NOT POSSIBLE (mutually exclusive) | NOT POSSIBLE |

## Discount Logic (in checkout endpoint)
```
if email in waitlist:
    apply WAITLIST_EARLY_ACCESS coupon
    (no promo code field shown)
else:
    allow_promotion_codes = True
    (user can enter SHREY/PAVAN/etc)
```
These are MUTUALLY EXCLUSIVE. A user never gets both.

## Margin Analysis (worst case, every user maxes daily budget every day)
| Scenario | Revenue/month | Cost/month | Profit |
|----------|-------------|-----------|--------|
| PS/Int no coupon £8.99 | $11.42 | $8.22 | +$3.20 |
| PS/Int coupon £7.99 | $10.15 | $8.22 | +$1.93 |
| PS/Int waitlist £5.99 | $7.61 | $8.22 | -$0.61 |
| Premium no coupon £12.99 | $16.50 | $12.00 | +$4.50 |
| Premium coupon £11.99 | $15.23 | $12.00 | +$3.23 |
| Premium waitlist £9.99 | $12.69 | $12.00 | +$0.69 |

Only loss: PS/Interview waitlist first month, 61 cents worst case, one month only.

## Stripe Transaction Fees
1.4% + 20p per UK card transaction.
| Payment | Stripe Fee | You Keep |
|---------|-----------|----------|
| £8.99 | ~33p | £8.66 |
| £7.99 (coupon) | ~31p | £7.68 |
| £5.99 (waitlist) | ~28p | £5.71 |
| £12.99 | ~38p | £12.61 |

---

# 24. CLAUDE API RATE LIMITS

| Tier | Requests/min | Input tokens/min | Output tokens/min |
|------|-------------|-----------------|-------------------|
| Tier 1 (current, $0-$40 spent) | 50 | 50,000 | 10,000 |
| Tier 2 ($40+ spent) | 1,000 | 100,000 | 20,000 |
| Tier 3 ($200+ spent) | 2,000 | 200,000 | 40,000 |

50 requests/min = 50 users pressing send simultaneously. Not a concern until hundreds of daily active users.

---

# 25. FULL COST BREAKDOWN

## Costs to Date (March 31, 2026): ~£15.31 total
| Service | GBP | USD | Notes |
|---------|-----|-----|-------|
| Claude API | £0.24 | $0.30 | 152K input, 30K output tokens |
| Domain (Cloudflare) | £8.30 | $10.46 | Expires Feb 2027 |
| Stripe fees | £6.77 | $8.53 | Test payments refunded, fees kept |
| Render | £0 | $0 | Free tier |
| Vercel | £0 | $0 | Free tier |
| Firebase | £0 | $0 | Free tier |
| Brevo | £0 | $0 | Free tier |
| GitHub | £0 | $0 | Free tier |
| Gemini | £0 | $0 | Free tier |
| **TOTAL** | **£15.31** | **$19.29** | |

## When Free Tiers Run Out
| Service | Free Limit | Current Usage | Upgrade Cost | When |
|---------|-----------|--------------|-------------|------|
| Render | 750 hrs/month | ~720 hrs (cron 24/7) | $7/month | NOW - almost no buffer |
| Firebase Firestore | 50K reads/day | <100/day | $0.06/100K reads | ~500+ DAU |
| Vercel | 100GB bandwidth/month | <1GB | $20/month | ~5,000+ monthly visitors |
| Brevo | 300 emails/day | <10/day | £19/month | 300+ person campaigns |
| Domain | Annual | Paid to Feb 2027 | ~£8-10/year | February 2027 |

## Immediate Risk
Render free tier: 750 hours/month. Cron job uses ~720. Every backend deploy runs two instances simultaneously for a few minutes. More than ~10 deploys/month risks running out. If hours hit 750, server goes offline until the 1st of next month. Monitor at dashboard.render.com.

## Cost Spreadsheet
Full detailed spreadsheet saved as: myunioffer-costs.xlsx

---

# 26. SMTP CONFIGURATION (Firebase Email Verification)

Firebase Auth now sends verification emails through Brevo SMTP:
- Sender: support@myunioffer.com
- SMTP host: smtp-relay.brevo.com
- Port: 587
- Security: STARTTLS
- Username: a3fb39001@smtp-brevo.com
- Password: Brevo SMTP key (in Firebase console)

This prevents verification emails landing in spam.

---

# 27. NAMING CONVENTION

NEVER write "myunioffer.ai" with a full stop before "ai". The correct name is "myunioffer ai" (two words, no dot). "myunioffer.ai" looks like a URL that doesn't exist and is misleading.

Correct: myunioffer ai
Wrong: myunioffer.ai

The website URL is myunioffer.com (not .ai).

---

# 28. BACK BUTTON BEHAVIOUR

Both About and Pricing pages use browser history for the back button:
```javascript
<button onClick={() => window.history.length > 1 ? window.history.back() : window.location.href = "/"}>
```
This sends users back to wherever they came from (e.g. Chat → Pricing → Back returns to Chat). Falls back to home page if no history.

---

END OF UPDATED HANDOFF DOCUMENT
