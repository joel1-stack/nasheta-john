# Pre-deployment review of commit 1aa9739 (branch fixes-2026-11-07)

Reviewed 9 Nov 2026. Read-only: nothing was pushed, merged or deployed, and no code was changed. This file is the only thing written, and it is not committed.

## Verdict (updated after the fix; see section 9)
**Original verdict, before the fix: not ready to deploy.** One defect I introduced: the three homepage card types that use the overlay link work, but the large Top Stories cards (section 2, item 1) are no longer clickable across the whole card. I also overstated this in my earlier report. Details and the fix are below. Everything else reviewed is fine or low risk.

## 1. Changed files (origin/main...HEAD, 2 commits)
| File | Change |
|---|---|
| next.config.ts | +2: `poweredByHeader: false` |
| src/app/layout.tsx | 3 title strings (default, Open Graph, Twitter) shortened |
| src/components/home/NewsHome.tsx | card links, ticker copy, "More" links, offer headings (about 49 lines changed) |
| docs/seo-backlink-improvements-2026-11-08.md | new report |
Commits: dacfb13 (code), 1aa9739 (report). No other file differs from main.

## 2. Code review: SEO, accessibility, responsive

**Defect (must fix before deploy): Top Stories cards.** The cards use `<article class="relative">` with the headline link carrying `after:absolute after:inset-0`. That overlay fills the nearest *positioned* ancestor. In the Top Stories card (`OverlayCard`) the text sits in a wrapper that is itself `absolute bottom-0`, so the overlay covers only that text block, not the whole image. My own click test at the top of the page returned a plain `DIV` with no link over the Aviatrix image; I read that wrongly and only trusted the later list-item tests. So clicking the picture of the three Top Stories cards likely does nothing; only the text strip works. Before this commit the whole card was a link. The other card types (Latest News list, section grid cards, Regulation Watch list) have no positioned wrapper and tested correctly. Suggested fix: give the card a separate empty `<Link class="absolute inset-0" aria-label=...>`-style overlay, or move the link's overlay to the `article` by making the text wrapper non-positioned. Needs a re-test at desktop and phone width. My earlier report's line "Verified in the browser that clicks anywhere on a card still go to the article" is wrong for these cards and should be corrected.

Other points:
- **Title (SEO risk, low to medium):** "Payments" is removed from the homepage title. The title is 52 characters; the new pixel width was not measured, so I cannot confirm it is under 580 px. Dropping a keyword is an editorial/ranking choice that needs your approval. Only the homepage uses the default; other pages use the "%s | iGamingUbuntu" template and are unaffected.
- **Anchors (SEO, positive):** links are now headline-only, so Google sees descriptive anchors instead of date plus excerpt blobs. Link destinations and count are unchanged apart from the second ticker copy no longer being links (they were hidden duplicates).
- **Accessibility:** the headline link is the single focusable target per card (good). The visible keyboard focus ring will outline only the headline text, not the whole card (minor). The thumbnail's alt (article title) now sits unlinked next to the same headline, so a screen reader reads the title twice, as it did before. "More Latest News" etc. is now announced fully. Turning the four offer headings into paragraphs removes four headings from the screen-reader outline; they were short labels, so I judge that acceptable.
- **Responsive:** only a desktop-width screenshot was checked. Phone width was not checked, which matters most for the Top Stories fix above.
- **Hover styles:** `group-hover` still works because the `group` class sits on the `article`.
- `poweredByHeader: false` has no side effects beyond removing the header.
- Checks already run: `tsc`, `npm run build`, the two test scripts passed; eslint on the changed files 0 errors.

## 3. Is the branch based on the latest main?
Yes. After `git fetch`, origin/main is 4cbb1f8, which is the merge base. The branch is 0 commits behind and 2 ahead.

## 4. Conflicts with main
None. `git merge-tree` of origin/main and HEAD completed with no conflict report. It will be a clean fast-forward.

## 5. Production deployment method
- Repository: github.com/joel1-stack/nasheta-john. Hosting is Vercel. The repo has `vercel.json` (redirects only) and one GitHub workflow (`uptime.yml`, monitoring only), so no GitHub Action deploys the site.
- Earlier in this engagement, pushes to main were followed by a live deployment, which is how I know pushing main triggers a production deploy. I have not re-checked the Vercel dashboard now, so I cannot confirm from here whether a push to the branch alone creates a preview build. Merging or pushing to main should be treated as a production deploy.
- The CMS is separate: article saves go live at once without any deploy.
- Each deploy changes the hashed JavaScript file names (you raised crawl budget before).

