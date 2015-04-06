angular.module('realtimeData.data', ['ngResource']).factory('Tickets', ['$resource', function($resource) {
    'use strict';
    
    var server = $resource('/tickets');
    
    return {
        save: function (newTicket) {
            server.save(newTicket);
        },
        
        query: function () {
            //console.log(server.query());
            return server.query();
        }
    };
}]);