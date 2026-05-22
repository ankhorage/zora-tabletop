import type React from 'react';

import type { TabletopColorOverrides } from '../../colors';
import type {
  PlayingCardValue,
  TabletopCardSize,
  TabletopSeatCount,
  TabletopSeatState,
  TabletopShape,
} from '../../types';

export interface TabletopTableProps {
  readonly seats: readonly TabletopSeatState[];
  readonly centerCards?: readonly PlayingCardValue[];
  readonly centerLabel?: React.ReactNode;
  readonly centerSublabel?: React.ReactNode;
  readonly shape?: TabletopShape;
  readonly seatCount?: TabletopSeatCount;
  readonly cardSize?: TabletopCardSize;
  readonly disabled?: boolean;
  readonly colorScheme?: TabletopColorOverrides;
  readonly accessibilityLabel?: string;
  readonly testID?: string;
}
