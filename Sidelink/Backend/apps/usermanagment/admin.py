from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import RegisteredUser

"""
Custom configuration for RegisteredUser-model in admin-panel.
"""
@admin.register(RegisteredUser)
class RegisteredUserAdmin(UserAdmin):
    model = RegisteredUser
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Name', {'fields': ('first_name', 'last_name')}),
        ('Adress', {
            'fields': (
                'street_address',
                'postal_code',
                'place',
                'region',
                'phone_number',
                'profession',
            )
        }),
        ('Public profile', {'fields': ('public_profile',)}),
        ('Authorisation', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        ('Systeminfos', {'fields': ('last_login',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email',
                'password1',
                'password2',
                'first_name',
                'last_name',
                'profession',
                'phone_number',
                'street_address',
                'postal_code',
                'place',
                'region',
                'is_active',
                'is_staff',
                'is_superuser',
            ),
        }),
    )
    readonly_fields = ('public_profile',)
    list_display = ('email', 'first_name', 'last_name', 'is_active')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)