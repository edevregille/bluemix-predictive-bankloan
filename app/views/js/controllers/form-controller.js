// Controllers 
var appControllers = angular.module('appControllers', []); // Create a Controller module with no dependency

//Controller for managing the form
appControllers.controller('appFormController',['$scope','$location','Forms','$route', function($scope, $location, Forms, $route){
	
	$scope.contextID = 'bank';
	$scope.result = 'none';

	$scope.formData = {
		age: "30",
		ed: "3",
		employ: "3",
		address:"3",
		income: "35",
		debtinc:"1", 
		creddebt:"5",
		othdebt:"0"
	};
	$scope.score = '';

	$scope.displayScore = true; //true = don't display

	//this function is called when the user submit the form
	$scope.sendForm = function(){		

		Forms.getScore($scope.formData, $scope.contextID)
		// if successful clear the form so our user is ready to enter another
		.then(
			function(rtn) {
				if (rtn.status == 200){
					// success
					$scope.displayScore = false;
					$scope.result = rtn.data;
					$scope.score = rtn.data[0].data[0][10];
				} else {
					//failure
					$scope.displayScore = false;
					$scope.result = rtn.data.message;
				}
			}
		);
	};
}]);
		