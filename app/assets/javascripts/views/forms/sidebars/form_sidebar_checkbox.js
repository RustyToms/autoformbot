AFB.Views.FormSidebarCheckbox = Backbone.View.extend({
  $seed: $(JST['forms/fields/checkbox']()),

  addField: function(){
    this.model.addField(this.$seed);
  },

  render: function(){
    console.log("rendering FormSidebarCheckbox");
    this.$field = ($(this.field) || this.$seed);
    var numOptions = this.$field.find('.checkbox-option').length;
    var label = this.$field.find('.checkbox-label').text().trim();
		var required = this.$field.hasClass('required');

    this.$el.html(JST['forms/sidebars/checkbox_options']({
      label: label,
			required: required
    }));

		this.makeSidebar(numOptions);

    if(this.$field.find('.checkbox-option').
      first().css('display') === 'block'){
      console.log('should be vertical');
      this.$el.find('input.vertical').attr('checked', 'true');
      this.$el.find('input.horizontal').removeAttr('checked');
    }

    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarTextbox#updateValues");
    if ($(event.target).attr('name')=== 'checkbox-label' ){
      var name = 'results[' + event.target.value + ']';
      this.model.updateAttribute('.editing .checkbox', 'name', name);
    } else if ($(event.target).hasClass('option-name')) {

			var selector = '.editing .' + event.target.name + '-label';
			this.model.updateHTML(selector, event.target.value);
		}
    this.model.updateValues(event);
  },

  parseClick: function(event){
    console.log("in FormSidebarCheckbox#parseClick");
    $target = $(event.target);
    if ($target.hasClass('prefilled-check')) {
			var selector = '.editing .' + $target.attr('name');
			this.model.updateProp(selector, 'checked', $target.prop('checked'));
    } else if($target.hasClass('add-option')){
      var numOptions = this.$el.find('.checkbox-option-config').length + 1;
      this.makeSidebar(numOptions);
    } else {
      this.model.updateValues(event);
    }
  },

  makeSidebar: function(numOptions){
    console.log('in Checkbox makeSidebar');
		numOptions = (numOptions || 1);

    $form = $(this.model.get('form_text'));
    this.$field = $form.find('.editing');
    var display = ""; //will be used to remember if display is block, making options render vertically
    var $options = this.$el.find('.checkboxes');
		$options.find('.checkbox-option-config').remove();
    $preexisting = $.makeArray($form.find('.editing .checkbox-option'));
    var label = this.$field.find('.checkbox-label').text().trim();
    this.$field.find('span.checkbox').empty();

    for(var i=0; i<numOptions; i++){
      $currentOption = $($preexisting.shift());
			var name = "results[" + label + "][" + name + "]";
			var klass = label.replace(/[^_a-zA-Z0-9-]/g, '_') + i;
      var optionName = "Option Name";
      var value = "";
      var checked = false;

      if($currentOption.length){
        optionName = $currentOption.find('label').text().trim();
        value = $currentOption.find('input').val();
        display = $currentOption.css('display');
				checked = $currentOption.find('input').get(0).hasAttribute('checked');
        console.log("checked is " + checked);
      }

      var checkboxOption = JST['forms/fields/checkbox_option']({
        name: "results[" + label + "]",
        klass: klass,
        optionName: optionName,
        value: value,
				checked: checked
      });
      this.$field.find('span.checkbox').append($(checkboxOption));

      var optionOption = JST['forms/sidebars/checkbox_option']({
        klass: klass,
        optionName: optionName,
        value: value,
        i: i,
				checked: checked
      });
      $options.append($(optionOption));
    }

    this.$field.find('.checkbox-option').css('display', display);
    this.model.set('form_text', $form.prop('outerHTML'));
  }
});