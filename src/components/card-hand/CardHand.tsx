import React from 'react';
import { StyleSheet, View } from 'react-native';

import { CardBack } from '../card-back';
import { PlayingCard } from '../playing-card';
import type { CardHandProps } from './types';

function createFaceDownCards(count: number): readonly number[] {
  return Array.from({ length: Math.max(0, count) }, (_, index) => index);
}

/***
 * Compact row of visible and face-down playing cards.
 *
 * Use `CardHand` when a seat, pile, or custom layout needs to show multiple cards
 * with consistent spacing, sizing, and muted state handling.
 *
 * @readme
 * @example Mixed hand
 * ```tsx
 * <CardHand cards={[{ rank: 'Q', suit: 'hearts' }]} faceDownCards={1} />
 * ```
 */
export function CardHand({
  cards = [],
  faceDownCards = 0,
  size = 'medium',
  muted = false,
  colorScheme,
  accessibilityLabel,
  testID,
}: CardHandProps) {
  const hiddenCards = createFaceDownCards(faceDownCards);

  return (
    <View accessibilityLabel={accessibilityLabel} style={styles.hand} testID={testID}>
      {cards.map((card, index) => (
        <PlayingCard
          card={card}
          colorScheme={colorScheme}
          key={`${card.rank}-${card.suit}-${index}`}
          muted={muted}
          size={size}
          testID={testID ? `${testID}-card-${index}` : undefined}
        />
      ))}
      {hiddenCards.map((index) => (
        <CardBack
          colorScheme={colorScheme}
          key={`hidden-${index}`}
          muted={muted}
          size={size}
          testID={testID ? `${testID}-hidden-${index}` : undefined}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  hand: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
  },
});
