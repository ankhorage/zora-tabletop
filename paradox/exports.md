# Public API

## CardBack

Kind: `function`
Module: `src/components/card-back/CardBack.tsx`
Source: `src/components/card-back/CardBack.tsx:22:1`

Face-down playing-card primitive for hidden cards and decks.

Use `CardBack` when a card should be represented visually without exposing its
rank or suit. The component keeps a generic accessible label for hidden cards.

### Signatures

- `({
size = 'medium',
muted = false,
accessibilityLabel,
colorScheme,
testID,
}: CardBackProps) => React.JSX.Element`
  - {
    size = 'medium',
    muted = false,
    accessibilityLabel,
    colorScheme,
    testID,
    }: `CardBackProps`
  - returns: `React.JSX.Element`

## CardBackProps

Kind: `type`
Module: `src/components/card-back/types.ts`
Source: `src/components/card-back/types.ts:4:1`

### Members

| Name               | Kind     | Type                                                        | Required | Description |
| ------------------ | -------- | ----------------------------------------------------------- | -------- | ----------- |
| accessibilityLabel | property | `string \| undefined`                                       | no       |             |
| colorScheme        | property | `Partial<import("../..").TabletopColorScheme> \| undefined` | no       |             |
| muted              | property | `boolean \| undefined`                                      | no       |             |
| size               | property | `TabletopCardSize \| undefined`                             | no       |             |
| testID             | property | `string \| undefined`                                       | no       |             |

## CardHand

Kind: `function`
Module: `src/components/card-hand/CardHand.tsx`
Source: `src/components/card-hand/CardHand.tsx:24:1`

Compact row of visible and face-down playing cards.

Use `CardHand` when a seat, pile, or custom layout needs to show multiple cards
with consistent spacing, sizing, and muted state handling.

### Signatures

- `({
cards = [],
faceDownCards = 0,
size = 'medium',
muted = false,
colorScheme,
accessibilityLabel,
testID,
}: CardHandProps) => React.JSX.Element`
  - {
    cards = [],
    faceDownCards = 0,
    size = 'medium',
    muted = false,
    colorScheme,
    accessibilityLabel,
    testID,
    }: `CardHandProps`
  - returns: `React.JSX.Element`

## CardHandProps

Kind: `type`
Module: `src/components/card-hand/types.ts`
Source: `src/components/card-hand/types.ts:4:1`

### Members

| Name               | Kind     | Type                                                        | Required | Description |
| ------------------ | -------- | ----------------------------------------------------------- | -------- | ----------- |
| accessibilityLabel | property | `string \| undefined`                                       | no       |             |
| cards              | property | `readonly PlayingCardValue[] \| undefined`                  | no       |             |
| colorScheme        | property | `Partial<import("../..").TabletopColorScheme> \| undefined` | no       |             |
| faceDownCards      | property | `number \| undefined`                                       | no       |             |
| muted              | property | `boolean \| undefined`                                      | no       |             |
| size               | property | `TabletopCardSize \| undefined`                             | no       |             |
| testID             | property | `string \| undefined`                                       | no       |             |

## createPokerTrainingTableState

Kind: `function`
Module: `src/features/game-presentations/adapters/inbound/createPokerTrainingTableState.ts`
Source: `src/features/game-presentations/adapters/inbound/createPokerTrainingTableState.ts:20:1`

Adapts the table-relevant subset of a poker training task to generic tabletop presentation state.

The canonical poker ring is rotated so the hero occupies the first (bottom) tabletop seat.
Players omitted by the task are reconstructed as folded with the configured default stack.

### Signatures

- `(task: PokerTrainingTaskTableData, { defaultStackBigBlinds = 100 }?: CreatePokerTrainingTableStateOptions) => PokerTrainingTableState`
  - { defaultStackBigBlinds = 100 }: `CreatePokerTrainingTableStateOptions` (optional)
  - task: `PokerTrainingTaskTableData` — - Serializable poker training task data received by the generated application.
  - returns: `PokerTrainingTableState` — Seats and shared-table content ready for `TabletopTable`.

## CreatePokerTrainingTableStateOptions

Kind: `type`
Module: `src/types/pokerTraining.ts`
Source: `src/types/pokerTraining.ts:30:1`

### Members

| Name                  | Kind     | Type                  | Required | Description |
| --------------------- | -------- | --------------------- | -------- | ----------- |
| defaultStackBigBlinds | property | `number \| undefined` | no       |             |

## createTabletopColorScheme

Kind: `function`
Module: `src/colors.ts`
Source: `src/colors.ts:73:1`

Creates the theme-derived color palette used by tabletop primitives.

Use `createTabletopColorScheme` when custom components need to align with the
same card, table, seat, token, and contrast-aware foreground colors as the
built-in tabletop components.

### Signatures

