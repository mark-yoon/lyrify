$(function(){
    var osascript = require('node-osascript');

    osascript.execute('tell application "Spotify"\n set currentArtist to artist of current track as string\n set currentSong to name of current track as string\n return {currentSong, currentArtist}\n end tell', function(err, result, raw) {
      song_artist = JSON.stringify(result[1]);
      song_title = JSON.stringify(result[0]);
      $('.song').append("Title: " + song_title);
      $('.artist').append("Artist: " + song_artist);
      regex_title = song_title.replace(/['"]+/g,'').replace(/\s/g, '').toLowerCase();
      regex_artist = song_artist.replace(/['"]+/g,'').replace(/\s/g, '').toLowerCase();
      document.getElementById('lyrics').src = "http://www.azlyrics.com/lyrics/" + regex_artist + "/" + regex_title + ".html";
    });
});
