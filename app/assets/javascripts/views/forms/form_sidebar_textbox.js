AFB.Views.FormSidebarTextbox = Backbone.View.extend({
  field: (JST['forms/fields/textbox']()),

  addField: function(){
    var form = this.model.get('form_text');
    $form = $(form).append(this.field);
    form = $('<div>').append($form.clone()).html();
    this.model.set('form_text', form)
  },

  render: function(){
    console.log("rendering FormSidebarTextbox");
    this.$el.html(JST['forms/sidebars/textbox_options']({
      field: this.options.field
    }));

    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarTextbox#updateValues");
    AFB.Views.FormMaster.updateValues(event, this.model);
  },

  parseClick: function(event){
    console.log("in FormSidebarTextbox#parseClick");
    if ($(event.target).attr('name') ==='requiredCheckbox'){
      AFB.Views.FormMaster.requireField(event, this.model);
    }
  }
})