- `(theme: TabletopColorThemeShape, overrides?: Partial<TabletopColorScheme>) => TabletopColorScheme`
  - overrides: `Partial<TabletopColorScheme>` (optional)
  - theme: `TabletopColorThemeShape`
  - returns: `TabletopColorScheme`

## createTabletopGameSeats

Kind: `function`
Module: `src/features/game-presentations/domain/createTabletopGameSeats.ts`
Source: `src/features/game-presentations/domain/createTabletopGameSeats.ts:25:1`

Joins an ordered game layout with the participant states currently present in a scene.

Missing participants retain their seat definition and receive the configured fallback state,
which lets card games represent folded, eliminated, disconnected, or otherwise inactive seats
without embedding those game rules in the tabletop renderer.

### Signatures

- `({
seats,
participants,
missingParticipantState = { disabled: true, muted: true },
}: CreateTabletopGameSeatsInput) => readonly TabletopSeatState[]`
  - {
    seats,
    participants,
    missingParticipantState = { disabled: true, muted: true },
    }: `CreateTabletopGameSeatsInput`
  - returns: `readonly TabletopSeatState[]` — Normalized tabletop seats in the same order as the supplied seat definitions.

## CreateTabletopGameSeatsInput

Kind: `type`
Module: `src/types/gamePresentation.ts`
Source: `src/types/gamePresentation.ts:15:1`

### Members

| Name                    | Kind     | Type                                                 | Required | Description |
| ----------------------- | -------- | ---------------------------------------------------- | -------- | ----------- |
| missingParticipantState | property | `Partial<TabletopGameSeatPresentation> \| undefined` | no       |             |
| participants            | property | `readonly TabletopGameParticipantState[]`            | yes      |             |
| seats                   | property | `readonly TabletopGameSeatDefinition[]`              | yes      |             |

## PlayingCard

Kind: `function`
Module: `src/components/playing-card/PlayingCard.tsx`
Source: `src/components/playing-card/PlayingCard.tsx:24:1`

Theme-aware face-up playing card primitive.

Use `PlayingCard` for visible card values in hands, shared table cards, piles,
or custom tabletop layouts. The component renders rank and suit glyphs and
exposes an accessible card label by default.

### Signatures

- `({
card,
size = 'medium',
selected = false,
muted = false,
accessibilityLabel,
colorScheme,
testID,
}: PlayingCardProps) => React.JSX.Element`
  - {
    card,
    size = 'medium',
    selected = false,
    muted = false,
    accessibilityLabel,
    colorScheme,
    testID,
    }: `PlayingCardProps`
  - returns: `React.JSX.Element`

## PlayingCardProps

Kind: `type`
Module: `src/components/playing-card/types.ts`
Source: `src/components/playing-card/types.ts:4:1`

### Members

| Name               | Kind     | Type                                                        | Required | Description |
| ------------------ | -------- | ----------------------------------------------------------- | -------- | ----------- |
| accessibilityLabel | property | `string \| undefined`                                       | no       |             |
| card               | property | `PlayingCardValue`                                          | yes      |             |
| colorScheme        | property | `Partial<import("../..").TabletopColorScheme> \| undefined` | no       |             |
| muted              | property | `boolean \| undefined`                                      | no       |             |
| selected           | property | `boolean \| undefined`                                      | no       |             |
| size               | property | `TabletopCardSize \| undefined`                             | no       |             |
| testID             | property | `string \| undefined`                                       | no       |             |

## PlayingCardSuit

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:3:1`

## PlayingCardValue

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:8:1`

### Members

| Name | Kind     | Type              | Required | Description |
| ---- | -------- | ----------------- | -------- | ----------- |
| rank | property | `string`          | yes      |             |
| suit | property | `PlayingCardSuit` | yes      |             |

## PokerTrainingPlayer

Kind: `type`
Module: `src/types/pokerTraining.ts`
Source: `src/types/pokerTraining.ts:9:1`

### Members

| Name     | Kind     | Type                                       | Required | Description |
| -------- | -------- | ------------------------------------------ | -------- | ----------- |
| bet      | property | `number \| undefined`                      | no       |             |
| cards    | property | `readonly PlayingCardValue[] \| undefined` | no       |             |
| folded   | property | `boolean \| undefined`                     | no       |             |
| isHero   | property | `boolean \| undefined`                     | no       |             |
| position | property | `string`                                   | yes      |             |
| stack    | property | `number \| undefined`                      | no       |             |

## PokerTrainingTable

Kind: `function`
Module: `src/features/game-presentations/adapters/inbound/PokerTrainingTable.tsx`
Source: `src/features/game-presentations/adapters/inbound/PokerTrainingTable.tsx:19:1`

Manifest-ready poker training pattern that reconstructs a complete table from task data.

