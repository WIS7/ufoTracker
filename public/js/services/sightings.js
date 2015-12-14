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

	obj.getUserInfo = function (username) {
		return $http.get('/user', {
			params: {
				"username": username
			}
		});
	};

	obj.getUserSightings = function(username){
		return $http.get('/user/sightings/', { 
			params:
				{"author": username}
			});
	};

	obj.deleteUserSighting = function(sighting){
		return $http({  
	        method: "DELETE",  
	        url: '/user/sightings',  
	        data: sighting,  
	        headers: {'Content-Type': 'application/json', Authorization: "Bearer " + auth.getToken() }  
		});
	};

	obj.editUserSighting = function(sighting){
		return $http.put('/user/sightings', sighting,
			{headers: {Authorization: 
				'Bearer '+ auth.getToken()
				}
   			}
   		);
	};

	obj.getSightings = function(){
		return $http.get('/sightings');
	};

	obj.postSighting = function(sighting){
		return $http.post('/sightings', sighting,
			{headers: {Authorization: 
				'Bearer '+ auth.getToken()
				}
   			}
   		);
	};

	obj.postComment = function(comment){
		return $http.post('/comment', comment,
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