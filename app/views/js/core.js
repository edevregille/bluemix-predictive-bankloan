'use strict';
/* App Module */

var appSPA = angular.module('appSPA', ['ngRoute','appControllers','appServices']); //create a module with dependencies: Routes, Controllers module and Services module

	appSPA.config(['$routeProvider', '$locationProvider', function($routeProvider,$locationProvider) {
    	$routeProvider.
          when('/', {
            templateUrl: 'partials/form.ejs',
            controller: 'appFormController'
          }).
      		otherwise({
      		  redirectTo: '/'
      		});

          $locationProvider.html5Mode(true); 
 		}
 	]); 


