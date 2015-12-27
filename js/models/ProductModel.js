define(['backbone'], function (Backbone) {
    var ProductModel = Backbone.Model.extend({
        defaults: {
            title: '',
            img: '',
            description: '',
            note: '',
            productUrl: ''
        }
    });
    return ProductModel;
});
