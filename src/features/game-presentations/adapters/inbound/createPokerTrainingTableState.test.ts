import { expect, test } from 'bun:test';

import type { PokerTrainingTaskTableData } from '../../../../types/pokerTraining';
import { createPokerTrainingTableState } from './createPokerTrainingTableState';

const liveTask: PokerTrainingTaskTableData = {
  blinds: { small: 50, big: 100 },
  heroPosition: 'BTN',
  heroCards: [
    { rank: 'K', suit: 'hearts' },
    { rank: 'Q', suit: 'hearts' },
  ],
  communityCards: [
    { rank: 'A', suit: 'clubs' },
    { rank: '7', suit: 'hearts' },
    { rank: '2', suit: 'spades' },
    { rank: 'J', suit: 'diamonds' },
  ],
  pot: 1200,
  players: [
    { position: 'BB', stack: 10000 },
    { position: 'BTN', stack: 10000, isHero: true },
  ],
};

test('createPokerTrainingTableState reconstructs a sparse task as nine seats', () => {
  const state = createPokerTrainingTableState(liveTask);

  expect(state.seats).toHaveLength(9);
  expect(state.seats.map((seat) => seat.id)).toEqual([
    'BTN',
    'SB',
    'BB',
    'UTG',
    'UTG+1',
    'MP',
    'MP+1',
    'HJ',
    'CO',
  ]);
  expect(state.seats[0]).toMatchObject({
    id: 'BTN',
    cards: liveTask.heroCards,
    selected: true,
    sublabel: '100 BB',
    tokenLabel: 'D',
  });
  expect(state.seats[2]).toMatchObject({
    id: 'BB',
    faceDownCards: 2,
    sublabel: '100 BB',
  });
  expect(state.seats[1]).toMatchObject({
    id: 'SB',
    disabled: true,
    muted: true,
    sublabel: '100 BB · Folded',
  });
});

test('createPokerTrainingTableState maps shared live task state', () => {
  const state = createPokerTrainingTableState(liveTask);

  expect(state.centerCards).toEqual(liveTask.communityCards);
  expect(state.centerLabel).toBe('Pot 1,200');
  expect(state.centerSublabel).toBe('Blinds 50 / 100');
  expect(state.accessibilityLabel).toBe(
    'Nine-player poker table. Hero BTN. Pot 1,200. Blinds 50 / 100.',
  );
});

test('createPokerTrainingTableState rotates another hero to the bottom seat', () => {
  const state = createPokerTrainingTableState({
    ...liveTask,
    heroPosition: 'CO',
    players: [{ position: 'CO', stack: 5000, bet: 250, isHero: true }],
  });

  expect(state.seats[0]).toMatchObject({
    id: 'CO',
    selected: true,
    sublabel: '50 BB · Bet 2.5 BB',
  });
  expect(state.seats.map((seat) => seat.id)).toEqual([
    'CO',
    'BTN',
    'SB',
    'BB',
    'UTG',
    'UTG+1',
    'MP',
    'MP+1',
    'HJ',
  ]);
});

test('createPokerTrainingTableState maps folded and visible opponent state', () => {
  const visibleCards = [
    { rank: 'A', suit: 'spades' },
    { rank: 'A', suit: 'diamonds' },
  ] as const;
  const state = createPokerTrainingTableState({
    ...liveTask,
    players: [
      { position: 'BB', stack: 9000, bet: 100, folded: true },
      { position: 'HJ', stack: 8000, cards: visibleCards },
    ],
  });

  const foldedSeat = state.seats.find((seat) => seat.id === 'BB');

  expect(foldedSeat).toMatchObject({
    disabled: true,
    muted: true,
    sublabel: '90 BB · Bet 1 BB · Folded',
  });
  expect(foldedSeat?.faceDownCards).toBeUndefined();
  expect(state.seats.find((seat) => seat.id === 'HJ')).toMatchObject({
    cards: visibleCards,
    sublabel: '80 BB',
  });
});

test('createPokerTrainingTableState uses a configurable folded stack', () => {
  const state = createPokerTrainingTableState({}, { defaultStackBigBlinds: 75 });

  expect(state.seats[0]?.sublabel).toBe('75 BB · Folded');
  expect(state.centerLabel).toBeUndefined();
  expect(state.centerSublabel).toBeUndefined();
});
