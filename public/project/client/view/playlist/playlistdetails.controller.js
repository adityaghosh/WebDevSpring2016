(function () {
    angular
        .module("MusicSocial")
        .controller("PlaylistDetailController", PlaylistDetailController);

    function PlaylistDetailController($routeParams,  SoundCloudService, PlaylistService) {
        var vm = this;
        vm.songs = [];
        vm.currentPage = 0;
        vm.pageSize = 5;
        vm.nextPage = nextPage;
        vm.prevPage = prevPage;
        vm.playPlaylist = playPlaylist;


        function init() {
            var playlistId = $routeParams.playlistid;
            var tracks = [];
            PlaylistService
                .findPlaylistByPlaylistID(playlistId)
                .then(
                    function (response) {
                        if(response.data) {
                            vm.playlist = response.data;
                            SoundCloudService.getPlaylistByPlaylistId(vm.playlist.soundCloudId)
                                .then(
                                    function (response) {
                                        if (response.data != "null") {
                                            vm.songs = response.data.tracks;
                                            vm.numberOfPages= vm.songs.length/vm.pageSize;
                                        }
                                    }
                                );
                        }
                    }
                );

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
        function playPlaylist(playlist) {
            PlaylistService.setCurrentlyPlaying(playlist);
        }
    }
})();