import { pokerTrainingTableMeta } from './features/game-presentations/adapters/inbound/pokerTrainingTableMeta';
import { tabletopTableMeta } from './meta';

export const ZORA_TABLETOP_COMPONENT_META = {
  PokerTrainingTable: pokerTrainingTableMeta,
  TabletopTable: tabletopTableMeta,
} as const;

export const ZORA_PLUGIN_METADATA = {
  packageName: '@ankhorage/zora-tabletop',
  displayName: 'ZORA Tabletop',
  componentMeta: ZORA_TABLETOP_COMPONENT_META,
  placements: [
    {
      child: 'PokerTrainingTable',
      parents: ['Box', 'Card', 'Container', 'Grid', 'Panel', 'Screen', 'ScreenSection', 'Stack'],
    },
    {
      child: 'TabletopTable',
      parents: ['Box', 'Card', 'Container', 'Grid', 'Panel', 'Screen', 'ScreenSection', 'Stack'],
    },
  ],
} as const;
