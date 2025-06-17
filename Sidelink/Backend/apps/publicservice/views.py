from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema, OpenApiResponse, OpenApiParameter
from apps.core.services.db_service import DbService
from .models import PublicService
from .serializers import PublicServiceSerializer


class PublicServiceView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    @extend_schema(
        request=PublicServiceSerializer,
        responses={
            201: OpenApiResponse(
                description="Public service successfully created",
                response=PublicServiceSerializer,
            ),
            400: OpenApiResponse(
                description="Bad Request if validation fails",    
            ),
            401: OpenApiResponse(description="Unauthorized"),
        },
        description="Handle POST requests to create a new public service.",
        tags=["Public Service"]
    )
    def post(self, request):
        # Util function to check if the category, sub_category, region, and location exist in the database, if not create them. Provides flexibility for frontend changes.
        data = DbService.check_exist_or_create(request)
        try:
            user = request.user
            public_profile = user.public_profile
        except AttributeError:
            return Response({'detail': 'Missing user or profile.'}, status=status.HTTP_400_BAD_REQUEST)
        data['user'] = user.id
        data['public_profile_id'] = public_profile.public_profile_id
        serializer = PublicServiceSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    @extend_schema(
        parameters=[
            OpenApiParameter(
                name='id',
                type=str,
                location=OpenApiParameter.QUERY,
                required=True,
                description='The unique identifier of the public profile',
            )
        ],
        responses={
            200: OpenApiResponse(
                description="Public service successfully deleted",
            ),
            400: OpenApiResponse(
                description="Bad Request if Id is not provided",    
            ),
            401: OpenApiResponse(description="Unauthorized"),
            404: OpenApiResponse(
                description="Public service not found",
            )
        },
        description="Handle POST requests to create a new public service.",
        tags=["Public Service"]
    )
    def delete(self, request):
        public_service_id = request.query_params.get('id')
        if not public_service_id:
            return Response({'detail': 'ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            public_service = PublicService.objects.get(id=public_service_id)
        except PublicService.DoesNotExist:
            return Response({'detail': 'Public service not found'}, status=status.HTTP_404_NOT_FOUND)
        public_service.delete()
        return Response({'public_service_id': public_service_id }, status=status.HTTP_200_OK)


    @extend_schema(
        request=PublicServiceSerializer,
        responses={
            200: OpenApiResponse(
                description="Public service successfully replaced",
                response=PublicServiceSerializer,
            ),
            400: OpenApiResponse(
                description="Bad Request if validation fails",    
            ),
            401: OpenApiResponse(description="Unauthorized"),
            404: OpenApiResponse(description="Public service not found")
        },
        description="Handle PUT requests to update an existing public service",
        tags=["Public Service"]
    )
    def put(self, request):
        data = DbService.check_exist_or_create(request)
        try:
            public_service = PublicService.objects.get(id=request.data.get('public_service_id'))
        except PublicService.DoesNotExist:
            return Response({'detail': 'Public service not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = PublicServiceSerializer(public_service, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        