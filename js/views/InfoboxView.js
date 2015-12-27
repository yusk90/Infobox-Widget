define(['backbone', 'underscore', 'jquery'], function (Backbone, _, $) {
    var InfoBoxView = Backbone.View.extend({
        tagName: 'div',
        className: 'info-box',
        template: _.template($('#info-box-template').html()),
        events: {
            'click .controls__prev': 'getPrevProduct',
            'click .controls__next': 'getNextProduct',
            'click .controls__find': 'showProduct',
            'click .info-box__details': 'toggleProductDetails'
        },
        initialize: function (params) {
            if (!params.productIndex ||
                params.productIndex >= params.collection.length ||
                params.productIndex < 0) {
                this.productIndex = 0;
            } else {
                this.productIndex = params.productIndex;
            }
            if (params.themeSkin) {
                this.$el.addClass(params.themeSkin);
            }
            this.animationSpeed = params.animationSpeed || 500;
        },
        render: function () {
            var model = this.collection.at(this.productIndex),
                animationSpeed = this.animationSpeed;
            this.$el.html(this.template(model.toJSON()));
            this.$('.info-box__image-wrapper, .info-box__description')
                .css('opacity', 0)
                .promise()
                .then(function () {
                    this.animate({ 'opacity': 1 }, animationSpeed);
                });
            this.$el.data('product-id', model.cid);
            return this;
        },
        getPrevProduct: function () {
            if (this.productIndex > 0) {
                this.productIndex -= 1;
            } else {
                this.productIndex = this.collection.length - 1;
            }
            this.render();
        },
        getNextProduct: function () {
            if (this.productIndex < this.collection.length - 1) {
                this.productIndex += 1;
            } else {
                this.productIndex = 0;
            }
            this.render();
        },
        toggleProductDetails: function (e) {
            var $imageWrapper = this.$('.info-box__image-wrapper'),
                $infoWrapper = this.$('.info-box__info-wrapper'),
                $info = this.$('.info-box__info'),
                product = this.collection.get(this.$el.data('product-id')),
                $detailsButton = $(e.target);

            $imageWrapper.toggleClass('hidden');
            this.$('.info-box__title').toggleClass('info-box__title--full');

            if ($imageWrapper.hasClass('hidden')) {
                $info.html(product.get('description'));
                $imageWrapper.slideUp().promise()
                    .then(function () {
                        $infoWrapper.css('overflow', 'auto');
                    })
                    .then(function () {
                        $infoWrapper.animate({
                            height: 210
                        });
                    })
                    .then(function () {
                        $detailsButton.text('hide details');
                    });
            } else {
                $imageWrapper.slideDown();
                $info.html(product.get('description').slice(0, 80).trim() + '...');
                $infoWrapper.animate({
                    height: 27
                }).promise()
                    .then(function () {
                        $infoWrapper.css('overflow', 'hidden');
                        $detailsButton.text('show details');
                    });
            }
        }
    });
    return InfoBoxView;
});
