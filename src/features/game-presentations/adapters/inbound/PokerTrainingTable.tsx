import React from 'react';

import { TabletopTable } from '../../../../components/tabletop-table';
import type { PokerTrainingTableProps } from '../../../../types/pokerTraining';
import { createPokerTrainingTableState } from './createPokerTrainingTableState';

/***
 * Manifest-ready poker training pattern that reconstructs a complete table from task data.
 *
 * Bind the raw training task object to `task`; the pattern maps sparse active-player data to a
 * full nine-seat presentation while leaving API execution in the generated application.
 *
 * @readme
 * @example Training task binding
 * ```tsx
 * <PokerTrainingTable task={task} />
 * ```
 */
export function PokerTrainingTable({
  task = {},
  defaultStackBigBlinds = 100,
  accessibilityLabel,
  ...tableProps
}: PokerTrainingTableProps) {
  const state = React.useMemo(
    () => createPokerTrainingTableState(task, { defaultStackBigBlinds }),
    [defaultStackBigBlinds, task],
  );

  return (
    <TabletopTable
      {...tableProps}
      accessibilityLabel={accessibilityLabel ?? state.accessibilityLabel}
      centerCards={state.centerCards}
      centerLabel={state.centerLabel}
      centerSublabel={state.centerSublabel}
      seatCount={9}
      seats={state.seats}
    />
  );
}
