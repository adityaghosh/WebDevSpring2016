(function(){
    $(init);
    var $searchuri = "https://api.spotify.com/v1/search?q=TRACKNAME&type=track";
    var $tbody;
    function init(){
        $tbody = $("#search_results tbody");
        $("#search").click(search_click);
    }
    function search_click(){
        var trackname = $("#trackname").val();
        if (trackname.length !== 0)
        {
            var url = $searchuri.replace("TRACKNAME",trackname);
            $.ajax({
                url:url,
                success: getTracks
            })
        }
    }
    function getTracks(response){
        $tbody.empty();
        var tracks = response.tracks.items;
        for(var i=0;i<tracks.length; i++){
            var trackid = tracks[i].id;
            var songname = tracks[i].name;
            var album = tracks[i].album.name;
            var artists = tracks[i].artists;
            var artistnames = "";
            for(var j=0;j<artists.length;j++){
                artistnames = artistnames + artists[j].name + ", ";
            }
            artistnames.trim();
            artistnames = rtrim(artistnames.trim(),",");
            var $tr = $("<tr>");
            var $td = $("<td>");
            $td.append(songname);
            $td.addClass("col-md-4");
            $tr.append($td);
            $td = $("<td>");
            $td.append(artistnames);
            $td.addClass("col-md-4");
            $tr.append($td);
            $td = $("<td>");
            $td.append(album);
            $td.addClass("col-md-4");
            $tr.append($td);
            $tbody.append($tr);
        }
    }
    function rtrim(str, chr) {
        var rgxtrim = (!chr) ? new RegExp('\\s+$') : new RegExp(chr+'+$');
        return str.replace(rgxtrim, '');
    }
})();
