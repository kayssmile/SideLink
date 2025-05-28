from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.core.services.db_service import DbService
from .models import PublicService
from .serializers import PublicServiceSerializer

# API View for managing public services
class PublicServiceView(APIView):
    """
    API endpoint for managing public services.
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
   
    def post(self, request):
        """
        Handle POST requests to create a new public service.
        Returns:
            - 201 Created with public service data if successful
            - 400 Bad Request if validation fails
        """ 
        # Util function to check if the category, sub_category, region, and location exist in the database, if not create them.
        data = data = DbService.check_exist_or_create(request)
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

    def delete(self, request):
        """
        Handle DELETE requests to delete an existing public service by ID.
        Query Parameters:
            - id: The ID of the public service to delete.
        Returns:
            - 200 OK if deletion is successful
            - 400 Bad Request if ID is not provided
            - 404 Not Found if the public service does not exist
        """
        public_service_id = request.query_params.get('id')
        if not public_service_id:
            return Response({'detail': 'ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            public_service = PublicService.objects.get(id=public_service_id)
        except PublicService.DoesNotExist:
            return Response({'detail': 'Public service not found'}, status=status.HTTP_404_NOT_FOUND)
        public_service.delete()
        return Response({'public_service_id': public_service_id }, status=status.HTTP_200_OK)

    def put(self, request):
        """
        Handle PATCH requests to update an existing public service.
        Returns:
            - 200 OK with updated public service data if successful
            - 400 Bad Request if validation fails
            - 404 Not Found if the public service does not exist
        """
        data = DbService.check_exist_or_create(request)
        try:
            public_service = PublicService.objects.get(id=request.data.get('public_service_id'))
        except PublicService.DoesNotExist:
            return Response({'detail': 'Public service not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = PublicServiceSerializer(public_service, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        