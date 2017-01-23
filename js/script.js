$(function(){
  setInterval( function() {
    console.log(require('electron').remote.getCurrentWindow().url);
    $.ajax({
      url: require('electron').remote.getCurrentWindow().url,
      type: "GET",
      error: function(data) {
	$('#title').html(require('electron').remote.getCurrentWindow().songTitle);
	$('#artist').html(require('electron').remote.getCurrentWindow().songArtist);
        $('#lyrics').html("Unfortunately, the song lyrics could not be found. Please create an issue on the <a href='https://github.com/mark-yoon/lyrify/issues'>Github page</a> or contact Mark Yoon at Mark.Youngho.Yoon@gmail.com.");
      },
      success: function(data) {
	$('#title').html(require('electron').remote.getCurrentWindow().songTitle);
	$('#artist').html(require('electron').remote.getCurrentWindow().songArtist);
        var page = $.parseHTML(data);
        var mainDiv = $(page).find("div.col-xs-12.col-lg-8")[0]
        $(mainDiv).find("div").each(function(idx, div) {
          if (div.classList.length === 0) {
            $('#lyrics').html(div.innerHTML);
          }
        })
      } 
    });
  }, 1000);
});

