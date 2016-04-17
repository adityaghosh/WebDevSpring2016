(function (){
    angular
        .module("MusicSocial",["ngRoute"])
        //filter for pagination
        .filter('startFrom', function() {
            return function (input, start) {
                start = parseInt(start, 10);
                return input.slice(start);
            }
        });

})();