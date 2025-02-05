from django.contrib.auth import logout, login, authenticate
from django.db import IntegrityError
from django.views.decorators.csrf import csrf_exempt, requires_csrf_token

from .models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['POST'])
@requires_csrf_token
def register(request):

    data = request.data

    try:
        new_user = User.objects.create(
            username=data['username'],
            email=data['email'],
        )

        new_user.set_password(data['password'])

        new_user.save()

    except IntegrityError:
        return Response({
            'error': "An account is already registered with this email",
        }, status=400)

    except Exception as e:
        return Response({
            'error': str(e),
        })

    user = authenticate(request, username=data["email"], password=data["password"])

    if user is not None:
        login(request, user)
        request.session.save()
    else:
        return Response({
            'error': "An error occurred while logging in the user. Please try again.",
        }, status=400)

    return Response({
        'message': "account successfully created",
    }, status=201)


@api_view(['POST'])
@requires_csrf_token
def account_login(request):
    print(request.headers)

    logout(request)

    data = request.data

    user = authenticate(request, username=data["email"], password=data["password"])

    if user is not None:
        login(request, user)
        request.session.save()
    else:
        return Response({
            'error': "Invalid email or password. Please try again.",
        }, status=400)

    return Response({
        'message': "logged in"
    }, status=200)


@api_view(['GET'])
def account_logout(request):
    logout(request)
    return Response({
        'message': "logged out"
    })


@api_view(['GET'])
def get_user(request):
    user = request.user

    if user.is_anonymous:
        return Response({
            'error': "User is not authenticated"
        }, status=400)

    return Response({
        'username': user.get_username(),
        'email': user.email
    })
