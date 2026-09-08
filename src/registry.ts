import { tabletopTableMeta } from './meta';

export const ZORA_TABLETOP_COMPONENT_META = { TabletopTable: tabletopTableMeta } as const;

export const ZORA_PLUGIN_METADATA = {
  packageName: '@ankhorage/zora-tabletop',
  displayName: 'ZORA Tabletop',
  componentMeta: ZORA_TABLETOP_COMPONENT_META,
  placements: [
    {
      child: 'TabletopTable',
      parents: ['Box', 'Card', 'Container', 'Grid', 'Panel', 'Screen', 'ScreenSection', 'Stack'],
    },
  ],
} as const;
