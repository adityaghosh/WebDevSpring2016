(function () {
    angular
        .module("MusicSocial")
        .controller("PlaylistController", PlaylistController);

    function PlaylistController($rootScope, $location, PlaylistService) {
        var vm = this;
        vm.deletePlaylist = deletePlaylist;
        vm.viewPlaylistDetails = viewPlaylistDetails;
        vm.selectedPlaylist = null;
        vm.currentPage = 0;
        vm.pageSize = 5;
        vm.playPlaylist = playPlaylist;
        vm.nextPage = nextPage;
        vm.prevPage = prevPage;
        vm.playlists = [];
        vm.noplaylists = false;

        init();

        var selectedPlaylist = null;

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

        function init() {
            PlaylistService.findPlaylistByUserID($rootScope.user._id)
                .then(
                    function (response) {
                        if (response.data != "null") {
                            vm.playlists = response.data;
                            vm.numberOfPages= Math.ceil(vm.playlists.length/vm.pageSize);
                            if (vm.playlists.length == 0) {
                                vm.noplaylists = true;
                            }
                        }
                    }
                );
        }

        function deletePlaylist(playlist) {
            PlaylistService
                .unlikePlaylist(playlist._id, $rootScope.user._id)
                .then(
                    function (response) {
                        if (response.data) {
                            init();
                        }
                    }
                );
        }

        function viewPlaylistDetails(playlist) {
            $location.url("/viewplaylist/"+playlist._id);
        }
        function playPlaylist(playlist) {
            PlaylistService.setCurrentlyPlaying(playlist);
        }
    }
})();