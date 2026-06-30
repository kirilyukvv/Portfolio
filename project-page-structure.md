# Project page structure

Template for case study pages: **snapshot** (scannable facts) + **story** (narrative + visuals). Reuse the same HTML/CSS blocks; only copy changes per project.

Reference implementation: `projects/campaign-creation.html`

## Layer 1 — Hero

1. Back link  
2. Meta line — `Client · Domain · Type · Years`  
3. Title  
4. Lead — one sentence: what shipped + for whom  
5. Hero figure — key visual + short caption  

## Layer 2 — Highlights snapshot

A compact **fact grid** directly under the hero (before long prose). Each row = label + 1–3 lines max. Pick only what applies; empty rows look worse than omitted ones.

| Label | What it answers | Example (transfers) |
|-------|-----------------|---------------------|
| **Context** | Where does this live? Product / surface | In-app feed cards, mobile banking |
| **Task** | What you were asked to do (assignment) | Design modular promo cards for intl transfers |
| **Goal** | Success criteria / north star (not the same as task) | Users understand limits & fees before tapping Transfer |
| **Constraints** | Hard limits (optional but strong for “geeky” cases) | CMS char budgets, deeplink-only CTAs, no net-new flows |
| **Role** | Your ownership | Lead PD — UX/UI, copy structure, handoff |
| **Team** | Who else (ties to avatar idea) | PM, marketing, eng, content platform |
| **Scope** | Boundaries | 5 card variants, illustration direction, no backend |
| **Metrics** | Outcomes — numbers first, else qualitative | +X% tap-through, −Y% support tickets, or “shipped to 100% MAU” |

**Task vs goal** — keep both: *task* = the brief; *goal* = how you’d know it worked.

**Metrics** — if NDA: use ranges, directional wins, or ship facts (“live in production”, “A/B winner”, “5 variants in CMS”).

Optional snapshot rows (use when they add signal): **Tools** (Figma, CMS), **Timeline**, **Status** (shipped / ongoing).

Label style: short uppercase or `symbol + word` (e.g. `◆ Task`) — same symbol set as in [ideas.md](ideas.md) (geeky symbols).

## Layer 3 — Story (narrative blocks)

Fixed **section order** so every case feels familiar; skip a section only if it would be filler.

1. **Overview** — situation in plain language (2 short paragraphs max)  
2. **Problem** — bullet list of user/business/content pain (3–5 bullets)  
3. **Approach** *(optional)* — how you worked: research, workshops, iterations — only if there’s a story worth telling  
4. **Solution** — what you designed; tie to visuals (formats, patterns, system)  
5. **Impact** — outcomes in prose + repeat or expand **Metrics** if you have numbers  
6. **Learnings** *(optional)* — 2–3 bullets; good for lead-level voice  

Rename only if the project demands it (e.g. “System” instead of “Solution” for a design system case). Don’t invent one-off section titles per page.

## What to drop from older drafts

- **“Key value props surfaced in UI”** — fold into **Solution** (bullets) or **Overview**, unless the case is purely messaging/positioning.  
- Duplicate **role** — once in snapshot; **My role** section becomes a short “Collaboration” paragraph or merges into **Approach**.

## Suggested HTML shape (when implementing)

```text
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow, noarchive, nosnippet">
  <!-- analytics injected by: node build.mjs -->
  <script src="../auth.js"></script>
  ...
</head>

.project-header
.project-highlights          ← dl or grid: label / value rows
.project-figure
.project-content
  .project-block (Overview)
  .project-block (Problem)
  ...
```

## Checklist before publishing a case

- [ ] Lead stands alone if someone only reads one sentence  
- [ ] Snapshot has Task + Goal + Role; Metrics or honest “no public numbers”  
- [ ] At least one figure between Overview and Solution  
- [ ] Problem bullets are specific, not generic (“complex product”)  
- [ ] Solution references what’s visible in the screenshot  
