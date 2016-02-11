(function(){
    var app = angular.module("MovieDBApp",[]);
    app.controller("MovieListController",movieListController);

    function movieListController($scope){
        //console.log("Hello World");
        var movies = [
            {id:"201",title:"Avatar"},
            {id:"202",title:"Terminator"},
            {id:"203",title:"Star Wars I"},
            {id:"204",title:"Star Wars II"}];
        $scope.movies = movies;
        $scope.addMovie = addMovie;
        $scope.removeMovie = removeMovie;
        $scope.selectMovie = selectMovie;
        $scope.updateMovie = updateMovie;


        function addMovie(movie){
            // Make a copy of the object if you do not want real time manipulation.
            console.log(movie);
            var addMo = movie;
            $scope.movies.push(addMo);
            $scope.movie = {};
        };
        function removeMovie(movie){
            var index = movies.indexOf(movie);
            $scope.movies.splice(index,1);
        };
        function selectMovie(movie){
            $scope.selectedMovie = movie;
            var m = copyFucntion(movie);
            $scope.movie = m;
        }
        function updateMovie(movie){
            var index = movies.indexOf($scope.selectedMovie);
            $scope.movies[index].id = movie.id;
            $scope.movies[index].title = movie.title;
        }

        function copyFucntion(movie){
            var movieCopy ={
                id:movie.id,
                title:movie.title
            };
            return movieCopy;
        }
    }
})();