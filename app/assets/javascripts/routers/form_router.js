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
		
		var showModel = AFB.formCollection.get(id);
		showModel.get('fields') || showModel.set('fields', []);
		if((showModel.get('fields').length === 0) && showModel.get('form_text')){
			this.textToFields(showModel, showModel.get('form_text'))
		}
    this.view = new AFB.Views.FormShow({
      model: showModel,
      el: this.$seedEl
    })
    this.$rootEl.append(this.view.render().$el);
  },

  formEdit: function(id) {
    console.log('in FormRouter#formEdit for form #' + id);
		var editModel = AFB.formCollection.get(id);
		if((editModel.get('fields').length === 0) && editModel.get('form_text')){
			this.textToFields(editModel, editModel.get('form_text'))
		}
    this.formMaster(editModel);
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
	
	textToFields: function(model, text){
		console.log("in textToFieldModels");
		var $form = $(text).find('form');
		$form.empty();
		var $formField = $form
		var fields = [$formField.get(0)];

		$(text).find(".formEl").each(function(){
			// console.log(this);
			// console.log($(this).prop("outerHTML"));
			// fields.push($(this).get(0));
			fields.push(this);
		});
		
		model.set('fields', fields);
	}// ,
// 	
// 	elToFieldModel: function($field){
// 		var kids = [];
// 		$field.children().each(function(kid){
// 			kids.push(elToFieldModel(kid));
// 		});
// 		var field = new AFB.Models.Field({
// 			kids: kids,
// 			innerHtml: $field.html(),
// 			tag: $field.prop("tagName"),
// 			fieldAttr: this.translateAttrAndProps()
// 		})
// 	}
})