import { describe, expect, test } from 'bun:test';

import { getPlayingCardLabel } from './cardLabel';

describe('cardLabel', () => {
  test('creates accessible rank and suit labels', () => {
    expect(getPlayingCardLabel({ rank: 'A', suit: 'hearts' })).toBe('ace of hearts');
    expect(getPlayingCardLabel({ rank: 'K', suit: 'clubs' })).toBe('king of clubs');
    expect(getPlayingCardLabel({ rank: '10', suit: 'spades' })).toBe('10 of spades');
  });
});
