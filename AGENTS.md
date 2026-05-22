# Ankhorage Agent Guide for `@ankhorage/zora-tabletop`

This repository is a strict TypeScript Bun package for standalone tabletop and card-game UI primitives for React Native and React Native Web, built on `@ankhorage/zora`.

`@ankhorage/zora-tabletop` must remain usable outside Ankhorage-generated apps. It provides reusable presentational components for playing cards, card backs, hands, table seats, tabletop surfaces, tokens, chips, and similar tabletop/card-game UI elements.

All coding agents must follow the rules below.

## Non-negotiables

- Do not introduce `any`, `as any`, `unknown as any`, or broad casts to silence errors.
- Do not add `@ts-ignore` / `@ts-expect-error` unless explicitly requested.
- Do not add `eslint-disable` or weaken lint rules/config to “make it pass”.
- Do not weaken tsconfig strictness or change module resolution settings.
- Do not perform large refactors unless explicitly requested.
- Do not add game rules, game engines, solver logic, quiz logic, poker strategy, chess logic, betting validation, scoring engines, or persistence workflows.
- Do not add app manifest interpretation, runtime schema logic, generated app logic, CLI logic, Studio-only behavior, orchestrator logic, or deployment orchestration.
- Do not import from consumer packages such as Studio, runtime, CLI, templates, generated apps, or orchestrator modules.
- Do not introduce domain-specific app concepts such as Sharkprey scenarios, manifest nodes, actions, modules, authoring layers, screen generation, or app categories.
- Do not add browser-only APIs without a React Native compatible abstraction.
- Do not add heavy UI frameworks or styling systems.
- If you cannot proceed without violating rules: STOP and propose 2–3 options with tradeoffs.

## Required verification

Before concluding any code task, run from repo root:

- `bun run build`
- `bun run lint:fix`
- `bun run test`
- `bun run knip`

For release or packaging-related work, also run:

- `npm pack --dry-run`

If any command fails: STOP and report the failure plus the minimal fix.

## Package responsibility

This package owns reusable tabletop/card-game presentation UI for React Native and React Native Web:

- playing-card primitives, for example `PlayingCard`, `CardBack`, `CardHand`, and `CardStack`
- tabletop primitives, for example `TabletopTable`, `TabletopSeat`, `TabletopToken`, and `TabletopPot`
- generic visual states such as selected, muted, disabled, face-down, highlighted, and active
- table layout helpers for seats around circular, oval, and rounded tabletop surfaces
- theme-aware visuals built from ZORA and Surface semantics
- accessibility behavior for interactive tabletop elements
- README/examples for generic card-game and tabletop usage

This package does not own:

- poker-specific rules, betting logic, blinds logic, hand evaluation, or strategy decisions
- chess-specific board logic or move validation
- quiz state, progress persistence, history persistence, or localStorage workflows
- app manifest interpretation
- runtime node rendering
- Studio authoring behavior
- generated routes or generated layouts
- template category decisions
- app-specific screen content
- auth provider integrations
- Supabase or other provider logic
- CLI file generation
- orchestrator/module install logic
- deployment logic
- persistence, database, network, or domain workflows

## Dependency boundaries

Allowed dependency direction:

- `@ankhorage/zora-tabletop` may import from `@ankhorage/zora` as its public UI foundation.
- `@ankhorage/zora-tabletop` may use `react` and `react-native`.
- `@ankhorage/zora-tabletop` may use `@ankhorage/surface` only if a lower-level render primitive is not available through ZORA and the dependency is explicitly justified in the change.

Preferred architecture:

```txt
@ankhorage/surface       → render foundation primitives
@ankhorage/zora          → reusable UI system
@ankhorage/zora-tabletop → tabletop/card-game presentation primitives
Consumers                → apps, Studio/runtime adapters, generated projects
```

Forbidden dependencies:

- `@ankhorage/cli`
- `@ankhorage/runtime`
- `@ankhorage/studio`
- `@ankhorage/templates`
- `@ankhorage/orchestrator`
- generated app code
- Expo Router
- Next.js app code
- backend/provider SDKs
- app manifests or runtime schema packages, unless explicitly approved for a clearly UI-neutral type-only boundary

If a feature appears to require one of these dependencies, STOP and propose a boundary-safe alternative.

## Layering rules

Folder responsibilities:

```txt
src/components/* → generic public components
src/internal/*   → shared helpers/resolvers only
src/theme/*      → optional package-local theme helpers
src/examples/*   → optional lightweight examples only
```

Rules:

- Components may depend on ZORA and package-local internal helpers.
- Components must not depend on consumer apps or generated app structures.
- Internal helpers must stay generic and reusable.
- Do not put component-specific one-off logic into `src/internal/*` unless reused across multiple elements.
- Keep domain mapping outside the package. Consumers should map poker, blackjack, memory, or other game data into generic tabletop props.

## File and export conventions

Each public element should follow this shape:

```txt
src/components/element-name/
  ElementName.tsx
  types.ts
  index.ts
```

Every public element must be exported from `src/index.ts`:

```ts
export type { ElementNameProps } from './components/element-name';
export { ElementName } from './components/element-name';
```

Shared domain-neutral types may live in `src/types.ts` when they are used by multiple components, for example:

```ts
export type PlayingCardSuit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export interface PlayingCardValue {
  readonly rank: string;
  readonly suit: PlayingCardSuit;
}
```

