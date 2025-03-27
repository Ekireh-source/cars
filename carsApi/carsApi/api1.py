from django.urls import include, path

urlpatterns = [
    path(
        "auth/",
        include(("accounts.api.urls", "auth"), namespace="auth"),
    ),
    
    path(
        "cars/",
        include(
            ("cars.api.urls", "documents"), namespace="cars"
        ),
    )
]
