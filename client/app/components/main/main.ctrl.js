(function () {
    'use strict';

    angular
        .module('eyewitness')
        .controller('MainCtrl', ['Modals', '$geolocation', 'NgMap', 'authService', '$timeout', '$scope', 'Aquisition', 'Review', MainCtrl]);

    function MainCtrl (Modals, $geolocation, NgMap, authService, $timeout, $scope, Aquisition, Review) {
        var self = this;

        //Review.like({ id: '580bf7012f5e8567082551ac' }, (res) => console.log(res));

        self.acquisitions = [];
        self.markers = [];

        Aquisition.top({ limit: 100 }, (res) => {

            const {aquisitions}= res;

            self.acquisitions = aquisitions;
            //console.log(aquisitions);

            aquisitions.forEach((acquisition) => {
                self.markers.push({
                    id: acquisition.id,
                    title: acquisition.type,
                    position: [acquisition.location.lat, acquisition.location.lng]
                });

            });

            console.log('markers', self.markers);

        });

        //Aquisition.rating({ id: "580b6db54d3873f948e18332" }, (res) => console.log(res))

        self.profile = null;

        // Get profile, if logged in
        authService.getProfileDeferred().then(function (profile) {
            self.profile = profile;
        });

        // Get map instance
        NgMap.getMap().then(function(map) {

            self.map = map;

            $geolocation.getCurrentPosition({
                timeout: 60000
            }).then(function(position) {

                const { coords: { latitude, longitude } } = position;

                var latLng = new google.maps.LatLng(latitude, longitude);

                // Pan to client location
                map.panTo(latLng);

            });

        });

        self.openModalHandler = function openModalHandler (event) {
            Modals.openDetaliedModal(event, 'qwerty');
        }


        //self.openModalHandler('a');

        self.styles = [{
            'featureType': 'all',
            'elementType': 'labels',
            'stylers': [{'visibility': 'on'}]
        }, {
            'featureType': 'all',
            'elementType': 'labels.text',
            'stylers': [{'visibility': 'on'}]
        }, {
            'featureType': 'all',
            'elementType': 'labels.text.fill',
            'stylers': [{'saturation': 36}, {'color': '#dee6f0'}, {'lightness': 40}, {'visibility': 'on'}]
        }, {
            'featureType': 'all',
            'elementType': 'labels.text.stroke',
            'stylers': [{'visibility': 'off'}, {'color': '#000000'}, {'lightness': 16}]
        }, {
            'featureType': 'all',
            'elementType': 'labels.icon',
            'stylers': [{'visibility': 'off'}, {'hue': '#ff0000'}]
        }, {
            'featureType': 'administrative',
            'elementType': 'geometry.fill',
            'stylers': [{'color': '#353c44'}, {'lightness': 20}]
        }, {
            'featureType': 'administrative',
            'elementType': 'geometry.stroke',
            'stylers': [{'color': '#000000'}, {'lightness': 17}, {'weight': 1.2}]
        }, {
            'featureType': 'landscape',
            'elementType': 'geometry',
            'stylers': [{'color': '#000000'}, {'lightness': 20}]
        }, {
            'featureType': 'landscape',
            'elementType': 'geometry.fill',
            'stylers': [{'color': '#1c1e25'}]
        }, {
            'featureType': 'landscape.man_made',
            'elementType': 'labels.text',
            'stylers': [{'visibility': 'on'}]
        }, {
            'featureType': 'landscape.man_made',
            'elementType': 'labels.icon',
            'stylers': [{'visibility': 'on'}, {'hue': '#e0ff00'}]
        }, {
            'featureType': 'poi',
            'elementType': 'geometry',
            'stylers': [{'color': '#000000'}, {'lightness': 21}]
        }, {
            'featureType': 'poi',
            'elementType': 'geometry.fill',
            'stylers': [{'color': '#1e212b'}]
        }, {
            'featureType': 'poi',
            'elementType': 'labels.text',
            'stylers': [{'visibility': 'on'}]
        }, {
            'featureType': 'poi',
            'elementType': 'labels.icon',
            'stylers': [{'visibility': 'on'}]
        }, {
            'featureType': 'road.highway',
            'elementType': 'geometry.fill',
            'stylers': [{'color': '#00cebd'}, {'lightness': 17}, {'saturation': '11'}]
        }, {
            'featureType': 'road.highway',
            'elementType': 'geometry.stroke',
            'stylers': [{'color': '#000000'}, {'lightness': 29}, {'weight': 0.2}]
        }, {
            'featureType': 'road.highway',
            'elementType': 'labels.text.fill',
            'stylers': [{'visibility': 'simplified'}]
        }, {
            'featureType': 'road.highway',
            'elementType': 'labels.icon',
            'stylers': [{'hue': '#ff7a00'}, {'saturation': '79'}, {'visibility': 'on'}, {'lightness': '-33'}, {'gamma': '0.63'}]
        }, {
            'featureType': 'road.arterial',
            'elementType': 'geometry',
            'stylers': [{'color': '#000000'}, {'lightness': 18}]
        }, {
            'featureType': 'road.arterial',
            'elementType': 'geometry.fill',
            'stylers': [{'color': '#256a72'}, {'saturation': '61'}]
        }, {
            'featureType': 'road.local',
            'elementType': 'geometry',
            'stylers': [{'color': '#000000'}, {'lightness': 16}]
        }, {
            'featureType': 'road.local',
            'elementType': 'geometry.fill',
            'stylers': [{'gamma': '1'}, {'lightness': '0'}, {'color': '#2d414b'}]
        }, {
            'featureType': 'transit',
            'elementType': 'geometry',
            'stylers': [{'color': '#000000'}, {'lightness': 19}]
        }, {
            'featureType': 'transit.line',
            'elementType': 'geometry.fill',
            'stylers': [{'color': '#eb0202'}]
        }, {
            'featureType': 'transit.station',
            'elementType': 'geometry.fill',
            'stylers': [{'color': '#ff1d00'}, {'saturation': '-35'}, {'lightness': '-47'}]
        }, {
            'featureType': 'transit.station',
            'elementType': 'labels.icon',
            'stylers': [{'hue': '#00d4ff'}, {'visibility': 'simplified'}, {'lightness': '0'}, {'saturation': '0'}, {'gamma': '0.5'}]
        }, {'featureType': 'water', 'elementType': 'geometry', 'stylers': [{'color': '#000000'}, {'lightness': 17}]}];

    }

}());
