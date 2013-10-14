AFB.Views.FormSidebarCheckbox = Backbone.View.extend({
  field: (JST['forms/fields/checkbox']()),

  addField: function(){
    var form = this.model.get('form_text');
    var $form = $(form).append(this.field);
    form = $('<div>').append($form.clone()).html();
    this.model.set('form_text', form);
  },

  render: function(){
    console.log("rendering FormSidebarCheckbox");
    myField1 = this.options.field;
    this.$el.html(JST['forms/sidebars/checkbox_options']({
      field: (this.options.field || this.field)
    }));
    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarTextbox#updateValues");
    AFB.Views.FormMaster.updateValues(event, this.model);
  },

  parseClick: function(event){
    console.log("in FormSidebarCheckbox#parseClick")
    var $target = $(event.target);
    if ($target.attr('name') === 'prefilled-check') {
      console.log("made it here")
      $form = $(this.model.get('form_text'))
      if ($target.prop('checked')){
        $form.find('.editing input').attr('checked', 'checked')
      } else{
        $form.find('.editing input').removeAttr('checked')
      }
      this.model.set('form_text', $form.prop('outerHTML'));
    }
  }
})
