//alert("we're up");

//var songSnippets2 = ["I just took a DNA test", "Check the mirror, we're lookin' fly"];
var songSnippets = [];

//convert songSnippets into actionable objects
function createObject() {
    $("#queryResults").empty();
    for (var i = 0; i < songSnippets.length; i++) {
        var a = $("<button>");
        a.addClass("lyric");
        a.attr("data-type", songSnippets[i]);
        a.text(songSnippets[i]);
        $("#queryResults").append(a)
    };
};

// field entry on form is captured
$("#Find-Song").on("click", function (event) {
    event.preventDefault();
    var lyricCheck = $("#lyricLookup").eq(0).val().trim();
    songSnippets.push(lyricCheck);
    console.log(songSnippets);
    createObject();
    // listeningEvent();

});

// If we start with Clickable objectImages
createObject();



$(document).on("click", "button.lyric", function (event) {
    var myType = $(this).data("type");
    console.log(myType);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://genius.p.rapidapi.com/search?q=" + myType,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "genius.p.rapidapi.com",
            "x-rapidapi-key": "8c80b39df4mshd657f02eb1198f1p1c1009jsn71a194fe5244"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response.response.hits[0]);
        const mySongDetail = response.response.hits[0];

        // add code to append the details of this song on the page
        const songAPIPath = mySongDetail.result.api_path;

        var songSetting = {
            "async": true,
            "crossDomain": true,
            "url": "https://genius.p.rapidapi.com" + songAPIPath,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "genius.p.rapidapi.com",
                "x-rapidapi-key": "8c80b39df4mshd657f02eb1198f1p1c1009jsn71a194fe5244"
            }
        }

        $.ajax(songSetting).done(function (songResponse) {
            console.log(songResponse.response);
            const appleMusicPath = songResponse.response.song.apple_music_player_url;
            console.log('appleMusicPath', appleMusicPath);
            $("#gifs-appear-here").append("<iframe src="+appleMusicPath+"></iframe>");
        });



        // var hello = ("hello");
        //var songName = $("<h1>").text(response.response.hits[0].result.full_title);
        // var artistName = $("<h2>").text(response.hits.result.primary_artist);
        // var artistImage = $("<a>").attr("href", response.hits.result.header_image_thumbnail_url);
        // var artistURL = $("<img>").attr("src", response.data.html);
        //var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");
        // $("#gifs-appear-here").empty();
        // $("#gifs-appear-here").append(hello, artistURL);
        //songName, artistName, artistURL, artistImage, goToArtist

        // for (var i=0; i<response.length;i++) {
        //     var geniusReturn = $("<div>");
        //     var p = $("<p>").text("Song Title" + response); 
        //     var artImage = response[i].hits.result.song_art_image_url;
        //     var image = $("<img>");
        //     image.attr("src", artImage)
        //     geniusReturn.append(p);
        //     console.log(geniusReturn); 
        //     geniusReturn.append(image);
        //     $("#queryResults").append(response);  
    });
})        
