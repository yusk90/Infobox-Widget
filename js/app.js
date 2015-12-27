define(['jquery',
    './collections/ProductsCollection',
    './views/InfoboxView'
], function ($, ProductsCollection, InfoboxView) {
    $(function () {
        $.ajax('js/info_box.json').then(function (response) {
            var products = new ProductsCollection(response),
                infoboxWidget = new InfoboxView({
                    collection: products,
                    productIndex: 0,
                    themeSkin: 'custom-skin',
                    animationSpeed: 300
                });
            $('.content').append(infoboxWidget.render().$el);
        }, function (jqXHR, textStatus, errorThrown) {
            throw new Error(errorThrown);
        });
    });
});
