AFB.Views.FormSidebarRadio = Backbone.View.extend({
  field: (JST['forms/fields/radio']()),


  addField: function(){
    var form = this.model.get('form_text');
    var $form = $(form).append(this.field);
    this.model.set('form_text', $form.prop('outerHTML'))
  },


  render: function(){
    console.log("rendering FormSidebarRadio");
    $field = $((this.options.field || this.field));
    var numOptions = $field.find('.radio-option-config').prop('length')
    var label = $field.find('.radio-label').html()

    this.$el.html(JST['forms/sidebars/radio_options']({
      label: label
    }));

    this.makeRadio(numOptions)
    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarRadio#updateValues");
    AFB.Views.FormMaster.updateValues(event, this.model);
  },

  parseClick: function(event){
    console.log("in FormSidebarRadio#parseClick");
    if($(event.target).hasClass('add-option')){
      var numOptions = this.$el.find('.radio-option-config').length + 1;
      this.makeRadio(numOptions);
    }
  },

  makeRadio: function(numOptions){
    console.log('in makeRadio');
    $form = $(this.model.get('form_text'));
    this.field = $form.find('.editing');

    var $options = this.$el.find('.radios');
		$options.find('.radio-option-config').remove();
    $preexisting = $.makeArray($form.find('.editing .radio-option'));
    var label = this.field.find('radio-label').text()
    this.field.find('span.radio').empty();

    for(var i=0; i<numOptions; i++){
      var name = "radioOption" + i;
      $currentOption = $($preexisting.shift());
      if($currentOption.length){
        var optionName = $currentOption.find('label').text();
        var value = $currentOption.find('input').val();
      } else{
        var optionName = "";
        var value = "";
      }

      var radioOption = JST['forms/fields/radio_option']({
        label: label,
        name: name,
        optionName: optionName,
        value: value
      })
      this.field.find('span.radio').append($(radioOption));

      var optionOption = JST['forms/sidebars/radio_option']({
        name: name,
        optionName: optionName,
        value: value,
        i: i
      })
      $options.append($(optionOption));
    }

    this.model.set('form_text', $form.prop('outerHTML'));
  }
})