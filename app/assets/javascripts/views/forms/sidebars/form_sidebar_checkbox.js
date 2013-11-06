AFB.Views.FormSidebarCheckbox = Backbone.View.extend({

  initialize: function(){
    this.$seed = $(JST['forms/fields/checkbox']());
  },

  addField: function(){
    console.log('adding checkbox field');
    this.model.addField(this.$seed);
  },

  render: function(){
    console.log("rendering FormSidebarCheckbox");
    this.$field = $(this.field || this.$seed.prop('outerHTML'));
    console.log(this.$field.prop('outerHTML'));
    this.numOptions = this.$field.find('.checkbox-option').length;
    var label = this.$field.find('.checkbox-label').text().trim();
		var required = this.$field.hasClass('required');
    var that = this;

    this.$el.html(JST['forms/sidebars/checkbox_options']({
      label: label,
			required: required
    }));

    $(function(){
      that.makeSidebar($(that.model.get('form_text')));
    });

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
      this.model.updateValues(event);
    }

    this.updateField();
  },

  parseClick: function(event){
    console.log("in FormSidebarCheckbox#parseClick");
    $target = $(event.target);
    var that = this;

    if($target.hasClass('add-option')){
      this.numOptions = this.$el.find('.checkbox-option-config').length + 1;
      $(function(){
        that.makeSidebar($(this).find('form#form-itable'));
      });

    } else {
      that.updateField();

    }
  },

  makeSidebar: function($form){
    console.log('in Checkbox makeSidebar');
    console.log($form.prop('outerHTML'));

    this.$field = $form.find('.editing');
    var display = ""; //will be used to remember if display is block, making options render vertically
    var $options = this.$el.find('.checkboxes');
		$options.find('.checkbox-option-config').remove();
    $preexisting = $.makeArray($form.find('.editing .checkbox-option'));
    var label = this.$field.find('.checkbox-label').text().trim();
    this.$field.find('span.checkbox').empty();

    for(var i=0; i<this.numOptions; i++){
      var $currentOption = $($preexisting.shift());
			var klass = label.replace(/[^_a-zA-Z0-9-]/g, '_') + i;
      var name = "results[" + label + "]";
      var value = "Option Name";
      var checked = false;

      if($currentOption.length){
        value = $currentOption.find('input').val();
        display = $currentOption.css('display');
				checked = $currentOption.find('input').get(0).hasAttribute('checked');
        console.log("checked is " + checked);
      }

      var checkboxOption = JST['forms/fields/checkbox_option']({
        name: name,
        klass: klass,
        value: value,
				checked: checked
      });
      this.$field.find('span.checkbox').append($(checkboxOption));

      var optionOption = JST['forms/sidebars/checkbox_option']({
        klass: klass,
        value: value,
				checked: checked
      });
      $options.append($(optionOption));
    }

    this.$field.find('.checkbox-option').css('display', display);
    this.model.set('form_text', $form.prop('outerHTML'));
  },

  updateField: function(){
    console.log("updating checkboxes in form");
    this.$field = $('.editing');
    var that = this;
    var display = 'inline';
    var $options = this.$el.find('.checkbox-option-config');
    var label = this.$el.find("input[name='checkbox-label']").val();
    myEl = this.$field;
    this.$field.find('span.checkbox').empty();

    if (this.$el.find('.vertical').prop('checked')){
      display = 'block';
    }

    $options.each(function(index){
      var value = $(this).find('input').val();
      var checked = $(this).find('.prefilled-check').prop('checked');
      var klass = label.replace(/[^_a-zA-Z0-9-]/g, '_') + index;
      var name = "results[" + label + "]";

      var checkboxOption = JST['forms/fields/checkbox_option']({
        name: name,
        klass: klass,
        value: value,
        checked: checked
      });
      that.$field.find('span.checkbox').append($(checkboxOption));
    });

    $(function(){
      that.model.set('form_text', $('form#form-itable').prop('outerHTML'));
    });
  }
});