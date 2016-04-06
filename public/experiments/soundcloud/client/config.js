(function () {
    angular
        .module("mySoundCloud")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when(
                "/",
                {
                    templateUrl : "views/home/home.html"
                }
            )
            .when(
                "/songsearch",
                {
                    templateUrl : "views/song/search.html",
                    controller: "SearchController"
                }
            )
            .when(
                "/playlistsearch",
                {
                    templateUrl : "views/playlist/search.html",
                    controller: "PlaylistSearchController"
                }
            )
            .otherwise({redirectTo:"/"});
    }
})();