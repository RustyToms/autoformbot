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
    this.model = new AFB.Models.Form();
    this.setUpModel()
    AFB.formCollection.add(this.model);
    this.formMaster(this.model);
  },

  setUpModel: function(){
    var html = JST["forms/new_form_seed"]();
    this.model.set({
      account_id: window.ACCOUNT_ID,
      form_text: html,
      name: "Untitled Form",
			// fields: new AFB.Collections.Fields()
    });
		this.model.createForm();
		this.model.addTitle();
  },

  formShow: function(id) {
    this.cleanRootEl();
    this.view && this.view.remove();
    console.log("in FormRouter#formShow for form #" + id);
    console.log(AFB.formCollection.get(id))
    this.view = new AFB.Views.FormShow({
      model: AFB.formCollection.get(id),
      el: this.$seedEl
    })
    this.$rootEl.append(this.view.render().$el);
  },

  formEdit: function(id) {
    console.log('in FormRouter#formEdit for form #' + id);
    this.formMaster(AFB.formCollection.get(id));
  },

  formMaster: function(model){
    this.cleanRootEl();
    this.view && this.view.remove();
    this.view = new AFB.Views.FormMaster({
      model: model,
      el: this.$seedEl
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
	
	textToFieldModels: function(model, text){
		console.log("in textToFieldModels");
		var $form = $(text).find('form');
		var $formField = $form.empty()
		var fields = [elToFieldModel($formField)];
		$form = $(text).find('form');
		$form.children().each(function($field){
			fields.push(elToFieldModel($field));
		});
		
		model.set('fields', fields);
	},
	
	elToFieldModel: function($field){
		var kids = [];
		$field.children().each(function(kid){
			kids.push(elToFieldModel(kid));
		});
		var field = new AFB.Models.Field({
			kids: kids,
			innerHtml: $field.html(),
			tag: $field.prop("tagName"),
			fieldAttr: []
		})
	}
})