exports.seed = function(knex, Promise) {
  return knex('bundles').del()
    .then(function () {
      return knex('bundles').insert([
        {id: 1, name: 'Birthday Surprise', stock_qty: 2, steps: '{"1": "sdas", "2": "asda", "3": "dfsfsd"}', shop_id: 1, category_id: 6, image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmLBw1WSc4ygkTF7ou8JPnn3-gBnF52XHQ5ivxop-WekNcBiIAPw'},
        {id: 2, name: 'Mothers Day', stock_qty: 3, steps: '{"1": "sdas", "2": "asda", "3": "dfsfsd"}', shop_id: 1, category_id: 3, image:'http://www.primrose-bakery.co.uk/shop/content/images/thumbs/0000219_regular-cupcakes_370.jpeg'},
        {id: 3, name: 'Spring Refresh', stock_qty: 7, steps: '{"1": "sdas", "2": "asda", "3": "dfsfsd"}', shop_id: 1, category_id: 2, image:'https://3.bp.blogspot.com/-94otqdDHrq0/V8wuAUHXTEI/AAAAAAACZCw/9nPbWE74JuIkQoTeOxSDAwcAOyLkv8aOACLcB/s1600/Sprinkle%2BBakes%2Bfor%2BFood%2BNetwork%2BNaked%2BCakes%2BGallery%2BOpener.jpg'}
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('bundles_id_seq', (SELECT MAX(id) FROM bundles));"
      );
    });
};
