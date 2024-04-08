from django.contrib.auth.backends import ModelBackend
from account.models import User


class EmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        print("authenticate called")
        try:
            user = User.objects.get(email=username)
        except User.DoesNotExist:
            return None
        else:
            if user.check_password(password):
                return user
        return None

    def get_user(self, user_id):
        try:
            print(user_id)
            print("get_user called")
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
