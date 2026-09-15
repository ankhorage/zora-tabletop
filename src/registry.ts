import { pokerTrainingTableMeta } from './features/game-presentations/adapters/inbound/pokerTrainingTableMeta';
import { tabletopTableMeta } from './meta';

export const ZORA_TABLETOP_COMPONENT_META = {
  PokerTrainingTable: pokerTrainingTableMeta,
  TabletopTable: tabletopTableMeta,
} as const;

const TABLETOP_PLACEMENT_PARENTS = ['Card', 'Grid', 'Screen', 'ScreenSection'] as const;

export const ZORA_PLUGIN_METADATA = {
  packageName: '@ankhorage/zora-tabletop',
  displayName: 'ZORA Tabletop',
  componentMeta: ZORA_TABLETOP_COMPONENT_META,
  placements: [
    {
      child: 'PokerTrainingTable',
      parents: TABLETOP_PLACEMENT_PARENTS,
    },
    {
      child: 'TabletopTable',
      parents: TABLETOP_PLACEMENT_PARENTS,
    },
  ],
} as const;
