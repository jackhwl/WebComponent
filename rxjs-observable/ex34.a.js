var vals =[1,2,3].map(x=>x+1);
console.log(vals);


var textbox = document.getElementById('textbox');
var Observable = Rx.Observable;
var keypresses = Observable.fromEvent(textbox, 'keypress');

function searchWikipedia(term){
  var url = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='+encodeURIComponent(term)+'&callback=?';
  $.getJSON(url, function(data){console.log(data);})
}

searchWikipedia('Terminator');

keypresses.forEach(e=>console.log(e.keyCode));
