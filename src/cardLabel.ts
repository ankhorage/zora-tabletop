import type { PlayingCardValue } from './types';

export function getPlayingCardLabel(card: PlayingCardValue): string {
  return `${card.rank} ${card.suit}`;
}

export function createHiddenCardLabel(index?: number): string {
  if (index === undefined) return 'Hidden card';

  return `Hidden card ${index + 1}`;
}
