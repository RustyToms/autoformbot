AFB.Views.FormSidebarDropdown = Backbone.View.extend({
  field: (JST['forms/fields/dropdown']()),


  addField: function(){
    var form = this.model.get('form_text');
    var $form = $(form).append(this.field);
    this.model.set('form_text', $form.prop('outerHTML'))
  },


  render: function(){
    console.log("rendering FormSidebarDropdown");
    this.$el.html(JST['forms/sidebars/dropdown_options']({
      field: (this.options.field || this.field)
    }));

    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarDropdown#updateValues");
    $form = $(this.model.get('form_text'))
    $target = $form.find('.editing')

    if (event.target.name === 'dropdown') {

      var $options = $(this.field).find('.dropdowns')
      $options.empty();
      var numOptions = event.target.value;

      for(var i=0; i<numOptions; i++){
        var name = "dropdownOption" + i;
        $option = $target.find('.' + name)

        if ($option.length === 0){
          var option = "<option class=" + name + "></option>"
          $target.find('select').append(option);
        }

        var optionOptions = JST['forms/sidebars/dropdown_option']({
          i: i,
          name: name,
          '$field': $options
        })

       $options.append(optionOptions);

       this.model.set('form_text', $form.prop('outerHTML'));
      }
    } else {
      AFB.Views.FormMaster.updateValues(event, this.model);
    }
  }
})