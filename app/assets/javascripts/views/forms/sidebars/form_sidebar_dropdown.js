AFB.Views.FormSidebarDropdown = Backbone.View.extend({
  field: (JST['forms/fields/dropdown']()),


  addField: function(){
    var form = this.model.get('form_text');
    var $form = $(form).append(this.field);
    this.model.set('form_text', $form.prop('outerHTML'))
  },


  render: function(){
    console.log("rendering FormSidebarDropdown");
    $field = $((this.options.field || this.field));
    var numOptions = $field.find('select').prop('length')
    var label = $field.find('.dropdown-label').html()

    this.$el.html(JST['forms/sidebars/dropdown_options']({
      label: label,
      numOptions: numOptions
    }));

    this.makeDropdown(numOptions)
    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarDropdown#updateValues");

    if (event.target.name === 'dropdown') {
      console.log('adding dropdown options');
      var numOptions = event.target.value;

      this.makeDropdown(numOptions)
    } else {
      AFB.Views.FormMaster.updateValues(event, this.model);
    }
  },

  makeDropdown: function(numOptions){
    $form = $(this.model.get('form_text'));
    this.field = $form.find('.editing');
    $target = $form.find('.editing');

    var $options = this.$el.find('.dropdowns');
		$options.find('.select-option-config').remove();

    for(var i=0; i<numOptions; i++){
      var name = "dropdownOption" + i;

      if ($target.find('.' + name).length === 0){
        var option = "<option class=" + name + "></option>"
        $target.find('select').append(option);
      }

      var optionOptions = JST['forms/sidebars/dropdown_option']({
        i: i,
        name: name,
        '$field': this.field
      })
      myOptions = $form
      console.log(optionOptions);
      $options.append($(optionOptions));
      console.log($options.html());
    }
    console.log($options);

    this.model.set('form_text', $form.prop('outerHTML'));
  }
})