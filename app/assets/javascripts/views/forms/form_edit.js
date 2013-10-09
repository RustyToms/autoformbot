AFB.Views.FormEdit = Backbone.View.extend({
  events: {
    "click #save-button" : "saveForm"
  },

  initialize: function(){
    console.log('FormEdit View initialized');

  },

  render: function(){
    this.$el.empty();
    this.$el.html(JST["forms/edit_form"]());
    this.$el.find('.main').prepend(this.model.get('form_text'));
    return this;
  },

  saveForm: function(){
    this.model.save({},{
      success: function(response){
        console.log("save successful");
      },
      error: function(response){
        console.log("error");
        console.log(response);
        console.log(response.errors.full_messages)
      }
    });
  }
})


//  sync model on save!