import type { PlayingCardValue } from './types';

const rankLabels: Readonly<Record<string, string>> = {
  A: 'ace',
  J: 'jack',
  K: 'king',
  Q: 'queen',
};

export function getPlayingCardLabel(card: PlayingCardValue): string {
  return `${getPlayingCardRankLabel(card.rank)} of ${card.suit}`;
}

export function createHiddenCardLabel(index?: number): string {
  if (index === undefined) return 'Hidden card';

  return `Hidden card ${index + 1}`;
}

function getPlayingCardRankLabel(rank: string): string {
  return rankLabels[rank] ?? rank;
}
