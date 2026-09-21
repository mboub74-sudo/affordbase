# AffordBase V6 — Mortgage / Home Affordability

Includes Dashboard Pro, What-If Simulator, City Compare Pro, Reverse Salary Calculator, and Mortgage / Home Affordability.

New route: `/mortgage-affordability-calculator/`

The home calculator estimates an affordable home price, mortgage principal, principal+interest payment, total housing cost, DTI and money left. It is a planning estimate, not a lender pre-approval.

## V6 Home Cash Planner
Added `/down-payment-calculator/` plus `/closing-cost-calculator/` alias. The calculator combines down payment, adjustable closing-cost estimate, other upfront costs, current savings and monthly savings into a cash-needed target and savings timeline. Home Affordability now links its estimated home price directly into the cash planner.

## V7 Personal Financial Plan
- `/my-plan/` combines salary, tax-adjusted take-home, rent, car, debt, city living costs, savings, and a home cash goal.
- `Save My Plan` stores the inputs locally in the visitor's browser with localStorage. No account or server storage is used.
- Reset clears the saved plan and restores defaults.
- Share Plan and PDF Report are intentionally reserved for the next phase.

## V7.1 — Share & Report
- Share My Plan creates a URL-safe scenario containing plan numbers only (no name/email fields).
- Shared Plan Loading reads `?plan=` and loads the scenario without automatically saving it locally.
- PDF Report generates a branded one-page AffordBase PDF locally in the browser with no third-party PDF dependency.
- Save My Plan continues to use localStorage and remains opt-in.

## V8 Goal Planner
New route: `/goal-planner/`

Features:
- Buy a Home, Emergency Fund, Pay Off Debt, and Custom Savings goals
- Use My Plan loads saved V7 plan values from this browser
- Monthly contribution what-if buttons (+100 / +250 / +500)
- 25% / 50% / 75% / 100% milestones
- Target month/year and monthly/6-month timeline
- Debt payoff mode uses APR and detects payments that do not cover monthly interest
- Linked from Home, My Plan, navigation, and sitemap

## V9 — Launch Ready
- Added production-oriented metadata defaults, canonical base URL support via `NEXT_PUBLIC_SITE_URL`, Open Graph/Twitter metadata and WebSite/Organization JSON-LD.
- Added About, Contact, Privacy, Terms and Financial Disclaimer pages.
- Added legal pages to sitemap, production-aware robots.txt, web manifest and custom 404.
- Added baseline security headers in `next.config.mjs`.
- Added launch footer links and responsive legal-page styling.

### Before public launch
Set `NEXT_PUBLIC_SITE_URL` to the final canonical domain. Replace the placeholder Contact copy with a monitored support email/form. Review Privacy/Terms with the exact analytics, ads, affiliate, account and data-storage services you actually enable.
