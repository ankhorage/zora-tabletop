export interface TabletopColorScheme {
  readonly cardBack: string;
  readonly cardBackBorder: string;
  readonly cardBorder: string;
  readonly cardSurface: string;
  readonly cardText: string;
  readonly mutedText: string;
  readonly redSuitText: string;
  readonly seatBorder: string;
  readonly seatMutedText: string;
  readonly seatSelectedBorder: string;
  readonly seatSurface: string;
  readonly seatText: string;
  readonly tableBorder: string;
  readonly tableFelt: string;
  readonly tableInnerBorder: string;
  readonly tableMutedText: string;
  readonly tableText: string;
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

interface RgbColor {
  readonly red: number;
  readonly green: number;
  readonly blue: number;
}

const DARK_TEXT_FALLBACK = '#111827';
const LIGHT_TEXT_FALLBACK = '#ffffff';
const MINIMUM_READABLE_CONTRAST = 4.5;

export function createTabletopColorScheme(
  theme: TabletopColorThemeShape,
  overrides: TabletopColorOverrides = {},
): TabletopColorScheme {
  const cardSurface = overrides.cardSurface ?? theme.semantics.neutral.surface;
  const seatSurface = overrides.seatSurface ?? theme.semantics.neutral.surface;
  const tableFelt = overrides.tableFelt ?? theme.semantics.action.primary.softBg;
  const tokenSurface = overrides.tokenSurface ?? theme.semantics.warning.softBg;

  const cardText =
    overrides.cardText ??
    resolveReadableTextColor(cardSurface, theme.semantics.content.default, LIGHT_TEXT_FALLBACK);
  const seatText =
    overrides.seatText ??
    resolveReadableTextColor(seatSurface, theme.semantics.content.default, LIGHT_TEXT_FALLBACK);
  const tableText =
    overrides.tableText ??
    resolveReadableTextColor(tableFelt, theme.semantics.content.default, LIGHT_TEXT_FALLBACK);
  const tokenText =
    overrides.tokenText ??
    resolveReadableTextColor(tokenSurface, theme.semantics.content.default, LIGHT_TEXT_FALLBACK);

  return {
    cardBack: overrides.cardBack ?? theme.semantics.warning.base,
    cardBackBorder: overrides.cardBackBorder ?? theme.semantics.neutral.border,
    cardBorder: overrides.cardBorder ?? theme.semantics.neutral.border,
    cardSurface,
    cardText,
    mutedText:
      overrides.mutedText ??
      resolveReadableTextColor(cardSurface, theme.semantics.content.muted, cardText),
    redSuitText:
      overrides.redSuitText ??
      resolveReadableTextColor(cardSurface, theme.semantics.warning.base, cardText),
    seatBorder: overrides.seatBorder ?? theme.semantics.neutral.divider,
    seatMutedText:
      overrides.seatMutedText ??
      resolveReadableTextColor(seatSurface, theme.semantics.content.muted, seatText),
    seatSelectedBorder: overrides.seatSelectedBorder ?? theme.semantics.action.primary.base,
    seatSurface,
    seatText,
    tableBorder: overrides.tableBorder ?? theme.semantics.warning.base,
    tableFelt,
    tableInnerBorder: overrides.tableInnerBorder ?? theme.semantics.neutral.divider,
    tableMutedText:
      overrides.tableMutedText ??
      resolveReadableTextColor(tableFelt, theme.semantics.content.muted, tableText),
    tableText,
    tokenSurface,
    tokenText,
  };
}

function resolveReadableTextColor(
  background: string,
  preferred: string,
  fallback: string,
): string {
  const preferredContrast = getContrastRatio(background, preferred);
  if (preferredContrast !== null && preferredContrast >= MINIMUM_READABLE_CONTRAST) {
    return preferred;
  }

  const candidates = uniqueColors([preferred, fallback, LIGHT_TEXT_FALLBACK, DARK_TEXT_FALLBACK]);
  const readableCandidate = candidates
    .map((candidate) => ({ candidate, contrast: getContrastRatio(background, candidate) }))
    .filter((entry): entry is { readonly candidate: string; readonly contrast: number } =>
      entry.contrast !== null,
    )
    .sort((left, right) => right.contrast - left.contrast)[0];

  return readableCandidate?.candidate ?? preferred;
}

function uniqueColors(colors: readonly string[]): string[] {
  return [...new Set(colors)];
}

function getContrastRatio(background: string, foreground: string): number | null {
  const backgroundColor = parseHexColor(background);
  const foregroundColor = parseHexColor(foreground);

  if (backgroundColor === null || foregroundColor === null) return null;

  const backgroundLuminance = getRelativeLuminance(backgroundColor);
  const foregroundLuminance = getRelativeLuminance(foregroundColor);
  const lighter = Math.max(backgroundLuminance, foregroundLuminance);
  const darker = Math.min(backgroundLuminance, foregroundLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

function parseHexColor(color: string): RgbColor | null {
  const value = color.trim();
  const match = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.exec(value);
  if (!match) return null;

  const hex = match[1];
  if (hex === undefined) return null;

  if (hex.length === 3) {
    return {
      red: parseInt(hex[0] + hex[0], 16),
      green: parseInt(hex[1] + hex[1], 16),
      blue: parseInt(hex[2] + hex[2], 16),
    };
  }

  return {
    red: parseInt(hex.slice(0, 2), 16),
    green: parseInt(hex.slice(2, 4), 16),
    blue: parseInt(hex.slice(4, 6), 16),
  };
}

function getRelativeLuminance(color: RgbColor): number {
  const red = normalizeColorChannel(color.red);
  const green = normalizeColorChannel(color.green);
  const blue = normalizeColorChannel(color.blue);

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function normalizeColorChannel(value: number): number {
  const normalized = value / 255;
  if (normalized <= 0.03928) return normalized / 12.92;
  return ((normalized + 0.055) / 1.055) ** 2.4;
}
