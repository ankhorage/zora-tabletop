import type React from 'react';

export type PlayingCardSuit = 'clubs' | 'diamonds' | 'hearts' | 'spades';
export type TabletopCardSize = 'large' | 'medium' | 'small';
export type TabletopShape = 'circle' | 'oval' | 'rounded';
export type TabletopSeatCount = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface PlayingCardValue {
  readonly rank: string;
  readonly suit: PlayingCardSuit;
}

export interface TabletopSeatState {
  readonly id: string;
  readonly label: React.ReactNode;
  readonly sublabel?: React.ReactNode;
  readonly cards?: readonly PlayingCardValue[];
  readonly faceDownCards?: number;
  readonly selected?: boolean;
  readonly muted?: boolean;
  readonly disabled?: boolean;
  readonly tokenLabel?: React.ReactNode;
  readonly accessibilityLabel?: string;
}
