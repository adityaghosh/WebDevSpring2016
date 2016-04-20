(function () {
    angular
        .module("MusicSocial")
        .controller("SoundCloudPlaylistController", SoundCloudPlaylistController);

    function SoundCloudPlaylistController($rootScope, $location, SoundCloudService, PlaylistService){
        var vm = this;
        vm.playlists = [];
        vm.play = play;
        vm.currentPage = 0;
        vm.pageSize = 5;
        vm.nextPage = nextPage;
        vm.prevPage = prevPage;
        vm.viewPlaylistDetails = viewPlaylistDetails;
        vm.nosongs = false;


        function init() {
            if($rootScope.user) {
                SoundCloudService.getSoundCloudPlaylists($rootScope.user._id)
                    .then(
                        function (response) {
                            if (response.data != "null") {
                                vm.playlists = response.data;
                                vm.numberOfPages= vm.playlists.length/vm.pageSize;
                                if (vm.playlists.length == 0) {
                                    vm.nosongs = true;
                                }
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

        function viewPlaylistDetails(playlist) {
            PlaylistService
                .findPlaylistBySoundCloudID(playlist.id)
                .then(
                    function (response) {
                        if (response.data != "null") {
                            $location.url("/viewplaylist/"+response.data._id);
                        }
                        else {
                            PlaylistService.createPlaylist(playlist)
                                .then(
                                    function (response) {
                                        if (response.data) {
                                            $location.url("/viewplaylist/"+response.data._id);
                                        }
                                    }
                                );
                        }
                    });
        }
    }
})();