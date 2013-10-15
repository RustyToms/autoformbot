AFB.Views.FormIndex = Backbone.View.extend({
  events: {
  'click #create-form-button' : 'sendToNew',
  'click .delete-form' : 'deleteForm'
  },

  initialize: function(){
    console.log("initializing FormIndex view")
  },

  render: function(){
    console.log("rendering FormIndex view")
    this.$el.empty()
    this.$el.html(JST["forms/index"]({
      forms: AFB.formCollection
    }))
    checkIt = this;
    return this;
  },

  sendToNew: function(){
    console.log('FormIndex#sendToNew');
    Backbone.history.navigate('forms/new', {trigger: true});
  },

  deleteForm: function(event){
    console.log('FormIndex#deleteForm');
    var form = AFB.formCollection.get($(event.target).data());
    form && form.destroy();
    this.render();
  }
})