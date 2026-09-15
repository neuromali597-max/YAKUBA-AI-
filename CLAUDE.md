# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Yakuba AI is a SaaS for African languages, starting with Bambara: chat, French ↔ Bambara translation, and Bambara text generation. The product language is French; generated content is Bambara (with French glosses). Longer-term vision covers other African languages (Peulh, Songhay, Tamasheq, Soninké).

## Commands

All frontend work happens in `src/frontend/`:

```bash
cd src/frontend
npm install       # install dependencies
npm run dev       # dev server (http://localhost:3000)
npm run build     # production build + type-check + lint
npm run lint      # lint only
```

There are no tests yet. There is no backend yet — all data is mocked in `src/frontend/lib/mock-data.ts`.

## Architecture

**Stack**: Next.js 15 (App Router) · React 19 · TypeScript · CSS Modules (no Tailwind, no UI library). Fonts via `next/font/google`: Schibsted Grotesk (text), Instrument Serif (italic accents), JetBrains Mono (labels/kickers).

**Design source of truth**: `design-reference/project/Yakuba AI - Landing v2.dc.html` is the Claude Design prototype the landing page reproduces. Design tokens (colors `#15803D`/`#22C55E`/`#0C2113`, `yk-*` keyframes, shared utility classes like `.kicker`, `.display`, `.btn-cta`, `.chip`) live in `src/frontend/app/globals.css` as CSS custom properties. Reuse those tokens/utilities rather than hardcoding values.

**Routes** (`src/frontend/app/`):
- `/` — public landing page (composition of `components/landing/*` sections)
- `/connexion`, `/inscription` — mock auth forms (both redirect to `/app`)
- `/app` — the SaaS workspace (single unified interface, not separate screens)
- `/mentions-legales`, `/confidentialite`, `/cgu` — legal pages via `components/legal/LegalPage` (SiteHeader + sticky TOC + ~700px article + SiteFooter); cookies are covered inside `/confidentialite`, there is no separate cookies page
- `/contact` — contact page (`components/contact/ContactPage`). **Single contact address is `CONTACT_EMAIL` in `lib/contact.ts` (Yakuba.contact@gmail.com)** — never hardcode another email; help requests and resource contributions are routed there too. Never mention response languages next to contact info.
- **Voice & image AI**: `lib/speech.ts` wraps the Web Speech API — `VoiceButton` (dictation, used in `PillInput` for Accueil/Conversation and in the Traduction input header) and read-aloud on assistant replies in `ChatSection`. Both degrade silently when the browser lacks support. `PhotoTranslate` (Traduction → « 📷 Photo » tab, plus the Accueil shortcut) uploads a photo to `/api/ocr`, which runs **Tesseract.js server-side** (`fra+eng`, worker cached in module scope, `serverExternalPackages: ["tesseract.js"]` in `next.config.ts` — required or the worker hangs). Detected text drops into the translation field so the user can fix it before translating. Setting `OCR_API_URL` + `OCR_API_KEY` switches to an external vision provider instead.
- `/api/contact` and `/api/contribute` (Node runtime) send real emails via `lib/mailer.ts` (nodemailer, SMTP from `SMTP_USER`/`SMTP_PASS`, see `.env.example`; contributions accept a ≤10 MB PDF/TXT/DOC attachment). When SMTP is not configured they answer `503 {configured:false}` and the forms fall back to a prefilled `mailto:` (`mailtoUrl()`), so the site works before and after the mailbox credentials exist.
- `/ressources` — resources hub (`components/resources/ResourcesHub`, tabs without reload): `LanguageLibrary` (languages from `lib/resources-data.ts` — add a language = add one object), `ContributionSpace` (share-a-resource form whose `Contribution` type already carries `statut`/`auteur`/`date` for future moderation), `GuidesLibrary` (data-driven step-by-step guides). The landing has no Ressources section — the header/footer link to this page.

