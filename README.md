# BusGo India — Bus Ticket Booking MVP

A lightweight, template-based bus ticket booking website built with Next.js 14, Tailwind CSS, and Google Sheets as the data source. Deployable to Netlify in minutes.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Data source | Google Sheets (CSV export or API) |
| Payments | Razorpay Payment Links |
| Notifications | Nodemailer (SMTP email) |
| Deployment | Netlify (via `@netlify/plugin-nextjs`) |

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy and fill in environment variables
cp .env.local.example .env.local

# 3. Start the dev server
npm run dev
```

The app will be available at `http://localhost:3000`.

> **Note:** Without a Google Sheet configured, the app automatically uses realistic sample trip data so you can develop and test locally.

---

## Google Sheet Setup

### Sheet Structure

Create a new Google Sheet with the following columns **exactly as named** (row 1 = headers):

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `id` | Text | Unique bus ID | `BUS001` |
| `operator` | Text | Bus company name | `VRL Travels` |
| `from` | Text | Departure city (match exactly) | `Mumbai` |
| `to` | Text | Destination city (match exactly) | `Pune` |
| `departure` | Text | Departure time in HH:MM (24h) | `06:00` |
| `arrival` | Text | Arrival time in HH:MM (24h) | `10:30` |
| `duration` | Text | Trip duration | `4h 30m` |
| `price` | Number | Price per seat in INR | `450` |
| `seatsAvailable` | Number | **Update this manually after each booking** | `28` |
| `totalSeats` | Number | Total bus capacity | `40` |
| `busType` | Text | `Sleeper`, `Seater`, or `Semi-Sleeper` | `Seater` |
| `acType` | Text | `AC` or `Non-AC` | `AC` |
| `amenities` | Text | Pipe-separated list | `WiFi\|Water\|Charging Point` |
| `razorpayLink` | Text | Optional: static Razorpay payment link | `https://rzp.io/l/abc` |

### Making the Sheet Live

**Option A — Published CSV (simplest, recommended for public sheets):**

1. Open your Google Sheet
2. Go to **File → Share → Publish to web**
3. Select **Sheet1** and **CSV** format
4. Click **Publish** and copy the URL
5. Set `GOOGLE_SHEETS_CSV_URL=<that URL>` in `.env.local`

**Option B — Google Sheets API (for private sheets):**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the **Google Sheets API**
3. Create an **API key** (restrict it to Sheets API)
4. Set `GOOGLE_SHEETS_ID=<your-sheet-id>` and `GOOGLE_SHEETS_API_KEY=<your-key>` in `.env.local`
5. Share the sheet with "Anyone with the link → Viewer"

### Updating Seat Availability

After each confirmed booking, the operator must:
1. Open the Google Sheet
2. Find the row for the booked bus (`id` column)
3. Decrease `seatsAvailable` by the number of seats booked
4. Save — the website reflects the updated count on the next page load (5-minute cache)

---

## Razorpay Payment Setup

### Get Your Keys

