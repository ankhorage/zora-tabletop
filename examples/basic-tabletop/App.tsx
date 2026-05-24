import {
  AppBar,
  AppShell,
  Screen,
  ScreenSection,
  ZoraProvider,
  type ZoraTheme,
} from '@ankhorage/zora';
import { TabletopTable, type TabletopSeatState } from '@ankhorage/zora-tabletop';

const tabletopTheme: ZoraTheme = {
  id: 'basic-tabletop',
  name: 'Basic tabletop',
  appCategory: 'games',
  primaryColor: '#0f766e',
  harmony: 'analogous',
};

const seats: readonly TabletopSeatState[] = [
  {
    id: 'seat-a',
    label: 'Seat A',
    sublabel: 'Ready',
    cards: [
      { rank: 'A', suit: 'spades' },
      { rank: 'K', suit: 'hearts' },
    ],
    selected: true,
    tokenLabel: 'Active',
  },
  {
    id: 'seat-b',
    label: 'Seat B',
    sublabel: 'Hidden cards',
    faceDownCards: 2,
  },
  {
    id: 'seat-c',
    label: 'Seat C',
    sublabel: 'Paused',
    faceDownCards: 2,
    muted: true,
  },
];

/***
 * Minimal tabletop app root.
 *
 * Use `TabletopTable` inside a ZORA app shell to render generic seats, visible
 * cards, face-down cards, and center-table labels without adding game rules.
 *
 * @usage
 * @readme
 */
export default function BasicTabletopApp() {
  return (
    <ZoraProvider initialMode="light" theme={tabletopTheme}>
      <AppShell header={<AppBar title="Tabletop" subtitle="Reusable card-game UI" />}>
        <Screen>
          <ScreenSection
            title="Table state"
            description="Map app data into generic seats and cards."
          >
            <TabletopTable
              seats={seats}
              centerCards={[
                { rank: 'Q', suit: 'diamonds' },
                { rank: 'J', suit: 'clubs' },
                { rank: '10', suit: 'spades' },
              ]}
              centerLabel="Round 1"
              centerSublabel="Shared cards"
            />
          </ScreenSection>
        </Screen>
      </AppShell>
    </ZoraProvider>
  );
}
