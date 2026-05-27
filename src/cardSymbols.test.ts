import { describe, expect, test } from 'bun:test';

import { getPlayingCardSuitMark, isRedPlayingCardSuit } from './cardSymbols';

describe('cardSymbols', () => {
  test('maps card suits to visual glyphs', () => {
    expect(getPlayingCardSuitMark('clubs')).toBe('♣');
    expect(getPlayingCardSuitMark('diamonds')).toBe('♦');
    expect(getPlayingCardSuitMark('hearts')).toBe('♥');
    expect(getPlayingCardSuitMark('spades')).toBe('♠');
  });

  test('identifies red suits', () => {
    expect(isRedPlayingCardSuit('diamonds')).toBe(true);
    expect(isRedPlayingCardSuit('hearts')).toBe(true);
    expect(isRedPlayingCardSuit('clubs')).toBe(false);
    expect(isRedPlayingCardSuit('spades')).toBe(false);
  });
});
