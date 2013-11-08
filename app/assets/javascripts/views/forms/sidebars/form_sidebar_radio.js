AFB.Views.FormSidebarRadio = Backbone.View.extend({
  $seed: $(JST['forms/fields/radio']()),


  addField: function(){
		console.log("adding radio button field");
    this.model.addField(this.$seed);
  },


  render: function(){
    console.log("rendering FormSidebarRadio");
    this.$field = ($(this.field) || this.$seed.prop('outerHTML'));
    var numOptions = this.$field.find('.radio-option').length || 1;
    var label = this.$field.find('.radio-label').text().trim();
    var required = this.$field.hasClass('required');

    this.$el.html(JST['forms/sidebars/radio_options']({
      label: label,
			required: required
    }));

    this.makeSidebar(numOptions);

    if(this.$field.find('.radio-option').first().css('display') === 'block'){
      this.$el.find('input.vertical').attr('checked', 'true');
      this.$el.find('input.horizontal').removeAttr('checked');
    }
    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarRadio#updateValues");
    console.log(event.target);

		if ($(event.target).hasClass('radio-label')){

      this.model.updateHTML('.editing .radio-label', event.target.value);
      var numOptions = this.$el.find('.radio-option-config').length;
      this.makeSidebar(numOptions);

		} else if ($(event.target).hasClass('option-name')) {
			console.log($(event.target).prop("outerHTML"));

			var selector = '.editing .' + event.target.name + '-label';
			this.model.updateHTML(selector, event.target.value);
		} else {
      this.model.updateValues(event);
    }
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
    this.$field = $form.find('.editing');
    var display = ""; //will be used to remember if display is block, making options render vertically
    var $options = this.$el.find('.radios');
		$options.find('.radio-option-config').remove();
    $preexisting = $.makeArray($form.find('.editing .radio-option'));
    var label = this.$field.find('.radio-label').text().trim();
    this.$field.find('span.radio').empty();

    for(var i=0; i<numOptions; i++){
      var $currentOption = $($preexisting.shift());
			var klass = label.replace(/[^_a-zA-Z0-9-]/g, '_') + i;
			console.log("klass is " + klass);
      var optionName = "";
      var value = "";

      if($currentOption.length){
        optionName = $currentOption.find('label').text().trim();
        value = $currentOption.find('input').val();
        display = $currentOption.css('display');
      }

      console.log("display value is " + display);

      var radioOption = JST['forms/fields/radio_option']({
        name: "results[" + label + "]",
        klass: klass,
        optionName: optionName,
        value: value
      });

      this.$field.find('span.radio').append($(radioOption));

      var optionOption = JST['forms/sidebars/radio_option']({
        klass: klass,
        optionName: optionName,
        value: value,
        i: i
      });
      $options.append($(optionOption));
    }

    this.$field.find('.radio-option').css('display', display);
    this.model.set('form_text', $form.prop('outerHTML'));
  }
});