**Authentication** (`auth.ts`, Auth.js/NextAuth v5, JWT sessions): real Google OAuth — `signInWithGoogle()` in `lib/auth-actions.ts` redirects to Google with `prompt=select_account`, callback `/api/auth/callback/google`. `isGoogleConfigured` is false until `AUTH_GOOGLE_ID`/`AUTH_GOOGLE_SECRET` exist: the auth screen then shows a setup notice and the button refuses rather than faking a login. **Never mock a session.** `/app` is a server component that calls `auth()`; once Google is configured it redirects unauthenticated visitors to `/connexion`, otherwise it stays open in "mode découverte" with `user = null` (Sidebar/Settings show guest state). Real logout = `signOutAction()`. Email/password sign-in is deliberately not implemented client-side — it needs the backend (accounts + hashing) and the form says so. Don't use Edge middleware for this guard: env vars are inlined at build time there, which silently disables it.

**App theming**: the post-login app uses its own brand tokens (`.yk-app` block in `globals.css`, light + dark via `data-theme` on the Workspace root; CTA #00E676, links #009457 light / #00E676 dark). Never hardcode colors in `components/workspace/*` — always `var(--app-*)`. Theme persists in localStorage (`yakuba-app-theme`); toggle lives in the Sidebar and in Paramètres → Préférences. The landing keeps its separate `:root` tokens. Footer is `components/landing/SiteFooter` (reused by FinalCta and legal pages) — no `href="#"` links allowed.

**Component layout** (`src/frontend/components/`):
- `landing/` — one component + CSS module per landing section: SiteHeader (responsive burger nav), Hero, ProductDemo (tabs → ChatDemo autoplaying scene machine / TranslateDemo functional mock), ProblemSection (dark, animated counter + rotating words), SolutionsSection (dark premium card grid with inline SVG icons), HowItWorks (4-step autoplay), FeaturesShowcase (feature list + dark demo panel), UseCases (mosaic grid), Faq (accordion), FinalCta (CTA + footer)
- `workspace/` — the post-login app, faithful to `design-reference/app-interface/` (the "Yakuba AI mobile interface" handoff, warm cream palette #FBFAF7/#F4F2EC scoped to these modules — NOT the landing's tokens): `Workspace` (section state: home/chat/translate/generate/history/settings, chat messages, mock AI replies), `Sidebar` (250px nav per the prototype, drawer <960px with a mobile top bar), one component per section (`HomeSection` greeting + 4 quick-action cards, `ChatSection` bubbles + Copier/Régénérer/Utile, `TranslateSection` FR⇄BM with mock dictionary, `GenerateSection` — a chat thread (free-text composer first; type chips and suggestion pills are optional helpers above the input; `inferType()` picks the mock reply from the wording), `HistorySection` search + delete, `SettingsSection`), `PillInput` (shared rounded input). All copy/mock logic lives in `lib/workspace-data.ts`.
- `auth/` — `AuthScreen` (single screen switching login/register/forgot-password states, no page change), `GoogleButton` ("Continuer avec Google", primary, mocked OAuth), `AuthField` (input with inline error). Mock error rules: register with `test@yakuba.ai` → "email déjà utilisé"; password <8 chars rejected.
- `ui/Logo` — shared brand logo (light/dark variants)

**Shared logic** (`src/frontend/lib/`): `mock-data.ts` (all copy, presets, scenes, conversations, and `mockAssistantReply()` — the single place to later replace with real API calls) and `hooks.ts` (`useReveal` scroll reveal, `useTypewriter`, `useMediaQuery`).

**Conventions**:
- Breakpoints: 960px (header nav / sidebar drawer), 820px (mosaic collapse); interactive targets ≥40px for touch.
- Animations mirror the prototype's `yk-*` keyframes; scroll sections mount their content only when visible (`useReveal`) and render a min-height placeholder before.
- When the backend arrives, wire it through `mockAssistantReply()` and the auth redirect in `AuthForm` — nothing else should need to know about the transport.
