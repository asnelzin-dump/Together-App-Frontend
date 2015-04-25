define(['marionette'], function (Marionette) {

    'use strict';

    return Marionette.AppRouter.extend({

        appRoutes: {
            "": "menu",
            "welcome": "welcome",
            "main": "main",
            "new": "new",
            "signup": "signup"
        }

    });

});