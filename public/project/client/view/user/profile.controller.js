(function () {
    angular
        .module("MusicSocial")
        .controller("ProfileController", ProfileController);

    function ProfileController ($routeParams, UserService) {
        var vm = this;
        vm.updateProfile = updateProfile;

        function init() {
            UserService.findUserByUserId($routeParams.userid)
                .then(
                    function (response) {
                        if (response.data != null) {
                            UserService.setCurrentUser(response.data);
                            vm.u = response.data;
                        }
                    }
                );
        }
        init();

        function updateProfile(user) {
            UserService
                .updateUser(vm.u._id,  user)
                .then(
                    function (response) {
                        if (response.data != "null"){
                            UserService.setCurrentUser(response.data);
                            vm.u = response.data;
                        }
                    }
                );
        }
    }
})();