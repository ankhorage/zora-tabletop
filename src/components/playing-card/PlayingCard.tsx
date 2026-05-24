import { useZoraTheme } from '@ankhorage/zora';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { getPlayingCardLabel } from '../../cardLabel';
import { getTabletopCardDimensions } from '../../cardSizing';
import { createTabletopColorScheme } from '../../colors';
import type { PlayingCardSuit } from '../../types';
import type { PlayingCardProps } from './types';

const suitMarks: Readonly<Record<PlayingCardSuit, string>> = {
  clubs: 'C',
  diamonds: 'D',
  hearts: 'H',
  spades: 'S',
};

function isRedSuit(suit: PlayingCardSuit): boolean {
  return suit === 'diamonds' || suit === 'hearts';
}

/***
 * Theme-aware face-up playing card primitive.
 *
 * Use `PlayingCard` for visible card values in hands, shared table cards, piles,
 * or custom tabletop layouts. The component renders rank and suit text and exposes
 * an accessible card label by default.
 *
 * @readme
 * @example Face-up card
 * ```tsx
 * <PlayingCard card={{ rank: 'A', suit: 'spades' }} selected />
 * ```
 */
export function PlayingCard({
  card,
  size = 'medium',
  selected = false,
  muted = false,
  accessibilityLabel,
  colorScheme,
  testID,
}: PlayingCardProps) {
  const { theme } = useZoraTheme();
  const colors = React.useMemo(
    () => createTabletopColorScheme(theme, colorScheme),
    [colorScheme, theme],
  );
  const dimensions = getTabletopCardDimensions(size);
  const suitColor = isRedSuit(card.suit) ? colors.redSuitText : colors.cardText;

  return (
    <View
      accessibilityLabel={accessibilityLabel ?? getPlayingCardLabel(card)}
      accessibilityRole="image"
      style={[
        styles.card,
        {
          backgroundColor: colors.cardSurface,
          borderColor: selected ? colors.seatSelectedBorder : colors.cardBorder,
          borderRadius: dimensions.radius,
          height: dimensions.height,
          opacity: muted ? 0.48 : 1,
          width: dimensions.width,
        },
      ]}
      testID={testID}
    >
      <Text
        selectable={false}
        style={[
          styles.rank,
          {
            color: suitColor,
            fontSize: dimensions.rankFontSize,
            lineHeight: dimensions.rankFontSize + 4,
          },
        ]}
      >
        {card.rank}
      </Text>
      <Text
        selectable={false}
        style={[
          styles.suit,
          {
            color: suitColor,
            fontSize: dimensions.suitFontSize,
            lineHeight: dimensions.suitFontSize + 3,
          },
        ]}
      >
        {suitMarks[card.suit]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
  },
  rank: {
    fontWeight: '800',
  },
  suit: {
    fontWeight: '700',
    marginTop: -2,
  },
});
