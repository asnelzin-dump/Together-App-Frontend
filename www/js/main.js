require.config({

    baseUrl: 'js/lib',

    paths: {
        app: '../app',
        welcome: '../app/welcome',
        menu: '../app/menu',
        main: '../app/main',
        popup: '../app/popup',
        chat: '../app/chat',
        messages: '../app/messages',
        text: 'plugins/require/text',
        async: 'plugins/require/async',
        gmaps: 'http://maps.google.com/maps/api/js?v=3.9&sensor=false&libraries=places',
        marionette: 'plugins/backbone/marionette'
    },

    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'marionette': {
            deps: ['backbone'],
            exports: 'Marionette'
        },
        'underscore': {
            exports: '_'
        }
    }
});

require(['app/app'], function (app) {

    app.start();

});