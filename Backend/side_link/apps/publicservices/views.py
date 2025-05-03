from django.shortcuts import render

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import PublicService

from .serializers import PublicServiceSerializer

from apps.core.utils.utility import check_exist_or_create

class PublicServicesView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
   
    def post(self, request):
        """
        Handle POST requests to create a new public service.
        """ 
        data = data = check_exist_or_create(request)

        try:
            user = request.user
            public_profile = user.public_profile
        except AttributeError:
            return Response({'detail': 'Fehlender Benutzer oder Profil'}, status=400)

        data['user'] = user.id
        data['public_profile_id'] = public_profile.public_profile_id
        serializer = PublicServiceSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request):
        """
        Handle DELETE requests to delete an existing public service.
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
        """
        data = check_exist_or_create(request)
        
        try:
            public_service = PublicService.objects.get(id=request.data.get('public_service_id'))
        except PublicService.DoesNotExist:
            return Response({'detail': 'Public service not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = PublicServiceSerializer(public_service, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        