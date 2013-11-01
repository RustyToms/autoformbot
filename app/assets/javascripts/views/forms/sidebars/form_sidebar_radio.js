AFB.Views.FormSidebarRadio = Backbone.View.extend({
  field: (JST['forms/fields/radio']()),


  addField: function(){
		console.log("adding radio button field")
    this.model.addField(this.field);
  },


  render: function(){
    console.log("rendering FormSidebarRadio");
    var $field = $((this.options.field || this.field));
    var numOptions = $field.find('.radio-option').length
    var label = $field.find('.radio-label').text().trim()
		var required = $field.hasClass('required')

    this.$el.html(JST['forms/sidebars/radio_options']({
      label: label,
			required: required
    }));

    this.makeSidebar(numOptions)
    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarRadio#updateValues");
    console.log(event.target)

		if ($(event.target).hasClass('radio-label')){

      this.model.updateHTML('.editing .radio-label', event.target.value);
      var numOptions = this.$el.find('.radio-option-config').length;
      this.makeSidebar(numOptions);

		} else if ($(event.target).hasClass('option-name')) {
			console.log($(event.target).prop("outerHTML"));

			var selector = '.editing .' + event.target.name + '-label';
			this.model.updateHTML(selector, event.target.value);
		}
    this.model.updateValues(event);
  },

  parseClick: function(event){
    console.log("in FormSidebarRadio#parseClick");
    if($(event.target).hasClass('add-option')){
      var numOptions = this.$el.find('.radio-option-config').length + 1;
      this.makeSidebar(numOptions);
    } else {
      this.model.updateValues(event);
    }
  },

  makeSidebar: function(numOptions){
    console.log('in Radio makeSidebar');
		numOptions = (numOptions || 1);

    $form = $(this.model.get('form_text'));
    this.field = $form.find('.editing');

    var $options = this.$el.find('.radios');
		$options.find('.radio-option-config').remove();
    $preexisting = $.makeArray($form.find('.editing .radio-option'));
    var label = this.field.find('.radio-label').text().trim();
    this.field.find('span.radio').empty();

    for(var i=0; i<numOptions; i++){
      $currentOption = $($preexisting.shift());
			var klass = label.replace(/[^_a-zA-Z0-9-]/g, '_') + i;
			console.log("klass is " + klass);

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

    this.model.set({form_text: $form.prop('outerHTML')},{silent: true});
  }
})