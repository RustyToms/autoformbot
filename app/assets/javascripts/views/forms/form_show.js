AFB.Views.FormShow = Backbone.View.extend({
  events: {
    'click #form-itable-submit': 'submitForm'
  },
  
  render: function(){
    this.model.removeActiveEdits();
    var $form = $(this.model.get('form_text'));
    $form.find('#form-itable').append("<input type='submit' value='Submit'" +
      "form='form-itable' id='form-itable-submit'>");
    this.$el.html($form.prop('outerHTML'));
		this.$el.append(JST['forms/show_form']());
    
    return this;
  },
  
  submitForm: function(event){
    console.log('submitting form');
    event.preventDefault();
    var that = this;
    
    var $form = that.$el.find('#form-itable').clone();
    $form.find('#form-itable-submit').remove();
    var form_id = that.model.get('id');
    console.log(form_id);
    $.ajax({
      url: '/results',
      type: 'POST',
      dataType: 'json',
      data: {result: $form.prop('outerHTML'), form_id: form_id},
      success: this.submissionSuccess,
      error: this.submissionError
    });
  },
  
  submissionSuccess: function(response, status, object){
    console.log(response);
    console.log(status);
    console.log(object);
    AFB.Routers.FormRouter.myFlash('Form submitted!');
  },
  
  submissionError: function(object, errorMsg){
    console.log(object);
    console.log(object.status);
    AFB.Routers.FormRouter.myFlash(errorMsg + object.status);
  }
});