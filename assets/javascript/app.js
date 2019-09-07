    //alert("we're up");

    //var songSnippets2 = ["I just took a DNA test", "Check the mirror, we're lookin' fly"];
var songSnippets =[];

//convert songSnippets into actionable objects
    function createObject() {
        $("#queryResults").empty();
        for (var i=0; i<songSnippets.length; i++){
        var a=$("<button>");
        a.addClass("lyric");
        a.attr("data-type", songSnippets[i]);  
        a.text(songSnippets[i]);  
        $("#queryResults").append(a)
        };
    };

    // field entry on form is captured
    $("#Find-Song").on("click", function(event){
        event.preventDefault();
        var lyricCheck = $("#lyricLookup").eq(0).val().trim();
        songSnippets.push(lyricCheck); 
        console.log(songSnippets);
        createObject();
        listeningEvent();
    
    }); 

    // If we start with Clickable objectImages
    createObject();
    listeningEvent();
    

    // $(document).on('readystatechange', readyStateChanged); 

    function listeningEvent(){
        $("button.lyric").on("click", function(event) {    
            var myType = $(this).data("type");
            //var type = myType.replace(/ /g,"");
            var type = encodeURIComponent(myType);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://genius.p.rapidapi.com/search?q=" + type,
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "genius.p.rapidapi.com",
                    "x-rapidapi-key": "8c80b39df4mshd657f02eb1198f1p1c1009jsn71a194fe5244"
                }
            }
            console.log(type);

            $.ajax(settings).then(function (response) {
                // console.log (settings);  
                console.log(response.response.hits[1]);
                
            var hello = ("hello");
                var songName = $("<h1>").text(response.response.hits[0].result.full_title);
                // var artistName = $("<h2>").text(response.hits.result.primary_artist);
                // var artistImage = $("<a>").attr("href", response.hits.result.header_image_thumbnail_url);
                // //var artistURL = $("<img>").attr("src", response.thumb_url);
                //var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");
            $("#gifs-appear-here").empty();
            $("#gifs-appear-here").append(hello, songName);            
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
    }
