AFB.Views.FormSidebarTelnum = Backbone.View.extend({
  field: (JST['forms/fields/telnum']()),

  addField: function(){
    var form = this.model.get('form_text');
    $form = $(form).append(this.field);
    form = $('<div>').append($form.clone()).html();
    this.model.set('form_text', form);
  },

  render: function(){
    console.log("rendering FormSidebarTelnum");
    this.$el.html("<div class='sidebar'><h2>Nothing here yet</h2></div>")
    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarTextarea#updateValues");
    AFB.Views.FormMaster.updateValues(event, this.model);
  }
})
