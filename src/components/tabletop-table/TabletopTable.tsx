import { useZoraTheme } from '@ankhorage/zora';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createTabletopColorScheme } from '../../colors';
import { getTabletopSeatPosition } from '../../tablePositions';
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
              <Text style={[styles.centerLabelText, { color: colors.cardText }]}>
                {centerLabel}
              </Text>
            </View>
          ) : null}
          {centerSublabel !== undefined ? (
            <Text style={[styles.centerSublabel, { color: colors.mutedText }]}>
              {centerSublabel}
            </Text>
          ) : null}
        </View>
      </View>

      {seats.map((seat, index) => {
        const position = getTabletopSeatPosition(index, resolvedSeatCount);
        return (
          <View
            accessibilityLabel={createSeatAccessibilityLabel(seat)}
            accessibilityRole="summary"
            key={seat.id}
            style={[
              styles.seat,
              {
                borderColor: seat.selected ? colors.seatSelectedBorder : colors.seatBorder,
                backgroundColor: colors.seatSurface,
                left: position.left,
                opacity: seat.muted ? 0.48 : 1,
                top: position.top,
              },
            ]}
            testID={testID ? `${testID}-seat-${seat.id}` : undefined}
          >
            {seat.cards !== undefined || seat.faceDownCards !== undefined ? (
              <CardHand
                cards={seat.cards}
                colorScheme={colorScheme}
                faceDownCards={seat.faceDownCards}
                muted={seat.muted ?? seat.disabled}
                size={cardSize}
              />
            ) : null}
            <Text style={[styles.seatLabel, { color: colors.cardText }]}>{seat.label}</Text>
            {seat.sublabel !== undefined ? (
              <Text style={[styles.seatSublabel, { color: colors.mutedText }]}>
                {seat.sublabel}
              </Text>
            ) : null}
            {seat.tokenLabel !== undefined ? (
              <View style={[styles.token, { backgroundColor: colors.tokenSurface }]}>
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
    fontWeight: '600',
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
  seat: {
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    gap: 3,
    minWidth: 64,
    paddingHorizontal: 6,
    paddingVertical: 5,
    position: 'absolute',
    transform: [{ translateX: -32 }, { translateY: -28 }],
  },
  seatLabel: {
    fontSize: 11,
    fontWeight: '800',
  },
  seatSublabel: {
    fontSize: 10,
    fontWeight: '600',
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
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tokenText: {
    fontSize: 10,
    fontWeight: '800',
  },
});
