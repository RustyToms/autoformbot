window.AFB = AutoFormBot = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function($rootEl, forms){
    console.log("AutoFormBot initialized")
    AFB.formCollection = new AFB.Collections.Forms(forms)

    new AFB.Routers.FormRouter($rootEl);

    Backbone.history.start();
  },

  removeActiveEdits: function(model){
    var form = model.get('form_text');
    $form = $(form)
    $form.removeClass('editing')
    form = $('<div>').append($form.clone()).html();
    model.set('form_text', form)
  }
}

