import { describe, expect, test } from 'bun:test';

import { getTabletopSeatCardSize } from './tableLayout';

describe('tableLayout', () => {
  test('promotes selected compact seat cards for readability', () => {
    expect(getTabletopSeatCardSize({ selected: true, tableCardSize: 'small' })).toBe('medium');
  });

  test('preserves non-selected and already readable card sizes', () => {
    expect(getTabletopSeatCardSize({ selected: false, tableCardSize: 'small' })).toBe('small');
    expect(getTabletopSeatCardSize({ selected: true, tableCardSize: 'medium' })).toBe('medium');
    expect(getTabletopSeatCardSize({ selected: true, tableCardSize: 'large' })).toBe('large');
  });
});
