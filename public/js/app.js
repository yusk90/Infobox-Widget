webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1),
	    __webpack_require__(2),
	    __webpack_require__(6)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, ProductsCollection, InfoboxView) {
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (Backbone, ProductModel) {
	    var ProductsCollection = Backbone.Collection.extend({
	        model: ProductModel
	    });
	    return ProductsCollection;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (Backbone) {
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(4), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (Backbone, _, $) {
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXBwLmpzIiwid2VicGFjazovLy8uL2NvbGxlY3Rpb25zL1Byb2R1Y3RzQ29sbGVjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9tb2RlbHMvUHJvZHVjdE1vZGVsLmpzIiwid2VicGFjazovLy8uL3ZpZXdzL0luZm9ib3hWaWV3LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImRlZmluZShbJ2pxdWVyeScsXG4gICAgJy4vY29sbGVjdGlvbnMvUHJvZHVjdHNDb2xsZWN0aW9uJyxcbiAgICAnLi92aWV3cy9JbmZvYm94Vmlldydcbl0sIGZ1bmN0aW9uICgkLCBQcm9kdWN0c0NvbGxlY3Rpb24sIEluZm9ib3hWaWV3KSB7XG4gICAgJChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQuYWpheCgnanMvaW5mb19ib3guanNvbicpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICB2YXIgcHJvZHVjdHMgPSBuZXcgUHJvZHVjdHNDb2xsZWN0aW9uKHJlc3BvbnNlKSxcbiAgICAgICAgICAgICAgICBpbmZvYm94V2lkZ2V0ID0gbmV3IEluZm9ib3hWaWV3KHtcbiAgICAgICAgICAgICAgICAgICAgY29sbGVjdGlvbjogcHJvZHVjdHMsXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RJbmRleDogMCxcbiAgICAgICAgICAgICAgICAgICAgdGhlbWVTa2luOiAnY3VzdG9tLXNraW4nLFxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25TcGVlZDogMzAwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKCcuY29udGVudCcpLmFwcGVuZChpbmZvYm94V2lkZ2V0LnJlbmRlcigpLiRlbCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvclRocm93bik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vYXBwLmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnYmFja2JvbmUnLCAnLi4vbW9kZWxzL1Byb2R1Y3RNb2RlbCddLCBmdW5jdGlvbiAoQmFja2JvbmUsIFByb2R1Y3RNb2RlbCkge1xuICAgIHZhciBQcm9kdWN0c0NvbGxlY3Rpb24gPSBCYWNrYm9uZS5Db2xsZWN0aW9uLmV4dGVuZCh7XG4gICAgICAgIG1vZGVsOiBQcm9kdWN0TW9kZWxcbiAgICB9KTtcbiAgICByZXR1cm4gUHJvZHVjdHNDb2xsZWN0aW9uO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vY29sbGVjdGlvbnMvUHJvZHVjdHNDb2xsZWN0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnYmFja2JvbmUnXSwgZnVuY3Rpb24gKEJhY2tib25lKSB7XG4gICAgdmFyIFByb2R1Y3RNb2RlbCA9IEJhY2tib25lLk1vZGVsLmV4dGVuZCh7XG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICB0aXRsZTogJycsXG4gICAgICAgICAgICBpbWc6ICcnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgICAgICAgbm90ZTogJycsXG4gICAgICAgICAgICBwcm9kdWN0VXJsOiAnJ1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIFByb2R1Y3RNb2RlbDtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL21vZGVscy9Qcm9kdWN0TW9kZWwuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydiYWNrYm9uZScsICd1bmRlcnNjb3JlJywgJ2pxdWVyeSddLCBmdW5jdGlvbiAoQmFja2JvbmUsIF8sICQpIHtcbiAgICB2YXIgSW5mb0JveFZpZXcgPSBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG4gICAgICAgIHRhZ05hbWU6ICdkaXYnLFxuICAgICAgICBjbGFzc05hbWU6ICdpbmZvLWJveCcsXG4gICAgICAgIHRlbXBsYXRlOiBfLnRlbXBsYXRlKCQoJyNpbmZvLWJveC10ZW1wbGF0ZScpLmh0bWwoKSksXG4gICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgJ2NsaWNrIC5jb250cm9sc19fcHJldic6ICdnZXRQcmV2UHJvZHVjdCcsXG4gICAgICAgICAgICAnY2xpY2sgLmNvbnRyb2xzX19uZXh0JzogJ2dldE5leHRQcm9kdWN0JyxcbiAgICAgICAgICAgICdjbGljayAuY29udHJvbHNfX2ZpbmQnOiAnc2hvd1Byb2R1Y3QnLFxuICAgICAgICAgICAgJ2NsaWNrIC5pbmZvLWJveF9fZGV0YWlscyc6ICd0b2dnbGVQcm9kdWN0RGV0YWlscydcbiAgICAgICAgfSxcbiAgICAgICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICAgICAgaWYgKCFwYXJhbXMucHJvZHVjdEluZGV4IHx8XG4gICAgICAgICAgICAgICAgcGFyYW1zLnByb2R1Y3RJbmRleCA+PSBwYXJhbXMuY29sbGVjdGlvbi5sZW5ndGggfHxcbiAgICAgICAgICAgICAgICBwYXJhbXMucHJvZHVjdEluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdEluZGV4ID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0SW5kZXggPSBwYXJhbXMucHJvZHVjdEluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhcmFtcy50aGVtZVNraW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbC5hZGRDbGFzcyhwYXJhbXMudGhlbWVTa2luKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uU3BlZWQgPSBwYXJhbXMuYW5pbWF0aW9uU3BlZWQgfHwgNTAwO1xuICAgICAgICB9LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBtb2RlbCA9IHRoaXMuY29sbGVjdGlvbi5hdCh0aGlzLnByb2R1Y3RJbmRleCksXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uU3BlZWQgPSB0aGlzLmFuaW1hdGlvblNwZWVkO1xuICAgICAgICAgICAgdGhpcy4kZWwuaHRtbCh0aGlzLnRlbXBsYXRlKG1vZGVsLnRvSlNPTigpKSk7XG4gICAgICAgICAgICB0aGlzLiQoJy5pbmZvLWJveF9faW1hZ2Utd3JhcHBlciwgLmluZm8tYm94X19kZXNjcmlwdGlvbicpXG4gICAgICAgICAgICAgICAgLmNzcygnb3BhY2l0eScsIDApXG4gICAgICAgICAgICAgICAgLnByb21pc2UoKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlKHsgJ29wYWNpdHknOiAxIH0sIGFuaW1hdGlvblNwZWVkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJGVsLmRhdGEoJ3Byb2R1Y3QtaWQnLCBtb2RlbC5jaWQpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFByZXZQcm9kdWN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9kdWN0SW5kZXggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0SW5kZXggLT0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0SW5kZXggPSB0aGlzLmNvbGxlY3Rpb24ubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldE5leHRQcm9kdWN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9kdWN0SW5kZXggPCB0aGlzLmNvbGxlY3Rpb24ubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdEluZGV4ICs9IDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdEluZGV4ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH0sXG4gICAgICAgIHRvZ2dsZVByb2R1Y3REZXRhaWxzOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyICRpbWFnZVdyYXBwZXIgPSB0aGlzLiQoJy5pbmZvLWJveF9faW1hZ2Utd3JhcHBlcicpLFxuICAgICAgICAgICAgICAgICRpbmZvV3JhcHBlciA9IHRoaXMuJCgnLmluZm8tYm94X19pbmZvLXdyYXBwZXInKSxcbiAgICAgICAgICAgICAgICAkaW5mbyA9IHRoaXMuJCgnLmluZm8tYm94X19pbmZvJyksXG4gICAgICAgICAgICAgICAgcHJvZHVjdCA9IHRoaXMuY29sbGVjdGlvbi5nZXQodGhpcy4kZWwuZGF0YSgncHJvZHVjdC1pZCcpKSxcbiAgICAgICAgICAgICAgICAkZGV0YWlsc0J1dHRvbiA9ICQoZS50YXJnZXQpO1xuXG4gICAgICAgICAgICAkaW1hZ2VXcmFwcGVyLnRvZ2dsZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIHRoaXMuJCgnLmluZm8tYm94X190aXRsZScpLnRvZ2dsZUNsYXNzKCdpbmZvLWJveF9fdGl0bGUtLWZ1bGwnKTtcblxuICAgICAgICAgICAgaWYgKCRpbWFnZVdyYXBwZXIuaGFzQ2xhc3MoJ2hpZGRlbicpKSB7XG4gICAgICAgICAgICAgICAgJGluZm8uaHRtbChwcm9kdWN0LmdldCgnZGVzY3JpcHRpb24nKSk7XG4gICAgICAgICAgICAgICAgJGltYWdlV3JhcHBlci5zbGlkZVVwKCkucHJvbWlzZSgpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbmZvV3JhcHBlci5jc3MoJ292ZXJmbG93JywgJ2F1dG8nKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGluZm9XcmFwcGVyLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMjEwXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGRldGFpbHNCdXR0b24udGV4dCgnaGlkZSBkZXRhaWxzJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkaW1hZ2VXcmFwcGVyLnNsaWRlRG93bigpO1xuICAgICAgICAgICAgICAgICRpbmZvLmh0bWwocHJvZHVjdC5nZXQoJ2Rlc2NyaXB0aW9uJykuc2xpY2UoMCwgODApLnRyaW0oKSArICcuLi4nKTtcbiAgICAgICAgICAgICAgICAkaW5mb1dyYXBwZXIuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMjdcbiAgICAgICAgICAgICAgICB9KS5wcm9taXNlKClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGluZm9XcmFwcGVyLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZGV0YWlsc0J1dHRvbi50ZXh0KCdzaG93IGRldGFpbHMnKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gSW5mb0JveFZpZXc7XG59KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi92aWV3cy9JbmZvYm94Vmlldy5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9