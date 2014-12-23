from django.conf.urls import patterns, url, include
from rest_framework.routers import SimpleRouter
from api.views import UserViewSet, MovementViewSet
from rest_framework.authtoken import views


simpleRouter = SimpleRouter()
simpleRouter.register(r'users', UserViewSet)
simpleRouter.register(r'movements', MovementViewSet)

urlpatterns = patterns('api.views',
    url(r'^', include(simpleRouter.urls)),
    url(r'^token/$', views.obtain_auth_token), #Generate Token
    url(r'^token/user/$', 'TokenUserViewSet'), #Ganera informacion del usuario logueado
)

