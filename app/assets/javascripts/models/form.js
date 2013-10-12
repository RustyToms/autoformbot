AFB.Models.Form = Backbone.Model.extend ({
	fields: [],
	addTitle: function(){
		var title = new AFB.Models.Field({
			outerHtml: "<div></div>",
			innerHtml: "",
			fieldAttr: [
			function(){this.addClass("formEl editing")},
			function(){this.attr('id', 'title-description')},
			function(){this.data('sidebar', 'FormEditTitle')}
				],
			kids: [{
				outerHtml: "<h2></h2>",
				innerHtml: "Untitled Form",
				fieldAttr: [
					function(){ this.attr('id', "formName")}
					],
				kids: []
			},
			{
				outerHtml: "<p></p>",
				innerHtml: "Click here to change or delete the form description",
				fieldAttr: [
					function(){ this.attr('id', "formDescription")}
					],
				properties: [],
				kids: []
			}]
		})
		this.set('fields', [title]);
	}

});