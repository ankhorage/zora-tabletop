import type { TabletopColorOverrides } from '../../colors';
import type { PlayingCardValue, TabletopCardSize } from '../../types';

export interface CardHandProps {
  readonly cards?: readonly PlayingCardValue[];
  readonly faceDownCards?: number;
  readonly size?: TabletopCardSize;
  readonly muted?: boolean;
  readonly colorScheme?: TabletopColorOverrides;
  readonly accessibilityLabel?: string;
  readonly testID?: string;
}
