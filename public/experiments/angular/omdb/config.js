(function(){
    angular
        .module("MovieApp")
        .config(configuration);
    function configuration($routeProvider){
        $routeProvider
            .when("/",
                {templateUrl:"views/home/home.view.html"})
            .when("/home",
                {templateUrl:"views/home/home.view.html"})
            .when("/search",
                {templateUrl:"views/search/search.view.html",
                controller: "SearchController"})
            .when("/search/:title",
                {templateUrl:"views/search/search.view.html",
                controller: "SearchController"})
            .when("/detail/:imdbID",
                {templateUrl:"views/detail/detail.view.html",
                controller: "DetailController"})
            .otherwise({
                redirectTo: "views/home/home.view.html"
            });
    }
})();