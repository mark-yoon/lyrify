import sys
import requests
import urllib
from bs4 import BeautifulSoup

def get_url(song_title, song_artist):
   GOOGLE_BASE = "http://www.google.com/search?q="

   query = urllib.quote_plus(song_title + " " + song_artist + " azlyrics")
   url = GOOGLE_BASE + query
   google_results = requests.get(url).text
   idx_1 = google_results.find('http://www.azlyrics.com/lyrics/')
   idx_2 = google_results.find('.html', idx_1)
   return google_results[idx_1:idx_2 + 5]

print get_url(sys.argv[1], sys.argv[2])
sys.stdout.flush()

