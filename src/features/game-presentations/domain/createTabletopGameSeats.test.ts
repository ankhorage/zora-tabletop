import { describe, expect, test } from 'bun:test';

import { createTabletopGameSeats } from './createTabletopGameSeats';

describe('createTabletopGameSeats', () => {
  test('maps current participants without embedding a specific card game', () => {
    const seats = createTabletopGameSeats({
      seats: [
        { id: 'north', defaultState: { label: 'North', tokenLabel: 'Lead' } },
        { id: 'east', defaultState: { label: 'East' } },
        { id: 'south', defaultState: { label: 'South' } },
        { id: 'west', defaultState: { label: 'West' } },
      ],
      participants: [
        {
          seatId: 'east',
          state: {
            cards: [{ rank: '7', suit: 'diamonds' }],
            sublabel: 'Ready',
          },
        },
      ],
      missingParticipantState: { disabled: true, muted: true, sublabel: 'Out' },
    });

    expect(seats).toHaveLength(4);
    expect(seats[0]).toMatchObject({
      id: 'north',
      label: 'North',
      tokenLabel: 'Lead',
      disabled: true,
      muted: true,
      sublabel: 'Out',
    });
    expect(seats[1]).toMatchObject({
      id: 'east',
      label: 'East',
      cards: [{ rank: '7', suit: 'diamonds' }],
      sublabel: 'Ready',
    });
  });

  test('uses the last participant update and ignores seats outside the layout', () => {
    const seats = createTabletopGameSeats({
      seats: [{ id: 'one', defaultState: { label: 'One' } }],
      participants: [
        { seatId: 'one', state: { sublabel: 'Waiting' } },
        { seatId: 'unknown', state: { sublabel: 'Ignored' } },
        { seatId: 'one', state: { sublabel: 'Playing' } },
      ],
    });

    expect(seats).toEqual([{ id: 'one', label: 'One', sublabel: 'Playing' }]);
  });
});
