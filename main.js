var app = require('app');
var BrowserWindow = require('browser-window');
var osascript = require('node-osascript');
var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

var prev_song;

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    'width': 700,
    'height': 1000,
    'web-preferences': { 'web-security': false }
  });
  setInterval( function() {
    osascript.execute('tell application "Spotify"\n set currentArtist to artist of current track as string\n set currentSong to name of current track as string\n return {currentSong, currentArtist}\n end tell', function(err, result, raw) {
      var song_title = JSON.stringify(result[0]).slice(1, -1);
      var song_artist = JSON.stringify(result[1]).slice(1, -1);
      if (prev_song != song_title + ": " + song_artist) {
        prev_song = song_title + ": " + song_artist;
        mainWindow.songTitle = song_title;
        mainWindow.songArtist = song_artist;
        mainWindow.url = "";
        var python_process = require('child_process').execFile("python", ["./python/find_lyrics.py", song_title, song_artist], function(err, stdout, stderr) {
          mainWindow.url = stdout;
        });
      };
    })
  }, 1000);
  mainWindow.openDevTools();
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

