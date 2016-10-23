(function () {
    'use strict';

    angular
        .module('eyewitness')
        .controller('MainCtrl', ['Modals', '$geolocation', 'NgMap', 'authService', '$timeout', '$scope', MainCtrl]);

    function MainCtrl (Modals, $geolocation, NgMap, authService, $timeout, $scope) {
        var self = this;

        self.profile = null;

        // Get profile, if logged in
        authService.getProfileDeferred().then(function (profile) {
            self.profile = profile;
        });

        // Get map instance
        NgMap.getMap().then(function (map) {

            self.map = map;

            /*$geolocation.getCurrentPosition({
             timeout: 60000
             }).then(function(position) {

             const { coords: { latitude, longitude } } = position;

             var latLng = new google.maps.LatLng(latitude, longitude);

             // Pan to client location
             map.panTo(latLng);

             });*/

            // Watch the position change of client
            $geolocation.watchPosition({
                timeout: 60000,
                maximumAge: 250,
                enableHighAccuracy: true
            });

            $scope.position = $geolocation.position;

            $scope.$watch('position.coords', function (newValue = {}, oldValue = {}) {

                const {latitude, longitude} = newValue;

                if (!latitude) return;

                var latLng = new google.maps.LatLng(latitude, longitude);

                // Pan to client location
                map.panTo(latLng);

                /*$scope.map = {
                 center: {
                 latitude: newValue.latitude,
                 longitude: newValue.longitude
                 },
                 zoom: 16
                 };*/
            }, true);

            /*// Get current client location
             geolocation.getLocation().then(function(data){

             const coords = {lat:data.coords.latitude, long:data.coords.longitude};

             var latLng = new google.maps.LatLng(coords.lat, coords.long);

             // Pan to client location
             map.panTo(latLng);

             });
             */
            /*console.log(map.getCenter());
             console.log('markers', map.markers);
             console.log('shapes', map.shapes);*/
        });

        self.promise = function () {
            return 123;
        };

        self.getDesserts = function () {
            return 123;
        };

        self.query = {
            order: 'title',
            limit: 5,
            page: 1
        };
        self.selected = [];
        self.data = [
            {
                'userId': 1,
                'id': 1,
                'title': 'quidem molestiae enim'
            },
            {
                'userId': 1,
                'id': 2,
                'title': 'sunt qui excepturi placeat culpa'
            },
            {
                'userId': 1,
                'id': 3,
                'title': 'omnis laborum odio'
            },
            {
                'userId': 1,
                'id': 4,
                'title': 'non esse culpa molestiae omnis sed optio'
            },
            {
                'userId': 1,
                'id': 5,
                'title': 'eaque aut omnis a'
            },
            {
                'userId': 1,
                'id': 6,
                'title': 'natus impedit quibusdam illo est'
            },
            {
                'userId': 1,
                'id': 7,
                'title': 'quibusdam autem aliquid et et quia'
            },
            {
                'userId': 1,
                'id': 8,
                'title': 'qui fuga est a eum'
            },
            {
                'userId': 1,
                'id': 9,
                'title': 'saepe unde necessitatibus rem'
            },
            {
                'userId': 1,
                'id': 10,
                'title': 'distinctio laborum qui'
            },
            {
                'userId': 2,
                'id': 11,
                'title': 'quam nostrum impedit mollitia quod et dolor'
            },
            {
                'userId': 2,
                'id': 12,
                'title': 'consequatur autem doloribus natus consectetur'
            },
            {
                'userId': 2,
                'id': 13,
                'title': 'ab rerum non rerum consequatur ut ea unde'
            },
            {
                'userId': 2,
                'id': 14,
                'title': 'ducimus molestias eos animi atque nihil'
            },
            {
                'userId': 2,
                'id': 15,
                'title': 'ut pariatur rerum ipsum natus repellendus praesentium'
            },
            {
                'userId': 2,
                'id': 16,
                'title': 'voluptatem aut maxime inventore autem magnam atque repellat'
            },
            {
                'userId': 2,
                'id': 17,
                'title': 'aut minima voluptatem ut velit'
            },
            {
                'userId': 2,
                'id': 18,
                'title': 'nesciunt quia et doloremque'
            },
            {
                'userId': 2,
                'id': 19,
                'title': 'velit pariatur quaerat similique libero omnis quia'
            },
            {
                'userId': 2,
                'id': 20,
                'title': 'voluptas rerum iure ut enim'
            },
            {
                'userId': 3,
                'id': 21,
                'title': 'repudiandae voluptatem optio est consequatur rem in temporibus et'
            },
            {
                'userId': 3,
                'id': 22,
                'title': 'et rem non provident vel ut'
            },
            {
                'userId': 3,
                'id': 23,
                'title': 'incidunt quisquam hic adipisci sequi'
            },
            {
                'userId': 3,
                'id': 24,
                'title': 'dolores ut et facere placeat'
            },
            {
                'userId': 3,
                'id': 25,
                'title': 'vero maxime id possimus sunt neque et consequatur'
            },
            {
                'userId': 3,
                'id': 26,
                'title': 'quibusdam saepe ipsa vel harum'
            },
            {
                'userId': 3,
                'id': 27,
                'title': 'id non nostrum expedita'
            },
            {
                'userId': 3,
                'id': 28,
                'title': 'omnis neque exercitationem sed dolor atque maxime aut cum'
            },
            {
                'userId': 3,
                'id': 29,
                'title': 'inventore ut quasi magnam itaque est fugit'
            },
            {
                'userId': 3,
                'id': 30,
                'title': 'tempora assumenda et similique odit distinctio error'
            },
            {
                'userId': 4,
                'id': 31,
                'title': 'adipisci laborum fuga laboriosam'
            },
            {
                'userId': 4,
                'id': 32,
                'title': 'reiciendis dolores a ut qui debitis non quo labore'
            },
            {
                'userId': 4,
                'id': 33,
                'title': 'iste eos nostrum'
            },
            {
                'userId': 4,
                'id': 34,
                'title': 'cumque voluptatibus rerum architecto blanditiis'
            },
            {
                'userId': 4,
                'id': 35,
                'title': 'et impedit nisi quae magni necessitatibus sed aut pariatur'
            },
            {
                'userId': 4,
                'id': 36,
                'title': 'nihil cupiditate voluptate neque'
            },
            {
                'userId': 4,
                'id': 37,
                'title': 'est placeat dicta ut nisi rerum iste'
            },
            {
                'userId': 4,
                'id': 38,
                'title': 'unde a sequi id'
            },
            {
                'userId': 4,
                'id': 39,
                'title': 'ratione porro illum labore eum aperiam sed'
            },
            {
                'userId': 4,
                'id': 40,
                'title': 'voluptas neque et sint aut quo odit'
            },
            {
                'userId': 5,
                'id': 41,
                'title': 'ea voluptates maiores eos accusantium officiis tempore mollitia consequatur'
            },
            {
                'userId': 5,
                'id': 42,
                'title': 'tenetur explicabo ea'
            },
            {
                'userId': 5,
                'id': 43,
                'title': 'aperiam doloremque nihil'
            },
            {
                'userId': 5,
                'id': 44,
                'title': 'sapiente cum numquam officia consequatur vel natus quos suscipit'
            },
            {
                'userId': 5,
                'id': 45,
                'title': 'tenetur quos ea unde est enim corrupti qui'
            },
            {
                'userId': 5,
                'id': 46,
                'title': 'molestiae voluptate non'
            },
            {
                'userId': 5,
                'id': 47,
                'title': 'temporibus molestiae aut'
            },
            {
                'userId': 5,
                'id': 48,
                'title': 'modi consequatur culpa aut quam soluta alias perspiciatis laudantium'
            },
            {
                'userId': 5,
                'id': 49,
                'title': 'ut aut vero repudiandae voluptas ullam voluptas at consequatur'
            },
            {
                'userId': 5,
                'id': 50,
                'title': 'sed qui sed quas sit ducimus dolor'
            },
            {
                'userId': 6,
                'id': 51,
                'title': 'odit laboriosam sint quia cupiditate animi quis'
            },
            {
                'userId': 6,
                'id': 52,
                'title': 'necessitatibus quas et sunt at voluptatem'
            },
            {
                'userId': 6,
                'id': 53,
                'title': 'est vel sequi voluptatem nemo quam molestiae modi enim'
            },
            {
                'userId': 6,
                'id': 54,
                'title': 'aut non illo amet perferendis'
            },
            {
                'userId': 6,
                'id': 55,
                'title': 'qui culpa itaque omnis in nesciunt architecto error'
            },
            {
                'userId': 6,
                'id': 56,
                'title': 'omnis qui maiores tempora officiis omnis rerum sed repellat'
            },
            {
                'userId': 6,
                'id': 57,
                'title': 'libero excepturi voluptatem est architecto quae voluptatum officia tempora'
            },
            {
                'userId': 6,
                'id': 58,
                'title': 'nulla illo consequatur aspernatur veritatis aut error delectus et'
            },
            {
                'userId': 6,
                'id': 59,
                'title': 'eligendi similique provident nihil'
            },
            {
                'userId': 6,
                'id': 60,
                'title': 'omnis mollitia sunt aliquid eum consequatur fugit minus laudantium'
            },
            {
                'userId': 7,
                'id': 61,
                'title': 'delectus iusto et'
            },
            {
                'userId': 7,
                'id': 62,
                'title': 'eos ea non recusandae iste ut quasi'
            },
            {
                'userId': 7,
                'id': 63,
                'title': 'velit est quam'
            },
            {
                'userId': 7,
                'id': 64,
                'title': 'autem voluptatem amet iure quae'
            },
            {
                'userId': 7,
                'id': 65,
                'title': 'voluptates delectus iure iste qui'
            },
            {
                'userId': 7,
                'id': 66,
                'title': 'velit sed quia dolor dolores delectus'
            },
            {
                'userId': 7,
                'id': 67,
                'title': 'ad voluptas nostrum et nihil'
            },
            {
                'userId': 7,
                'id': 68,
                'title': 'qui quasi nihil aut voluptatum sit dolore minima'
            },
            {
                'userId': 7,
                'id': 69,
                'title': 'qui aut est'
            },
            {
                'userId': 7,
                'id': 70,
                'title': 'et deleniti unde'
            },
            {
                'userId': 8,
                'id': 71,
                'title': 'et vel corporis'
            },
            {
                'userId': 8,
                'id': 72,
                'title': 'unde exercitationem ut'
            },
            {
                'userId': 8,
                'id': 73,
                'title': 'quos omnis officia'
            },
            {
                'userId': 8,
                'id': 74,
                'title': 'quia est eius vitae dolor'
            },
            {
                'userId': 8,
                'id': 75,
                'title': 'aut quia expedita non'
            },
            {
                'userId': 8,
                'id': 76,
                'title': 'dolorem magnam facere itaque ut reprehenderit tenetur corrupti'
            },
            {
                'userId': 8,
                'id': 77,
                'title': 'cupiditate sapiente maiores iusto ducimus cum excepturi veritatis quia'
            },
            {
                'userId': 8,
                'id': 78,
                'title': 'est minima eius possimus ea ratione velit et'
            },
            {
                'userId': 8,
                'id': 79,
                'title': 'ipsa quae voluptas natus ut suscipit soluta quia quidem'
            },
            {
                'userId': 8,
                'id': 80,
                'title': 'id nihil reprehenderit'
            },
            {
                'userId': 9,
                'id': 81,
                'title': 'quibusdam sapiente et'
            },
            {
                'userId': 9,
                'id': 82,
                'title': 'recusandae consequatur vel amet unde'
            },
            {
                'userId': 9,
                'id': 83,
                'title': 'aperiam odio fugiat'
            },
            {
                'userId': 9,
                'id': 84,
                'title': 'est et at eos expedita'
            },
            {
                'userId': 9,
                'id': 85,
                'title': 'qui voluptatem consequatur aut ab quis temporibus praesentium'
            },
            {
                'userId': 9,
                'id': 86,
                'title': 'eligendi mollitia alias aspernatur vel ut iusto'
            },
            {
                'userId': 9,
                'id': 87,
                'title': 'aut aut architecto'
            },
            {
                'userId': 9,
                'id': 88,
                'title': 'quas perspiciatis optio'
            },
            {
                'userId': 9,
                'id': 89,
                'title': 'sit optio id voluptatem est eum et'
            },
            {
                'userId': 9,
                'id': 90,
                'title': 'est vel dignissimos'
            },
            {
                'userId': 10,
                'id': 91,
                'title': 'repellendus praesentium debitis officiis'
            },
            {
                'userId': 10,
                'id': 92,
                'title': 'incidunt et et eligendi assumenda soluta quia recusandae'
            },
            {
                'userId': 10,
                'id': 93,
                'title': 'nisi qui dolores perspiciatis'
            },
            {
                'userId': 10,
                'id': 94,
                'title': 'quisquam a dolores et earum vitae'
            },
            {
                'userId': 10,
                'id': 95,
                'title': 'consectetur vel rerum qui aperiam modi eos aspernatur ipsa'
            },
            {
                'userId': 10,
                'id': 96,
                'title': 'unde et ut molestiae est molestias voluptatem sint'
            },
            {
                'userId': 10,
                'id': 97,
                'title': 'est quod aut'
            },
            {
                'userId': 10,
                'id': 98,
                'title': 'omnis quia possimus nesciunt deleniti assumenda sed autem'
            },
            {
                'userId': 10,
                'id': 99,
                'title': 'consectetur ut id impedit dolores sit ad ex aut'
            },
            {
                'userId': 10,
                'id': 100,
                'title': 'enim repellat iste'
            }
        ];

        self.count = self.data.length;
        //
        //self.openModalHandler = function openModalHandler(event) {
        //    Modals.openDetaliedModal(event, 'qwerty');
        //}
        //
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
