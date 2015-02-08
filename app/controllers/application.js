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
		var selectedCards = this.get('selectedCards');

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
	}.property('selectedCards.[]'),

	actions: {
		addCard: function (card) {
			this.selectedCards.pushObject(card);
		}
	}
});

export default ApplicationController;