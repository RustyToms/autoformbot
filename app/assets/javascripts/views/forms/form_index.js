AFB.Views.FormIndex = Backbone.View.extend({
  events: {
  'click a': 'parselink'
  },

  initialize: function(){
    console.log("initializing FormIndex view");
  },

  render: function(){
    console.log("rendering FormIndex view");
    var that = this;
    this.$el.empty();
    this.$el.html(JST["forms/index"]({
      forms: AFB.formCollection
    }));
    $(document).ready(function(){
      that.makeFormImages();
    });
    return this;
  },

  makeFormImages: function(){
    console.log('in FormIndex#makeFormImages');
    var $button = this.$el.find('.fi-30x');
    $button.css('box-shadow', 'none');
    var $wrapper = $(JST['forms/form_wrapper']());
    this.$el.prepend($wrapper.find('style'));
    $button.each(function(index){
      var $form = $(AFB.formCollection.get($(this).data('id')).
        get('form_text'));
      $(this).append($form);
    });
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
    var formName = form.get('name');
    form.destroy();
    this.$el.find(".form-summary[data-form-id=" + formId + "]").remove();
    AFB.Routers.FormRouter.myFlash(formName + ' deleted!');
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
    event.preventDefault();
    var $target = $(event.target);
    var formId = $target.closest('.form-summary').data('form-id');
    console.log('in parselink, formId is ' + formId);

    this[$target.data('string')](formId, $target);
  }
});