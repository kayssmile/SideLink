import icon1 from 'src/assets/images/svgs/icon-account.svg';
import ddIcon3 from 'src/assets/images/svgs/icon-dd-invoice.svg';

const navLinks = [
  {
    title: 'Home',
    to: '/home',
  },
  {
    title: 'Board',
    to: '/board',
  },
  {
    title: 'Anleitung',
    to: '/instruction',
  },
];

const profileMenu = [
  {
    to: '/dashboard/offers',
    title: 'Meine Dienstleistungen',
    subtitle: 'Dienstleistungen',
    icon: ddIcon3,
  },
  {
    to: '/dashboard/publicprofile',
    title: 'Mein Profil',
    subtitle: 'Profil Einstellungen',
    icon: icon1,
  },
  {
    to: '/dashboard/account',
    title: 'Mein Konto',
    subtitle: 'Konto Einstellungen',
    icon: icon1,
  },
];

export { navLinks, profileMenu };
