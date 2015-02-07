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

var ApplicationRoute = Ember.Route.extend({
	model: function() {
		return { deck: newDeck() };
	}
});

export default ApplicationRoute;