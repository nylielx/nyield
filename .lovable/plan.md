
## Phase 1: Data Layer
- Create `src/data/temp/profile-mock.ts` — user & business profile mock data (listings, reviews, ratings, specs)
- Create `src/data/temp/affiliate-mock.ts` — affiliate levels, balance, commissions, rewards store, materials

## Phase 2: Profile System (eBay-style)
- Rebuild `/user/:username` — eBay-inspired layout: header (avatar, rating, join date, location, message CTA), listings grid with filters/sort, about section, trust metrics, PC setup
- Create `/business/:name` — similar layout with business metrics, verified badge, specialisation
- Both pages reuse listing cards from marketplace

## Phase 3: Remove Community
- Remove community page (`src/pages/17-page-community/index.tsx`)
- Remove community route from App.tsx
- Remove community nav link
- Clean up `gaming-profile-mock.ts` (keep profile data, remove social feed data)

## Phase 4: Affiliate System (6 tabs)
- Create `/affiliate` route with tabbed layout:
  1. **My Affiliate** — level card, benefits, challenge progress, referral link
  2. **Rewards Store** — grid of reward cards with balance/redeem
  3. **Indications** — earnings table, commission history, filters
  4. **Benefits** — redeem codes, redemption history
  5. **My Balance** — available/maturation/withdrawn, PayPal setup, withdrawal history
  6. **Materials** — brand assets, sales guide, affiliate bot info

## Phase 5: Messaging Integration
- Update messaging to link profiles — clickable usernames open profile pages
- Add profile preview in chat context panel

## Phase 6: Navbar Update
- Add notifications icon with badge
- Update profile dropdown with affiliate dashboard link
- Remove community links

## Files Created/Modified
- **New**: `profile-mock.ts`, `affiliate-mock.ts`, affiliate page (6 sub-pages), business profile page
- **Rebuilt**: public profile page, messaging page
- **Removed**: community page
- **Updated**: App.tsx routes, navbar, navigation config
