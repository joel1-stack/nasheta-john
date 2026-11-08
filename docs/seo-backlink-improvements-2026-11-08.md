# SEO and backlink improvements, 8 Nov 2026

Status: code changes are committed on branch `fixes-2026-11-07` (commit dacfb13) and are **not pushed or deployed**. Nothing was sent, registered, submitted or published. No CMS content was changed.

## 1. Issues fixed (in the branch, not live)

Baseline: Seobility free check of the live homepage on 8 Nov 2026 showed on-page score 81% (Meta data 89%, Page quality 92%, Page structure 87%, Links 73%, Server 75%, External factors 3%). I could read the Title check in full (607 px, limit 580). The rest of the report page would not load for me in full (the free limit of daily checks was used up), so the other findings below are from your brief and from my own inspection of the live HTML.

| Finding | What I did | Local result |
|---|---|---|
| Title 607 px | Default title changed from "iGamingUbuntu \| African Gambling News, Regulation and Payments" to "iGamingUbuntu \| African Gambling News and Regulation" (also in Open Graph and Twitter titles). Brand and key terms kept. | Title went from 61 to 52 characters. Estimated width about 505 px against the 580 px limit (calibrated against Seobility's 607 px reading of the old title; Seobility itself was not re-run). |
| X-Powered-By exposed | `poweredByHeader: false` in next.config.ts | Local server returns no X-Powered-By header. Live still returns "Next.js" until deployed. |
| Headings 31 for ~772 words | The four "What we do" blurbs were `h3` headings; they are short marketing labels, so they are now paragraphs. Article headlines and section titles remain headings. | 27 headings (from 31). Further cuts would remove real article headlines, so I stopped. |
| Long anchor texts | Cards linked the whole block (category, date, headline, excerpt). Now the link is the headline only, and a CSS overlay keeps the whole card clickable. Same for the Regulation Watch list. | The first version of this change left the three large Top Stories cards clickable only on the text strip (my earlier statement that every card was clickable was wrong). Fixed in the follow-up commit; after the fix, 6 test points per card (corners, centre, image area) on all 16 article cards and the 5 Regulation Watch items open the correct article at 1536 px and 390 px widths. |
| Duplicate anchors | The scrolling ticker repeated its eight links a second time for the loop. The repeat is now plain text (it was already hidden from assistive technology). "More" links now read "More Latest News", "More Regulation Watch" etc. for screen readers. | Ticker links are no longer duplicated. A headline still appears once in the ticker and once in the page: same destination, different position, left alone. |
| 4 images "missing alt" | The only images with empty alt are the four decorative icons in "What we do", each next to its own visible title. An empty alt is the correct markup for decorative images, so I did not invent alt text. | **Seobility will probably still flag these four.** Your instruction was not to change things only to raise the score. Say if you want a descriptive alt anyway. |
| Empty anchors / trivial anchors | Logo and social icon links already carry an accessible name (image alt or aria-label). Seobility reads link text only, so it may still list them. | No change needed. |
| 1 referring domain | See section 4. This cannot be fixed in code. | Open. |

## 2. Files changed
- next.config.ts (poweredByHeader)
- src/app/layout.tsx (default, Open Graph and Twitter title)
- src/components/home/NewsHome.tsx (card links, ticker copy, More links, offer headings)
- This report.

Checked locally: canonical unchanged (`https://www.igamingubuntu.com`), 2 JSON-LD blocks still present, layout checked visually at desktop width; card clicks checked at 1536 px and 390 px (390 px via an embedded page frame, not a real phone).

## 3. Internal links (prepared, not applied)
Reason: articles live in Firestore and a CMS save publishes immediately, so these are production changes. File: `research/backlinks/Internal_Link_Apply_Set.csv` (20 links, each with source URL, destination URL, anchor and a ready sentence). All 40 source and destination URLs returned HTTP 200 on 8 Nov 2026.

Coverage: 20 of the 24 orphan articles get one inbound link. Not covered, because the only candidate sources were weakly related and a link would look forced: Botswana Ghanzi Derby, Mali/Burkina Faso/Niger joint betting, Mauritius casino sale, Google Wallet in Nigeria. They need a better source article or a new one.

Links (source → destination; anchor in the CSV):
1. /guides/speed-upgrade-african-operators → /news/industry/faster-rounds-player-protection-africa
2. /guides/speed-upgrade-african-operators → /directory/crash-games/jetx-crash-game-update
3. /guides/are-prediction-markets-gambling → /guides/prediction-markets-legal-africa
4. /news/regulation/gabon-gdj-state-betting-operator-private-licences → /news/regulation/gabon-gaming-authority-state-monopoly
5. /events/african-igaming-events-calendar-2027 → /events/gaming-tech-summit-africa-dakar-postponed
6. /directory/crash-games/big-bass-crash-vs-big-bass-slots → /directory/crash-games/aviatrix-second-chance-crash-game
7. /directory/crash-games/aviatrix-second-chance-crash-game → /directory/crash-games/big-bass-crash-vs-big-bass-slots
8. /sports/caf-concludes-eight-day-africa-cup-of-nations-2027-inspection-visit → /news/industry/uganda-tourism-board-caf-afcon-2027
9. /news/regulation/namibia-bookmaker-licensing-2026 → /news/regulation/namibia-gambling-board-dividends-2025-26
10. /news/regulation/namibia-gambling-board-dividends-2025-26 → /news/regulation/namibia-bookmaker-licensing-2026
11. /news/regulation/kenya-national-lottery-launch-2027 → /news/regulation/kenya-national-lottery-player-protections
12. /news/regulation/how-lonaci-controls-remote-gaming-in-o-te-d-ivoire → /news/industry/cote-divoire-betclic-lonaci-betting-demand-2026
13. /news/industry/free-state-responsible-gambling-campaign-illegal-operators → /news/regulation/limpopo-illegal-online-gambling-operator-jailed-polokwane
14. /news/regulation/is-online-betting-legal-ghana-2026 → /news/regulation/ghana-real-time-vat-betting-2026
15. /news/regulation/bet1cent-exits-uganda-december-2026 → /news/regulation/nlgrb-uganda-iso-27001-certification
16. /news/regulation/kenya-betting-rules-2026-licences-tax-payments → /news/regulation/agok-kenya-treasury-finance-bill-2027
17. /news/regulation/south-africa-sassa-nsfas-grants-gambling-warning → /news/regulation/sun-international-offshore-gambling-south-africa
18. /news/industry/lonase-senegal-governance-niger-lottery → /casinos/payments/visa-senegal-digital-payments-mou
19. /news/industry/lonase-senegal-governance-niger-lottery → /news/industry/lonaci-regional-network-tour-2026
20. /news/regulation/drc-gambling-levy-2027-finance-bill → /news/regulation/tunisia-60-percent-gaming-tax-2027-finance-bill

The workbook's other 99 suggestions were not applied: its anchors are truncated title fragments, and I did not judge them natural enough to publish unreviewed.

## 4. Backlink opportunities, status and priority
Nothing has been acquired. Checked on 8 Nov 2026 by loading each site: still reachable (HTTP 200) are African iGaming Alliance (home and contact page), GamblingMaps contact, African Exponent, Gaming Port Uganda, GCA, Gamblers Connect, Gaming News Byte, Focus Gaming News, Global Gambling News. TechCabal returned 403 to my automated request (bot block, not proof it is down). The GamblingMaps dead-link example lgb.co.zw/index.php/about-us/ still returns 404. I did not re-verify the Eventus / BiG West Africa Summit 2027 naming this session; the site's Partners page already uses it.

Priority (editorial and legitimate only; no paid links or networks):
1. **GamblingMaps broken-link report** (9 dead citations plus our regulator directory as a replacement): useful to them, low effort, a real fix.
2. **African iGaming Alliance** media membership or listing: relevant, we reported on them; membership may be paid, so ask first.
3. **TechCabal** payments pitch: high authority, uncertain acceptance.
4. **GCA expert-comment request**: relevant, link only if they quote us.
5. **African Exponent** contributed analysis: needs a written 900-word piece; not published until you approve.
6. **Gaming Port Uganda** cross-citation: small, relevant.
7. Directories in the Profile Pack: free ones only, after email is set up.
Drafts: `research/backlinks/Outreach_Drafts_2026-11-08.md` (six, unsent). Profiles: `Profile_Pack_2026-11-08.md`. Workbook: `Backlink_Opportunities_2026-11-08.xlsx`.

## 5. Email authentication (read-only DNS lookups, 8 Nov 2026)
- MX: Cloudflare Email Routing (route1/2/3.mx.cloudflare.net). Receive-only.
- SPF: `v=spf1 include:_spf.mx.cloudflare.net ~all`. This covers Cloudflare routing, not an outbound sender.
- DKIM: a record exists at `cf2024-1._domainkey`; I tested seven common selector names and no other. A mail provider that sends for the domain would publish its own selector, so this does not show that sending is set up.
- DMARC: no record at `_dmarc.igamingubuntu.com`.
- Conclusion: not ready to send outreach from info@igamingubuntu.com. Setting it up needs a sending service chosen by you, plus DNS changes made by you or in Cloudflare. No DNS was changed.

## 6. Tests and verification
- `tsc --noEmit`: passed.
- `npm run build`: passed (production build compiled).
- eslint on the changed files: 0 errors, 3 existing warnings. The full lint run reports 19 errors in other files (for example `any` in src/lib/firebase.ts) that were there before; I did not touch them.
- `scripts/test-affiliate.mjs` and `scripts/test-go-route.mjs`: passed (10 tests in the second).
- Local homepage check on the built app: title, canonical, JSON-LD present, no X-Powered-By, 27 headings, card clicks go to the right articles.
- Not done: the full live crawl (qa_live.py) was not re-run because nothing changed on the live site. Mobile width was not checked. Seobility was **not** re-run on the new code (it only sees the live site, and the free daily limit had been reached), so "everything ticked" is not confirmed.

## 7. Needs your approval or external access
1. **Deploy** the branch (pushing to main deploys). After it, re-run Seobility and confirm the title, header, headings and anchors.
2. **Apply the 20 internal links** through the CMS (each save is live at once).
3. Decide on the four decorative icons (leave as is, or add alt text).
4. **Email sending**: choose a service, then add SPF/DKIM/DMARC records in Cloudflare DNS.
5. Approve each outreach draft, directory or membership application before anything is sent or registered.
6. The only referring-domain gain comes from the outreach above; it cannot be done from code.

## 8. Remaining blockers
- No backlinks exist yet from this work.
- Google indexing requests for the earlier moved URLs wait for the Search Console quota to reset.
- The GitHub Uptime workflow fix (commit 4cbb1f8) has no confirming scheduled run yet.
