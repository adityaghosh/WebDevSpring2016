(function (){
    angular
        .module("MusicSocial")
        .config(configuration);

    function configuration ($routeProvider) {
        $routeProvider
            .when("/",
                {templateUrl:"view/home/home.view.html"})
            .when("/home",
                {templateUrl:"view/home/home.view.html"})
            .when("/login",
                {templateUrl:"view/user/login.view.html"})
            .when("/search",
                {templateUrl:"view/search/search.view.html"})
            .when("/search/:playlistname",
                {templateUrl:"view/search/search.view.html"})
            .otherwise({
                redirectTo: "view/home/home.view.html"
            });
    }
})();