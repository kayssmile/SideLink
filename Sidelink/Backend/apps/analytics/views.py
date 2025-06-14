from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from drf_spectacular.utils import extend_schema, OpenApiResponse
from apps.publicservice.models import PublicService
from apps.publicprofile.models import PublicProfile
from .models import AnalyticsDataEntry
from .services.data_provider import DataProvider


class AnalyticsData(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    @extend_schema(
        description="Handle GET request to return aggregated analytics data.",
        responses={
            200: OpenApiResponse(
                response={
                    'type': 'object',
                    'properties': {
                        'public_services': {'type': 'integer', 'example': 12},
                        'public_profiles': {'type': 'integer', 'example': 6},
                        'offers': {'type': 'integer', 'example': 6},
                        'searches': {'type': 'integer', 'example': 6},
                        'offers_per_category': {
                            'type': 'object',
                            'example': {
                                'handwerk': 4,
                                'reinigung': 2,
                            }   
                        },
                        'searches_per_category': {
                            'type': 'object',
                            'example': {
                                'handwerk': 4,
                                'reinigung': 2,
                            } 
                        },
                        'offers_per_region': {
                            'type': 'object',
                            'example': {
                                'Bern': 4,
                                'Zürich': 2,
                            } 
                        },
                        'searches_per_region': {
                            'type': 'object',
                            'example': {
                                'Bern': 4,
                                'Zürich': 2,
                            } 
                        },
                        'registrations_per_month_and_year': {
                            'type': 'array',
                            'items': {
                                'type': 'object',
                                'properties': {
                                    'months': {'type': 'object', 'example': {
                                'June': 4,
                                'Juli': 2,
                            } },
                                    'year': {'type': 'integer', 'example': 2025},
                                    'total': {'type': 'integer', 'example': 6}
                                }
                            }
                        },
                        'registrations_without_search_and_offer': {'type': 'integer', 'example': 3},
                        'conversation_rate_registrations': {'type': 'number', 'example': 41.6},
                    }
                },
                description="Analytics data successfully aggregated and returned."
            ),
            401: OpenApiResponse(description="Unauthorized"),
        },
        tags=['Analytics'],
    )
    def get(self, request):
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

@extend_schema(
    request=None,
    responses={
        201: OpenApiResponse(description="AnalyticsDataEntry created successfully."),
        400: OpenApiResponse(description="Invalid request. This endpoint does not accept input data."),
    },
    description="Handle POST request to create new AnalyticsData entry. This endpoint creates a new AnalyticsData record with default page_visit set to true.",
    tags=["Analytics"]
)
@api_view(['POST'])
def create_analytics_data(request):
    if request.data:
        return Response({"detail": "Not accept data."}, status=status.HTTP_400_BAD_REQUEST)
    AnalyticsDataEntry.objects.create(page_visit=True)
    return Response(status=status.HTTP_201_CREATED)
        