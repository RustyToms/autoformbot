AFB.Views.FormSidebarDropdown = Backbone.View.extend({
  $seed: $(JST['forms/fields/dropdown']()),

  addField: function(){
    this.model.addField(this.$seed);
  },

  render: function(){
    console.log("rendering FormSidebarDropdown");
    this.$field = $(this.field || this.$seed.prop('outerHTML'));
    this.numOptions = this.$field.find('option').length || 1;
    //this.numOptions = this.$field.find('select').prop('length') || 1;

    this.makeSidebar();
    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarDropdown#updateValues");
    if ($(event.target).attr('name')=== 'dropdown-label' ){
      var name = event.target.value;
      this.model.updateAttribute('.editing select', 'name', name);
      if ( $(this.field).find(':focus').length < 1){
        this.model.updateValues(event);
      }
    }
    this.updateField();
  },

  parseClick: function(event){
    console.log("in FormSidebarDropdown#parseClick");
    if($(event.target).hasClass('add-option')){
      this.numOptions = this.$el.find('.select-option-config').length + 1;
      this.makeSidebar();
    } else {
      this.updateField();
    }
  },

  makeSidebar: function(){
    console.log('in FormSidebarDropdown#makeSidebar');
    var $editField = $('.editing');
    if ($editField.length){
      this.$field = $editField;
    }

    var label = this.$field.find('.dropdown-label').text();
    var $preexisting = $.makeArray(this.$field.find('option'));

    this.$el.html(JST['forms/sidebars/dropdown_options']({
      label: label,
      $field: this.$field
    }));

    var $options = this.$el.find('.dropdowns');

    for(var i=0; i<this.numOptions; i++){
      var name = "dropdownOption" + i;
      var value = "Option name";
      if($preexisting.length){
        value = $($preexisting.shift()).text();
      }

      var optionOptions = JST['forms/sidebars/dropdown_option']({
        name: name,
        value: value
      });
      $options.append($(optionOptions));
    }
  },

  updateField: function(){
    console.log('in FormSidebarDropdown#updateField');
    this.$field = $('.editing');

    var $options = this.$el.find('.select-option-config');
    var label = this.$el.find("input[name='dropdown-label']").val();
    var $select = this.$field.find('select');
    $select.empty();

    $options.each(function(index){
      var name = "dropdownOption" + index;
      var value = $(this).find('input').val();
      var option = "<option class=" + name + ">" + value + "</option>";
      $select.append(option);
    });

    this.model.localSaveForm();
  }
});