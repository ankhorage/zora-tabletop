import { describe, expect, test } from 'bun:test';

import {
  getTabletopSeatPosition,
  getTabletopSeatPositions,
  normalizeTabletopSeatCount,
} from './tablePositions';

describe('normalizeTabletopSeatCount', () => {
  test('clamps low counts to two seats', () => {
    expect(normalizeTabletopSeatCount(0)).toBe(2);
    expect(normalizeTabletopSeatCount(1)).toBe(2);
    expect(normalizeTabletopSeatCount(2)).toBe(2);
  });

  test('preserves supported middle counts', () => {
    expect(normalizeTabletopSeatCount(6)).toBe(6);
    expect(normalizeTabletopSeatCount(9)).toBe(9);
  });

  test('clamps high counts to ten seats', () => {
    expect(normalizeTabletopSeatCount(11)).toBe(10);
    expect(normalizeTabletopSeatCount(20)).toBe(10);
  });
});

describe('getTabletopSeatPositions', () => {
  test('returns the expected number of positions', () => {
    expect(getTabletopSeatPositions(2)).toHaveLength(2);
    expect(getTabletopSeatPositions(9)).toHaveLength(9);
    expect(getTabletopSeatPositions(10)).toHaveLength(10);
  });
});

describe('getTabletopSeatPosition', () => {
  test('wraps indexes within the normalized seat count', () => {
    expect(getTabletopSeatPosition(0, 2)).toEqual({ top: '82%', left: '50%' });
    expect(getTabletopSeatPosition(2, 2)).toEqual({ top: '82%', left: '50%' });
  });
});
