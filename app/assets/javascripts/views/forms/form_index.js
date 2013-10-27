AFB.Views.FormIndex = Backbone.View.extend({
  events: {
  'click a': 'parselink'
  },

  initialize: function(){
    console.log("initializing FormIndex view");
  },

  render: function(){
    console.log("rendering FormIndex view");
    this.$el.empty();
    this.$el.html(JST["forms/index"]({
      forms: AFB.formCollection
    }));
    return this;
  },

  formSelect: function(formId, $target){
    if ($target.closest('.form-links').hasClass('clicked')){
     
      this.$el.find('.clicked').removeClass('clicked');
    
    } else {

      this.$el.find('.clicked').removeClass('clicked');
      $target.closest('.form-links').addClass('clicked');
    }
  },

  sendToNew: function(){
    console.log('FormIndex#sendToNew');
    Backbone.history.navigate('forms/new', {trigger: true});
  },

  sendToEdit: function(formId){
    console.log('FormIndex#sendToEdit');
    Backbone.history.navigate('forms/' + formId + '/edit',
      {trigger: true});
  },

  sendToView: function(formId){
    console.log('FormIndex#sendToView');
    Backbone.history.navigate('forms/' + formId, {trigger: true});
  },

  deleteForm: function(formId){
    console.log('FormIndex#deleteForm');
    var form = AFB.formCollection.get(formId);
    form.destroy();
    this.$el.find(".form-summary[data-form-id=" + formId + "]").remove();
  },
	
	duplicateForm: function(formId){
		var that = this;
		var form = AFB.formCollection.get(formId);
		form.duplicateForm(function(newForm){
      that.$el.find('.form-summary').last().after(
        JST["forms/index_add_form"]({
          form: newForm
        }));
    });
	},

  parselink: function(event){
    var $target = $(event.target);
    var formId = $target.closest('.form-summary').data('form-id');
    console.log('in parselink, formId is ' + formId);

    this[$target.data('string')](formId, $target);
  }
});