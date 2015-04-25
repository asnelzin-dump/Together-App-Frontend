define(['backbone', 'marionette'], function (Backbone, Marionette) {

    'use strict';

    var main;

    function popupView(helpers, model) {
        require(['menu/layout', 'popup/view'], function (MenuLayout, PopupView) {
            if (!(main.currentView instanceof MenuLayout)) {
                main.show(new MenuLayout());
            }

            main.currentView.popup.show(new PopupView({ templateHelpers: helpers, model: model }));
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
            require(['main/layout', 'main/model', 'main/collection'], function(MainLayout, MainModel, MainCollection) {
                main.show(new MainLayout({ model: new MainModel(), collection: new MainCollection() }));
            });
        },

        new: function() {
            require(['popup/new_model'], function(NewModel) {
                popupView({ title: "Собрать компанию" }, new NewModel());
            });
        },

        signup: function() {
            require(['popup/signup_model'], function(SignupModel) {
                popupView({ title: "Присоединиться" }, new SignupModel());
            });
        }

    });

});