## 6. The 20 proposed internal links (Internal_Link_Apply_Set.csv)
All source and destination URLs returned HTTP 200 on 8 Nov 2026. Paths are on https://www.igamingubuntu.com. Not applied.

| # | Source URL | Destination URL | Proposed anchor text |
|---|---|---|---|
| 1 | /guides/speed-upgrade-african-operators | /news/industry/faster-rounds-player-protection-africa | regulators are already asking about self-exclusion |
| 2 | /guides/speed-upgrade-african-operators | /directory/crash-games/jetx-crash-game-update | faster loading and up to four bets |
| 3 | /guides/are-prediction-markets-gambling | /guides/prediction-markets-legal-africa | where prediction markets are legal in Africa |
| 4 | /news/regulation/gabon-gdj-state-betting-operator-private-licences | /news/regulation/gabon-gaming-authority-state-monopoly | the new authority behind Gabon's state monopoly |
| 5 | /events/african-igaming-events-calendar-2027 | /events/gaming-tech-summit-africa-dakar-postponed | Gaming Tech Summit Africa has postponed its Dakar edition |
| 6 | /directory/crash-games/big-bass-crash-vs-big-bass-slots | /directory/crash-games/aviatrix-second-chance-crash-game | Aviatrix Second Chance |
| 7 | /directory/crash-games/aviatrix-second-chance-crash-game | /directory/crash-games/big-bass-crash-vs-big-bass-slots | Big Bass Crash compared with Big Bass slots |
| 8 | /sports/caf-concludes-eight-day-africa-cup-of-nations-2027-inspection-visit | /news/industry/uganda-tourism-board-caf-afcon-2027 | Uganda Tourism Board joined CAF as an AFCON 2027 official partner |
| 9 | /news/regulation/namibia-bookmaker-licensing-2026 | /news/regulation/namibia-gambling-board-dividends-2025-26 | Namibia Gambling Board paid N$15m in dividends |
| 10 | /news/regulation/namibia-gambling-board-dividends-2025-26 | /news/regulation/namibia-bookmaker-licensing-2026 | new bookmaker licensing fees proposed in Namibia |
| 11 | /news/regulation/kenya-national-lottery-launch-2027 | /news/regulation/kenya-national-lottery-player-protections | the lottery will bar under-18s and screen for problem gambling |
| 12 | /news/regulation/how-lonaci-controls-remote-gaming-in-o-te-d-ivoire | /news/industry/cote-divoire-betclic-lonaci-betting-demand-2026 | Betclic leads betting demand in Cote d'Ivoire while LONACI online slips |
| 13 | /news/industry/free-state-responsible-gambling-campaign-illegal-operators | /news/regulation/limpopo-illegal-online-gambling-operator-jailed-polokwane | a Polokwane court jailed a man over illegal online gambling |
| 14 | /news/regulation/is-online-betting-legal-ghana-2026 | /news/regulation/ghana-real-time-vat-betting-2026 | Ghana's new 20% digital VAT |
| 15 | /news/regulation/bet1cent-exits-uganda-december-2026 | /news/regulation/nlgrb-uganda-iso-27001-certification | Uganda's gaming regulator certified its data security |
| 16 | /news/regulation/kenya-betting-rules-2026-licences-tax-payments | /news/regulation/agok-kenya-treasury-finance-bill-2027 | Kenyan operators put tax proposals to the Treasury |
| 17 | /news/regulation/south-africa-sassa-nsfas-grants-gambling-warning | /news/regulation/sun-international-offshore-gambling-south-africa | Sun International wants South Africa to pursue offshore sites |
| 18 | /news/industry/lonase-senegal-governance-niger-lottery | /casinos/payments/visa-senegal-digital-payments-mou | Visa's two-year digital payments deal with Senegal |
| 19 | /news/industry/lonase-senegal-governance-niger-lottery | /news/industry/lonaci-regional-network-tour-2026 | LONACI closed its regional lottery network tour in Korhogo |
| 20 | /news/regulation/drc-gambling-levy-2027-finance-bill | /news/regulation/tunisia-60-percent-gaming-tax-2027-finance-bill | Tunisia wants to raise its tax on games from 40% to 60% |