1. Sign up at [dashboard.razorpay.com](https://dashboard.razorpay.com)
2. Go to **Settings → API Keys → Generate Key**
3. Copy **Key ID** and **Key Secret**
4. Set them in `.env.local`:
   ```
   RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=your_secret_here
   ```

### Test vs Live Keys

- Use `rzp_test_` keys for development/testing (payments are simulated)
- Switch to `rzp_live_` keys when going live
- Test card: `4111 1111 1111 1111`, any future expiry, any CVV

### How the Payment Flow Works

1. Customer fills in passenger details and clicks "Pay Securely"
2. The server calls Razorpay API to create a one-time payment link for the exact amount
3. Customer is redirected to Razorpay's hosted payment page
4. After payment, Razorpay redirects to `/confirmation?bookingId=xxx`
5. Confirmation page sends an email notification to the operator team

### Fallback (without Razorpay configured)

If `RAZORPAY_KEY_ID` is not set, the booking page will show an error asking the customer to contact the operator. You can also add a static Razorpay payment link to the `razorpayLink` column in the Sheet for each bus — this link will be used as a fallback.

---

## Email Notifications Setup

When a booking is confirmed, the app sends an email to the operator with full booking details including passenger names, seat numbers, contact info, and a reminder to update the Sheet.

### Gmail SMTP (Recommended for most operators)

1. Enable **2-Step Verification** on your Gmail account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Create an App Password for "Mail"
4. Set in `.env.local`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=youremail@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx   (the 16-char app password)
   NOTIFY_EMAIL=bookings@yourcompany.com
   ```

> If SMTP is not configured, the app still works — notifications are simply skipped (logged to the server console).

---

## Deploying to Railway

Railway automatically detects Next.js, builds it, and runs it as a live Node.js server. No complex config needed.

### First Deploy

1. Push this repo to GitHub
2. Go to [railway.app](https://railway.app) and click **New Project → Deploy from GitHub repo**
3. Select your repository
4. Railway auto-detects Next.js and runs `npm run build` + `npm run start`
5. Go to **Variables** tab in your Railway service and add all your environment variables:
   ```
   GOOGLE_SHEETS_CSV_URL=...
   RAZORPAY_KEY_ID=...
   RAZORPAY_KEY_SECRET=...
   NEXT_PUBLIC_APP_URL=https://your-app.railway.app
   SMTP_HOST=...
   SMTP_PORT=587
   SMTP_USER=...
   SMTP_PASS=...
   NOTIFY_EMAIL=...
   ```
6. Railway gives you a public URL instantly (e.g. `https://your-app.railway.app`)

> **Important:** Set `NEXT_PUBLIC_APP_URL` to your Railway public URL so Razorpay redirects back to the right confirmation page after payment.

### After Each Content/Code Change

```bash
git add .
git commit -m "your change"
git push
```

Railway automatically redeploys on every push to your main branch. Live in ~2 minutes.

### Redeploying Without Code Changes

If you only updated the Google Sheet and want to force a cache refresh:

1. In Railway dashboard → your service → **Deployments → Redeploy**
2. Or just wait — Sheet data is cached for 5 minutes; visitors see fresh data within that window.

---

## Customisation Guide

### Change the Brand Name / Logo

- Edit `src/components/layout/Header.tsx` — change the text inside the `<span>` next to the Bus icon
- Update `src/app/layout.tsx` → `metadata.title` and `metadata.description`
- Replace the logo icon by swapping `<Bus />` with any Lucide icon or an `<Image>` component

### Change Colors

All brand colors are defined in `tailwind.config.ts`:
- `brand.*` — the primary blue palette (used for headers, buttons, badges)
- `accent.*` — the orange palette (used for CTAs, highlights)

To change the primary color, edit the hex values under `brand` in `tailwind.config.ts`.

### Add/Remove Cities

Edit the `INDIAN_CITIES` array in `src/lib/constants.ts`. Cities must match exactly (case-sensitive) with `from`/`to` values in the Google Sheet.

### Add Popular Routes

Edit the `POPULAR_ROUTES` array in `src/lib/constants.ts`.

### Change the FAQ Content

Edit the `faqs` array in `src/components/home/FAQ.tsx`.

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── search/page.tsx             # Search results (server component)
│   ├── seat-selection/page.tsx     # Seat picker + passenger form
│   ├── booking/page.tsx            # Order review + payment
│   ├── confirmation/page.tsx       # Post-payment confirmation
│   └── api/
│       ├── trips/route.ts          # GET /api/trips — fetch from Sheet
│       ├── razorpay/route.ts       # POST /api/razorpay — create payment link
│       └── notify/route.ts         # POST /api/notify — email operator
├── components/
│   ├── layout/                     # Header, Footer
│   ├── home/                       # HeroSearch, TrustSignals, FAQ, HowItWorks
│   ├── search/                     # BusCard, FilterPanel, SearchResults
│   ├── seat-selection/             # SeatGrid, PassengerForm
│   └── ui/                         # CityInput
└── lib/
    ├── types.ts                    # TypeScript interfaces
    ├── constants.ts                # Cities, popular routes, slot config
    ├── utils.ts                    # Formatting helpers
    └── sheets.ts                   # Google Sheets fetcher + sample data
```

---

## Phase 2 Ideas (Out of Scope for This Build)

- Real-time seat inventory (WebSocket or polling)
- User accounts and booking history
- PDF ticket generation
- Admin dashboard to manage trips
- Multi-operator API integrations
- Automated cancellation and refund processing

---

## Support

For technical issues with this codebase, refer to the inline code comments or open an issue in the repository. For Razorpay or payment issues, contact [Razorpay Support](https://razorpay.com/support/).
