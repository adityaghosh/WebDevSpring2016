(function () {
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController ($rootScope, $scope) {
        $scope = $rootScope;
    }
})();