import type { TabletopSeatState } from '../types';

export type TabletopGameSeatPresentation = Omit<TabletopSeatState, 'id'>;

export interface TabletopGameSeatDefinition {
  readonly id: string;
  readonly defaultState: TabletopGameSeatPresentation;
}

export interface TabletopGameParticipantState {
  readonly seatId: string;
  readonly state: Partial<TabletopGameSeatPresentation>;
}

export interface CreateTabletopGameSeatsInput {
  readonly seats: readonly TabletopGameSeatDefinition[];
  readonly participants: readonly TabletopGameParticipantState[];
  readonly missingParticipantState?: Partial<TabletopGameSeatPresentation>;
}
