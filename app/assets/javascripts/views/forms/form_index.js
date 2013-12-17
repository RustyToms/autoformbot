AFB.Views.FormIndex = Backbone.View.extend({
  events: {
  'click a, .new-results-count': 'parselink'
  },

  initialize: function(){
    console.log("initializing FormIndex view");
  },

  render: function(){
    console.log("rendering FormIndex view");
    var that = this;
    this.$el.empty();
    this.$el.html(JST["forms/index"]());

    AFB.formCollection.sort();
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
    var newResults = model.get('new_results');
    model.removeActiveEdits();
    var form = model.get('form_text');
    $(button).append(form);
    if (newResults){
      $(button).after("<span class='new-results-count' data-string=" +
        "'sendToResults'>" + newResults + "</span>");
    }
  },

  formSelect: function(formId, $target){
    console.log('FormIndex#formSelect');
    var $clicked = this.$el.find('.clicked');
    $target = $target.closest('.form-links');

    if (!$target.hasClass('clicked')){
      $target.addClass('clicked');
    }
    $clicked.removeClass('clicked');
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

  sendToResults: function(formId){
    console.log('FormIndex#sendToResults');
    AFB.formCollection.get(formId).set('new_results', 0);
    Backbone.history.navigate('forms/' + formId + '/results', {trigger: true});
  },

  sendToCode: function(formId){
    console.log('FormsIndex#sendToCode');
    Backbone.history.navigate('forms/' + formId + '/code', {trigger: true});
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
      var $newButton = $(JST["forms/index_add_form"]({
          form: newForm
      }));
      $('.new-form-link').after($newButton);
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