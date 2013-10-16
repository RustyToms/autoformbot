AFB.Views.FormEdit = Backbone.View.extend({
  events: {
    "click .formEl" : "parseClickForm",
    "click #save-button" : "serverSaveForm"
  },

  initialize: function(){
    this.parentView = this.options.parentView;
    var that = this;
    console.log('FormEdit View initialized');
    this.listenTo(this.model, 'change', function(){
      that.render();
    });
  },

  render: function(){
    console.log("rendering FormEdit view");
    var formText = (this.model.get('form_text'));

    if(this.$el.find('.form-edit-box').html()){
      console.log("replacing previous text")
      this.$el.find('.form-edit-box').replaceWith(formText);
    } else {
      console.log("adding formText for the first time")
      this.$el.prepend(formText);
    }

    return this;
  },

  localSaveForm: function(){
    var $form = this.$el.find('.form-edit-box');
    var form = $form.prop('outerHTML');
    this.model.set('form_text', form);
  },

  serverSaveForm: function(){
    this.model.removeActiveEdits();

    console.log("in FormEdit#serverSaveForm")
    var name = this.$el.find('.formName').html();
		var text = this.model.get('form_text')
		this.model.save({
			name: name,
      form_text: text
		},{
      success: function(response){
        console.log("save successful");
				console.log(response);
      },
      error: function(model, response){
        console.log("error: " + response.responseText);
        console.log(model)
      }
    });
    this.parentView.render();
  },

  parseClickForm: function(event) {
    console.log("in parseClickForm");
    $target = $(event.target);
    if($target.hasClass('delete-field')){
      $target.closest(".formEl").remove();
      this.localSaveForm();
      this.parentView.render();
    } else {

      $formEl = $target.closest(".formEl");
      $formEl.addClass("start-editing");
      this.localSaveForm();

      this.model.removeActiveEdits();

      var sidebarName = $formEl.data("sidebar");
      console.log("new sidebar should be " + sidebarName);
      sidebar = new AFB.Views[sidebarName]({
        model: this.model,
        field: $formEl
      });
      this.parentView.render(sidebar);
    }
  }
});
