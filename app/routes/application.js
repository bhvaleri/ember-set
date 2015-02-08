import Ember from 'ember';

//returns an array of set cards
var newDeck = function() {
	var deck = [];

	var colors = ['orange', 'green', 'purple'];
	var shapes = ['oval', 'squiggle', 'diamond'];
	var fills = ['full', 'lines', 'empty'];
	var counts = [1, 2, 3]


	counts.forEach(function(count) {
		colors.forEach(function(color) {
			shapes.forEach(function(shape){
				fills.forEach(function(fill){
					deck.push({
						count: count,
						color: color,
						shape: shape,
						fill: fill
					});
				});
			});
		});
	});

	return deck;
};

//Fisher–Yates Shuffle courtesy of bostock
var shuffle = function (array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

var ApplicationRoute = Ember.Route.extend({
	model: function() {
		return { deck: newDeck() };
	}
});

export default ApplicationRoute;