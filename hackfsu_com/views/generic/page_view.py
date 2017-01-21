"""
    Base view for all web pages
"""

from django.views.generic.base import View
from django.shortcuts import render
from django.shortcuts import redirect
from hackfsu_com.util import acl


class PageView(View):
    template_name = None
    context = None
    access_manager = acl.AccessManager()

    def get(self, request):
        # Authenticate Access
        if not self.access_manager.check_user(request.user):
            # Access denied
            return redirect(self.get_access_denied_redirect_url(request))

        self.work(request)
        return render(request, template_name=self.template_name, context=None)

    def work(self, request):
        """
            To be overridden. Preform any extra logic here. Fill context here for rendering.

            If any context data could be added to the template later using the API with javascript, do that instead
            of grabbing it here. This should only be needed when it determines a major page layout feature that would
            look weird not initialized on html load.
        """
        pass

    def get_access_denied_redirect_url(self, request):
        """ May be overwritten if desired """
        if request.user.is_authenticated:
            return '/user/profile/?accessDenied=true'
        else:
            return '/user/login/?accessDenied=true&path=' + request.path