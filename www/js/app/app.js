define(['jquery', 'backbone', 'marionette', 'app/router',
'app/controller'], function ($, Backbone, Marionette, Router, Controller) {

    'use strict';

    var app = new Marionette.Application();

    app.addRegions({
        mainRegion: "body"
    });

    app.addInitializer(function(options) {

        //у коллекций и композитов свой рендеринг остался тем не менее
        Marionette.ItemView.prototype.originalRender = Marionette.ItemView.prototype.render;

        Marionette.ItemView.prototype.render = function() {

            var result = Marionette.ItemView.prototype.originalRender.apply(this);

            result.$el = result.$el.children();
            result.$el.unwrap();
            result.setElement(result.$el);
            return result;

        };

        var router = new Router({ controller: new Controller({ main: app.mainRegion }) });

        Backbone.history.start();
    });

    return app;

});