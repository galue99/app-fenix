(function () {
	var app = angular.module('fenix', ['ngRoute', 'ngResource']);

		app.controller('IncidentesController', function(){
			
			this.prueba = [
				{
					'title': 'Prueba 1',
					'description': 'Esto es una descripcion 1'
				},
				{
					'title': 'Prueba 2',
					'description': 'Esto es una descripcion 2'
				}
			];

		app.config(['$routeProvider', function ($routeProvider) {

        	$routeProvider
            	.when('/', {
                	controller: 'IncidentesController',
                	templateUrl: 'partials/dashboard.html'
            	})
            	.when('/new', {
                	controller: 'IncidentesController',
                	templateUrl: 'partials/ticket.html'
            	})
            	.otherwise({
                	redirectTo: '/'
            	});
    		}])

			this.showDate = function () {
      			date = 0;
      			date = Date.now();
      		return date;
    		};

		});
})();