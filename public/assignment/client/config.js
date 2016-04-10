(function () {
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider, $httpProvider) {
        $routeProvider
            .when("/home",
                {
                    templateUrl: "views/home/home.view.html",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
            .when("/register",
                {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                })
            .when("/login",
                {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController"
                })
            .when("/profile",
                {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
            .when("/profile/:userid",
                {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
            .when("/admin",
                {
                    templateUrl: "views/admin/admin.view.html",
                    resolve: {
                        loggedin: checkAdmin
                    }
                })
            .when("/forms/:formId/fields",
                {
                    templateUrl: "views/forms/fields.view.html",
                    controller: "FieldController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
            .when("/forms",
                {
                    templateUrl: "views/forms/forms.view.html",
                    controller: "FormController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
            .otherwise({
                redirectTo: "/home"
            });
    }


        var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
        {
            var deferred = $q.defer();

            $http.get('/api/assignment/loggedin').success(function(user)
            {
                $rootScope.errorMessage = null;
                // User is Authenticated
                if (user !== '0' && user.roles.indexOf('admin') != -1)
                {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                }
                else {
                    $location.url("/home");
                    deferred.reject();
                }
            });

            return deferred.promise;
        };


        var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
        {
            var deferred = $q.defer();

            $http.get('/api/assignment/loggedin').success(function(user)
            {
                $rootScope.errorMessage = null;
                // User is Authenticated
                if (user !== '0')
                {
                    $rootScope.currentUser = user;
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

            $http.get('/api/assignment/loggedin').success(function(user)
            {
                $rootScope.errorMessage = null;
                // User is Authenticated
                if (user !== '0')
                {
                    $rootScope.currentUser = user;
                }
                deferred.resolve();
            });

            return deferred.promise;
        };

})();