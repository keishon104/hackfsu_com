/**
 * Created by neely on 1/30/17.
 */

(function($) {
    'use strict';

    var modal_window = $("#modal");
    var modal_message = $("#modal-message");
    var modal_header = $("#modal-header");

    $.openModal = function (message, header) {
        modal_message.text(message);
        modal_header.text(header);
        modal_window.modal('show');
    }

    $.closeModal = function () {
        modal_window.modal('hide');
    }

    $(".modal-footer button").click( function() {
        $.closeModal();
    });

    $("body").on('click', ".modal-backdrop", function() {
        $.closeModal();
    });


})(jQuery);

