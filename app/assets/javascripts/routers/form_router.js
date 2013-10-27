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
    })

    this.$rootEl.append(this.view.render().$el);

  },

  formNew: function(){
    console.log("In FormRouter#formNew");
    this.cleanRootEl();
    this.$rootEl.html(JST["forms/new_iframe"]());
    this.model = new AFB.Models.Form();
    this.setUpModel();

    this.formMaster(this.model);
  },

  setUpModel: function(){
    console.log("setting up form model");
		var that = this;

    this.model.set({
      account_id: window.ACCOUNT_ID,
      name: "Untitled Form",
			form_text: JST["forms/new_form_seed"]()
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
    this.cleanRootEl();
    this.view && this.view.remove();
    console.log("in FormRouter#formShow for form #" + id);

		var showModel = AFB.formCollection.get(id);

    this.view = new AFB.Views.FormShow({
      model: showModel,
      el: this.$seedEl
    })
    this.$rootEl.append(this.view.render().$el);
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
      $rootEl: this.$rootEl
    });
    this.$rootEl.append(this.view.render().$el);
  },

  cleanRootEl: function(){
    this.$rootEl.empty();
    this.$rootEl.unbind();
    this.$rootEl.off();
    this.$rootEl.undelegate();

    this.initialize(this.$rootEl);
  }
})