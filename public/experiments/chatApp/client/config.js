(function () {
    angular
        .module("ChatApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when(
                "/",
                {
                    templateUrl:"views/chatrooms/chatrooms.html",
                    controller:"ChatRoomController"
                }
            );
    }
})();