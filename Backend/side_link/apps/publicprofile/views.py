from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import PublicProfile
from .serializers import PublicProfileSerializer

class PublicProfileView(APIView):

    def post(self, request):
        serializer = PublicProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        public_profile = PublicProfile.objects.all()
        serializer = PublicProfileSerializer(public_profile, many=True)
        return Response(serializer.data)

    def put(self, request, pk):
        public_profile = self.get_object(pk)
        serializer = PublicProfileSerializer(public_profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        public_profile = self.get_object(pk)
        public_profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)    