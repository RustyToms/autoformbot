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
    this.$el.empty();
    this.$el.html(JST["forms/edit_form"]());
    this.$el.find('.main').prepend(this.model.get('form_text'));
    return this;
  },

  localSaveForm: function(){
    var $form = this.$el.find('.form-edit-box');
    var form = $('<div>').append($form.clone()).html();
    this.model.set('form_text', form);
  },

  serverSaveForm: function(){
    this.model.save({},{
      success: function(response){
        console.log("save successful");
      },
      error: function(response){
        console.log("error");
        console.log(response);
        console.log(response.errors.full_messages)
      }
    });
  },

  parseClickForm: function(event) {
    console.log("in parseClickForm");
    AFB.Views.FormMaster.removeActiveEdits(this.model);

    $formEl = $(event.target).closest(".formEl");
    $formEl.addClass("editing");
    this.localSaveForm();

    var sidebarName = $formEl.data("sidebar");
    console.log(sidebarName);
    sidebar = new AFB.Views[sidebarName]({
      model: this.model
    });
    this.parentView.render(sidebar);
  }
})
