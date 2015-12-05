ufoApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller: 'homeCtrl' 
        })
        
        .state('about', {
              url: '/about', 
              templateUrl: 'about.html',
              controller: 'aboutCtrl'  
        })

        .state('login', {
              url: '/login', 
              templateUrl: 'login.html',
              controller: 'authCtrl'
        })

        .state('signup', {
              url: '/signup', 
              templateUrl: 'signup.html',
              controller: 'authCtrl'
        })

        .state('profile', {
              url: '/profile', 
              templateUrl: 'profile.html',
              controller: 'profileCtrl'
        })

        .state('sightings', {
              cache: false,
              url: '/sightings', 
              templateUrl: 'sightings.html',
              controller: 'sightingsCtrl'
        })

        .state('sighting', {
              cache: false,
              url: '/sighting/{_sightingID}', 
              templateUrl: 'sighting.html',
              controller: 'sightingCtrl'
        })

        .state('search', {
            url: '/search',
            templateUrl: 'search.html',
            controller: 'searchCtrl'
        })
});