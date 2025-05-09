from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from apps.publicprofile.models import PublicProfile
from apps.publicservices.models import PublicService
from apps.usermanagment.serializers import CustomUserSerializer
from apps.publicprofile.serializers import PublicProfileSerializer
from apps.publicservices.serializers import PublicServiceSerializer
from .serializers import ContactMessageSerializer
from apps.core.services import email_service

class UserDashboardData(APIView):
    """
    Get dashboard data for the authenticated user.
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
   
    def get(self, request):
        user = request.user
        if not user:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        user_data = CustomUserSerializer(user).data
        public_profile_data = self.getPublicProfileData(user)
        public_services_data = self.getPublicServicesData(user)
        dashboard_data = {'user_data': user_data , 'public_profile_data' : public_profile_data, 'public_services_data': public_services_data}
        
        return Response(dashboard_data, status=status.HTTP_200_OK)
    

    def getPublicProfileData(self, user):
        try:
            public_profile = PublicProfile.objects.get(user=user)
            public_profile_data = PublicProfileSerializer(public_profile).data
            return public_profile_data
        except PublicProfile.DoesNotExist:
            return None
        

    def getPublicServicesData(self, user):
        public_services = PublicService.objects.filter(user=user)
        if (not public_services.exists()):
            return []
        public_services_data = PublicServiceSerializer(public_services, many=True).data
        return public_services_data
    

@api_view(['GET'])
def get_public_data(request):
    """
    Get public data.
    """
    public_services_data = PublicService.objects.all()
    public_profiles_data = PublicProfile.objects.all()
    public_services_data = PublicServiceSerializer(public_services_data, many=True).data
    public_profiles_data = PublicProfileSerializer(public_profiles_data, many=True).data
    
    public_data = {'public_profiles_data' : public_profiles_data, 'public_services_data': public_services_data}
    
    return Response(public_data, status=status.HTTP_200_OK)

@api_view(['POST'])
def process_message(request):
    """
    Receive contac message from the user and send it via email to the admin.
    """
    serializer = ContactMessageSerializer(data=request.data)

    if serializer.is_valid():
        sent_message = email_service.EmailService.send_email({"to_email": 'admin@sidelink.ch', "subject": serializer.validated_data['subject'], "text_content": serializer.validated_data['message']})
        if not sent_message:
            return Response({"message": "E-Mail konnte nicht gesendet werden"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   