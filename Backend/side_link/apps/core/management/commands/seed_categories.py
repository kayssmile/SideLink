from django.core.management.base import BaseCommand
from apps.core.models import Category, SubCategory

CATEGORIES = [
    {
        'name': 'Haushalt',
        'subcategories': ['Reinigung', 'Bügeln', 'Wäsche waschen', 'Organisation & Ordnung', 'Haushaltshilfe auf Zeit'],
    },
    {
        'name': 'Handwerk',
        'subcategories': ['Malerarbeiten', 'Reparaturen', 'Montagen', 'Elektrik', 'Sanitär'],
    },
    {
        'name': 'Umzug',
        'subcategories': ['Umzugshelfer', 'Möbeltransport', 'Entrümpelung', 'Packhilfe', 'Einlagerung'],
    },
    {
        'name': 'Garten',
        'subcategories': ['Rasen mähen', 'Hecke schneiden', 'Gartenpflege', 'Laub entfernen', 'Pflanzenpflege'],
    },
    {
        'name': 'IT & Technik',
        'subcategories': ['Computerhilfe', 'Netzwerkinstallation', 'Smart Home Einrichtung', 'Software-Installation', 'Technikberatung'],
    },
    {
        'name': 'Kinderbetreuung',
        'subcategories': ['Babysitten', 'Hausaufgabenhilfe', 'Abhol-/Bringdienste', 'Spielbetreuung'],
    },
    {
        'name': 'Seniorenhilfe',
        'subcategories': ['Begleitung', 'Besorgungen', 'Haushaltshilfe', 'Gesellschaft leisten', 'Pflegehilfe (nicht medizinisch)'],
    },
    {
        'name': 'Tiere & Tierbetreuung',
        'subcategories': ['Gassi gehen', 'Fütterung', 'Tierpflege', 'Urlaubsbetreuung'],
    },
    {
        'name': 'Reparatur & Montage',
        'subcategories': ['Möbelmontage', 'Fahrradreparatur', 'Elektrogeräte', 'Schlüsselnotdienst', 'Smartphone / Tablet Reparatur'],
    },
    {
        'name': 'Reisen & Mobilität',
        'subcategories': ['Flughafentransfer', 'Fahrdienste', 'Fahrgemeinschaften', 'Reisebegleitung'],
    },
    {
        'name': 'Bildung & Coaching',
        'subcategories': ['Nachhilfe', 'Sprachkurse', 'Lernhilfe', 'Karriere-Coaching', 'Mentoring'],
    },
    {
        'name': 'Kreativ & Medien',
        'subcategories': ['Fotografie', 'Videobearbeitung', 'Texterstellung', 'Grafikdesign', 'Social Media Betreuung'],
    },
    {
        'name': 'Einkauf & Besorgungen',
        'subcategories': ['Einkaufsservice', 'Apothekengänge', 'Paketannahme & Versand', 'Warenabholung'],
    },
    {
        'name': 'Wellness & Gesundheit',
        'subcategories': ['Massage', 'Yoga / Meditation', 'Ernährungsberatung', 'Mental Health Unterstützung'],
    },
    {
        'name': 'Bau & Renovierung',
        'subcategories': ['Trockenbau', 'Bodenverlegung', 'Fliesenlegen', 'Maurerarbeiten', 'Innenausbau'],
    },
]

class Command(BaseCommand):
    '''
    Django Management Command to load categories and subcategories in database
    '''
    help = 'Lädt Kategorien und Subkategorien in die Datenbank'

    def handle(self, *args, **kwargs):
        '''
        Check if categories and subcategories already exist in the database, if not create them
        '''
        for cat_data in CATEGORIES:
            category, created = Category.objects.get_or_create(name=cat_data['name'])
            if created:
                self.stdout.write(self.style.SUCCESS(f'Kategorie erstellt: {category.name}'))
            else:
                self.stdout.write(self.style.WARNING(f'Kategorie existiert bereits: {category.name}'))

            for sub in cat_data['subcategories']:
                subcat, sub_created = SubCategory.objects.get_or_create(name=sub, category=category)
                if sub_created:
                    self.stdout.write(self.style.SUCCESS(f'  → Subkategorie erstellt: {subcat.name}'))
                else:
                    self.stdout.write(self.style.WARNING(f'  → Subkategorie existiert bereits: {subcat.name}'))
