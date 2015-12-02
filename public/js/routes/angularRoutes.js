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
              controller: 'authCtrl',
              onEnter: // if logged in no need to login again
              ['$state', 'auth', function($state, auth){
                if(auth.isLoggedIn()){
                  $state.go('profile');
                }
              }]
        })

        .state('signup', {
              url: '/signup', 
              templateUrl: 'signup.html',
              controller: 'authCtrl',
              onEnter: // if logged in no need to signup again
              ['$state', 'auth', function($state, auth){
                if(auth.isLoggedIn()){
                  $state.go('profile');
                }
              }]
        })

        .state('profile', {
              url: '/profile', 
              templateUrl: 'profile.html',
              controller: 'profileCtrl'
        })

        .state('sightings', {
              url: '/sightings', 
              templateUrl: 'sightings.html',
              controller: 'sightingsCtrl'
        }); 
});