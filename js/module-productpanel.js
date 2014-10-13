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

    init: function() {},

    reset: reset,

    destroy: function() {},

    search: function(query) {},

    change_filter: function(filter) {},

    addToCart: function(e) {}

  };
  
});