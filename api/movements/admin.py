from django.contrib import admin
from movements.models import Movement

class MovementAdmin(admin.ModelAdmin):
    exclude = ('active',)

admin.site.register(Movement, MovementAdmin)