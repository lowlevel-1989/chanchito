from django.db import models
from django.contrib.auth.models import User

class Active(models.Model):
	date        = models.DateField(auto_now=True)
	description = models.TextField(blank=True)
	active      = models.BooleanField(default=True)

class Movement(models.Model):
	user        = models.ForeignKey(User)
	amount      = models.FloatField()
	date        = models.DateField(auto_now=True)
	description = models.TextField()
	tipe        = models.BooleanField(default=False)
	active      = models.ForeignKey(Active)

	def save(self, *args, **kwargs):
		if not self.pk:
			active = Active()
			active.save()
			self.active = active
		super(Movement, self).save(*args, **kwargs)

	def __unicode__(self):
		return self.description