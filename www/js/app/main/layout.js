define(['marionette', 'json2', 'text!main/tpl/view.html', 'async!gmaps'], function (Marionette, JSON, mainTemplate) {

    'use strict';

    var markerIcon = new google.maps.MarkerImage("img/marker.png", null, null, null, new google.maps.Size(36, 60));

    return Marionette.LayoutView.extend({

        template: _.template(mainTemplate),

        initialize: function() {
            this.map = null;
            this.people = [];
            this.me = null;
        },

        checkinLoop: function() {
            var self = this;
            var session = JSON.parse(localStorage.getItem('session'));

            if(navigator.geolocation) {
                setInterval(function() {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        var lng = position.coords.longitude, lat = position.coords.latitude;

                        self.model.set({
                            name: session.name,
                            password: session.password,
                            longitude: lng,
                            latitude: lat
                        });

                        self.me.setPosition(new google.maps.LatLng(lat, lng));

                        self.model.save(self.model.attributes)
                    });
                }, 5000);
            }
        },

        checkoutLoop: function() {
            var self = this;
            var session = JSON.parse(localStorage.getItem('session'));

            setInterval(function() {
                self.collection.fetch({
                    data: { name: session.name, password: session.password },
                    success: function() {

                        for (var j = 0; j < self.people.length; j++) {
                            self.people[j].setMap(null);
                            self.people.splice(0, self.people.length)
                        }

                        self.collection.each(function(elem) {
                            for (var i in elem) {
                                self.people.push(new google.maps.Marker({
                                    position: new google.maps.LatLng(elem[i].latitude, elem[i].longitude),
                                    map: self.map,
                                    icon: markerIcon
                                }));
                            }
                       });
                    }
                });
            }, 5000);
        },

        onShow: function() {
            var self = this;

            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                    var mapOptions = {
                        zoom: 15,
                        zoomControl: true,
                        zoomControlOptions: {
                            style: google.maps.ZoomControlStyle.LARGE,
                            position: google.maps.ControlPosition.RIGHT_CENTER
                        },
                        disableDefaultUI: true,
                        center: pos,
                        styles:
                            [
                                {
                                    "stylers": [
                                        {
                                            "hue": "#baf4c4"
                                        },
                                        {
                                            "saturation": 10
                                        }
                                    ]
                                },
                                {
                                    "featureType": "water",
                                    "stylers": [
                                        {
                                            "color": "#effefd"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "all",
                                    "elementType": "labels",
                                    "stylers": [
                                        {
                                            "visibility": "off"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "administrative",
                                    "elementType": "labels",
                                    "stylers": [
                                        {
                                            "visibility": "on"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "road",
                                    "elementType": "all",
                                    "stylers": [
                                        {
                                            "visibility": "off"
                                        }
                                    ]
                                },
                                {
                                    "featureType": "transit",
                                    "elementType": "all",
                                    "stylers": [
                                        {
                                            "visibility": "off"
                                        }
                                    ]
                                }
                            ]
                    };

                    self.map = new google.maps.Map(self.$('#map-canvas')[0], mapOptions);
                    self.me = new google.maps.Marker({
                        position: pos,
                        map: self.map,
                        icon: markerIcon
                    });
                    self.checkinLoop();
                    self.checkoutLoop();
                });
            }
        }

    });

});