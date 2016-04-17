(function (){
    angular
        .module("MusicSocial")
        .config(configuration);

    function configuration ($routeProvider) {
        $routeProvider
            .when("/",
                {
                    templateUrl:"view/home/home.view.html",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
            .when("/home",
                {
                    templateUrl:"view/home/home.view.html",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
            .when("/login",
                {
                    templateUrl:"view/user/login.view.html",
                    controller: "LoginController",
                })
            .when("/register",
                {
                    templateUrl:"view/user/register.view.html",
                    controller: "RegisterController",
                })
            .when("/admin",
                {
                    templateUrl:"view/admin/admin.view.html",
                    controller:"AdminController",
                    resolve : {
                        loggedin: checkAdmin
                    }
                })
            .when("/playlist/:userid",
                {
                    templateUrl:"view/playlist/myplaylist.view.html",
                    controller: "PlaylistController",
                    resolve : {
                        loggedin: checkLoggedin
                    }
                })
            .when("/search",
                {
                    templateUrl:"view/search/search.view.html",
                    controller: "SearchController"
                })
            .when("/search/:playlistName",
                {
                    templateUrl:"view/search/search.view.html",
                    controller: "SearchController"
                })
            .when("/myplaylists",
                {
                    templateUrl:"view/playlist/soundcloudplaylists.view.html",
                    controller: "SoundCloudPlaylistController",
                    resolve : {
                        loggedin: checkLoggedin
                    }
                })
            .when("/viewplaylist/:playlistid",
                {
                    templateUrl:"view/playlist/playlistdetails.view.html",
                    controller: "PlaylistDetailController",
                    resolve : {
                        loggedin: checkLoggedin
                    }
                })
            .when("/profile",
                {
                    templateUrl:"view/user/profile.view.html",
                    controller:"ProfileController",
                    resolve : {
                        loggedin: checkLoggedin
                    }
                })
            .when("/profile/:userid",
                {
                    templateUrl:"view/user/profile.view.html",
                    controller:"ProfileController",
                    resolve : {
                        loggedin: checkLoggedin
                    }
                })
            .otherwise({
                redirectTo: "/"
            });
    }


    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.user = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };


    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();
        $http.get('/api/project/loggedIn').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.user = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.user = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

})();