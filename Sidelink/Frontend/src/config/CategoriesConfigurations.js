const categoriesConfiguration = [
  {
    name: 'Haushalt',
    subcategories: ['Reinigung', 'Bügeln', 'Wäsche waschen', 'Haushaltshilfe auf Zeit'],
  },
  {
    name: 'Handwerk',
    subcategories: ['Malerarbeiten', 'Reparaturen', 'Montagen', 'Elektrik', 'Sanitär'],
  },
  {
    name: 'Umzug',
    subcategories: ['Umzugshelfer', 'Möbeltransport', 'Entrümpelung', 'Packhilfe', 'Einlagerung'],
  },
  {
    name: 'Garten',
    subcategories: ['Rasen mähen', 'Hecke schneiden', 'Gartenpflege', 'Laub entfernen', 'Pflanzenpflege'],
  },
  {
    name: 'IT & Technik',
    subcategories: ['Computerhilfe', 'Netzwerkinstallation', 'Smart Home Einrichtung', 'Software-Installation', 'Technikberatung'],
  },
  {
    name: 'Kinderbetreuung',
    subcategories: ['Babysitten', 'Hausaufgabenhilfe', 'Abhol-/Bringdienste', 'Spielbetreuung'],
  },
  {
    name: 'Seniorenhilfe',
    subcategories: ['Begleitung', 'Besorgungen', 'Haushaltshilfe', 'Gesellschaft leisten', 'Pflegehilfe (nicht medizinisch)'],
  },
  {
    name: 'Tiere & Tierbetreuung',
    subcategories: ['Gassi gehen', 'Fütterung', 'Tierpflege', 'Urlaubsbetreuung'],
  },
  {
    name: 'Reparatur & Montage',
    subcategories: ['Möbelmontage', 'Fahrradreparatur', 'Elektrogeräte', 'Schlüsselnotdienst', 'Smartphone / Tablet Reparatur'],
  },
  {
    name: 'Reisen & Mobilität',
    subcategories: ['Flughafentransfer', 'Fahrdienste', 'Fahrgemeinschaften', 'Reisebegleitung'],
  },
  {
    name: 'Bildung & Coaching',
    subcategories: ['Nachhilfe', 'Sprachkurse', 'Lernhilfe', 'Karriere-Coaching', 'Mentoring'],
  },
  {
    name: 'Kreativ & Medien',
    subcategories: ['Fotografie', 'Videobearbeitung', 'Texterstellung', 'Grafikdesign', 'Social Media Betreuung'],
  },
  {
    name: 'Einkauf & Besorgungen',
    subcategories: ['Einkaufsservice', 'Apothekengänge', 'Warenabholung'],
  },
  {
    name: 'Wellness & Gesundheit',
    subcategories: ['Massage', 'Yoga / Meditation', 'Ernährungsberatung', 'Mental Health Unterstützung'],
  },
  {
    name: 'Bau & Renovierung',
    subcategories: ['Trockenbau', 'Bodenverlegung', 'Fliesenlegen', 'Maurerarbeiten', 'Innenausbau'],
  },
];

import household from 'src/assets/images/categories/household.png';
import cleaning from 'src/assets/images/categories/cleaning.png';
import garden from 'src/assets/images/categories/garden.png';
import craftman from 'src/assets/images/categories/craft.png';
import relocation from 'src/assets/images/categories/relocation.png';
import studies from 'src/assets/images/categories/studies.png';
import dog from 'src/assets/images/categories/dog.png';
import health from 'src/assets/images/categories/health.png';
import digital from 'src/assets/images/categories/digital.png';

const likedCategories = [
  {
    title: 'Haushalt',
    urlParam: 'Haushalt',
    imgSrc: cleaning,
    imgDesc: 'category household image',
  },
  {
    title: 'Garten',
    urlParam: 'Garten',
    imgSrc: garden,
    imgDesc: 'category garden image',
  },
  {
    title: 'Handwerk',
    urlParam: 'Handwerk',
    imgSrc: craftman,
    imgDesc: 'category craft image',
  },
  {
    title: 'Umzug',
    urlParam: 'Umzug',
    imgSrc: relocation,
    imgDesc: 'category relocation image',
  },
  {
    title: 'Bildung & Coaching',
    urlParam: 'Bildung & Coaching',
    imgSrc: studies,
    imgDesc: 'category studies image',
  },
  {
    title: 'IT & Technik',
    urlParam: 'IT & Technik',
    imgSrc: digital,
    imgDesc: 'category digital image',
  },
  {
    title: 'Haustiere',
    urlParam: 'Tiere & Tierbetreuung',
    imgSrc: dog,
    imgDesc: 'category animals image',
  },
  {
    title: 'Reinigung',
    urlParam: 'Haushalt',
    imgSrc: household,
    imgDesc: 'category cleaning image',
  },
  {
    title: 'Wellness & Gesundheit',
    urlParam: 'Wellness & Gesundheit',
    imgSrc: health,
    imgDesc: 'category health image',
  },
];

export { categoriesConfiguration, likedCategories };
