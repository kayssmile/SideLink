import { IconPoint, IconCurrencyDollar, IconUserCircle, IconUserCheck } from '@tabler/icons-react';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    title: 'Dienstleistungen',
    icon: IconCurrencyDollar,
    to: '/dashboard/offers',
    children: [
      {
        title: 'Übersicht',
        icon: IconPoint,
        to: '/dashboard/offers?new=true',
      },
      {
        title: 'Neue Dienstleistung',
        icon: IconPoint,
        to: '/dashboard/offers?new=true',
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
];

export default Menuitems;
