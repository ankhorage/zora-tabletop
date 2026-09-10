import type { TabletopColorOverrides } from '../colors';
import type {
  PlayingCardValue,
  TabletopCardSize,
  TabletopSeatState,
  TabletopShape,
} from '../types';

export interface PokerTrainingPlayer {
  readonly position: string;
  readonly stack?: number;
  readonly bet?: number;
  readonly cards?: readonly PlayingCardValue[];
  readonly folded?: boolean;
  readonly isHero?: boolean;
}

export interface PokerTrainingTaskTableData {
  readonly blinds?: {
    readonly small: number;
    readonly big: number;
  };
  readonly heroPosition?: string;
  readonly heroCards?: readonly PlayingCardValue[];
  readonly communityCards?: readonly PlayingCardValue[];
  readonly pot?: number;
  readonly players?: readonly PokerTrainingPlayer[];
}

export interface CreatePokerTrainingTableStateOptions {
  readonly defaultStackBigBlinds?: number;
}

export interface PokerTrainingTableState {
  readonly seats: readonly TabletopSeatState[];
  readonly centerCards: readonly PlayingCardValue[];
  readonly centerLabel?: string;
  readonly centerSublabel?: string;
  readonly accessibilityLabel: string;
}

export interface PokerTrainingTableProps {
  readonly task?: PokerTrainingTaskTableData;
  readonly defaultStackBigBlinds?: number;
  readonly shape?: TabletopShape;
  readonly cardSize?: TabletopCardSize;
  readonly disabled?: boolean;
  readonly colorScheme?: TabletopColorOverrides;
  readonly accessibilityLabel?: string;
  readonly testID?: string;
}
