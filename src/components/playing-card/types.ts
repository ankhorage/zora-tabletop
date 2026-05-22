import type { TabletopColorOverrides } from '../../colors';
import type { PlayingCardValue, TabletopCardSize } from '../../types';

export interface PlayingCardProps {
  readonly card: PlayingCardValue;
  readonly size?: TabletopCardSize;
  readonly selected?: boolean;
  readonly muted?: boolean;
  readonly accessibilityLabel?: string;
  readonly colorScheme?: TabletopColorOverrides;
  readonly testID?: string;
}
