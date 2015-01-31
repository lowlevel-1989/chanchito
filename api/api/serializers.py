from rest_framework import serializers
from django.contrib.auth.models import User
from movements.models import Movement, Active

class ActiveSerializer(serializers.ModelSerializer):
	class Meta:
		model  = Active
		fields = ('active', 'description',)


class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model  = User
		fields = ('id', 'username', 'email', 'password',)
		write_only_fields = ('password',)


class MovementSerializer(serializers.ModelSerializer):
    user   = UserSerializer(many=False, read_only=True)
    active = ActiveSerializer(many=False, read_only=True)
    
    class Meta:
		model  = Movement
		fields = ('id', 'date', 'amount', 'description', 'user', 'active', 'tipe')
		write_only_fields = ('tipe',)