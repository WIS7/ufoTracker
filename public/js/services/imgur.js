ufoApp.factory('imgur', ["$q", "$http", function($q, $http) {

    var imgurObj = function(client_id) {
        this.client_id = client_id;
        this.api = "https://api.imgur.com/3";
    };

    imgurObj.prototype = {
        getGalleryTag: function(t_name, sort, page, window) {
            var deferred = $q.defer();
            var endPoint = this.api + "/gallery/t";
            endPoint += "/" + t_name;
            // Pass parameters if they were provided
            if (sort !== undefined) {
                endPoint += "/" + sort;
            }
            if (window !== undefined) {
                endPoint += "/" + window;
            }
            if (page !== undefined) {
                endPoint += "/" + page;
            }
            $http({
                method: "GET",
                url: endPoint,
                headers: {
                    "Authorization": "Client-ID " + this.client_id
                }
            })
                .success(function(result) {
                    deferred.resolve(result);
                })
                .error(function(error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        },
        uploadImage: function(params) {
            var deferred = $q.defer();
            var endPoint = this.api + "/image";
            $http({
                method: "POST",
                url: endPoint,
                headers: {
                    "Authorization": "Client-ID " + this.client_id
                },
                params: params
            })
                .success(function(result) {
                    deferred.resolve(result);
                })
                .error(function(error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }
    };

    return imgurObj;

}]);