AFB.Views.FormSidebarDropdown = Backbone.View.extend({
  field: (JST['forms/fields/dropdown']()),


  addField: function(){
    this.model.addField(this.field);
  },


  render: function(){
    console.log("rendering FormSidebarDropdown");
    $field = $((this.options.field || this.field));
    var numOptions = $field.find('select').prop('length')
    var label = $field.find('.dropdown-label').html().trim()

    this.$el.html(JST['forms/sidebars/dropdown_options']({
      label: label
    }));

    this.makeDropdown(numOptions)
    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarDropdown#updateValues");
    if ($(event.target).attr('name')=== 'dropdown-label' ){
      var name = 'results[' + event.target.value + ']'
      this.model.updateAttribute('.editing select', 'name', name);
    }
    this.model.updateValues(event);
  },

  parseClick: function(event){
    console.log("in FormSidebarDropdown#parseClick");
    if($(event.target).hasClass('add-option')){
      var numOptions = this.$el.find('.select-option-config').length + 1;
      this.makeDropdown(numOptions);
    }
  },

  makeDropdown: function(numOptions){
    $form = $(this.model.get('form_text'));
    this.field = $form.find('.editing');

    var $options = this.$el.find('.dropdowns');
		$options.find('.select-option-config').remove();
    $preexisting = $.makeArray($form.find('.editing option'));

    for(var i=0; i<numOptions; i++){
      var name = "dropdownOption" + i;
      $currentOption = $($preexisting.shift());
      if($currentOption.length){
        $currentOption.removeClass();
        $currentOption.addClass(name);
        var value = $currentOption.text()
      } else{
        var option = "<option class=" + name + "></option>";
        this.field.find('select').append(option);
        var value = "";
      }

      var optionOptions = JST['forms/sidebars/dropdown_option']({
        i: i,
        name: name,
        value: value
      })
      $options.append($(optionOptions));
    }

    this.model.set('form_text', $form.prop('outerHTML'));
  }
})