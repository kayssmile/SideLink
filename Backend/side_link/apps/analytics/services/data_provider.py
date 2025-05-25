import pandas as pd
from apps.core.models import Category, Region
from apps.publicservice.models import PublicService
from apps.core.models import Category, Region
from apps.usermanagment.models import RegisteredUser
from apps.analytics.models import AnalyticsDataEntry

class DataProvider:
   
    def get_all_offers_per_category(self):
        """
        Provides the count of all offers grouped by category.
        """
        categories = Category.objects.all()
        offers_per_category = {}
        for category in categories:
            offers = PublicService.objects.filter(category=category, service_type='offer')
            if offers.count() > 0:
                offers_per_category[category.name] = offers.count()
        return offers_per_category           
    
    def get_all_searches_per_category(self):
        """
        Provides the count of all searches grouped by category.
        """
        categories = Category.objects.all()
        searches_per_category = {}
        for category in categories:
            searches = PublicService.objects.filter(category=category, service_type='search')
            if searches.count() > 0:
                searches_per_category[category.name] = searches.count()
        return searches_per_category
    
    def get_all_offers_per_region(self):
        """
        Provides the count of all offers grouped by region.
        """
        regions = Region.objects.all()
        offers_per_region = {}
        for region in regions:
            offers = PublicService.objects.filter(region=region, service_type='offer')
            if offers.count() > 0:
                offers_per_region[region.name] = offers.count()
        return offers_per_region
    
    def get_all_searches_per_region(self):
        """
        Provides the count of all searches grouped by region.
        """
        regions = Region.objects.all()
        searches_per_region = {}
        for region in regions:
            searches = PublicService.objects.filter(region=region, service_type='search')
            if searches.count() > 0:
                searches_per_region[region.name] = searches.count()
        return searches_per_region

    def get_all_registrations_per_month_and_year(self):
        """
        Returns a list of dictionaries with registration statistics grouped by year and month.
        Prepare panda for further data analysis
        """
        qs = RegisteredUser.objects.values('updated_at')
        if not qs.exists():
            return []
        df = pd.DataFrame(qs)
        df['updated_at'] = pd.to_datetime(df['updated_at'])
        df['year'] = df['updated_at'].dt.year
        df['month'] = df['updated_at'].dt.month
        month_names = {
            1: 'Januar', 2: 'Februar', 3: 'März', 4: 'April',
            5: 'Mai', 6: 'Juni', 7: 'Juli', 8: 'August',
            9: 'September', 10: 'Oktober', 11: 'November', 12: 'Dezember'
        }
        df['month_name'] = df['month'].map(month_names)
        grouped = df.groupby(['year', 'month_name']).size().reset_index(name='count')
        result = []
        for year in grouped['year'].unique():
            year_data = grouped[grouped['year'] == year]
            result.append({
                'year': year,
                'total': int(year_data['count'].sum()),
                'months': dict(zip(year_data['month_name'], year_data['count']))
            })
        return result
       
        """
        Provides user registrations by year and month based on their 'updated_at' field.
        Returns:
            list of dict: Each dict contains 'year', 'total' count, and a 'months' dict
                          mapping month names to registration counts.
        
        public_services = RegisteredUser.objects.all()
        data_frame = pd.DataFrame(list(public_services.values('id', 'updated_at')))
        data_frame['updated_at'] = pd.to_datetime(data_frame['updated_at'])
        data_frame['year'] = data_frame['updated_at'].dt.year
        data_frame['month'] = data_frame['updated_at'].dt.month
        month_names = {
                1: 'Januar', 2: 'Februar', 3: 'März', 4: 'April',
                5: 'Mai', 6: 'Juni', 7: 'Juli', 8: 'August',
                9: 'September', 10: 'Oktober', 11: 'November', 12: 'Dezember'
            }
        data_frame['month'] = data_frame['month'].map(month_names)
        summary = data_frame.groupby(['year', 'month']).size().reset_index(name='count')
        registrations_per_month_and_year = []  
        for year in summary['year'].unique():
            year_data = summary[summary['year'] == year]
            months = dict((zip(year_data['month'], year_data['count'])))
            total = year_data['count'].sum()
            registrations_per_month_and_year.append({
                'year': year,
                'total': int(total),
                'months': months
            })
        print(registrations_per_month_and_year)
        return registrations_per_month_and_year
        """
    
    def get_all_registrations_without_search_and_offer(self):
        """
        Provides user registrations without any associated public services
        """
        all_users = RegisteredUser.objects.all()
        result = 0
        for user in all_users:
            services = user.public_services.all()
            if services.count() == 0:
                result += 1

        return result
    
    def get_conversation_rate_registrations(self):
        """
        Provides the conversion rate of page-visits to registrations.
        """
        total_registrations = RegisteredUser.objects.count()
        total_visits = AnalyticsDataEntry.objects.count()
        if total_registrations == 0 or total_visits == 0:
            return 0.0
        conversion_rate = (total_registrations / total_visits) * 100
        return round(conversion_rate, 3)