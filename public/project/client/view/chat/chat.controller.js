(function () {
    angular
        .module("MusicSocial")
        .controller("ChatRoomController", ChatRoomController);

    function ChatRoomController($rootScope, $scope, $location) {

        $scope.chatSend = chatSend;
        $scope.allmessages = [];
        var socket = null;

        var selectedRoom = null;

        $rootScope.$watch("currentPlaylist", function () {
            if ($rootScope.currentPlaylist) {
                if(selectedRoom != null) {
                    socket.disconnect();
                }
                initializeSocket();
                $scope.allmessages = [];
                socket.emit("disconnect");
                selectedRoom = $rootScope.currentPlaylist._id;
                socket.emit("create", $rootScope.currentPlaylist._id);
                socket.on("chat message", function(msg){
                    $scope.allmessages.push(msg);
                    $scope.$apply();
                });
            }
        });


        function initializeSocket() {
            //local
            if ($location.absUrl().indexOf("127.0.0.1") >= 0) {
                socket = io();
            }
            //Openshift
            else {
                socket = io('http://webdev2016-ghoshaditya.rhcloud.com:8000');
            }
        }

        function chatSend(message) {
            var sendMsg = "@"+$rootScope.user.username+": "+message;
            socket.emit("chat message",$rootScope.currentPlaylist._id, sendMsg);
            $scope.chatmessage = "";
        }


    }
})();