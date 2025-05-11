from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView

from apps.publicservices.models import PublicService
from apps.publicprofile.models import PublicProfile
from apps.core.models import Category, Region
from apps.usermanagment.models import RegisteredUser

import pandas as pd
      
class AnalyticsData(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    """
    Send analytics data to the client.
    """
    def get(self, request):
        """
        Get analytics data.
        """
        user = request.user
        if not user:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        # get all public services
        public_services = self.get_all_publicservices()
        
        # get all public profiles
        public_profiles = self.get_all_publicprofiles()
        
        # get all offers
        offers = self.get_all_offers()
        
        # get all searches
        searches = self.get_all_searches()
        
        # get all offers per categorie
        offers_per_category = self.get_all_offers_per_category()
        
        # get all searches per category
        searches_per_category = self.get_all_searches_per_category()
        
        # get all offers per region
        offers_per_region = self.get_all_offers_per_region()
        
        # get all searches per region
        searches_per_region = self.get_all_searches_per_region()
        
        # get all registrations per month and per year
        registrations_per_month_and_year = self.get_all_registrations_per_month_and_year()
        
        # gett all registrations without search and offer 
        registrations_without_search_and_offer = self.get_all_registrations_without_search_and_offer()

        result = {
            'public_services': public_services.count(),
            'public_profiles': public_profiles.count(),
            'offers': offers.count(),
            'searches': searches.count(),
            'offers_per_category': offers_per_category,
            'searches_per_category': searches_per_category,
            'offers_per_region': offers_per_region,
            'searches_per_region': searches_per_region,
            'registrations_per_month_and_year': registrations_per_month_and_year,
            'registrations_without_search_and_offer': registrations_without_search_and_offer
        }

        return Response(result, status=status.HTTP_200_OK)

    def get_all_publicservices(self):
        """
        Get all public services.
        """
        public_services = PublicService.objects.all()
        return public_services
    
    def get_all_publicprofiles(self):
        """
        Get all public profiles.
        """
        public_profiles = PublicProfile.objects.all()
        return public_profiles
    
    def get_all_offers(self):
        """
        Get all offers.
        """
        offers = PublicService.objects.filter(service_type='offer')
        return offers
    
    def get_all_searches(self):
        """
        Get all searches.
        """
        searches = PublicService.objects.filter(service_type='search')
        return searches
    
    def get_all_offers_per_category(self):
        """
        Get all offers per categorie.
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
        Get all searches per category.
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
        Get all offers per region.
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
        Get all searches per region.
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
        Get all registrations per month and year.
        """
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
        return registrations_per_month_and_year
    
    def get_all_registrations_without_search_and_offer(self):
        """
        Get all registrations without search and offer.
        """
        all_users = RegisteredUser.objects.all()
        result = 0
        for user in all_users:
            services = user.public_services.all()
            if services.count() == 0:
                result += 1

        return result