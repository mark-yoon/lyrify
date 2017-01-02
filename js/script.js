$(function(){
  var osascript = require('node-osascript');

  var last_song;

  setInterval( function() {
    osascript.execute('tell application "Spotify"\n set currentArtist to artist of current track as string\n set currentSong to name of current track as string\n return {currentSong, currentArtist}\n end tell', function(err, result, raw) {
      var song_title = JSON.stringify(result[0]).slice(1, -1);
      var song_artist = JSON.stringify(result[1]).slice(1, -1);
      if (song_title.indexOf("(") != -1) {
        song_title = song_title.substring(0, song_title.indexOf("("));
      }
      if (document.title != song_title + ": " + song_artist) {
        document.title = song_title + ": " + song_artist;
        $('#title').html(song_title);
        $('#artist').html(song_artist);
        var regex_title = song_title.replace(/\$/g, '').replace(/\./g, '').replace(/\s/g, '').toLowerCase();
        var regex_artist = song_artist.replace(/\$/g, 's').replace(/\./g, '').replace(/\s/g, '').toLowerCase();
        var url = "http://www.azlyrics.com/lyrics/" + regex_artist + "/" + regex_title + ".html";
        $.ajax({
          url: url,
          type: "GET",
          error: function(data) {
            $('#lyrics').html("Unfortunately, the song lyrics could not be found. Please create an issue on the <a href='https://github.com/mark-yoon/lyrify/issues'>Github page</a> or contact Mark Yoon at Mark.Youngho.Yoon@gmail.com.");
          },
          success: function(data) {
            var page = $.parseHTML(data);
            var mainDiv = $(page).find("div.col-xs-12.col-lg-8")[0]
            $(mainDiv).find("div").each(function(idx, div) {
              if (div.classList.length === 0) {
                $('#lyrics').html(div.innerHTML);
              }
            })
          } 
        });
      };
    });
  }, 1000);
});
