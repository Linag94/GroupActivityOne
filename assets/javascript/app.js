//alert("we're up");

//var songSnippets2 = ["I just took a DNA test", "Check the mirror, we're lookin' fly"];
var songSnippets = [];



    //refresh window with click of navbar
    $("#refresh").click(function() {
        window.location.href=window.location.href;;
        });
        

//convert songSnippets into actionable objects
function createObject() {
    $("#queryResults").empty();
        for (var i = 0; i < songSnippets.length; i++) {
        var a = $("<button>");
        a.addClass("lyric");
        a.attr("data-type", songSnippets[i]);
        a.text(songSnippets[i]);
        $("#queryResults").append(a)
        $("form").get(0).reset();
        };
    };

    // captures user input on form to be processed by Genius
    $("#Find-Song").on("click", function(event){
        event.preventDefault();
        var lyricCheck = $("#lyricLookup").eq(0).val().trim();
        songSnippets.push(lyricCheck); 
        console.log(songSnippets);
        createObject();
        listeningEvent();
    
    }); 

    //function to present tour dates, takes "artistName" from Genius API, and applies to bandsintown api
    function tourDates(artistName){
        var queryURL = "https://rest.bandsintown.com/artists/" + artistName + "?app_id=codingbootcamp";
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
        // Constructing HTML containing the artist information 
        var tourDates = $("<a>").attr("href", response.url).text("Click for Upcoming Tour Dates");
        $("#tourDates").empty();
        $("#tourDates").append(tourDates);
        }) 
    };
    //Function is called from line 112, "api_path" key returned in the lyric lookup for song, is used directly in the Genius API script that returns apple music player
    function musicSample(api_path){
        var settings = {
            "async": true,
            "cro0ssDomain": true,
            "url": "https://genius.p.rapidapi.com" + api_path,            
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "genius.p.rapidapi.com",
                "x-rapidapi-key": "8c80b39df4mshd657f02eb1198f1p1c1009jsn71a194fe5244"
            }
        }
        
        $.ajax(settings).then(function (response) {
            console.log(response);

        //apple music player targeted from the return, delivered to the dom, in its own div for targeting and treatment
        var playSong = $("<a>").attr("href", response.response.song.apple_music_player_url).text("Click for Song Sample")
        $("#songSample").empty();
        $("#songSample").append(playSong)     
        
        });

    }

    //listen for button click
    function listeningEvent(){
        $("button.lyric").on("click", function(event) {    
            var myType = $(this).data("type");
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

            //calls Genius API    
            $.ajax(settings).then(function (response) {
                
                //console.log (settings);  
                console.log(response.response.hits[0]); 
                       
                    var songName = $("<h4>").text(response.response.hits[0].result.full_title);
                    var artistImage = $("<img>").attr("src", response.response.hits[0].result.primary_artist.header_image_url).attr("class", "artistImage");
                    var songLyrics = $("<a>").attr("href", response.response.hits[0].result.url).text("Click for Song Lyrics");
                    var artistInfo = $("<a>").attr("href", response.response.hits[0].result.primary_artist.url).text("Click for Artist Info.");
                    var artistName = $("<h5>").text(response.response.hits[0].result.primary_artist.name); 
                    $("#songLyrics").empty();
                    $("#songLyrics").append(songLyrics) 
                    $("#artistInfo").empty();
                    $("#artistInfo").append(artistInfo)
                    $("#gifs-appear-here").empty();
                    $("#gifs-appear-here").append(songName, artistImage, artistName)

                    //call bandsintwon API for tour date, using artistName        
                    tourDates(response.response.hits[0].result.primary_artist.name);

                    //call Genuis API for song sample, using api_path  
                    musicSample(response.response.hits[0].result.api_path);
                    //console.log(api_path);
                    });
                 
            });
                 
           
    }


