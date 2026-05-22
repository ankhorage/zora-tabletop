# Public API

## CardBack

Kind: `function`
Module: `src/components/card-back/CardBack.tsx`
Source: `src/components/card-back/CardBack.tsx:10:1`

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

| Name               | Kind     | Type                                                                                                    | Required | Description |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| accessibilityLabel | property | `string \| undefined`                                                                                   | no       |             |
| colorScheme        | property | `Partial<import("/Users/a_rtiphishl_e/git/zora-tabletop/src/colors").TabletopColorScheme> \| undefined` | no       |             |
| muted              | property | `boolean \| undefined`                                                                                  | no       |             |
| size               | property | `TabletopCardSize \| undefined`                                                                         | no       |             |
| testID             | property | `string \| undefined`                                                                                   | no       |             |

## CardHand

Kind: `function`
Module: `src/components/card-hand/CardHand.tsx`
Source: `src/components/card-hand/CardHand.tsx:12:1`

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

| Name               | Kind     | Type                                                                                                    | Required | Description |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| accessibilityLabel | property | `string \| undefined`                                                                                   | no       |             |
| cards              | property | `readonly PlayingCardValue[] \| undefined`                                                              | no       |             |
| colorScheme        | property | `Partial<import("/Users/a_rtiphishl_e/git/zora-tabletop/src/colors").TabletopColorScheme> \| undefined` | no       |             |
| faceDownCards      | property | `number \| undefined`                                                                                   | no       |             |
| muted              | property | `boolean \| undefined`                                                                                  | no       |             |
| size               | property | `TabletopCardSize \| undefined`                                                                         | no       |             |
| testID             | property | `string \| undefined`                                                                                   | no       |             |

## createTabletopColorScheme

Kind: `function`
Module: `src/colors.ts`
Source: `src/colors.ts:46:1`

### Signatures

- `(theme: TabletopColorThemeShape, overrides?: Partial<TabletopColorScheme>) => TabletopColorScheme`
  - overrides: `Partial<TabletopColorScheme>` (optional)
  - theme: `TabletopColorThemeShape`
  - returns: `TabletopColorScheme`

## PlayingCard

Kind: `function`
Module: `src/components/playing-card/PlayingCard.tsx`
Source: `src/components/playing-card/PlayingCard.tsx:22:1`

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

| Name               | Kind     | Type                                                                                                    | Required | Description |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| accessibilityLabel | property | `string \| undefined`                                                                                   | no       |             |
| card               | property | `PlayingCardValue`                                                                                      | yes      |             |
| colorScheme        | property | `Partial<import("/Users/a_rtiphishl_e/git/zora-tabletop/src/colors").TabletopColorScheme> \| undefined` | no       |             |
| muted              | property | `boolean \| undefined`                                                                                  | no       |             |
| selected           | property | `boolean \| undefined`                                                                                  | no       |             |
| size               | property | `TabletopCardSize \| undefined`                                                                         | no       |             |
| testID             | property | `string \| undefined`                                                                                   | no       |             |

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

## TabletopCardSize

Kind: `unknown`
Module: `src/types.ts`
Source: `src/types.ts:4:1`

## TabletopColorOverrides

Kind: `unknown`
Module: `src/colors.ts`
Source: `src/colors.ts:19:1`

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
| seatSelectedBorder | property | `string` | yes      |             |
| seatSurface        | property | `string` | yes      |             |
| tableBorder        | property | `string` | yes      |             |
| tableFelt          | property | `string` | yes      |             |
| tableInnerBorder   | property | `string` | yes      |             |
| tokenSurface       | property | `string` | yes      |             |
| tokenText          | property | `string` | yes      |             |

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
Source: `src/components/tabletop-table/TabletopTable.tsx:24:1`

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

## TabletopTableProps

Kind: `type`
Module: `src/components/tabletop-table/types.ts`
Source: `src/components/tabletop-table/types.ts:12:1`

### Members

| Name               | Kind     | Type                                                                                                    | Required | Description |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| accessibilityLabel | property | `string \| undefined`                                                                                   | no       |             |
| cardSize           | property | `TabletopCardSize \| undefined`                                                                         | no       |             |
| centerCards        | property | `readonly PlayingCardValue[] \| undefined`                                                              | no       |             |
| centerLabel        | property | `React.ReactNode`                                                                                       | no       |             |
| centerSublabel     | property | `React.ReactNode`                                                                                       | no       |             |
| colorScheme        | property | `Partial<import("/Users/a_rtiphishl_e/git/zora-tabletop/src/colors").TabletopColorScheme> \| undefined` | no       |             |
| disabled           | property | `boolean \| undefined`                                                                                  | no       |             |
| seatCount          | property | `TabletopSeatCount \| undefined`                                                                        | no       |             |
| seats              | property | `readonly TabletopSeatState[]`                                                                          | yes      |             |
| shape              | property | `TabletopShape \| undefined`                                                                            | no       |             |
| testID             | property | `string \| undefined`                                                                                   | no       |             |
