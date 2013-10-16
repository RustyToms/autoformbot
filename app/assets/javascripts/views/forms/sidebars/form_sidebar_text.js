AFB.Views.FormSidebarText = Backbone.View.extend({
  field: (JST['forms/fields/text']()),

  addField: function(){
    this.model.addField(this.field);
  },

  render: function(){
    console.log("rendering FormSidebarText");
    this.$el.html(JST['forms/sidebars/text_options']({
      field: (this.options.field || this.field)
    }));

    var $form = $(this.model.get('form_text'))
    var fontFamily = $form.find('.editing span').css('font-family');
    var $fontFamilies = this.$el.find('font-family-option');
    $fontFamilies.each(function($option){
      if ($option.css('font-family') === fontFamily){
        $option.attr('selected', 'true')
      }
    })

    return this;
  },

  updateValues: function(event){
    console.log("in FormSidebarText#updateValues");
    if ($(event.target).attr('name')=== 'textbox-label' ){
      var name = 'results[' + event.target.value + ']'
      this.model.updateAttribute('.editing .textbox', 'name', name);
    }
    this.model.updateValues(event);
  }
})