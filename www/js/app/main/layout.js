define(['marionette', 'text!main/tpl/view.html', 'async!gmaps'], function (Marionette, mainTemplate) {

    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(mainTemplate),

        initialize: function() {
            this.map = null;
        },

        onShow: function() {
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var mapOptions = {
                        zoom: 15,
                        zoomControl: true,
                        zoomControlOptions: {
                            style: google.maps.ZoomControlStyle.LARGE,
                            position: google.maps.ControlPosition.RIGHT_CENTER
                        },
                        disableDefaultUI: true,
                        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
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

                    this.map = new google.maps.Map(this.$('#map-canvas')[0], mapOptions);
                });
            }
        }

    });

});