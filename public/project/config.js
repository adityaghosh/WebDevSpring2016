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
                {templateUrl:"view/user/login.view.html",
                controller: "LoginController"})
            .when("/search",
                {templateUrl:"view/search/search.view.html",
                controller: "SearchController"})
            .when("/search/:playlistName",
                {templateUrl:"view/search/search.view.html",
                controller: "SearchController"})
            .when("/profile/:username",
                {templateUrl:"view/user/profile.view.html",
                controller:"ProfileController"})
            .otherwise({
                redirectTo: "view/home/home.view.html"
            });
    }
})();