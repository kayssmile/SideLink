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
    to: '/instructions',
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
    to: '/dashboard/analytics',
  },
];

const footerLinks = [
  {
    id: 1,
    elements: [
      {
        title: true,
        titleText: 'Quicklinks',
      },
      {
        title: false,
        titleText: 'Dashboard',
        to: '/dashboard',
      },
      {
        title: false,
        titleText: 'Home',
        to: '/home',
      },
      {
        title: false,
        titleText: 'Board',
        to: '/board',
      },
      {
        title: false,
        titleText: 'Kontakt',
        to: '/contact',
      },
      {
        title: false,
        titleText: 'Hilfe',
        to: '/instructions',
      },
      {
        title: false,
        titleText: 'Registrierung',
        to: '/registration',
      },
      {
        title: false,
        titleText: 'AGB',
        to: '/agb',
      },
    ],
  },
  {
    id: 2,
    elements: [
      {
        title: true,
        titleText: 'Kategorien',
      },
      {
        title: false,
        titleText: 'Haushalt',
        to: '/board?category=Haushalt',
      },
      {
        title: false,
        titleText: 'Garten',
        to: '/board?category=Garten',
      },
      {
        title: false,
        titleText: 'Handwerk',
        to: '/board?category=Handwerk',
      },
      {
        title: false,
        titleText: 'Umzug',
        to: '/board?category=Umzug',
      },
      {
        title: false,
        titleText: 'IT & Technik',
        to: `/board?category=IT+%26+Technik`,
      },
    ],
  },
];

export { navLinks, profileMenu, breadcrumpConfig, sideBarMenuItems, footerLinks };
