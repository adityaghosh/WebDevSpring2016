(function () {
    angular
        .module("MusicSocial")
        .controller("SearchController", SearchController);

    function SearchController( $routeParams, $rootScope, PlaylistService, SoundCloudService) {
        var vm = this;
        vm.playlists = [];
        vm.play = play;
        vm.addToMyPlaylists = addToMyPlaylists;
        vm.currentPage = 0;
        vm.pageSize = 5;
        vm.nextPage = nextPage;
        vm.prevPage = prevPage;


        function init() {
            if($routeParams.playlistName) {
                SoundCloudService.getPlaylists($routeParams.playlistName)
                    .then(
                        function (response) {
                            if (response.data != "null") {
                                vm.playlists = response.data;
                                vm.numberOfPages= vm.playlists.length/vm.pageSize;
                            }
                            else {
                                vm.playlists = [];
                            }
                        }
                    );

            }
        }
        init();

        function nextPage() {
            if(vm.currentPage < vm.numberOfPages - 1) {
                vm.currentPage = vm.currentPage + 1;
            }
        }

        function prevPage() {
            if(vm.currentPage > 0) {
                vm.currentPage = vm.currentPage - 1;
            }
        }

        function addToMyPlaylists(playlist) {
            PlaylistService
                .findPlaylistBySoundCloudID(playlist.id)
                .then(
                    function (response) {
                        if (response.data != "null") {
                            //Add user to likes
                            var toAdd = true;
                            for (var i in $rootScope.user.likedPlaylistIds) {
                                if (response.data._id == $rootScope.user.likedPlaylistIds[i]) {
                                    toAdd = false;
                                    break;
                                }
                            }
                            if (toAdd){
                                PlaylistService.addUserToPlaylist(response.data._id, $rootScope.user._id)
                                    .then(
                                        function (response) {
                                            $rootScope.user = response.data;
                                        }
                                    );
                            }
                        }
                        else {
                            PlaylistService.createPlaylist(playlist)
                                .then(
                                    function (response) {
                                        if (response.data) {
                                            PlaylistService.addUserToPlaylist(response.data._id, $rootScope.user._id)
                                                .then(
                                                    function (response) {
                                                        $rootScope.user = response.data;
                                                    }
                                                );
                                        }
                                    }
                                );
                        }
                    }
                );
        }

        function play(playlist) {
            PlaylistService
                .findPlaylistBySoundCloudID(playlist.id)
                .then(
                    function (response) {
                        if (response.data != "null") {
                            PlaylistService.setCurrentlyPlaying(response.data);
                        }
                        else {
                            PlaylistService.createPlaylist(playlist)
                                .then(
                                    function (response) {
                                        if (response.data) {
                                            PlaylistService.setCurrentlyPlaying(response.data);
                                        }
                                    }
                                );
                        }
                    }
                );


        }
    }
})();