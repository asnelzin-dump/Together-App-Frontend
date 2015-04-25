define(['marionette', 'text!menu/tpl/view.html'], function (Marionette, mainTemplate) {

    'use strict';

    return Marionette.LayoutView.extend({

        regions: {
            popup: {
                selector: "#popup"
            }
        },

        template: _.template(mainTemplate)

    });

});