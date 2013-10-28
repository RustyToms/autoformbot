AFB.Views.FormShow = Backbone.View.extend({
  render: function(){
    this.model.removeActiveEdits();
    var $form = $(this.model.get('form_text'));
    $form.append("<input type='submit' value='Submit' form='form-itable'" +
      " id='form-itable-submit'>");
    this.$el.html($form.prop('outerHTML'));
		this.$el.append(JST['forms/show_form']());
    this.setFrameDimensions();
    
    return this;
  },
  
  setFrameDimensions: function(){
    var iframe = $('iframe').get(0).contentWindow.document;
    var $form = $(iframe).find('.form-edit-box');
    
    var width = $form.width(); //css('width');
    width && $('.form-iframe').css('width', width);
    var height = $form.height(); //.css('height');
    height && $('.form-iframe').css('height', height);
    console.log('width and height are ' + width + " and " + height);
  }
});