(function () {
    angular
        .module("mySoundCloud")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when(
                "/",
                {
                    templateUrl : "views/playlist/search.html",
                    controller: "SearchController"
                }
            );
    }
})();