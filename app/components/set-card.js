import Ember from 'ember';

var SetCard = Ember.Component.extend({
	classNameBindings: [':card', 'selected:card-selected'],
	selected: false,

	click: function() {
		this.toggleProperty('selected');
		this.sendAction('action', this);
	}
});

export default SetCard;