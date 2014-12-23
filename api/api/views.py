from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from movements.models import Movement
from api.serializers import UserSerializer, MovementSerializer


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset         = User.objects.all()


class MovementViewSet(viewsets.ModelViewSet):
    serializer_class = MovementSerializer
    queryset         = Movement.objects.all()
    # lookup_field     = 'amount'
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)   


@api_view(['GET'])
def TokenUserViewSet(request):
    if request.user.is_authenticated():
        return Response (UserSerializer(request.user).data)
    return Response({})