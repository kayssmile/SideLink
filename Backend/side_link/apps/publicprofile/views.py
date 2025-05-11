from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import PublicProfile
from .serializers import PublicProfileSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response



class PublicProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def patch(self, request):
        user = request.user
        public_profile = user.public_profile
        serializer = PublicProfileSerializer(public_profile, data=request.data,  partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

    def delete(self, request, pk):
        public_profile = self.get_object(pk)
        public_profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def get_public_profile(request):
    """
    Get public profile
    """
    request_id = request.query_params.get('id')
    if not request_id:
        return Response({'detail': 'ID is required'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        public_profile = PublicProfile.objects.get(public_profile_id=request_id)
    except public_profile.DoesNotExist:
            return Response({'detail': 'Public profile not found'}, status=status.HTTP_404_NOT_FOUND)    
    public_profile_data = PublicProfileSerializer(public_profile, many=False).data
    return Response(public_profile_data, status=status.HTTP_200_OK)