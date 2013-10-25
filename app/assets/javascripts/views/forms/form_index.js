AFB.Views.FormIndex = Backbone.View.extend({
  events: {
  'click #create-form-button': 'sendToNew',
  'click .delete-form': 'deleteForm',
	'click .duplicate-form': 'duplicateForm',
  'click .form-summary a': 'parselink'
  },

  initialize: function(){
    console.log("initializing FormIndex view")
  },

  render: function(){
    console.log("rendering FormIndex view")
    this.$el.empty()
    this.$el.html(JST["forms/index"]({
      forms: AFB.formCollection
    }))
    return this;
  },

  sendToNew: function(){
    console.log('FormIndex#sendToNew');
    Backbone.history.navigate('forms/new', {trigger: true});
  },

  deleteForm: function(formId){
    console.log('FormIndex#deleteForm');
    var form = AFB.formCollection.get(formId);
    form.destroy();
    this.render();
  },
	
	duplicateForm: function(formId){
		var that= this;
		var form = AFB.formCollection.get(formId);
		form.duplicateForm(function(){
		that.render();
	});
	},

  parselink: function(event){
    var $target = $(event.target);
    var formId = $target.closest('.form-summary').data('form-id');
    console.log('in parselink, formId is ' + formId);

    if ($target.hasClass('formSelect') &&
      $target.closest('.form-links').hasClass('clicked')){
     
      this.$el.find('.clicked').removeClass('clicked');
      return true;
    
    } else if ($target.hasClass('formSelect')){
      this.$el.find('.clicked').removeClass('clicked');
      $target.closest('.form-links').addClass('clicked');
      return true;
    }

    this[$target.data('string')](formId);
  }
})