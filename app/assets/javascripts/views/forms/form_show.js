AFB.Views.FormShow = Backbone.View.extend({
  events: {
    'click #form-itable-submit': 'submitForm'
  },
  
  render: function(){
    this.model.removeActiveEdits();
    var $form = $(this.model.get('form_text'));
    $form.append("<input type='submit' value='Submit' form='form-itable'" +
      " id='form-itable-submit'>");
    this.$el.html($form.prop('outerHTML'));
		this.$el.append(JST['forms/show_form']());
    AFB.Routers.FormRouter.setFrameDimensions();
    
    return this;
  },
  
  submitForm: function(event){
    console.log('submitting form');
    event.preventDefault();
    AFB.Routers.FormRouter.myFlash('Form Submitted!');
  }
});