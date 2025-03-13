import img1 from 'src/assets/images/profile/user-1.jpg';
import img2 from 'src/assets/images/profile/user-2.jpg';
import img3 from 'src/assets/images/profile/user-3.jpg';
import img4 from 'src/assets/images/profile/user-4.jpg';

import icon1 from 'src/assets/images/svgs/icon-account.svg';
import icon2 from 'src/assets/images/svgs/icon-inbox.svg';
import icon3 from 'src/assets/images/svgs/icon-tasks.svg';

import ddIcon1 from 'src/assets/images/svgs/icon-dd-chat.svg';
import ddIcon2 from 'src/assets/images/svgs/icon-dd-cart.svg';
import ddIcon3 from 'src/assets/images/svgs/icon-dd-invoice.svg';
import ddIcon4 from 'src/assets/images/svgs/icon-dd-date.svg';
import ddIcon5 from 'src/assets/images/svgs/icon-dd-mobile.svg';
import ddIcon6 from 'src/assets/images/svgs/icon-dd-lifebuoy.svg';
import ddIcon7 from 'src/assets/images/svgs/icon-dd-message-box.svg';
import ddIcon8 from 'src/assets/images/svgs/icon-dd-application.svg';

// Profile dropdown

const profile = [
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

export { profile };
