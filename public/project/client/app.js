(function (){
    angular
        .module("MusicSocial",["ngRoute"])
        //filter for pagination
        .filter('startFrom', function() {
            return function (input, start) {
                if (Array.isArray(input)){
                    start = +start; //parse to int
                    return input.slice(start);
                }
            }
        });

})();