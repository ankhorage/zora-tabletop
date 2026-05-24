import { createKnipConfig } from '@ankhorage/devtools/knip';

export default createKnipConfig({
  entry: ['src/index.ts', 'examples/basic-tabletop/App.tsx'],
  ignoreFiles: ['.prettierrc.js', 'eslint.config.mjs', 'paradox.config.ts'],
});
