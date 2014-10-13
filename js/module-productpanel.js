CORE.create_module('product-panel', function(sb) {

  var products;

  var eachProduct = function(fn) {
    var i = 0,
        product;

    for (i; product = product[i++]; ) {
      fn(product);
    }
  }

  var reset = function() {
    eachProduct(function(product) {
      product.style.opacity = '1';
    });
  }

  return {

    init: function() {

      var that = this;
      products = sb.find('li');

      sb.listen({
        'change-filter': this.change_filter,
        'reset-filters': this.reset,
        'perform-search': this.search,
        'quit-search': this.reset
      });

      eachProduct(function(product) {
        sb.addEvent(product, 'click', that.addToCart);
      });

    },

    reset: reset,

    destroy: function() {

      var that = this;

      sb.ignore(['change-filter', 'reset-filters', 'perform-search', 'quit-search']);

      eachProduct(function(product) {
        sb.removeEvent(product, 'click', that.addToCart);
      });

    },

    search: function(query) {},

    change_filter: function(filter) {},

    addToCart: function(e) {}

  };

});