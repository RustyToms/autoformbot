AFB.Views.FormShow = Backbone.View.extend({
  events: {
    'click #form-itable-submit': 'submitForm'
  },

  render: function(){
    this.model.removeActiveEdits();
    var $form = $(this.model.get('form_text'));
    this.$el.append($form);
		// this.$el.append(JST['forms/show_form']());

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
    myForm = $form;
    $.ajax({
      url: '/results/' + form_id,
      type: 'POST',
      dataType: 'json',
      data: $form.serialize(),
      success: this.submissionSuccess,
      error: this.submissionError
    });
  },

  submissionSuccess: function(response, status, object){
    console.log("form submission success");
    console.log(response);
    console.log(status);
    console.log(object);
    AFB.Routers.FormRouter.myFlash('Form submitted!');
  },

  submissionError: function(object, errorMsg){
    console.log("form submission failed");
    console.log(object);
    console.log(object.status);
    console.log(object.responseText);
    AFB.Routers.FormRouter.myFlash(errorMsg + ": " + object.status +
      "  Your form was not submitted");
  }
});