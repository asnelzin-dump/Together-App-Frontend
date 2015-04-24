define(['marionette', 'text!menu/tpl/view.html'], function (Marionette, mainTemplate) {

    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(mainTemplate)

    });

});