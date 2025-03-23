from rest_framework import serializers
from .models import PublicProfile

class PublicProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PublicProfile
        fields = '__all__'

    def create(self, validated_data):
        return PublicProfile.objects.create(**validated_data)