import { TabletopTable } from './components/tabletop-table';
import { ZORA_PLUGIN_METADATA } from './registry';

export const ZORA_TABLETOP_COMPONENT_REGISTRY = { TabletopTable } as const;

export const ZORA_TABLETOP_PLUGIN = {
  ...ZORA_PLUGIN_METADATA,
  componentRegistry: ZORA_TABLETOP_COMPONENT_REGISTRY,
} as const;
