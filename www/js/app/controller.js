define(['backbone', 'marionette'], function (Backbone, Marionette) {

    'use strict';

    var main;

    return Marionette.Controller.extend({

        initialize: function(options) {
            main = options.main;
        },

        menu: function() {
            //require(['menu/layout', 'popup/view'], function(MenuLayout, PopupView) {
            require(['menu/layout'], function(MenuLayout) {
                main.show(new MenuLayout());
            });
        },

        welcome: function() {

        },

        main: function() {

        }

    });

});