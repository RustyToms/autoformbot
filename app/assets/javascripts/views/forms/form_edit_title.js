AFB.Views.FormEditTitle = Backbone.View.extend({
  events: {
    "keyup" : "updateValues"
  },

  initialize: function(){
    console.log("initializing FormEditTitle view")
  },

  render: function(){
    console.log("rendering FormEditTitle view")
    this.$el.empty();
    this.$el.html(JST['forms/edit_title']())
    return this
  },

  // updateName: function(){
//     console.log("updateName running")
//     this.newName = $('#new-form-name').val();
//     this.newDescription = $('#new-form-description').val();
//     this.updateHtml();
//     this.model.set({name: this.newName, form_text: this.$el.html()});
//   },
//
//   updateHtml: function(){
//     console.log("updateFormHtml running")
//     this.$el.empty();
//     this.$el.html(this.model.get('form_text'));
//     $('#formName').html(this.newName);
//     $('#formDescription').html(this.newDescription);
//   }

    updateValues: function(event){
      console.log("in FormEditTitle#updateValues");
      AFB.Views.FormMaster.updateValues(event, this.model);
    }
})