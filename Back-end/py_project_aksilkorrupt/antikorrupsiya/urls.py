from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from requests import views as request_views
from users import views as user_views
from questioning import views as question_views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [

    path('admin/', admin.site.urls),

    # JWT Token endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # User endpoints
    path('api/register/', user_views.register_api),
    path('api/login/', user_views.login_api),
    path('api/logout/', user_views.logout_api),
    path('api/me/', user_views.me),

    # Request endpoints
    path('api/requests/create/', request_views.api_create_request),
    path('api/my-requests/', request_views.api_my_requests),
    path('api/requests/<str:tracking_number>/evidence/', request_views.api_upload_evidence),
    path('api/evidence/<int:evidence_id>/download/', request_views.download_evidence),
    path('api/requests/<str:tracking_number>/', request_views.api_request_detail),

    # Manager endpoints
    path('api/manager/queue/', request_views.api_manager_queue),
    path('api/requests/<str:tracking_number>/take/', request_views.api_take_request),
    path('api/requests/<str:tracking_number>/status/', request_views.api_update_status),

    # Question endpoints
    path('api/questions/create/', question_views.api_create_question),
    path('api/questions/', question_views.api_list_questions),
    path('api/questions/<str:tracking_number>/answer/', question_views.api_answer_question),
]