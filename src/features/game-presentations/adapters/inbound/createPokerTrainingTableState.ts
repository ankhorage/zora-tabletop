import type { TabletopGameParticipantState } from '../../../../types/gamePresentation';
import type {
  CreatePokerTrainingTableStateOptions,
  PokerTrainingPlayer,
  PokerTrainingTableState,
  PokerTrainingTaskTableData,
} from '../../../../types/pokerTraining';
import { createTabletopGameSeats } from '../../domain/createTabletopGameSeats';

/***
 * Adapts the table-relevant subset of a poker training task to generic tabletop presentation state.
 *
 * The canonical poker ring is rotated so the hero occupies the first (bottom) tabletop seat.
 * Players omitted by the task are reconstructed as folded with the configured default stack.
 *
 * @param task - Serializable poker training task data received by the generated application.
 * @param options - Presentation defaults for task fields that are intentionally omitted.
 * @returns Seats and shared-table content ready for `TabletopTable`.
 */
export function createPokerTrainingTableState(
  task: PokerTrainingTaskTableData,
  { defaultStackBigBlinds = 100 }: CreatePokerTrainingTableStateOptions = {},
): PokerTrainingTableState {
  const bigBlind = task.blinds?.big;
  const heroPosition = task.heroPosition ?? task.players?.find((player) => player.isHero)?.position;
  const orderedPositions = rotatePokerPositions(heroPosition);
  const defaultStack = `${formatAmount(defaultStackBigBlinds)} BB`;
  const participants = (task.players ?? []).map((player) =>
    createPokerParticipantState(player, task, bigBlind),
  );
  const seats = createTabletopGameSeats({
    seats: orderedPositions.map((position) => ({
      id: position,
      defaultState: {
        label: position,
        tokenLabel: position === 'BTN' ? 'D' : undefined,
      },
    })),
    participants,
    missingParticipantState: {
      disabled: true,
      muted: true,
      sublabel: `${defaultStack} · Folded`,
    },
  });

  return {
    seats,
    centerCards: task.communityCards ?? [],
    centerLabel: task.pot === undefined ? undefined : `Pot ${formatAmount(task.pot)}`,
    centerSublabel:
      task.blinds === undefined
        ? undefined
        : `Blinds ${formatAmount(task.blinds.small)} / ${formatAmount(task.blinds.big)}`,
    accessibilityLabel: createPokerAccessibilityLabel(heroPosition, task),
  };
}

const pokerPositions = ['BTN', 'SB', 'BB', 'UTG', 'UTG+1', 'MP', 'MP+1', 'HJ', 'CO'] as const;

/*** Rotates the canonical nine-seat poker ring to place the hero at the bottom seat. */
function rotatePokerPositions(heroPosition: string | undefined): readonly string[] {
  const heroIndex = pokerPositions.findIndex((position) => position === heroPosition);
  if (heroIndex <= 0) return pokerPositions;

  return [...pokerPositions.slice(heroIndex), ...pokerPositions.slice(0, heroIndex)];
}

/*** Converts one poker participant record into a generic seat-state override. */
function createPokerParticipantState(
  player: PokerTrainingPlayer,
  task: PokerTrainingTaskTableData,
  bigBlind: number | undefined,
): TabletopGameParticipantState {
  const isHero = player.isHero === true || player.position === task.heroPosition;
  const cards = player.cards ?? (isHero ? task.heroCards : undefined);
  const folded = player.folded === true;

  return {
    seatId: player.position,
    state: {
      cards,
      disabled: folded,
      faceDownCards: cards === undefined && !folded && !isHero ? 2 : undefined,
      muted: folded,
      selected: isHero,
      sublabel: formatPlayerSublabel(player, bigBlind),
    },
  };
}

/*** Formats stack and optional committed chips as a compact seat sublabel. */
function formatPlayerSublabel(
  player: PokerTrainingPlayer,
  bigBlind: number | undefined,
): string | undefined {
  const stack = player.stack === undefined ? undefined : formatChipStack(player.stack, bigBlind);
  const bet = player.bet === undefined ? undefined : `Bet ${formatChipStack(player.bet, bigBlind)}`;
  const parts = [stack, bet, player.folded === true ? 'Folded' : undefined].filter(
    (part): part is string => part !== undefined,
  );

  return parts.length === 0 ? undefined : parts.join(' · ');
}

/*** Formats chips as big blinds when a positive blind is known, otherwise as an amount. */
function formatChipStack(amount: number, bigBlind: number | undefined): string {
  if (bigBlind !== undefined && bigBlind > 0) {
    return `${formatAmount(amount / bigBlind)} BB`;
  }

  return `${formatAmount(amount)} chips`;
}

/*** Formats a numeric poker amount consistently across native and web runtimes. */
function formatAmount(amount: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(amount);
}

/*** Summarizes the reconstructed table for assistive technologies. */
function createPokerAccessibilityLabel(
  heroPosition: string | undefined,
  task: PokerTrainingTaskTableData,
): string {
  const parts = ['Nine-player poker table'];
  if (heroPosition !== undefined) parts.push(`Hero ${heroPosition}`);
  if (task.pot !== undefined) parts.push(`Pot ${formatAmount(task.pot)}`);
  if (task.blinds !== undefined) {
    parts.push(`Blinds ${formatAmount(task.blinds.small)} / ${formatAmount(task.blinds.big)}`);
  }

  return `${parts.join('. ')}.`;
}
