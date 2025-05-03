from django.core.management.base import BaseCommand
from apps.core.models import Region

REGIONS = [
    { 'name': 'Aargau' },
    { 'name': 'Appenzell Ausserrhoden' },
    { 'name': 'Appenzell Innerrhoden' },
    { 'name': 'Basel-Landschaft' },
    { 'name': 'Basel-Stadt' },
    { 'name': 'Bern' },
    { 'name': 'Freiburg' },
    { 'name': 'Genf' },
    { 'name': 'Glarus' },
    { 'name': 'Graubünden' },
    { 'name': 'Jura' },
    { 'name': 'Luzern' },
    { 'name': 'Neuenburg' },
    { 'name': 'Nidwalden' },
    { 'name': 'Obwalden' },
    { 'name': 'Schaffhausen' },
    { 'name': 'Schwyz' },
    { 'name': 'Solothurn' },
    { 'name': 'St. Gallen' },
    { 'name': 'Tessin' },
    { 'name': 'Thurgau' },
    { 'name': 'Uri' },
    { 'name': 'Waadt' },
    { 'name': 'Wallis' },
    { 'name': 'Zug' },
    { 'name': 'Zürich' }
]

class Command(BaseCommand):
    '''
    Django Management Command to load regions in database
    '''
    help = 'Lädt Regionen in die Datenbank'

    def handle(self, *args, **kwargs):
        '''
        Check if region already exist in the database, if not create it
        '''
        for region in REGIONS:
            region, created = Region.objects.get_or_create(name=region['name'])
            if created:
                self.stdout.write(self.style.SUCCESS(f'Region erstellt: {region.name}'))
            else:
                self.stdout.write(self.style.WARNING(f'Region existiert bereits: {region.name}'))
