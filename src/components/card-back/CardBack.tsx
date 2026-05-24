import { useZoraTheme } from '@ankhorage/zora';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { createHiddenCardLabel } from '../../cardLabel';
import { getTabletopCardDimensions } from '../../cardSizing';
import { createTabletopColorScheme } from '../../colors';
import type { CardBackProps } from './types';

/***
 * Face-down playing-card primitive for hidden cards and decks.
 *
 * Use `CardBack` when a card should be represented visually without exposing its
 * rank or suit. The component keeps a generic accessible label for hidden cards.
 *
 * @readme
 * @example Hidden cards
 * ```tsx
 * <CardBack size="small" />
 * ```
 */
export function CardBack({
  size = 'medium',
  muted = false,
  accessibilityLabel,
  colorScheme,
  testID,
}: CardBackProps) {
  const { theme } = useZoraTheme();
  const colors = React.useMemo(
    () => createTabletopColorScheme(theme, colorScheme),
    [colorScheme, theme],
  );
  const dimensions = getTabletopCardDimensions(size);

  return (
    <View
      accessibilityLabel={accessibilityLabel ?? createHiddenCardLabel()}
      accessibilityRole="image"
      style={[
        styles.card,
        {
          backgroundColor: colors.cardBack,
          borderColor: colors.cardBackBorder,
          borderRadius: dimensions.radius,
          height: dimensions.height,
          opacity: muted ? 0.48 : 1,
          width: dimensions.width,
        },
      ]}
      testID={testID}
    >
      <View
        style={[
          styles.inner,
          {
            borderColor: colors.cardBackBorder,
            borderRadius: Math.max(2, dimensions.radius - 3),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
  },
  inner: {
    borderWidth: 1,
    height: '68%',
    opacity: 0.48,
    width: '68%',
  },
});
