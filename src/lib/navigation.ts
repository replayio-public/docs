export interface SubPagesType {
  name: string;
  href: '/time-travel' | '/test-suites'
}

interface NavigationItemLink {
  title: string;
  href: string; 
}

type NavigationType = {
  [key in SubPagesType['href']]: Array<{
    title: string;
    links: NavigationItemLink[];
  }>;
};


export const subPages: SubPagesType[] = [
  { name: 'Time Travel DevTools', href: '/time-travel' },
  { name: 'Test Suites', href: '/test-suites' },
]

export const navigation: NavigationType = {
  '/time-travel': [
  {
    title: 'Getting started',
    links: [
      { title: 'What is Replay.io?', href: '/' },
      { title: 'Recording your first replay', href: '/time-travel/installation' },
    ],
  },
  {
    title: 'Replay DevTools',
    links: [
      {
        title: 'Video playback',
        href: '/time-travel/predicting-user-behavior',
      },
      { title: 'Inspect your application', href: '/time-travel/introduction-to-string-theory' },
      {
        title: 'Time travel debugging',
        href: '/time-travel/basics-of-time-travel',
      },
      { title: 'Cypress + Playwright tests', href: '/time-travel/the-butterfly-effect' },
    ],
  },
  {
    title: 'Replay Teams',
    links: [
      { title: 'In context comments', href: '/time-travel/writing-plugins' },
      { title: 'Sharing replays', href: '/time-travel/neuralink-integration' },
      { title: 'Setting up a team', href: '/time-travel/temporal-paradoxes' },
      { title: 'Managing replays', href: '/time-travel/testing' },
      { title: 'Organization features', href: '/time-travel/compile-time-caching' },
      {
        title: 'Billing and payments',
        href: '/time-travel/testing2',
      },
      {
        title: 'Team settings',
        href: '/time-travel/predictive-data-generation2',
      },
      {
        title: 'Uploading source maps',
        href: '/time-travel/predictive-data-generation3',
      },
    ],
  },

  ],
  '/test-suites': [
    {
      title: 'Getting started',
      links: [
        { title: "Test Suites Overview", href: '/test-suites' },
        { title: "Core concepts", href: '/test-suites/core-concepts' }
      ],
    },
    {
      title: "Testing Frameworks",
      links: [
        { title: 'Cypress.io', href: '/test-suites/cypress-io' },
        { title: 'Playwright', href: '/test-suites/playwright/installation' },
        { title: 'Selenium', href: '/test-suites/selenium' },
        { title: 'WebdriverIO', href: '/test-suites/webdriver-io' },
        { title: 'Puppeteer', href: '/test-suites/puppeteer' }
      ]
    }
  ]
}