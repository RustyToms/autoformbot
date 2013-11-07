AFB.Routers.FormRouter = Backbone.Router.extend({
  initialize: function($rootEl){
    console.log('formrouter initialized');
    this.$rootEl = $rootEl;
    this.$seedEl = $("<section class='body group'></section>");
    this.bind("all", this.saveModel);
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
        el: JST['forms/form_wrapper']()
      });
    this.$rootEl.append(this.view.render().$el);
    window.scrollTo(0,0);
    //this.fitContent('.fi-30x', '#form-itable');
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
    this.view.formRouter = this;
    model.formRouter = this;
    this.$rootEl.append(this.view.render().$el);
    window.scrollTo(0,0);
  },

  saveModel: function(){
    if (this.model){
      console.log("in FormRouter, saving last open model");
      this.model.serverSave();
      delete this.model;
    }
  },

  cleanRootEl: function(){
    _.each(this.childViews, function(view){
      console.log('removing childView');
      view.remove();
    });
    this.childViews = [];
    this.$rootEl.empty();
    this.$rootEl.unbind();
    this.$rootEl.off();
    this.$rootEl.undelegate();

    this.initialize(this.$rootEl);
  }
});

AFB.Routers.FormRouter.fitContent = function(matchSelect, targetSelect){
  $(function(){
    var $match = $(matchSelect);
    var $target = $(targetSelect);

    var width = $target.outerWidth();
    width && $match.css('width', width);
    var height = $target.outerHeight();
    height && $match.css('height', height);
    console.log('width and height are ' + width + " and " + height);
    console.log($match.get(0));
  });
};

AFB.Routers.FormRouter.myFlash = function(msg){
  console.log("myFlash message is " + msg);
  $('.backbone-flash-msgs').prepend(JST['my_flash']({
    msg: msg
  }));
  window.setTimeout(function(){
    $('.my-flash').last().remove();
    $('br').last().remove();
  }, 3000);
};