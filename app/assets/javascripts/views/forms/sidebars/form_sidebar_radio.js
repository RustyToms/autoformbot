AFB.Views.FormSidebarRadio = Backbone.View.extend({
  field: (JST['forms/fields/radio']()),


  addField: function(){
		console.log("adding radio button field")
    this.model.addField(this.field);
  },


  render: function(){
    console.log("rendering FormSidebarRadio");
    $field = $((this.options.field || this.field));
    var numOptions = $field.find('.radio-option').length
    var label = $field.find('.radio-label').text().trim()

    this.$el.html(JST['forms/sidebars/radio_options']({
      label: label
    }));

    this.makeRadio(numOptions)
    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarRadio#updateValues");
    console.log(event.target)
		if ($(event.target).hasClass('radio-label')){

      this.model.updateHTML('.editing .radio-label', event.target.value);
      var numOptions = this.$el.find('.radio-option-config').length;
      this.makeRadio(numOptions);

			// var name = 'results[' + event.target.value + ']'
//       console.log('name is ' + name);
//       $form = $(this.model.get('form_text'));
//       $form.find('.editing .radio-label').html(event.target.value);
//       $form.find('.editing input').attr('name', name);
//       this.model.set('form_text', $form.prop('outerHTML'));
		} else {
		  this.model.updateValues(event);
		}
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
		numOptions = (numOptions || 1);

    $form = $(this.model.get('form_text'));
    this.field = $form.find('.editing');

    var $options = this.$el.find('.radios');
		$options.find('.radio-option-config').remove();
    $preexisting = $.makeArray($form.find('.editing .radio-option'));
    var label = this.field.find('.radio-label').text().trim();
    this.field.find('span.radio').empty();

    for(var i=0; i<numOptions; i++){
      // var name = "results[" + label + "]";
      $currentOption = $($preexisting.shift());
			var klass = label.replace(' ', '') + i;
			
      if($currentOption.length){
        var optionName = $currentOption.find('label').text().trim();
        var value = $currentOption.find('input').val();
      } else{
        var optionName = "";
        var value = "";
      }

      var radioOption = JST['forms/fields/radio_option']({
        name: "results[" + label + "]",
        klass: klass,
        optionName: optionName,
        value: value
      })
      this.field.find('span.radio').append($(radioOption));

      var optionOption = JST['forms/sidebars/radio_option']({
        klass: klass,
        optionName: optionName,
        value: value,
        i: i
      })
      $options.append($(optionOption));
    }

    this.model.set('form_text', $form.prop('outerHTML'));
  }
})