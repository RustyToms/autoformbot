AFB.Views.FormShow = Backbone.View.extend({
  events: {
    'click .submit-button input': 'submitForm'
  },

  render: function(){
    this.model.removeActiveEdits();
    var $form = $(this.model.get('form_text'));
    this.$el.append($form);

    return this;
  },

  submitForm: function(event){
    console.log('submitting form');
    event.preventDefault();
    var that = this;

    var $form = $('.fi-30x form');
    var $submit = $form.find('.submit-button input');
    $submit.attr({
      disabled: 'true',
      value: 'Submitting..'
    });

    var form_id = that.model.get('id');
    console.log(form_id);
    $.ajax({
      url: '/results/' + form_id,
      type: 'POST',
      context: that,
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
    $('.submit-button input').val('Submit').removeAttr('disabled');
    this.model.set('new_results', this.model.get('new_results') + 1);
  },

  submissionError: function(object, errorMsg){
    console.log("form submission failed");
    console.log(object);
    console.log(object.status);
    console.log(object.responseText);
    AFB.Routers.FormRouter.myFlash(errorMsg + ": " + object.status +
      "  Your form was not submitted");
    $('.submit-button input').val('Submit').removeAttr('disabled');
  }
});