Bind the raw training task object to `task`; the pattern maps sparse active-player data to a
full nine-seat presentation while leaving API execution in the generated application.

### Signatures

- `({
task = {},
defaultStackBigBlinds = 100,
accessibilityLabel,
...tableProps
}: PokerTrainingTableProps) => React.JSX.Element`
  - {
    task = {},
    defaultStackBigBlinds = 100,
    accessibilityLabel,
    ...tableProps
    }: `PokerTrainingTableProps`
  - returns: `React.JSX.Element`

## pokerTrainingTableMeta

Kind: `value`
Module: `src/features/game-presentations/adapters/inbound/pokerTrainingTableMeta.ts`
Source: `src/features/game-presentations/adapters/inbound/pokerTrainingTableMeta.ts:1:14`

## PokerTrainingTableProps

Kind: `type`
Module: `src/types/pokerTraining.ts`
Source: `src/types/pokerTraining.ts:42:1`

### Members

| Name                  | Kind     | Type                                                     | Required | Description |
| --------------------- | -------- | -------------------------------------------------------- | -------- | ----------- |
| accessibilityLabel    | property | `string \| undefined`                                    | no       |             |
| cardSize              | property | `TabletopCardSize \| undefined`                          | no       |             |
| colorScheme           | property | `Partial<import("..").TabletopColorScheme> \| undefined` | no       |             |
| defaultStackBigBlinds | property | `number \| undefined`                                    | no       |             |
| disabled              | property | `boolean \| undefined`                                   | no       |             |
| shape                 | property | `TabletopShape \| undefined`                             | no       |             |
| task                  | property | `PokerTrainingTaskTableData \| undefined`                | no       |             |
| testID                | property | `string \| undefined`                                    | no       |             |

## PokerTrainingTableState

Kind: `type`
Module: `src/types/pokerTraining.ts`
Source: `src/types/pokerTraining.ts:34:1`

### Members

| Name               | Kind     | Type                           | Required | Description |
| ------------------ | -------- | ------------------------------ | -------- | ----------- |
| accessibilityLabel | property | `string`                       | yes      |             |
| centerCards        | property | `readonly PlayingCardValue[]`  | yes      |             |
| centerLabel        | property | `string \| undefined`          | no       |             |
| centerSublabel     | property | `string \| undefined`          | no       |             |
| seats              | property | `readonly TabletopSeatState[]` | yes      |             |

## PokerTrainingTaskTableData

Kind: `type`
Module: `src/types/pokerTraining.ts`
Source: `src/types/pokerTraining.ts:18:1`

### Members

| Name           | Kind     | Type                                                             | Required | Description |
| -------------- | -------- | ---------------------------------------------------------------- | -------- | ----------- |
| blinds         | property | `{ readonly small: number; readonly big: number; } \| undefined` | no       |             |
| communityCards | property | `readonly PlayingCardValue[] \| undefined`                       | no       |             |
| heroCards      | property | `readonly PlayingCardValue[] \| undefined`                       | no       |             |
| heroPosition   | property | `string \| undefined`                                            | no       |             |
| players        | property | `readonly PokerTrainingPlayer[] \| undefined`                    | no       |             |
| pot            | property | `number \| undefined`                                            | no       |             |

## TabletopCardSize

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:4:1`

## TabletopColorOverrides

Kind: `unknown`
Module: `src/colors.ts`
Source: `src/colors.ts:23:1`

## TabletopColorScheme

Kind: `type`
Module: `src/colors.ts`
Source: `src/colors.ts:1:1`

### Members

| Name               | Kind     | Type     | Required | Description |
| ------------------ | -------- | -------- | -------- | ----------- |
| cardBack           | property | `string` | yes      |             |
| cardBackBorder     | property | `string` | yes      |             |
| cardBorder         | property | `string` | yes      |             |
| cardSurface        | property | `string` | yes      |             |
| cardText           | property | `string` | yes      |             |
| mutedText          | property | `string` | yes      |             |
| redSuitText        | property | `string` | yes      |             |
| seatBorder         | property | `string` | yes      |             |
| seatMutedText      | property | `string` | yes      |             |
| seatSelectedBorder | property | `string` | yes      |             |
| seatSurface        | property | `string` | yes      |             |
| seatText           | property | `string` | yes      |             |
| tableBorder        | property | `string` | yes      |             |
| tableFelt          | property | `string` | yes      |             |
| tableInnerBorder   | property | `string` | yes      |             |
| tableMutedText     | property | `string` | yes      |             |
| tableText          | property | `string` | yes      |             |
| tokenSurface       | property | `string` | yes      |             |
| tokenText          | property | `string` | yes      |             |

## TabletopGameParticipantState

Kind: `type`
Module: `src/types/gamePresentation.ts`
Source: `src/types/gamePresentation.ts:10:1`

### Members

| Name   | Kind     | Type                                    | Required | Description |
| ------ | -------- | --------------------------------------- | -------- | ----------- |
| seatId | property | `string`                                | yes      |             |
| state  | property | `Partial<TabletopGameSeatPresentation>` | yes      |             |

## TabletopGameSeatDefinition

Kind: `type`
Module: `src/types/gamePresentation.ts`
Source: `src/types/gamePresentation.ts:5:1`

### Members

| Name         | Kind     | Type                           | Required | Description |
| ------------ | -------- | ------------------------------ | -------- | ----------- |
| defaultState | property | `TabletopGameSeatPresentation` | yes      |             |
| id           | property | `string`                       | yes      |             |

## TabletopGameSeatPresentation

Kind: `unknown`
Module: `src/types/gamePresentation.ts`
Source: `src/types/gamePresentation.ts:3:1`

## TabletopSeatCount

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:6:1`

