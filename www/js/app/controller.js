define(['backbone', 'marionette'], function (Backbone, Marionette) {

    'use strict';

    var main;

    function popupView(options) {
        require(['menu/layout', 'popup/view'], function (MenuLayout, PopupView) {
            if (!(main.currentView instanceof MenuLayout)) {
                main.show(new MenuLayout());
            }

            main.currentView.popup.show(new PopupView({ templateHelpers: options }));
        });
    }

    return Marionette.Controller.extend({

        initialize: function(options) {
            main = options.main;
        },

        menu: function() {
            require(['menu/layout'], function(MenuLayout) {
                main.show(new MenuLayout());
            });
        },

        welcome: function() {
            require(['welcome/view'], function(WelcomeView) {
                main.show(new WelcomeView());
            });
        },

        main: function() {
            require(['main/layout'], function(MainLayout) {
                main.show(new MainLayout());
            });
        },

        new: function() {
            popupView({ title: "Собрать компанию" });
        },

        signup: function() {
            popupView({ title: "Присоединиться" });
        }

    });

});