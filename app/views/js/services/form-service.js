'use strict';

/* Services */

var appServices = angular.module('appServices',[]);

	appServices.factory('Forms',['$http', function($http){
		return{
			getScore : function(formData, contextID) {
				var input = {
					tablename: 'Bank_loan.txt',
					header: [ 'age', 'ed', 'employ', 'address', 'income', 'debtinc', 'creddebt', 'othdebt', 'default'],
					data: [[ formData.age, formData.ed, formData.employ, formData.address, formData.income, formData.debtinc, formData.creddebt, formData.othdebt,'1' ]]
					//data: [[ 30, 5, 10, 5, 10, 2, 2, 2, 0 ]]
				};
				return $http.post('api/score', {contextID: contextID, input: input})
					.success(function(data, status, headers, config) {
						return data;
					})
					.error(function(data, status, headers, config) {
						return status;
					});
			}
		}
	}]);