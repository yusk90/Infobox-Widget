define(['backbone', '../models/ProductModel'], function (Backbone, ProductModel) {
    var ProductsCollection = Backbone.Collection.extend({
        model: ProductModel
    });
    return ProductsCollection;
});
