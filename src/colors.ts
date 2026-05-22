export interface TabletopColorScheme {
  readonly cardBack: string;
  readonly cardBackBorder: string;
  readonly cardBorder: string;
  readonly cardSurface: string;
  readonly cardText: string;
  readonly mutedText: string;
  readonly redSuitText: string;
  readonly seatBorder: string;
  readonly seatSelectedBorder: string;
  readonly seatSurface: string;
  readonly tableBorder: string;
  readonly tableFelt: string;
  readonly tableInnerBorder: string;
  readonly tokenSurface: string;
  readonly tokenText: string;
}

export type TabletopColorOverrides = Partial<TabletopColorScheme>;

export interface TabletopColorThemeShape {
  semantics: {
    action: {
      primary: {
        base: string;
        softBg: string;
      };
    };
    content: {
      default: string;
      muted: string;
    };
    neutral: {
      border: string;
      divider: string;
      surface: string;
      surfaceHover: string;
    };
    warning: {
      base: string;
      softBg: string;
    };
  };
}

export function createTabletopColorScheme(
  theme: TabletopColorThemeShape,
  overrides: TabletopColorOverrides = {},
): TabletopColorScheme {
  return {
    cardBack: overrides.cardBack ?? theme.semantics.warning.base,
    cardBackBorder: overrides.cardBackBorder ?? theme.semantics.neutral.border,
    cardBorder: overrides.cardBorder ?? theme.semantics.neutral.border,
    cardSurface: overrides.cardSurface ?? theme.semantics.neutral.surface,
    cardText: overrides.cardText ?? theme.semantics.content.default,
    mutedText: overrides.mutedText ?? theme.semantics.content.muted,
    redSuitText: overrides.redSuitText ?? theme.semantics.warning.base,
    seatBorder: overrides.seatBorder ?? theme.semantics.neutral.divider,
    seatSelectedBorder: overrides.seatSelectedBorder ?? theme.semantics.action.primary.base,
    seatSurface: overrides.seatSurface ?? theme.semantics.neutral.surface,
    tableBorder: overrides.tableBorder ?? theme.semantics.warning.base,
    tableFelt: overrides.tableFelt ?? theme.semantics.action.primary.softBg,
    tableInnerBorder: overrides.tableInnerBorder ?? theme.semantics.neutral.divider,
    tokenSurface: overrides.tokenSurface ?? theme.semantics.warning.softBg,
    tokenText: overrides.tokenText ?? theme.semantics.content.default,
  };
}
