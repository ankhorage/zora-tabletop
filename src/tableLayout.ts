import type { TabletopCardSize } from './types';

export function getTabletopSeatCardSize(args: {
  readonly selected?: boolean;
  readonly tableCardSize: TabletopCardSize;
}): TabletopCardSize {
  if (args.selected && args.tableCardSize === 'small') return 'medium';

  return args.tableCardSize;
}
