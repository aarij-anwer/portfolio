<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into your Next.js 15 App Router portfolio site. Here's a summary of all changes made:

- **`instrumentation-client.ts`** (new): Initializes PostHog client-side using the `instrumentation-client` pattern (recommended for Next.js 15.3+). Includes exception capture and a reverse-proxy `api_host`.
- **`next.config.ts`** (edited): Added `/ingest/*` reverse proxy rewrites to route PostHog requests through your own domain, reducing interception by ad blockers.
- **`.env.local`** (new): Added `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables.
- **`components/top-nav.tsx`** (edited): Added `nav_link_clicked` capture on nav link clicks and `social_link_clicked` capture on GitHub/LinkedIn icon clicks.
- **`components/project-card.tsx`** (edited): Added `"use client"` directive and `project_card_clicked` capture when a linked project card is clicked.
- **`components/home-ctas.tsx`** (new): Client component wrapping the home page CTA buttons with `home_cta_clicked` capture on each click.
- **`app/page.tsx`** (edited): Replaced inline `ButtonLink` CTA buttons with the new `HomeCtas` client component.
- **`components/project-action-buttons.tsx`** (new): Client component for project detail page action buttons (e.g. "View Live Site", "Source Code") with `project_action_clicked` capture.
- **`app/projects/get-better-together/page.tsx`** (edited): Replaced inline action buttons with the new `ProjectActionButtons` client component.

## Tracked events

| Event | Description | File |
|---|---|---|
| `home_cta_clicked` | User clicks "View Projects" or "My Resume" CTA on the home page | `components/home-ctas.tsx` |
| `project_card_clicked` | User clicks a project card on the projects list page | `components/project-card.tsx` |
| `project_action_clicked` | User clicks an action button (e.g. GitHub, live demo) on a project detail page | `components/project-action-buttons.tsx` |
| `nav_link_clicked` | User clicks a navigation link (Projects, Resume) in the top nav | `components/top-nav.tsx` |
| `social_link_clicked` | User clicks GitHub or LinkedIn social icon in the top nav | `components/top-nav.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/398482/dashboard/1512585
- **Home CTA Clicks Over Time**: https://us.posthog.com/project/398482/insights/E6lJjjch
- **Project Engagement Funnel**: https://us.posthog.com/project/398482/insights/ZcKWae4n
- **Project Action Clicks by Type**: https://us.posthog.com/project/398482/insights/4ByiXfyS
- **Social Link Clicks by Platform**: https://us.posthog.com/project/398482/insights/7AEwApTw
- **Navigation Link Clicks**: https://us.posthog.com/project/398482/insights/l50L4B8e

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
