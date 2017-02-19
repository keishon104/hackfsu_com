(function($) {
    'use strict';

    var form = $('form#startReset');

    form.ajaxForm({
        url: '/api/user/password/reset/start',
        getData: function() {
            var data = {
                g_recaptcha_response: window.grecaptcha.getResponse(),
                email: $('input[name="email"]').val().trim()
            };

            if (!data.g_recaptcha_response) {
                $.openModal('Captcha required.', 'Warning');
                throw new Error('Captcha required.');
            }
            return data;
        },
        onAjaxComplete: function() {
            $.openModal('An email will been sent to the given address if the account exists.','Warning');
            window.location.href = '/user/login';
        },
        afterError: function() {
            window.grecaptcha.reset();
        }
    });

})(jQuery);
