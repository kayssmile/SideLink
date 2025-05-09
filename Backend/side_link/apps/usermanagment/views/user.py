from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.password_validation import validate_password


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.usermanagment.models import RegisteredUser
from apps.usermanagment.serializers import RegisteredUserSerializer, CustomUserSerializer


class RegisterUserView(APIView):

    def post(self, request):
        
        if RegisteredUser.objects.filter(email=request.data.get('email')).exists():
            return Response(
            {"error": "A user with this email already exists"},
            status=status.HTTP_400_BAD_REQUEST
            )
        serializer = RegisteredUserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
class RegisteredUserView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # check if user is available
        user_data = CustomUserSerializer(user).data
        return Response(user_data, status=status.HTTP_200_OK)
    
    def patch(self, request):
        
        user = request.user
        serializer = CustomUserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

