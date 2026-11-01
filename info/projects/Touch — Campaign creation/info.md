# Touch — Campaign creation (v2)

> Source content for [`../../../projects/campaign-creation.html`](../../../projects/campaign-creation.html). Structure follows [`../../../project-page-structure.md`](../../../project-page-structure.md). Slug: `campaign-creation`. Previous version: [`info-v1.md`](info-v1.md) / [`campaign-creation-v1.html`](../../../projects/campaign-creation-v1.html).

**Client · Domain · Type:** Tinkoff · FinTech · Marketing automation · Web app

**Title:** Campaign launch: from months to days

**Lead:** At Tinkoff, launching a marketing campaign took 30 to 70 days and involved about ten different tools, held together by links in Jira. I led a team of four designers to build Touch's campaign creation flow around something that didn't exist before: the campaign itself, one entity that holds the brief, audiences, creatives, A/B tests and approvals. A launch now takes between one day and a week.

![Scenario canvas](00%20Preview.png)

*The scenario canvas. A campaign runs from launch schedule through audience checks into a four-way A/B test, and each branch is wired straight to its channels.*

## Highlights snapshot

| Label | Value |
|-------|-------|
| **◆ Context** | Touch, Tinkoff's internal platform for customer marketing (CVM: customer value management) |
| **◆ Goal** | Make the whole campaign launch visible in one place instead of ~10 tools linked through Jira |
| **◆ Constraints** | Regulated financial services; 8 channel formats; 1–3 mandatory approval rounds by editor, designer and technologist |
| **◆ Research** | ~50 interviews I ran with users and stakeholders; launch process digitized with time cost per stage |
| **◆ My role** | Lead Product Designer. Research, concept, stakeholder buy-in; led 3 designers |
| **◆ Impact** | Launch time: 30–70 days → 1 day to 1 week |

## Source facts (from Vova)

- ~10 different tools before Touch; Jira was the glue between them.
- Launch took 30–70 days depending on complexity, number of approvals and rework. Now it takes 1 day to 1 week.
- 1–3 approval rounds per creative; this number does not change with Touch, so approval is not a value story.
- Rollout is gradual because teams have to rebuild their process; Touch will become the only campaign tool company-wide.
- Research: about a year of analysis by designers, PMs and analysts; ~50 interviews run by Vova with users and stakeholders; business process digitized with time cost per stage.
- Main problem: no single "Campaign" entity that makes the launch transparent and holds all artifacts.
- AI-generated creatives are still reviewed by designers; speed grows with better models and more unified creatives.
- Not confirmed, don't claim: how the new launch time was measured, fewer approval rounds, rejected design alternatives.
- `01.png` is the campaign list, not a "hub".

## Designers

| Name | Role | Area |
|------|------|------|
| Vova Kirilyuk | Lead designer | Research, concept, design reviews, stakeholder alignment, part of the layouts |
| Rita | Product designer | Campaign entity, brief, scenarios |
| Serge | Product designer | Audiences, pre-launch analysis, A/B tests |
| Alex | Product designer | Content and creatives |

## Story

Overview → Problem → Approach → My role & team → Solution (4 stages) → Key decisions (01 Campaign entity, 02 Set up once for every channel, 03 A/B test as a node, 04 AI drafts, people keep the quality bar) → Impact → Learnings. Full copy lives in the HTML page.

## Figures used

| File | Placement |
|------|-----------|
| `00 Preview.png` | Hero (`campaign-creation.png` / `@2x`) |
| `01.png` | Decision 01 — campaign list |
| `02.png` | Decision 01 — About stage |
| `04.png` | Decision 02 — creatives for several channels in one list |
| `07.png` | Decision 02 — channel picker modal |
| `10.png` | Decision 03 — A/B branches wired to channels |
| `09.png` | Decision 04 — creative builder with AI prompt |

Not used in v2: `03.png`, `05.png`, `06.png`, `08.png`, `11.png`.
