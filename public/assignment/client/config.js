(function () {
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/",
                {templateUrl: "views/home/home.view.html"})
            .when("/home",
                {templateUrl: "views/home/home.view.html"})
            .when("/register",
                {templateUrl: "views/users/register.view.html",
                controller: "RegisterController"})
            .when("/login",
                {templateUrl: "views/users/login.view.html",
                controller: "LoginController"})
            .when("/profile",
                {templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"})
            .when("/profile/:userid",
                {templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"})
            .when("/admin",
                {templateUrl: "views/admin/admin.view.html"})
            .when("/forms",
                {templateUrl: "views/forms/forms.view.html",
                controller: "FormController"})
            .when("/fields",
                {templateUrl: "views/forms/fields.view.html"});
    }
})();