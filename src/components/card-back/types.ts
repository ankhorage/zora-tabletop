import type { TabletopColorOverrides } from '../../colors';
import type { TabletopCardSize } from '../../types';

export interface CardBackProps {
  readonly size?: TabletopCardSize;
  readonly muted?: boolean;
  readonly accessibilityLabel?: string;
  readonly colorScheme?: TabletopColorOverrides;
  readonly testID?: string;
}
