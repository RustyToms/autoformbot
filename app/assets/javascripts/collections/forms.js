AFB.Collections.Forms = Backbone.Collection.extend({

  model: AFB.Models.Form,

  url: '/forms',

  comparator: function(a, b) {
    a = new Date(a.get('updated_at'));
    b = new Date(b.get('updated_at'));
    return (a>b ? -1 : a<b ? 1 : 0);
  }
});
