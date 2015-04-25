define(['marionette'], function (Marionette) {

    var Config = Marionette.Object.extend({

        API: 'http://192.168.1.126:8080/api/'

    });

    return new Config();
});