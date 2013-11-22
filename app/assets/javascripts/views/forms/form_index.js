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

    AFB.formCollection.each(function(form){
      that.$el.append(JST["forms/index_add_form"]({
        form: form
      }));
    });

    $(document).ready(function(){
      that.makeFormImages();
    });
    return this;
  },

  makeFormImages: function(){
    console.log('in FormIndex#makeFormImages');
    var that = this;
    var $buttons = this.$el.find('.fi-30x');
    $buttons.css('box-shadow', 'none');
    var $wrapper = $(JST['forms/form_wrapper']());
    this.$el.prepend($wrapper.find('style'));
    $buttons.each(function(){
      that.makeFormImage(this);
    });
  },

  makeFormImage: function(button){
    var model = AFB.formCollection.get($(button).data('id'));
    model.removeActiveEdits();
    var form = model.get('form_text');
    $(button).append(form);
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

	duplicateForm: function(formId, $target){
		var that = this;
		var form = AFB.formCollection.get(formId);
		form.duplicateForm(function(newForm){
      var $newButton = $(JST["forms/index_add_form"]({
          form: newForm
      }));
      $target.closest('.form-summary').after($newButton);
      that.makeFormImage($newButton.find('.fi-30x'));
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