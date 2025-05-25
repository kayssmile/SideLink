from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from apps.publicservice.models import PublicService
from apps.publicprofile.models import PublicProfile
from .models import AnalyticsDataEntry
from .services.data_provider import DataProvider


class AnalyticsData(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """
        Handle GET request to return aggregated analytics data.
        """  
        data_provider = DataProvider()
        result = {
            'public_services': PublicService.objects.count(),
            'public_profiles': PublicProfile.objects.count(),
            'offers': PublicService.objects.filter(service_type='offer').count(),
            'searches': PublicService.objects.filter(service_type='search').count(),
            'offers_per_category': data_provider.get_all_offers_per_category(),
            'searches_per_category': data_provider.get_all_searches_per_category(),
            'offers_per_region': data_provider.get_all_offers_per_region(),
            'searches_per_region': data_provider.get_all_searches_per_region(),
            'registrations_per_month_and_year': data_provider.get_all_registrations_per_month_and_year(),
            'registrations_without_search_and_offer': data_provider.get_all_registrations_without_search_and_offer(),
            'conversation_rate_registrations': data_provider.get_conversation_rate_registrations(),
        }
        return Response(result, status=status.HTTP_200_OK)


@api_view(['POST'])
def create_analytics_data(request):
    """
    Handle POST request to create new AnalyticsData entry.
    This endpoint creates a new AnalyticsData record with default
    page_visit set to 1
    """
    if request.data:
        return Response({"detail": "Not accept data."}, status=status.HTTP_400_BAD_REQUEST)
    AnalyticsDataEntry.objects.create(page_visit=1)
    return Response(status=status.HTTP_201_CREATED)
        