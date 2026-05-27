# Components

## CardBack

Source: `src/components/card-back/CardBack.tsx:22:1`

Face-down playing-card primitive for hidden cards and decks.

Use `CardBack` when a card should be represented visually without exposing its
rank or suit. The component keeps a generic accessible label for hidden cards.

Export paths: `src/index.ts`

| Prop               | Type                                  | Required | Default    | Description |
| ------------------ | ------------------------------------- | -------- | ---------- | ----------- |
| accessibilityLabel | `string \| undefined`                 | no       | —          |             |
| colorScheme        | `TabletopColorOverrides \| undefined` | no       | —          |             |
| muted              | `boolean \| undefined`                | no       | `false`    |             |
| size               | `TabletopCardSize \| undefined`       | no       | `'medium'` |             |
| testID             | `string \| undefined`                 | no       | —          |             |

## CardHand

Source: `src/components/card-hand/CardHand.tsx:24:1`

Compact row of visible and face-down playing cards.

Use `CardHand` when a seat, pile, or custom layout needs to show multiple cards
with consistent spacing, sizing, and muted state handling.

Export paths: `src/index.ts`

| Prop               | Type                                       | Required | Default    | Description |
| ------------------ | ------------------------------------------ | -------- | ---------- | ----------- |
| accessibilityLabel | `string \| undefined`                      | no       | —          |             |
| cards              | `readonly PlayingCardValue[] \| undefined` | no       | `[]`       |             |
| colorScheme        | `TabletopColorOverrides \| undefined`      | no       | —          |             |
| faceDownCards      | `number \| undefined`                      | no       | `0`        |             |
| muted              | `boolean \| undefined`                     | no       | `false`    |             |
| size               | `TabletopCardSize \| undefined`            | no       | `'medium'` |             |
| testID             | `string \| undefined`                      | no       | —          |             |

## PlayingCard

Source: `src/components/playing-card/PlayingCard.tsx:24:1`

Theme-aware face-up playing card primitive.

Use `PlayingCard` for visible card values in hands, shared table cards, piles,
or custom tabletop layouts. The component renders rank and suit glyphs and
exposes an accessible card label by default.

Export paths: `src/index.ts`

| Prop               | Type                                  | Required | Default    | Description |
| ------------------ | ------------------------------------- | -------- | ---------- | ----------- |
| accessibilityLabel | `string \| undefined`                 | no       | —          |             |
| card               | `PlayingCardValue`                    | yes      | —          |             |
| colorScheme        | `TabletopColorOverrides \| undefined` | no       | —          |             |
| muted              | `boolean \| undefined`                | no       | `false`    |             |
| selected           | `boolean \| undefined`                | no       | `false`    |             |
| size               | `TabletopCardSize \| undefined`       | no       | `'medium'` |             |
| testID             | `string \| undefined`                 | no       | —          |             |

## TabletopTable

Source: `src/components/tabletop-table/TabletopTable.tsx:42:1`

Responsive tabletop surface for generic card-game and board-game scenes.

Use `TabletopTable` to arrange seats around a themed table surface, display
shared center cards, and show neutral seat labels/tokens without embedding game
rules into the component.

Export paths: `src/index.ts`

| Prop               | Type                                       | Required | Default   | Description |
| ------------------ | ------------------------------------------ | -------- | --------- | ----------- |
| accessibilityLabel | `string \| undefined`                      | no       | —         |             |
| cardSize           | `TabletopCardSize \| undefined`            | no       | `'small'` |             |
| centerCards        | `readonly PlayingCardValue[] \| undefined` | no       | `[]`      |             |
| centerLabel        | `React.ReactNode \| undefined`             | no       | —         |             |
| centerSublabel     | `React.ReactNode \| undefined`             | no       | —         |             |
| colorScheme        | `TabletopColorOverrides \| undefined`      | no       | —         |             |
| disabled           | `boolean \| undefined`                     | no       | `false`   |             |
| seatCount          | `TabletopSeatCount \| undefined`           | no       | —         |             |
| seats              | `readonly TabletopSeatState[]`             | yes      | —         |             |
| shape              | `TabletopShape \| undefined`               | no       | `'oval'`  |             |
| testID             | `string \| undefined`                      | no       | —         |             |
