AFB.Models.Form = Backbone.Model.extend ({
	fields: [],
	addTitle: function(){
		var title = new AFB.Models.Field({
			outerHtml: "<h2></h2>",
			innerHtml: "Untitled Form",
			fieldAttr: [
				function(){ this.attr('id', "formName")}
				],
			kids: []
		});
		
		var description = new AFB.Models.Field({
			outerHtml: "<p></p>",
			innerHtml: "Click here to change or delete the form description",
			fieldAttr: [
				function(){ this.attr('id', "formDescription")}
				],
			kids: []
		});
		
		var titleField = new AFB.Models.Field({
			outerHtml: "<div></div>",
			innerHtml: "",
			fieldAttr: [
			function(){this.addClass("formEl editing")},
			function(){this.attr('id', 'title-description')},
			function(){this.data('sidebar', 'FormEditTitle')}
				],
			kids: [title, description]
		});
		
		this.set('fields', [titleField]);
	}

});