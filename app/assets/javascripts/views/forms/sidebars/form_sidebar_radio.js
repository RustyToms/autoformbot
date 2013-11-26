AFB.Views.FormSidebarRadio = Backbone.View.extend({
  $seed: $(JST['forms/fields/radio']()),

  addField: function(){
		console.log("adding radio button field");
    this.model.addField(this.$seed);
  },


  render: function(){
    console.log("rendering FormSidebarRadio");
    this.$field = $(this.field || this.$seed.prop('outerHTML'));
    this.numOptions = this.$field.find('.radio-option').length || 1;
    var that = this;

    $(function(){
      that.makeSidebar();
    });
    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarRadio#updateValues");

		if ($(event.target).hasClass('radio-label')){
      if ( $(this.field).find(':focus').length < 1){
        this.model.updateHTML('.editing .radio-label', event.target.value);
      }
      this.model.updateAttribute('.editing .radio-option input',
        'name', event.target.value);
      this.updateField();
      this.syncOptionNames();

    } else if ($(event.target).hasClass('option-name') &&
      this.$field.find(':focus').length) {

      this.$field.find("input#" + $(event.target).attr('name')).
        val(event.target.value);

    } else {

    this.updateField();
    }
  },

  syncOptionNames: function(){
    console.log('syncing sidebar option names with new label');
    var $fieldOptions = $('.editing input');
    var $sidebarOptions = this.$el.find('.radio-option-config');
    $fieldOptions.each(function(index){
      var $sidebarOption = $($sidebarOptions[index]);
      var newName = $(this).attr('id');

      $sidebarOption.find('input').attr('name', newName);
      $sidebarOption.find('button').attr('name', "radio-option:has('." +
        newName + "')");
    });
  },

  parseClick: function(event){
    console.log("in FormSidebarRadio#parseClick");
    if($(event.target).hasClass('add-option')){
      this.numOptions = this.$el.find('.radio-option-config').length + 1;
      this.makeSidebar();
    } else {
      this.updateField();
    }
  },

  makeSidebar: function(numOptions){
    console.log('in Radio makeSidebar');
    var $editField = $('.editing');
    if ($editField.length){
      this.$field = $editField;
    }

    var $preexisting = $.makeArray(this.$field.find('.radio-option'));
    var label = this.$field.find('.radio-label').text();
    var required = this.$field.hasClass('required');
    var klass = label.replace(/[^_a-zA-Z0-9-]/g, '_');

    this.$el.html(JST['forms/sidebars/radio_options']({
      label: label,
      required: required
    }));

    if(this.$field.find('.radio-option').first().css('display') === 'block'){
      this.$el.find('input.vertical').attr('checked', 'true');
      this.$el.find('input.horizontal').removeAttr('checked');
    }

    var $options = this.$el.find('.radios');

    for(var i=0; i<this.numOptions; i++){
      var optionName = "Option name";

      if($preexisting.length){
        optionName = $($preexisting.shift()).find('label span').text();
      }

      var optionOption = JST['forms/sidebars/radio_option']({
        klass: klass + i,
        optionName: optionName,
        i: i
      });
      $options.append($(optionOption));
    }
  },

  updateField: function(){
    console.log('in FormSidebarRadio#updateField');
    this.$field = $('.editing');

    var $options = this.$el.find('.radio-option-config');
    var label = this.$el.find(".radio-label").val();
    var $radio = this.$field.find('.radio');
    var klass = label.replace(/[^_a-zA-Z0-9-]/g, '_');
    $radio.empty();

    $options.each(function(index){
        var radioOption = JST['forms/fields/radio_option']({
        name: label,
        klass: klass + index,
        value: $(this).find('input').val()
      });

      $radio.append(radioOption);
    });

    var display = 'inline';
    if (this.$el.find('.vertical').prop('checked')){
      display = 'block';
    }
    this.$field.find('.radio-option').css('display', display);
    this.parentView.editForm.prepForm(this.$field);
    this.model.localSaveForm();
  }
});