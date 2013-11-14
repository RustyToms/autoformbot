AFB.Views.FormSettings = Backbone.View.extend({
  initialize: function(){
    console.log('Initializing FormSettings view');
  },

  render: function(){
    console.log('rendering FormSettings');
    this.$el = $(JST['forms/sidebars/form_settings']({
      $form: $(this.model.get('form_text')).find('form#form-itable'),
      url: this.model.get('url')
    }));
    return this;
  },

  updateValues: function(event){
    console.log('in FormSettings#updateValues');
    if ($(event.target).attr('name') === 'redirect-url'){
      console.log("setting new redirect url to " + $(event.target).val());
      this.model.set({'url': $(event.target).val()}, {silent: true});
    } else {
      this.model.updateValues(event);
      this.parentView.editForm.render();
      this.parentView.makeSortable();
    }
  }

});