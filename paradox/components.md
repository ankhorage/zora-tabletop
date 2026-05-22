# Components

## CardBack

Source: `src/components/card-back/CardBack.tsx:10:1`

Export paths: `src/index.ts`

| Prop               | Type                                  | Required | Default    | Description |
| ------------------ | ------------------------------------- | -------- | ---------- | ----------- |
| accessibilityLabel | `string \| undefined`                 | no       | —          |             |
| colorScheme        | `TabletopColorOverrides \| undefined` | no       | —          |             |
| muted              | `boolean \| undefined`                | no       | `false`    |             |
| size               | `TabletopCardSize \| undefined`       | no       | `'medium'` |             |
| testID             | `string \| undefined`                 | no       | —          |             |

## CardHand

Source: `src/components/card-hand/CardHand.tsx:12:1`

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

Source: `src/components/playing-card/PlayingCard.tsx:22:1`

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

Source: `src/components/tabletop-table/TabletopTable.tsx:24:1`

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
