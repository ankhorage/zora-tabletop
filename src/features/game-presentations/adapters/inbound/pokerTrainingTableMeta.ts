export const pokerTrainingTableMeta = {
  name: 'PokerTrainingTable',
  category: 'pattern',
  description: 'Reconstructs a complete nine-seat poker table from sparse training task data.',
  directManifestNode: true,
  allowedChildren: [],
  blueprint: {
    label: 'Poker training table',
    defaultProps: {
      task: {},
      defaultStackBigBlinds: 100,
      shape: 'oval',
      cardSize: 'small',
    },
  },
  bindings: {
    props: {
      task: {
        label: 'Poker training task',
        description: 'Table-relevant fields from a poker training task.',
        value: {
          type: 'object',
          fields: [
            { path: 'blinds', type: 'object', label: 'Blinds' },
            { path: 'heroPosition', type: 'string', label: 'Hero position' },
            { path: 'heroCards', type: 'array', label: 'Hero cards' },
            { path: 'communityCards', type: 'array', label: 'Community cards' },
            { path: 'pot', type: 'number', label: 'Pot' },
            { path: 'players', type: 'array', label: 'Players' },
          ],
        },
        acceptsFallback: true,
      },
      disabled: {
        label: 'Disabled',
        value: { type: 'boolean' },
        acceptsFallback: true,
        acceptsTransforms: true,
      },
    },
  },
  props: {
    defaultStackBigBlinds: {
      type: 'number',
      category: 'Players',
      label: 'Default stack in big blinds',
      default: 100,
      authoring: { authority: 'instance' },
    },
    shape: {
      type: 'enum',
      category: 'Table',
      label: 'Shape',
      enum: ['circle', 'oval', 'rounded'],
      default: 'oval',
      authoring: { authority: 'instance' },
    },
    cardSize: {
      type: 'enum',
      category: 'Cards',
      label: 'Card size',
      enum: ['small', 'medium', 'large'],
      default: 'small',
      authoring: { authority: 'instance' },
    },
    disabled: {
      type: 'boolean',
      category: 'State',
      label: 'Disabled',
      default: false,
      authoring: { authority: 'instance' },
    },
    accessibilityLabel: {
      type: 'string',
      category: 'Accessibility',
      label: 'Accessibility label',
      authoring: { authority: 'instance' },
    },
  },
} as const;
