import { defineParadoxConfig } from '@ankhorage/paradox';

export default defineParadoxConfig({
  mode: 'write',

  docs: {
    title: '@ankhorage/zora-tabletop',
    description:
      'Reusable tabletop, playing-card, seat, token, and card-game presentation components for React Native and React Native Web.',
  },

  package: {
    root: '.',
    entrypoints: ['src/index.ts'],
  },

  output: {
    dir: './paradox',
  },
});
