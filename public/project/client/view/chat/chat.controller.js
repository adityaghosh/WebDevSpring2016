(function () {
    angular
        .module("MusicSocial")
        .controller("ChatRoomController", ChatRoomController);

    function ChatRoomController($rootScope, $scope, $location) {

        $scope.chatSend = chatSend;
        $scope.allmessages = [];
        var socket = null;
        //local
        if ($location.absUrl().indexOf("127.0.0.1") >= 0) {
            socket = io();
        }
        //Openshift
        else {
            socket = io('http://webdev2016-ghoshaditya.rhcloud.com:8000');
        }

        var selectedRoom = null;

        $rootScope.$watch("currentPlaylist", function () {
            if ($rootScope.currentPlaylist) {
                if(selectedRoom != null) {
                    $scope.allmessages = [];
                    socket.emit("disconnect");
                }
                selectedRoom = $rootScope.currentPlaylist._id;
                socket.emit("create", $rootScope.currentPlaylist._id);
                socket.on("chat message"+$rootScope.currentPlaylist._id, function(msg){
                    $scope.allmessages.push(msg);
                    $scope.$apply();
                });
            }
        });

        /*function joinRoom() {
            $scope.allmessages = [];
            if(selectedRoom != null) {
                socket.emit("disconnect");
            }
            ChatService.joinRoom($rootScope.currentPlaylist._id, {username: $rootScope.user.username} )
                .then(
                    function (response) {
                        if (response.data != "null") {
                            $rootScope.currentRoom = response.data;
                            selectedRoom = response.data;
                            socket.emit("create", $rootScope.currentPlaylist._id);
                            socket.on("chat message"+$rootScope.currentPlaylist._id, function(msg){
                                $scope.allmessages.push(msg);
                                $scope.$apply();
                            });
                        }
                    }
                );
        }*/

        function chatSend(message) {
            var sendMsg = "@"+$rootScope.user.username+": "+message;
            socket.emit("chat message",$rootScope.currentPlaylist._id, sendMsg);
            $scope.chatmessage = "";
        }


    }
})();