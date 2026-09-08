import { describe, expect, test } from 'bun:test';

import { tabletopTableMeta } from './meta';

describe('ZORA tabletop component metadata', () => {
  test('exposes TabletopTable as a directly authorable manifest node', () => {
    expect(tabletopTableMeta.directManifestNode).toBe(true);
    expect(tabletopTableMeta.blueprint.defaultProps).toMatchObject({
      seats: [],
      shape: 'oval',
    });
    expect(tabletopTableMeta.bindings.props.seats.value).toEqual({
      type: 'array',
      itemType: 'object',
    });
  });

  test('exports one canonical plugin descriptor from the public API', async () => {
    const source = await Bun.file('src/plugin.ts').text();
    const metadataSource = await Bun.file('src/registry.ts').text();
    const publicSource = await Bun.file('src/index.ts').text();

    expect(metadataSource).toContain("packageName: '@ankhorage/zora-tabletop'");
    expect(source).toContain('componentRegistry: ZORA_TABLETOP_COMPONENT_REGISTRY');
    expect(metadataSource).toContain('componentMeta: ZORA_TABLETOP_COMPONENT_META');
    expect(publicSource).toContain('ZORA_TABLETOP_PLUGIN');
  });
});
