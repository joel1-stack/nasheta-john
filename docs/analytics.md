# Analytics setup (GA4 + GTM)

Two tags load on the public site:

| Tool | ID | Where |
| --- | --- | --- |
| Google Tag Manager | `GTM-TB8Q2LLT` | Inline snippet in `src/app/layout.tsx` `<head>` |
| GA4 | `G-6VTKQHDR04` | `src/components/GoogleAnalytics.tsx` via `src/lib/analytics.ts` |

## Double counting

GA4 is loaded **once**, from `GoogleAnalytics`. The config call uses
`send_page_view: false` and the component sends exactly one `page_view` event per
navigation.

The GTM container `GTM-TB8Q2LLT` must **not** contain a GA4 Configuration tag for
`G-6VTKQHDR04`. If it does, every page view is counted twice.

To check: open the container in Google Tag Manager → Tags, and look for a
"GA4 Configuration" or "Google tag" tag using `G-6VTKQHDR04`. Pause or delete it.
The container JavaScript currently served from
`https://www.googletagmanager.com/gtm.js?id=GTM-TB8Q2LLT` does not reference the
GA4 measurement ID, so as of the last check there is no double count.

If the container *must* own GA4 in future, set the Vercel environment variable
`NEXT_PUBLIC_GA4_OWNER=gtm`. The app then stops loading gtag.js itself and only
the container fires GA4.

## Owner traffic

- GA4 is never loaded on `/igub-cms-x7k9/*`.
- After a successful CMS login, `igub_internal=1` is set for one year
  (`src/lib/auth-context.tsx`). While that cookie exists, every GA4 hit includes
  `traffic_type: "internal"` and the user property `traffic_type=internal`.
- Signing out of the CMS clears the cookie.
- In GA4, filter reports with `traffic_type` **does not equal** `internal`.

## Lead events

`src/lib/analytics.ts` exposes `trackLead(formName)`, which sends the GA4
recommended event:

```js
gtag('event', 'generate_lead', { form_name: 'contact' })
```

Wired forms:

- Contact form → `form_name: "contact"`
- Newsletter (sidebar + homepage) → `form_name: "newsletter"`
- Advertise enquiry → `form_name: "advertise"`
