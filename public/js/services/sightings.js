// factory are responsible to fetch the data or 
// post it. Return an object containing usefull
// "functions"
ufoApp.factory('sightings', ['$http', 'auth', function($http, auth){
	var obj = {};

	obj.getOneSighting = function(sightingID){
		return $http.get('/sighting/', { 
			params:
				{"_sightingID": sightingID}
			});
	};


	obj.getSightings = function(){
		return $http.get('/sightings');
	};

	obj.postSighting = function(dataObj){
		return $http.post('/sightings', dataObj,
			{headers: {Authorization: 
				'Bearer '+ auth.getToken()
				}
   			}
   		);
	};

	obj.postComment = function(dataObj){
		console.log("ok");
		return $http.post('/comment', dataObj,
			{headers: {Authorization: 
				'Bearer '+ auth.getToken()
				}
   			}
   		);
	};

	obj.getComments = function(sightingID){
		return $http.get('/comments/', { 
			params:
				{"_sightingID": sightingID}
			});
	};

	return obj;
}]);