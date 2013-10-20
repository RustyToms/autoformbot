AFB.Views.FormSidebarCheckbox = Backbone.View.extend({
  field: (JST['forms/fields/checkbox']()),

  addField: function(){
    this.model.addField(this.field);
  },

  render: function(){
    console.log("rendering FormSidebarCheckbox");
    var $field = $((this.options.field || this.field));
    var numOptions = $field.find('.checkbox-option').length
    var label = $field.find('.checkbox-label').text().trim()
		var required = $field.hasClass('required')
		
    this.$el.html(JST['forms/sidebars/checkbox_options']({
      label: label,
			required: required
    }));
		
		this.makeSidebar(numOptions);
    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarTextbox#updateValues");
    if ($(event.target).attr('name')=== 'checkbox-label' ){
      var name = 'results[' + event.target.value + ']'
      this.model.updateAttribute('.editing .checkbox', 'name', name);
    } else if ($(event.target).hasClass('option-name')) {
			
			var selector = '.editing .' + event.target.name + '-label';
			this.model.updateHTML(selector, event.target.value);	
		}
    this.model.updateValues(event);
  },

  parseClick: function(event){
    console.log("in FormSidebarCheckbox#parseClick")
    $target = $(event.target);
    if ($target.hasClass('prefilled-check')) {
      var $form = $(this.model.get('form_text'));
			var targetOptionClass = $target.attr('name');
			console.log(targetOptionClass)
      if ($target.prop('checked')){
        $form.find('.editing .' + targetOptionClass).attr('checked', 'checked')
      } else{
        $form.find('.editing .' + targetOptionClass).removeAttr('checked')
      }
      this.model.set('form_text', $form.prop('outerHTML'));
    } else if($target.hasClass('add-option')){
      var numOptions = this.$el.find('.checkbox-option-config').length + 1;
      this.makeSidebar(numOptions);
    }
  },
	
  makeSidebar: function(numOptions){
    console.log('in Checkbox makeSidebar');
		numOptions = (numOptions || 1);

    $form = $(this.model.get('form_text'));
    this.field = $form.find('.editing');

    var $options = this.$el.find('.checkboxes');
		$options.find('.checkbox-option-config').remove();
    $preexisting = $.makeArray($form.find('.editing .checkbox-option'));
    var label = this.field.find('.checkbox-label').text().trim();
    this.field.find('span.checkbox').empty();

    for(var i=0; i<numOptions; i++){
      // var name = "results[" + label + "]";
      $currentOption = $($preexisting.shift());
			var name = "results[" + label + "][" + name + "]";
			var klass = label.replace(/[^_a-zA-Z0-9-]/g, '_') + i;
			
      if($currentOption.length){
        var optionName = $currentOption.find('label').text().trim();
        var value = $currentOption.find('input').val();
				var checked = $currentOption.find('input').
				  get(0).hasAttribute('checked')
      } else{
        var optionName = "";
        var value = "";
				var checked = false;
      }

      var checkboxOption = JST['forms/fields/checkbox_option']({
        name: "results[" + label + "]",
        klass: klass,
        optionName: optionName,
        value: value,
				checked: checked
      })
      this.field.find('span.checkbox').append($(checkboxOption));

      var optionOption = JST['forms/sidebars/checkbox_option']({
        klass: klass,
        optionName: optionName,
        value: value,
        i: i,
				checked: checked
      })
      $options.append($(optionOption));
    }

    this.model.set('form_text', $form.prop('outerHTML'));
  }
})


// $field.find('.checkbox').get(0).hasAttribute('checked')