## TabletopSeatState

Kind: `type`
Module: `src/types.ts`
Source: `src/types.ts:13:1`

### Members

| Name               | Kind     | Type                                       | Required | Description |
| ------------------ | -------- | ------------------------------------------ | -------- | ----------- |
| accessibilityLabel | property | `string \| undefined`                      | no       |             |
| cards              | property | `readonly PlayingCardValue[] \| undefined` | no       |             |
| disabled           | property | `boolean \| undefined`                     | no       |             |
| faceDownCards      | property | `number \| undefined`                      | no       |             |
| id                 | property | `string`                                   | yes      |             |
| label              | property | `React.ReactNode`                          | yes      |             |
| muted              | property | `boolean \| undefined`                     | no       |             |
| selected           | property | `boolean \| undefined`                     | no       |             |
| sublabel           | property | `React.ReactNode`                          | no       |             |
| tokenLabel         | property | `React.ReactNode`                          | no       |             |

## TabletopShape

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:5:1`

## TabletopTable

Kind: `function`
Module: `src/components/tabletop-table/TabletopTable.tsx`
Source: `src/components/tabletop-table/TabletopTable.tsx:42:1`

Responsive tabletop surface for generic card-game and board-game scenes.

Use `TabletopTable` to arrange seats around a themed table surface, display
shared center cards, and show neutral seat labels/tokens without embedding game
rules into the component.

### Signatures

- `({
seats,
centerCards = [],
centerLabel,
centerSublabel,
shape = 'oval',
seatCount,
cardSize = 'small',
disabled = false,
colorScheme,
accessibilityLabel,
testID,
}: TabletopTableProps) => React.JSX.Element`
  - {
    seats,
    centerCards = [],
    centerLabel,
    centerSublabel,
    shape = 'oval',
    seatCount,
    cardSize = 'small',
    disabled = false,
    colorScheme,
    accessibilityLabel,
    testID,
    }: `TabletopTableProps`
  - returns: `React.JSX.Element`

## tabletopTableMeta

Kind: `value`
Module: `src/meta.ts`
Source: `src/meta.ts:1:14`

## TabletopTableProps

Kind: `type`
Module: `src/components/tabletop-table/types.ts`
Source: `src/components/tabletop-table/types.ts:12:1`

### Members

| Name               | Kind     | Type                                                        | Required | Description |
| ------------------ | -------- | ----------------------------------------------------------- | -------- | ----------- |
| accessibilityLabel | property | `string \| undefined`                                       | no       |             |
| cardSize           | property | `TabletopCardSize \| undefined`                             | no       |             |
| centerCards        | property | `readonly PlayingCardValue[] \| undefined`                  | no       |             |
| centerLabel        | property | `React.ReactNode`                                           | no       |             |
| centerSublabel     | property | `React.ReactNode`                                           | no       |             |
| colorScheme        | property | `Partial<import("../..").TabletopColorScheme> \| undefined` | no       |             |
| disabled           | property | `boolean \| undefined`                                      | no       |             |
| seatCount          | property | `TabletopSeatCount \| undefined`                            | no       |             |
| seats              | property | `readonly TabletopSeatState[]`                              | yes      |             |
| shape              | property | `TabletopShape \| undefined`                                | no       |             |
| testID             | property | `string \| undefined`                                       | no       |             |

## ZORA_PLUGIN_METADATA

Kind: `value`
Module: `src/registry.ts`
Source: `src/registry.ts:9:14`

## ZORA_TABLETOP_COMPONENT_META

Kind: `value`
Module: `src/registry.ts`
Source: `src/registry.ts:4:14`

## ZORA_TABLETOP_COMPONENT_REGISTRY

Kind: `value`
Module: `src/plugin.ts`
Source: `src/plugin.ts:5:14`

## ZORA_TABLETOP_PLUGIN

Kind: `value`
Module: `src/plugin.ts`
Source: `src/plugin.ts:7:14`
