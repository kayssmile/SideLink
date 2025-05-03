from rest_framework import serializers
from .models import PublicService
from apps.core.models import Category, SubCategory, Region, Location


class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ['id', 'name']


class PublicServiceSerializer(serializers.ModelSerializer):
    
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        write_only=True
    )

    sub_categories = serializers.PrimaryKeyRelatedField(
        write_only=True,
        many=True,
        queryset=SubCategory.objects.all()
    )

    region = serializers.PrimaryKeyRelatedField(
        queryset=Region.objects.all(),
        write_only=True
    )

    location = serializers.PrimaryKeyRelatedField(
        queryset=Location.objects.all(),
        write_only=True
    )
    
    category_details = serializers.StringRelatedField(
        many=False,
        read_only=True,
        source='category'
    )

    sub_categories_details = SubCategorySerializer(
        many=True,
        read_only=True,
        source='sub_categories'
    )

    region_details = serializers.StringRelatedField(
        many=False,
        read_only=True,
        source='region'
    )

    location_details = serializers.StringRelatedField(
        many=False,
        read_only=True,
        source='location'
    )

    class Meta:
        model = PublicService
        fields = '__all__'

    def create(self, validated_data):
        sub_categories_data = validated_data.pop('sub_categories', [])
        public_service = PublicService.objects.create(**validated_data)
        public_service.sub_categories.set(sub_categories_data)
        
        return public_service