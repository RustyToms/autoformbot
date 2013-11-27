AFB.Views.FormCode = Backbone.View.extend({
  initialize: function(){
    console.log("FormCode initialized");
  },

  render: function(){
    console.log("FormCode#render");
    this.$el.html(JST['forms/form_code']({

    }));

    return this;
  }
});