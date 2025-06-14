from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema, OpenApiResponse
from django.contrib.auth.password_validation import validate_password
from apps.usermanagment.models import RegisteredUser
from apps.usermanagment.serializers import RegisteredUserSerializer, CustomUserSerializer


class RegisterUserView(APIView):
    
    @extend_schema(
        request=RegisteredUserSerializer,
        responses={
            201: OpenApiResponse(
                description="User registered successfully",
                response=RegisteredUserSerializer
            ),
            400: OpenApiResponse(
                description="Validation error or email already exists"
            )
        },
        description="Handle POST requests to register a new user.",
        tags=["Usermanagement"]
    )
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

    @extend_schema(
        responses={
            200: OpenApiResponse(
                description="Authenticated user data retrieved successfully",
                response=CustomUserSerializer
            ),
            400: OpenApiResponse(
                description="Validation error"
            ),
            401: OpenApiResponse(description="Unauthorized")
        },
        description="Handle GET request to retrieve authenticated user data.",
        tags=["Usermanagement"]
    )
    def get(self, request):
        user = request.user
        user_data = CustomUserSerializer(user).data
        return Response(user_data, status=status.HTTP_200_OK)
    
    @extend_schema(
        request=CustomUserSerializer,
        responses={
            200: OpenApiResponse(
                description="Registered user data updated successfully",
                response=CustomUserSerializer(many=False),
            ),
            400: OpenApiResponse(
                description="Invalid input data, or Email already exists",    
            ),
            401: OpenApiResponse(description="Unauthorized"),
            404: OpenApiResponse(description="User not found")
        },
        description="Handle PATCH request to partially update authenticated user data.",
        tags=["Usermanagement"]
    )
    def patch(self, request):
        user = request.user
        if request.data.get('email') and request.data.get('email') != user.email:
            if RegisteredUser.objects.filter(email=request.data.get('email')).exists():
                return Response(
                {"error": "A user with this email already exists"},
                status=status.HTTP_400_BAD_REQUEST
                )
        serializer = CustomUserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @extend_schema(
        responses={
            204: OpenApiResponse(
                description="User deleted successfully"
            ),
            401: OpenApiResponse(description="Unauthorized")
        },
        description="Handle DELETE request to delete the authenticated user.",
        tags=["Usermanagement"]
    )
    def delete(self, request):
        user = request.user
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)