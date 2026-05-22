import type { TabletopCardSize } from './types';

export interface TabletopCardDimensions {
  readonly width: number;
  readonly height: number;
  readonly radius: number;
  readonly rankFontSize: number;
  readonly suitFontSize: number;
}

const cardDimensions: Readonly<Record<TabletopCardSize, TabletopCardDimensions>> = {
  large: {
    width: 56,
    height: 80,
    radius: 8,
    rankFontSize: 20,
    suitFontSize: 16,
  },
  medium: {
    width: 40,
    height: 56,
    radius: 6,
    rankFontSize: 15,
    suitFontSize: 12,
  },
  small: {
    width: 28,
    height: 40,
    radius: 5,
    rankFontSize: 11,
    suitFontSize: 9,
  },
};

export function getTabletopCardDimensions(size: TabletopCardSize): TabletopCardDimensions {
  return cardDimensions[size];
}
