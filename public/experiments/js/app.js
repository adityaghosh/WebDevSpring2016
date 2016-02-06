(function(){
    $(init);
    var $searchuri = "https://api.spotify.com/v1/search?q=TRACKNAME&type=track";
    var $tbody;
    var $player;
    function init(){
        $tbody = $("#search_results tbody");
        $player = $("#player");
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
        var playuri = "https://embed.spotify.com/?uri=";
        for(var i=0;i<tracks.length; i++){
            var trackid = tracks[i].id;
            var songname = tracks[i].name;
            var album = tracks[i].album.name;
            var artists = tracks[i].artists;
            var trackuri = tracks[i].uri;
            var artistnames = "";
            for(var j=0;j<artists.length;j++){
                artistnames = artistnames + artists[j].name + ", ";
            }
            artistnames.trim();
            artistnames = rtrim(artistnames.trim(),",");
            var $tr = $("<tr>");
            var $td = $("<td>");
            $td.append(songname);
            //$td.addClass("col-md-3");
            $tr.append($td);
            $td = $("<td>");
            $td.append(artistnames);
            //$td.addClass("col-md-3");
            $tr.append($td);
            $td = $("<td>");
            $td.append(album);
            //$td.addClass("col-md-3");
            $tr.append($td);
            $td = $("<td>");
            /*var $div = $("<div>")
            $div.addClass("embed-container");
            var $iframe = $("<iframe>");
            $iframe.attr("src",playuri+trackuri);
            $iframe.attr("frameborder",0);
            $iframe.attr("allowtransparency",true);
            $div.append($iframe);
            $td.append($div);*/
            var $button = $("<button>");
            $button.attr("id",playuri+trackuri);
            $button.click(playTrack);
            $button.append("Play");
            $button.addClass("btn");
            $button.addClass("btn-block");
            $button.addClass("btn-success");
            $td.append($button);
            //$td.addClass("col-md-3");
            $tr.append($td);
            $tbody.append($tr);
        }
    }
    function playTrack(){
        $player.empty();
        var playuri = $(this).attr("id");
        var $div = $("<div>")
        var $iframe = $("<iframe>");
        $iframe.attr("src",playuri);
        $iframe.attr("frameborder",0);
        $iframe.attr("allowtransparency",true);
        $div.append($iframe);
        $player.append($div);
    }

    function rtrim(str, chr) {
        var rgxtrim = (!chr) ? new RegExp('\\s+$') : new RegExp(chr+'+$');
        return str.replace(rgxtrim, '');
    }
})();
