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
    this.setUpModel();

    AFB.formCollection.add(this.model);
    this.formMaster(this.model);
  },

  setUpModel: function(){
    this.model.set({
      account_id: window.ACCOUNT_ID,
      name: "Untitled Form"
    });
		var fields = [$('<form class="form-edit-box" ></form>').get(0)];
		fields.push($(JST["forms/new_form_seed"]()).get(0));
		this.model.set('fields', fields);
  },

  formShow: function(id) {
    this.cleanRootEl();
    this.view && this.view.remove();
    console.log("in FormRouter#formShow for form #" + id);
    console.log(AFB.formCollection.get(id))

		var showModel = AFB.formCollection.get(id);

		if(showModel.get('fields').length === 0){
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
    if(editModel.get('fields').length === 0){
			this.textToFields(editModel, editModel.get('form_text'))
    } //else {
// 			myFields = editModel.get('fields');
// 			editModel.set('fields', JSON.parse(editModel.get('fields')));
// 		}
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
		var fields = [$formField.prop('outerHTML')];

		$(text).find(".formEl").each(function(){
			fields.push(this);
		});
		console.log("after textToFields, fields is")
		console.log(fields);
		model.set('fields', fields);
	}
})