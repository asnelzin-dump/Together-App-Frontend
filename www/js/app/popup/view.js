define(['marionette', 'text!popup/tpl/view.html'], function (Marionette, mainTemplate) {

    'use strict';

    return Marionette.ItemView.extend({

        template: _.template(mainTemplate)

    });

});