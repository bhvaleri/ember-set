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

	startGame: function () {
		this.dealCards();
	}.observes('deck.[]'),

	dealCards: function () {
			var cardsToShow = this.get('cardsToShow');

			var newCard = null;
			//check for cards left in deck
			while (cardsToShow.length < 80 && (newCard = this.newCard()))
			{
				cardsToShow.pushObject(newCard);
			}
	},

	selectedCards: [],

	//TODO be more clever
	hasSet: function () {
		var selectedCards = this.get('selectedCards').mapBy('card');

		var attrs = ['color', 'shape', 'fill', 'count'];

		var checkAttr = function (cards, attr) {
			attrs = cards.map(function(card) { return card[attr]; });

			if (attrs[0] === attrs[1] && attrs[1] === attrs[2]) {
				return true;
			}
			else if (attrs[0] !== attrs[1] && attrs[0] !== attrs[2] && attrs[1] !== attrs[2]) {
				return true;
			}
			else {
				return false;
			}
		};

		if (selectedCards.length === 3) {
			var attrValues = attrs.map(function(attr) {
				return checkAttr(selectedCards, attr);
			});

			return attrValues[0] && attrValues[1] && attrValues[2] && attrValues[3];
		}

		return false;
	}.property('selectedCards', 'selectedCards.[]'),

	//should this just be handled in cardsToShow, ie cardsToShow being a property of has set?
	// that feels wierd since its a response to an event
	hasSetDidChange: function () {
		if (this.get('hasSet')) {
			var selectedCards = this.get('selectedCards').mapBy('card');
			var cardsToShow = this.get('cardsToShow');

			selectedCards.forEach(function(card) {
				cardsToShow.removeObject(card);
			});

			this.set('selectedCards', []);
		}
	}.observes('hasSet'),


	actions: {
		addCard: function (card) {
			var selectedCards = this.selectedCards;

			if (selectedCards.indexOf(card) < 0) {
				if (selectedCards.length >= 3) {
					var cardToRemove = selectedCards.objectAt(0);
					selectedCards.removeObject(cardToRemove);
					cardToRemove.set('selected', false);
				}

				selectedCards.pushObject(card);
				//just pop out the first element if there are already 3 cards?
			}
			else {
				selectedCards.removeObject(card);
			}
		}
	}
});

export default ApplicationController;