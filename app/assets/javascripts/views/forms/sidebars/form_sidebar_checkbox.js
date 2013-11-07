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
    var that = this;
    this.$field = $(this.field || this.$seed.prop('outerHTML'));
    this.numOptions = (this.$field.find('.checkbox-option').length || 1);


    $(function(){
      that.makeSidebar($('form#form-itable'));
    });
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
        that.updateField();
      });

    } else {
      that.updateField();

    }
  },

  makeSidebar: function($form){
    console.log('in Checkbox makeSidebar');
    var that = this;
    var $editField = $form.find('.editing');

    if ($editField.length){
      this.$field = $editField;
    }

    var label = this.$field.find('.checkbox-label').text().trim();
    var required = this.$field.hasClass('required');

    this.$el.html(JST['forms/sidebars/checkbox_options']({
      label: label,
      required: required
    }));

    if(this.$field.find('.checkbox-option').
      first().css('display') === 'block'){
      this.$el.find('input.vertical').attr('checked', 'true');
      this.$el.find('input.horizontal').removeAttr('checked');
    }

    var $optionBox = this.$el.find('.checkboxes');
    var $preexisting = $.makeArray($form.find('.editing .checkbox-option'));

    for(var i=0; i<this.numOptions; i++){
			var klass = label.replace(/[^_a-zA-Z0-9-]/g, '_') + i;
      var value = "Option Name";
      var checked = false;

      if($preexisting.length){
        var $currentOption = $($preexisting.shift());
        value = $currentOption.find('input').val();
				checked = $currentOption.find('input').get(0).hasAttribute('checked');
      }

      var newOption = JST['forms/sidebars/checkbox_option']({
        klass: klass,
        value: value,
				checked: checked
      });
      $optionBox.append($(newOption));
    }
  },

  updateField: function(){
    console.log("updating checkboxes in form");
    this.$field = $('.editing');
    var that = this;
    var display = 'inline';
    var $options = this.$el.find('.checkbox-option-config');
    var label = this.$el.find("input[name='checkbox-label']").val();
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

    this.$field.find('.checkbox-option').css('display', display);
    this.parentView.localSaveForm(this.parentView);
  }
});