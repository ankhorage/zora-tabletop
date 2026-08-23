import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { createConfig } from '@ankhorage/devtools/eslint';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
  ...createConfig({
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json'],
    files: ['examples/**/*.{ts,tsx}'],
  }),
  {
    // Tests are intentionally excluded from the build config and linted through the existing test-aware project.
    files: ['src/**/*.test.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ['src/cardLabel.ts', 'src/cardSizing.ts', 'src/cardSymbols.ts'],
    rules: {
      // These pre-existing accesses use closed playing-card suit and size lookup tables, not untrusted keys.
      'security/detect-object-injection': 'off',
    },
  },
  {
    files: ['src/colors.ts'],
    rules: {
      // The pre-existing semantic color fallback resolver exceeds the new Devtools 1.6 complexity threshold.
      complexity: 'off',
    },
  },
  {
    files: [
      'src/components/card-back/CardBack.tsx',
      'src/components/playing-card/PlayingCard.tsx',
      'src/components/tabletop-table/TabletopTable.tsx',
    ],
    rules: {
      // These existing muted and disabled opacity values are deliberate dynamic React Native styles.
      'react-native/no-inline-styles': 'off',
    },
  },
  {
    files: [
      'src/components/playing-card/PlayingCard.tsx',
      'src/components/tabletop-table/TabletopTable.tsx',
    ],
    rules: {
      // These pre-existing presentational components exceed the new Devtools 1.6 size threshold.
      'max-lines-per-function': 'off',
    },
  },
];
