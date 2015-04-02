angular.module('realtimeData', ['ngRoute', 'realtimeData.data'])
    .controller('DashboardCtrl', ['$scope', 'Tickets', 'socketio', function ($scope, Tickets, socketio) {
        'use strict';
        
        $scope.eventos = Tickets.query();
        
        socketio.on('evento', function (msg) {
            $scope.eventos.push(msg);
        });
    }])
    .controller('CreateCtrl', ['$scope', '$location', 'Tickets', function ($scope, $location, Tickets) {
        'use strict';

        $scope.save = function (newTicket) {
            Tickets.save(newTicket);
            $location.path('/');
        };


        $scope.cancel = function () {
            $location.path('/');
        };

    }])
    .controller('NotifyCtrl', ['$scope', '$location', 'Tickets', function ($scope, $location, Tickets) {
        'use strict';
        var notify = true;

        $scope.eventos = Tickets.query();

    }])
    .config(['$routeProvider', function ($routeProvider) {
        'use strict';
        
        $routeProvider
            .when('/', {
                controller: 'NotifyCtrl',
                templateUrl: 'partials/index.html'
            })
            .when('/ficha', {
                controller: 'CreateCtrl',
                templateUrl: 'partials/ficha.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }])
    .filter('reverse', function () {
        'use strict';
    
        return function (items) {
            return items.slice().reverse();
        };
    })
    // From http://briantford.com/blog/angular-socket-io
    .factory('socketio', ['$rootScope', function ($rootScope) {
        'use strict';
        
        var socket = io.connect();
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    }]);