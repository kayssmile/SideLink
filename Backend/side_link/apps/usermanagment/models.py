from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.core.models import TimestampMixin

class RegisteredUserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        extra_fields['is_active'] = True
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self.create_user(email, password, **extra_fields)

class RegisteredUser(TimestampMixin, AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    profession = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=100)
    street_address = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=100)
    place = models.CharField(max_length=100)
    region = models.CharField(max_length=100)
    public_profile = models.OneToOneField(
        'publicprofile.PublicProfile', 
        on_delete=models.SET_NULL,
        null=True,
    )
    
    # Required fields for AbstractBaseUser
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = RegisteredUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    def __str__(self):
        return self.email
    
@receiver(post_save, sender='usermanagment.RegisteredUser')
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        from apps.publicprofile.models import PublicProfile
        public_profile = PublicProfile.objects.create(user=instance)
        instance.public_profile = public_profile
        instance.save()