Type exports must stay explicit. Do not rely on broad wildcard exports for public components unless the repo already uses that convention for a specific module.

Build outputs must go to `dist/`. Never write build artifacts into `src/`.

## Component API expectations

Public APIs should be:

- additive unless a breaking change is explicitly requested
- typed without escape hatches
- cross-platform by default
- predictable on React Native and React Native Web
- accessible for interactive elements
- generic enough for poker, blackjack, memory, board-game, and tabletop apps without mentioning those apps in core component props

Prefer data-driven presentational props:

```ts
seats: readonly TabletopSeat[];
cards: readonly PlayingCardValue[];
selected: boolean;
muted: boolean;
onPress: () => void;
```

Avoid hidden behavior:

- no implicit global state
- no silent side effects
- no consumer-specific branching
- no runtime/schema assumptions
- no game-specific validation or rule enforcement

Prefer composition over huge prop surfaces, but use structured props where they protect consistency.

## Tabletop abstraction rules

Use generic tabletop language in public APIs:

- Prefer `seat`, `token`, `label`, `sublabel`, `centerCards`, `centerLabel`, and `faceDownCards`.
- Avoid poker-only public prop names such as `heroPosition`, `blinds`, `smallBlind`, `bigBlind`, `potOdds`, `street`, or `correctAnswer`.
- If a poker app needs those concepts, map them in the app layer into generic component props.

Acceptable generic model:

```ts
export interface TabletopSeat {
  readonly id: string;
  readonly label: string;
  readonly sublabel?: string;
  readonly cards?: readonly PlayingCardValue[];
  readonly faceDownCards?: number;
  readonly selected?: boolean;
  readonly muted?: boolean;
  readonly tokenLabel?: string;
}
```

Consumer mapping example:

```txt
position     → seat.label
stack        → seat.sublabel
isHero       → seat.selected
folded       → seat.muted
bet amount   → seat.tokenLabel
hole cards   → seat.cards
hidden cards → seat.faceDownCards
```

## Styling and theme rules

- Use active ZORA/Surface theme semantics instead of hardcoded one-off colors.
- Prefer semantic tones over arbitrary colors.
- Prefer existing spacing, radius, typography, and color semantics.
- Do not expose arbitrary `style` props on new high-level components unless explicitly approved.
- Do not expose arbitrary raw string color APIs on new components unless explicitly approved.
- If a component needs visual variation, model it as structured props such as `tone`, `variant`, `size`, `shape`, `emphasis`, or `align`.
- Mobile and web must both be considered for layout and interaction behavior.
- Responsive behavior should use existing responsive infrastructure where possible instead of manual platform-specific hacks.

## Accessibility rules

- Interactive components must support accessible labels.
- Icon-only or symbol-only actions must require `label` or `accessibilityLabel`.
- Playing cards must expose accessible labels that include rank and suit when visible.
- Face-down cards must expose an accessible label such as “Face-down card” unless a more specific label is provided.
- Table seats should expose seat label, sublabel, selected/muted state, and token label where relevant.
- Do not sacrifice accessibility to simplify styling.

## Testing rules

- Tests must be deterministic and runnable offline.
- Do not perform real network calls.
- Prefer resolver/unit tests for shared style, formatting, seat-position, and card-label helpers.
- Test public helper behavior when it affects component output.
- Test edge cases for table seat counts, empty cards, face-down cards, selected/muted states, and chip/token labels where applicable.
- Do not add screenshot or browser-only test requirements unless explicitly requested.

## README and examples

README changes should:

- describe `@ankhorage/zora-tabletop` as a standalone React Native / React Native Web package
- explain that it builds on ZORA
- avoid app-specific Sharkprey language
- avoid Studio/runtime/template-specific language
- show generic consumer usage
- keep examples runnable and concise
- update the component export list when a new public component is added

Example changes should:

- demonstrate generic tabletop/card-game usage
- avoid app-specific or generated-app assumptions
- work on mobile and web

## Changesets

If a completed task changes the published package API, behavior, or README in a release-relevant way, create or update a `.changeset/*.md` file before committing that work.

Repo-doc/tooling-only changes do not need a changeset unless they affect package release behavior.

Use patch changesets for additive components and documentation updates unless the task explicitly requires a minor or major release.

## Mandatory workflow

1. Plan first: list the exact files you will touch and why.
2. Keep changes micro-scoped: small PR-sized steps, one concern at a time.
3. Do not edit files during planning.
4. Apply changes only after the plan has been approved.
5. After edits: show `git diff --stat` and briefly explain changes.
6. Rollback rule: if a step goes sideways, revert to the last checkpoint instead of trial-and-error edits.
7. If a completed task changes the published package, create or update a `.changeset/*.md` file before committing that work.
8. After verification, commit the completed unit of work unless the user explicitly says not to.

## Current initiative

We are creating the initial `@ankhorage/zora-tabletop` package so Ankhorage apps can reuse generic tabletop/card-game presentation primitives.

The immediate goal is to support the visual needs of NLHE-style trainer apps without embedding poker-specific logic into the package.

High-level first components:

- `PlayingCard`
- `CardBack`
- `CardHand`
- `TabletopSeat`
- `TabletopTable`
- optional token/chip display primitives

Keep the first implementation presentational, theme-aware, cross-platform, and free of game-rule logic.
