import icon1 from 'src/assets/images/svgs/icon-account.svg';
import ddIcon3 from 'src/assets/images/svgs/icon-dd-invoice.svg';
import settingsIcon from 'src/assets/images/svgs/settings.svg';

import { IconPoint, IconCurrencyDollar, IconUserCircle, IconUserCheck, IconChartHistogram } from '@tabler/icons-react';

const navLinks = [
  {
    title: 'Home',
    to: '/home',
  },
  {
    title: 'Übersicht',
    to: '/board',
  },
  {
    title: 'Anleitung',
    to: '/instruction',
  },
];

const profileMenu = [
  {
    to: '/dashboard/services-offer',
    title: 'Meine Dienstleistungen',
    subtitle: 'Dienstleistung Verwaltung',
    icon: ddIcon3,
  },
  {
    to: '/dashboard/publicprofile',
    title: 'Mein Öffentliches Profil',
    subtitle: 'Profil Einstellungen',
    icon: icon1,
  },
  {
    to: '/dashboard/account',
    title: 'Mein Konto',
    subtitle: 'Konto Einstellungen',
    icon: settingsIcon,
  },
];

const breadcrumpConfig = {
  account: [
    {
      to: '/dashboard',
      title: 'Dashboard',
    },
    {
      title: 'Account Verwaltung',
    },
  ],
  publicProfile: [
    {
      to: '/dashboard',
      title: 'Dashboard',
    },
    {
      title: 'Public Profile',
    },
  ],
  serviceSearch: [
    {
      to: '/dashboard',
      title: 'Dashboard',
    },
    {
      title: 'Dienstleistungs Suche',
    },
  ],
  serviceOffer: [
    {
      to: '/dashboard',
      title: 'Dashboard',
    },
    {
      title: 'Dienstleistungs Angebote',
    },
  ],
  analysis: [
    {
      to: '/dashboard',
      title: 'Dashboard',
    },
    {
      title: 'Analysen',
    },
  ],
};

const sideBarMenuItems = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    title: 'Dienstleistung Verwaltung',
    icon: IconCurrencyDollar,
    to: '',
    children: [
      {
        title: 'Meine Angebote',
        icon: IconPoint,
        to: '/dashboard/services-offer',
      },
      {
        title: 'Meine Suche',
        icon: IconPoint,
        to: '/dashboard/services-search',
      },
    ],
  },
  {
    title: 'Öffentliches Profil',
    icon: IconUserCheck,
    to: '/dashboard/publicprofile',
  },
  {
    navlabel: true,
    subheader: 'Einstellungen',
  },
  {
    title: 'Account Verwaltung',
    icon: IconUserCircle,
    to: '/dashboard/account',
  },
  {
    navlabel: true,
    subheader: 'Allgemeines',
  },
  {
    title: 'Auswertungen',
    icon: IconChartHistogram,
    to: '/dashboard/analyses',
  },
];

export { navLinks, profileMenu, breadcrumpConfig, sideBarMenuItems };
