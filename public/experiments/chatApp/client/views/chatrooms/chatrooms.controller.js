(function () {
    angular
        .module("ChatApp")
        .controller("ChatRoomController", ChatRoomController);

    function ChatRoomController($rootScope, $scope, $interval, ChatService, $location) {

        $scope.joinRoom = joinRoom;
        $scope.addRoom = addRoom;
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
        init();


        function init() {
            ChatService.listRooms()
                .then(
                    function (response) {
                        if (response.data != null) {
                            $scope.rooms = response.data;
                        }
                    }
                );
        }

        function joinRoom(index) {
            $scope.allmessages = [];
            if(selectedRoom != null) {
                socket.emit("disconnect");
            }
            ChatService.joinRoom($scope.rooms[index], {username:"Guest"} )
                .then(
                    function (response) {
                        if (response.data != "null") {
                            $rootScope.currentRoom = response.data;
                            selectedRoom = response.data;
                            socket.emit("create", selectedRoom._id.toString());
                            socket.on("chat message"+selectedRoom._id.toString(), function(msg){
                                $scope.allmessages.push(msg);
                                $scope.$apply();
                            });
                        }
                    }
                );
        }

        function addRoom() {
            ChatService.addRoom($scope.r)
                .then(
                    function (response) {
                        if (response.data != "null") {
                            $scope.r = null;
                            init();
                        }
                    }
                );
        }
        function chatSend(message) {
            socket.emit("chat message",$rootScope.currentRoom._id.toString(),message);
            $scope.chatmessage = "";
        }


    }
})();