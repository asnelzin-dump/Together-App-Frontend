define(['marionette', 'text!welcome/tpl/view.html'], function (Marionette, mainTemplate) {

    'use strict';

    return Marionette.ItemView.extend({

        template: _.template(mainTemplate)

    });

});