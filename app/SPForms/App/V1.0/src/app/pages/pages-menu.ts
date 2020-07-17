import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Lists',
    icon: 'nb-list',
    link: '/pages/lists'
  },
  {
    title: 'Libraries',
    icon: 'ion-folder',
    link: '/pages/libraries'
  },
  // {
  //   title: 'Settings',
  //   icon: 'nb-gear',
  //   url: 'https://store.devwals.com/#/auth/login',
  //   target: '_blank'
  // },
  {
    title: 'Request Feature',
    icon: 'nb-lightbulb',
    url: 'https://devwals.com/#contact',
    target: '_blank'
  },
  {
    title: 'Support',
    icon: 'nb-email',
    url: 'https://devwals.com/#contact',
    target: '_blank'
  },
  {
    title: 'Roadmap',
    icon: 'nb-location',
    link: '/pages/roadmap'
  }
];
