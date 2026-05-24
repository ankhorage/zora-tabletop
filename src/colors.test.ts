import { describe, expect, test } from 'bun:test';

import { createTabletopColorScheme, type TabletopColorThemeShape } from './colors';

const baseTheme = {
  semantics: {
    action: {
      primary: {
        base: '#047857',
        softBg: '#047857',
      },
    },
    content: {
      default: '#047857',
      muted: '#059669',
    },
    neutral: {
      border: '#d1d5db',
      divider: '#e5e7eb',
      surface: '#ffffff',
      surfaceHover: '#f9fafb',
    },
    warning: {
      base: '#b45309',
      softBg: '#fef3c7',
    },
  },
} satisfies TabletopColorThemeShape;

describe('createTabletopColorScheme', () => {
  test('derives readable table text when preferred theme text matches the table surface', () => {
    const colors = createTabletopColorScheme(baseTheme);

    expect(colors.tableFelt).toBe('#047857');
    expect(colors.tableText).toBe('#ffffff');
    expect(colors.tableMutedText).toBe('#ffffff');
  });

  test('derives readable seat text for dark custom seat surfaces', () => {
    const colors = createTabletopColorScheme(baseTheme, {
      seatSurface: '#064e3b',
    });

    expect(colors.seatText).toBe('#ffffff');
    expect(colors.seatMutedText).toBe('#ffffff');
  });

  test('keeps explicit readable text overrides', () => {
    const colors = createTabletopColorScheme(baseTheme, {
      seatSurface: '#064e3b',
      seatText: '#fef3c7',
      tableText: '#fef3c7',
    });

    expect(colors.seatText).toBe('#fef3c7');
    expect(colors.tableText).toBe('#fef3c7');
  });
});
