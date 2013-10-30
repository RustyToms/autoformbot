AFB.Routers.FormRouter = Backbone.Router.extend({
  initialize: function($rootEl){
    console.log('formrouter initialized');
    this.$rootEl = $rootEl;
    this.$seedEl = $("<section class='body group'></section>");
  },

  routes: {
    '' : "index",
    'index' : "index",
    'forms/new' : "formNew",
    "forms/:id" : "formShow",
    "forms/:id/edit" : "formEdit"
  },

  index: function(){
    console.log("in FormRouter#index");
    this.cleanRootEl();
    this.view && this.view.remove();
    
    this.view = new AFB.Views.FormIndex({
      collection: AFB.formCollection,
      el: this.$seedEl
    });
    console.log(this.$rootEl.prop('outerHTML'));
    this.$rootEl.append(this.view.render().$el);

  },

  formNew: function(){
    console.log("In FormRouter#formNew");
    this.cleanRootEl();
    this.$rootEl.html(this.$seedEl.clone());
    this.model = new AFB.Models.Form();
    this.setUpModel();

    this.formMaster(this.model);
  },

  setUpModel: function(){
    console.log("setting up form model");
		var that = this;
    var $form = $(JST["forms/new_form_seed"]());
    $form.prepend("<link href='/assets/form-edit.css' rel='stylesheet'" +
      " type='text/css'>");
    this.model.set({
      account_id: window.ACCOUNT_ID,
      name: "Untitled Form",
			form_text: $form.prop('outerHTML')
    });
		
    AFB.formCollection.add(this.model);
		
		this.model.save({},{
			success: function(response, model) {
				that.model.updateAttribute('#form-id', 'value', that.model.get('id'));
        console.log("form_id is " + that.model.get('id'));
      }
		});
  },

  formShow: function(id) {
    console.log("in FormRouter#formShow for form #" + id);
		var showModel = AFB.formCollection.get(id);
    var View = AFB.Views.FormShow;
    this.cleanRootEl();
    this.view && this.view.remove();
    console.log(this.$rootEl.prop('outerHTML'));
    this.view = new View({
        model: showModel,
        el: $("<div class='body show-form'></div>")
      });
    this.$rootEl.append(this.view.render().$el);
    this.fitContent('.show-form', '.form-edit-box');
  },

  formEdit: function(id) {
    console.log('in FormRouter#formEdit for form #' + id);
		var editModel = AFB.formCollection.get(id);
    this.cleanRootEl();
    this.formMaster(editModel);
  },

  formMaster: function(model){
    this.view && this.view.remove();
    this.view = new AFB.Views.FormMaster({
      model: model,
      el: this.$seedEl,
    });

    this.$rootEl.append(this.view.render().$el);
  },

  cleanRootEl: function(){
    this.$rootEl.empty();
    this.$rootEl.unbind();
    this.$rootEl.off();
    this.$rootEl.undelegate();

    this.initialize(this.$rootEl);
  },

  fitContent: function(outsideSelect, insideSelect){
    $(function(){
      var $container = $(outsideSelect);
      var $form = $(insideSelect);
      
      var width = $form.width();
      width && $container.css('width', width);
      var height = $form.height();
      height && $container.css('height', height);
      console.log('width and height are ' + width + " and " + height);
    });
  }
});

AFB.Routers.FormRouter.myFlash = function(msg){
  $('.flash-msgs').prepend(JST['my_flash']({
    msg: msg
  }));
  window.setTimeout(function(){
    $('.my-flash').last().remove();
  }, 5000);
};