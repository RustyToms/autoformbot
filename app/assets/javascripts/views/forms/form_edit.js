AFB.Views.FormEdit = Backbone.View.extend({
  events: {

    "change" : "updateModel"
  },

  initialize: function(){
    console.log('FormEdit View initialized');

  },

  render: function(){
    this.$el.empty();
    this.$el.html(JST["forms/edit_form"]({
      form: this.model
    }));

    return this;
  },



  cleanUp: function(){
    this.undelegateEvents();
  }
})


//  sync model on save!