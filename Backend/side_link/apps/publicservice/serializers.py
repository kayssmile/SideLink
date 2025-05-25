from rest_framework import serializers
from apps.core.models import Category, SubCategory, Region, Location
from apps.core.utils.validators import BasicValidators
from .models import PublicService

class SubCategorySerializer(serializers.ModelSerializer):
    """     
    Serializer for the SubCategory model.
    Used to serialize sub-category details in nested representations.
    """
    class Meta:
        model = SubCategory
        fields = ['id', 'name']


class PublicServiceSerializer(serializers.ModelSerializer):
    """
    Serializer for the PublicService model.
    Handles write-only for foreign key relationships and
    read-only for detailed output.
    """
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
    
    # Read-only representations for output (detailed view)
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

    def validate(self, attrs):
        """
        Perform custom validation on incoming data.
        Uses BasicValidators to sanitize inputs and prevent XSS attacks.
        """
        return BasicValidators.validate_for_xss(attrs)    

    def create(self, validated_data):
        """
        Create a new PublicService instance and assign the many-to-many sub_categories.
        """
        sub_categories_data = validated_data.pop('sub_categories', [])
        public_service = PublicService.objects.create(**validated_data)
        public_service.sub_categories.set(sub_categories_data)
        
        return public_service