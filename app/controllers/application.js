import Ember from 'ember';

var ApplicationController = Ember.Controller.extend({

	deck: Ember.computed.alias('model.deck'),

	//how to show the cards the first 12 off of the full deck?
	cardsToShow: function () {
		return [];
	}.property(),

	newCard: function () {
		if (this.get('deck')) {
			return this.get('deck').pop();
		}
	},

	actions: {
		dealCards: function () {
			var cardsToShow = this.get('cardsToShow');

			var newCard = null;
			//check for cards left in deck
			while (cardsToShow.length < 12 && (newCard = this.newCard()))
			{
				cardsToShow.pushObject(newCard);
			}
		}
	}
});

export default ApplicationController;