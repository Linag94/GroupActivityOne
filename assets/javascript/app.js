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


                console.log(response.response.hits[0]);
            
            //for (i=0, i<response.response.hits.lenght; i++)    
                    var songName = $("<h4>").text(response.response.hits[0].result.full_title);
                    var artistImage = $("<img>").attr("src", response.response.hits[0].result.primary_artist.header_image_url).attr("class", "artistImage");
                    var songLyrics = $("<a>").attr("href", response.response.hits[0].result.url).text("Click for Song Lyrics");
                    var artistInfo = $("<a>").attr("href", response.response.hits[0].result.primary_artist.url).text("Click for Artist Info.");
                    var myartistName = $("<h1>").text(response.response.hits[0].result.primary_artist.name);
                    var artistName = encodeURIComponent(myartistName)
                    
                // $("#gifs-appear-here").empty();
                // $("#gifs-appear-here").append(songName, artistImage, songLyrics, artistInfo);   

                        var queryURL = "https://rest.bandsintown.com/artists/" + artistName + "?app_id=codingbootcamp";
                        console.log(artistName);
                        $.ajax({
                        url: queryURL,
                        method: "GET"
                        }).then(function(response) {

                        // Printing the entire object to console
                        console.log(artistName);

                        // Constructing HTML containing the artist information 
                        var tourDates = $("<a>").attr("href", response.url).text("Click for Upcoming Tour Dates");

                        // // Empty the contents of the artist-div, append the new artist content
                        $("#gifs-appear-here").empty();
                        $("#gifs-appear-here").append(songName, artistImage, songLyrics, artistInfo, tourDates);

                    });
            
                 
            });
        })        
    }

