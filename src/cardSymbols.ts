import type { PlayingCardSuit } from './types';

const suitMarks: Readonly<Record<PlayingCardSuit, string>> = {
  clubs: '♣',
  diamonds: '♦',
  hearts: '♥',
  spades: '♠',
};

export function getPlayingCardSuitMark(suit: PlayingCardSuit): string {
  return suitMarks[suit];
}

export function isRedPlayingCardSuit(suit: PlayingCardSuit): boolean {
  return suit === 'diamonds' || suit === 'hearts';
}
