AFB.Views.FormEdit = Backbone.View.extend({
  initialize: function(){
    console.log('FormEdit View initialized');

  },

  render: function(){
    this.$el.empty();
    this.$el.html(this.model.get('form_text'));
    return this;
  }
})


//  sync model on save!