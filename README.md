# @ankhorage/zora-tabletop

Tabletop and card-game UI primitives for React Native and React Native Web, built on ZORA.

## Install

```bash
bun add @ankhorage/zora-tabletop @ankhorage/zora
```

Peer dependencies:

- `@ankhorage/zora >=0.1.0`
- `react >=18.2.0`
- `react-native >=0.72.0`

## Purpose

`@ankhorage/zora-tabletop` provides presentational primitives for tabletop and card-game interfaces. It is intentionally UI-only: consumers map their own game, trainer, or app data into generic props.

The package does not own poker rules, betting logic, scoring, persistence, networking, runtime bindings, Studio behavior, or generated-app logic.

## Components

- `PlayingCard` renders a visible playing card.
- `CardBack` renders a face-down card.
- `CardHand` renders a row of visible and/or face-down cards.
- `TabletopTable` renders a tabletop surface with seats, center cards, labels, and token labels.

## Example

```tsx
import { TabletopTable, type TabletopSeatState } from '@ankhorage/zora-tabletop';

const seats: readonly TabletopSeatState[] = [
  {
    id: 'button',
    label: 'BTN',
    sublabel: '98K',
    selected: true,
    cards: [
      { rank: 'A', suit: 'spades' },
      { rank: 'K', suit: 'hearts' },
    ],
  },
  {
    id: 'small-blind',
    label: 'SB',
    sublabel: '100K',
    faceDownCards: 2,
    tokenLabel: '200',
  },
  {
    id: 'big-blind',
    label: 'BB',
    sublabel: '99K',
    faceDownCards: 2,
    tokenLabel: '400',
  },
];

export function ExampleTable() {
  return (
    <TabletopTable
      centerCards={[
        { rank: 'Q', suit: 'diamonds' },
        { rank: 'J', suit: 'clubs' },
        { rank: 'T', suit: 'hearts' },
      ]}
      centerLabel="Pot: 1.2K"
      centerSublabel="Blinds: 200/400"
      seats={seats}
      seatCount={6}
    />
  );
}
```

## Generic mapping

Keep app-specific language outside the package:

```txt
position     -> seat.label
stack        -> seat.sublabel
isHero       -> seat.selected
folded       -> seat.muted
bet amount   -> seat.tokenLabel
hole cards   -> seat.cards
hidden cards -> seat.faceDownCards
```

## Design notes

- Components are cross-platform React Native / React Native Web components.
- Public props use generic tabletop language.
- Components use ZORA theme semantics through `useZoraTheme`.
- The first version keeps visuals intentionally simple and composable.