Caveats: the anchors are written phrases and each needs a sentence around it in the article (the CSV has one per link). Some link claims, such as the Namibia dividend figure and the Kenya lottery protections, come from the linked articles' titles; a human should re-read each pair before publishing. Links 18 and 19 (LONASE article) are the loosest fits. Four orphan articles have no link here.

## 7. Are the four empty alt attributes decorative icons?
Yes. The live homepage has exactly four `<img alt="">`: /images/icons/news.png, regulation.png, guides.png and advertise.png. They are the icons in the "What we do" block at the foot of the page, each beside its own visible title and description, and the code also sets `aria-hidden="true"`. That is correct markup for decorative images. No `<img>` on the homepage lacks an alt attribute entirely.

## 8. Remaining checks before deployment
1. Fix the Top Stories overlay link (section 2) and re-test: click the image of each Top Stories card at desktop and phone width, plus keyboard Tab order.
2. Phone-width visual check of the whole homepage (not done yet).
3. Your decision on dropping "Payments" from the title, and measure the new title width (Seobility or a pixel-width check).
4. Correct the report line about card clicks in docs/seo-backlink-improvements-2026-11-08.md.
5. Re-run `tsc`, `npm run build` and the two test scripts after the fix.
6. Your approval to push to main (this deploys to production), and your decision whether to apply the 20 internal links via the CMS.
7. After deploy: `curl -I` for the missing X-Powered-By header, view the live title and canonical, re-run Seobility (once its daily limit allows), run a live link crawl, and watch the next Uptime run.

## 9. Follow-up: Top Stories fix and re-test (9 Nov 2026)
Authorised fix applied on the branch (local commit only; nothing pushed, merged, deployed, and no CMS change).

**Fix.** In `OverlayCard` (src/components/home/NewsHome.tsx) the text wrapper changed from `absolute bottom-0 left-0 right-0` to `absolute inset-0 flex flex-col justify-end`. The wrapper now covers the whole card, so the headline link's overlay (`after:absolute after:inset-0`) fills the whole card, image included. Text stays at the bottom, so the look is unchanged (desktop screenshot compared). One line changed.

**Results.**
| Check | Result |
|---|---|
| Top Stories, 3 cards, 6 test points each (centre, four corners, lower edge) | 6/6 open the correct article at 1536 px, and at 390 px (large card 343x320, small cards 343x198) |
| Latest News list (5) and Industry and Guides grid cards (8) | 6/6 each at both widths |
| Regulation Watch (5 items), 3 points each | all open the right article |
| Keyboard | each of the 16 article cards contains exactly one interactive element, the headline link, so one Tab stop per card |
| Overlay blocking other controls | no other link, button or input exists inside any card, so nothing is covered. The ticker, nav, ad slots and "More" links sit outside the cards |
| Ticker | 8 links (second copy is plain text) |
| Title width | Arial at 20 px measures the old title at 603 px against Seobility's 607 px, so I calibrated to 607. The new title comes out at about 505 px, roughly 75 px under the 580 px limit. This is an estimate, not a Seobility reading. |
| `tsc --noEmit` | passed |
| `npm run build` | compiled successfully |
| eslint on NewsHome.tsx | 0 errors, 2 existing warnings (img element) |
| scripts/test-affiliate.mjs, scripts/test-go-route.mjs | passed (10 tests) |
| SEO report | the inaccurate click statement was corrected, and the title and mobile notes updated |

**Remaining problems and limits.**
- The 390 px test used an embedded page frame, so real touch behaviour on a phone is untested. A real phone or devtools device mode check is still advisable.
- The keyboard focus ring outlines only the headline text, not the whole card (minor, accessibility-neutral).
- The thumbnail alt text repeats the headline for screen readers (same as before).
- The title width is an estimate; the real Seobility figure needs a re-run after deploy. "Payments" is still removed from the title, which is your decision.
- Seobility's four "missing alt" items are the decorative icons and will probably remain flagged.
- Not yet done: your approval to push (production deploy), the 20 internal links (CMS, not applied), and post-deploy checks (section 8, items 6 and 7).
- I did not re-run the live crawl.
