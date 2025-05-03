from rest_framework import serializers
from .models import PublicProfile

class PublicProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = PublicProfile
        fields = [
            'showed_name',
            'description',
            'contact_info',
            'public_profile_picture',
        ]

    def create(self, validated_data):
        return PublicProfile.objects.create(**validated_data)