import Ember from 'ember';

var SetCard = Ember.Component.extend({
	classNameBindings: [':card', 'selected:card-selected'],
	selected: false,

	click: function() {
		this.toggleProperty('selected');
		this.sendAction('action', this);
	},

	//todo make a handlebars for helper
	shapesToShow: function () {
		var placeHolder = [];
		placeHolder.length = this.get('card.count');
		return placeHolder;
	}.property('card.count')
});

export default SetCard;