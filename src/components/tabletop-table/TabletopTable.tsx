import { useZoraTheme } from '@ankhorage/zora';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createTabletopColorScheme } from '../../colors';
import { getTabletopSeatPosition } from '../../tablePositions';
import { getTabletopSeatCardSize } from '../../tableLayout';
import type { TabletopSeatState } from '../../types';
import { CardHand } from '../card-hand';
import type { TabletopTableProps } from './types';

function createSeatAccessibilityLabel(seat: TabletopSeatState): string | undefined {
  if (seat.accessibilityLabel !== undefined) return seat.accessibilityLabel;
  if (typeof seat.label !== 'string') return undefined;

  const parts = [seat.label];
  if (typeof seat.sublabel === 'string') parts.push(seat.sublabel);
  if (typeof seat.tokenLabel === 'string') parts.push(seat.tokenLabel);
  if (seat.selected) parts.push('selected');
  if (seat.muted) parts.push('muted');

  return parts.join(', ');
}

/***
 * Responsive tabletop surface for generic card-game and board-game scenes.
 *
 * Use `TabletopTable` to arrange seats around a themed table surface, display
 * shared center cards, and show neutral seat labels/tokens without embedding game
 * rules into the component.
 *
 * @readme
 * @example Basic table
 * ```tsx
 * <TabletopTable
 *   seats={seats}
 *   centerCards={[{ rank: 'A', suit: 'spades' }]}
 *   centerLabel="Round 1"
 * />
 * ```
 */
export function TabletopTable({
  seats,
  centerCards = [],
  centerLabel,
  centerSublabel,
  shape = 'oval',
  seatCount,
  cardSize = 'small',
  disabled = false,
  colorScheme,
  accessibilityLabel,
  testID,
}: TabletopTableProps) {
  const { theme } = useZoraTheme();
  const colors = React.useMemo(
    () => createTabletopColorScheme(theme, colorScheme),
    [colorScheme, theme],
  );
  const resolvedSeatCount = seatCount ?? seats.length;

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      style={[styles.root, { opacity: disabled ? 0.56 : 1 }]}
      testID={testID}
    >
      <View
        style={[
          styles.surface,
          shape === 'circle' ? styles.circleSurface : styles.ovalSurface,
          shape === 'rounded' ? styles.roundedSurface : null,
          {
            backgroundColor: colors.tableFelt,
            borderColor: colors.tableBorder,
          },
        ]}
      >
        <View
          pointerEvents="none"
          style={[
            styles.innerSurface,
            shape === 'circle' ? styles.circleSurface : styles.ovalSurface,
            shape === 'rounded' ? styles.roundedSurface : null,
            { borderColor: colors.tableInnerBorder },
          ]}
        />
        <View style={styles.centerContent}>
          {centerCards.length > 0 ? (
            <CardHand cards={centerCards} colorScheme={colorScheme} size={cardSize} />
          ) : null}
          {centerLabel !== undefined ? (
            <View style={[styles.centerLabel, { backgroundColor: colors.seatSurface }]}> 
              <Text style={[styles.centerLabelText, { color: colors.seatText }]}>
                {centerLabel}
              </Text>
            </View>
          ) : null}
          {centerSublabel !== undefined ? (
            <Text style={[styles.centerSublabel, { color: colors.tableMutedText }]}> 
              {centerSublabel}
            </Text>
          ) : null}
        </View>
      </View>

      {seats.map((seat, index) => {
        const position = getTabletopSeatPosition(index, resolvedSeatCount);
        const hasCards = seat.cards !== undefined || seat.faceDownCards !== undefined;
        const seatCardSize = getTabletopSeatCardSize({
          selected: seat.selected,
          tableCardSize: cardSize,
        });

        return (
          <View
            accessibilityLabel={createSeatAccessibilityLabel(seat)}
            accessibilityRole="summary"
            key={seat.id}
            style={[
              styles.seatSlot,
              {
                left: position.left,
                opacity: seat.muted ? 0.48 : 1,
                top: position.top,
              },
            ]}
            testID={testID ? `${testID}-seat-${seat.id}` : undefined}
          >
            <View
              style={[
                styles.seatPanel,
                seat.selected ? styles.selectedSeatPanel : null,
                {
                  borderColor: seat.selected ? colors.seatSelectedBorder : colors.seatBorder,
                  backgroundColor: colors.seatSurface,
                },
              ]}
            >
              {hasCards ? (
                <CardHand
                  cards={seat.cards}
                  colorScheme={colorScheme}
                  faceDownCards={seat.faceDownCards}
                  muted={seat.muted ?? seat.disabled}
                  size={seatCardSize}
                />
              ) : null}
              <View style={styles.seatTextGroup}>
                <Text style={[styles.seatLabel, { color: colors.seatText }]}>{seat.label}</Text>
                {seat.sublabel !== undefined ? (
                  <Text style={[styles.seatSublabel, { color: colors.seatMutedText }]}> 
                    {seat.sublabel}
                  </Text>
                ) : null}
              </View>
            </View>
            {seat.tokenLabel !== undefined ? (
              <View
                style={[
                  styles.token,
                  {
                    backgroundColor: colors.tokenSurface,
                    borderColor: seat.selected ? colors.seatSelectedBorder : colors.tableInnerBorder,
                  },
                ]}
              >
                <Text style={[styles.tokenText, { color: colors.tokenText }]}>
                  {seat.tokenLabel}
                </Text>
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  centerContent: {
    alignItems: 'center',
    gap: 6,
    left: 0,
    position: 'absolute',
    right: 0,
    top: '35%',
  },
  centerLabel: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  centerLabelText: {
    fontSize: 12,
    fontWeight: '800',
  },
  centerSublabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  circleSurface: {
    borderRadius: 999,
  },
  innerSurface: {
    borderWidth: 1,
    bottom: 10,
    left: 10,
    opacity: 0.44,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  ovalSurface: {
    borderRadius: 999,
  },
  root: {
    aspectRatio: 1.6,
    maxWidth: 760,
    position: 'relative',
    width: '100%',
  },
  roundedSurface: {
    borderRadius: 28,
  },
  seatLabel: {
    fontSize: 11,
    fontWeight: '800',
  },
  seatPanel: {
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
    minWidth: 68,
    paddingHorizontal: 7,
    paddingVertical: 6,
  },
  seatSlot: {
    alignItems: 'center',
    gap: 4,
    minWidth: 78,
    position: 'absolute',
    transform: [{ translateX: -39 }, { translateY: -34 }],
  },
  seatSublabel: {
    fontSize: 10,
    fontWeight: '700',
  },
  seatTextGroup: {
    alignItems: 'center',
    gap: 1,
  },
  selectedSeatPanel: {
    borderWidth: 2,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  surface: {
    borderWidth: 8,
    bottom: 28,
    left: 24,
    position: 'absolute',
    right: 24,
    top: 24,
  },
  token: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  tokenText: {
    fontSize: 10,
    fontWeight: '800',
  },
});
