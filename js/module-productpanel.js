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

    search: function(query) {

      reset();
      query = query.toLowerCase();

      eachProduct(function(product) {
        if (product.getAttribute('p')[0].innerHTML.toLowerCase().indexOf(query.toLowerCase()) < 0) {
          product.style.opacity = '0.2';
        }
      })

    },

    change_filter: function(filter) {

      reset();

      eachProduct(function(product) {
        if (product.getAttribute('data-8088-keyword').toLowerCase().indexOf(filter.toLowerCase()) < 0) {
          product.style.opacity = '0.2';
        }
      });

    },

    addToCart: function(e) {

      var li = e.currentTarget;
      sb.notify({
        type: 'add-item',
        data: { 
          id: li.id,
          name: li.getElementsById('p')[0].innerHTML,
          price: parseInt(li.id, 10)
        }
      })

    }

  };

});