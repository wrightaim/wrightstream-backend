exports.seed = function(knex, Promise) {
  return knex('purchases').del()
    .then(function () {
      return knex('purchases').insert([
        {id: 1, shop_id: 1, staff_id: null, purchase_date: '1/12/18'},
        {id: 2, shop_id: 1, staff_id: null, purchase_date: '1/8/18'},
        {id: 3, shop_id: 1, staff_id: null, purchase_date: '1/12/18'},
        {id: 4, shop_id: 1, staff_id: null, purchase_date: '2/21/18'},
        {id: 5, shop_id: 1, staff_id: null, purchase_date: '1/12/18'},
        {id: 6, shop_id: 1, staff_id: null, purchase_date: '4/20/18'},
        {id: 7, shop_id: 1, staff_id: null, purchase_date: '5/6/18'},
        {id: 8, shop_id: 1, staff_id: null, purchase_date: '1/18/18'},
        {id: 9, shop_id: 1, staff_id: null, purchase_date: '1/12/18'},
        {id: 10, shop_id: 1, staff_id: null, purchase_date: '3/17/18'},
        {id: 11, shop_id: 1, staff_id: null, purchase_date: '2/23/18'},
        {id: 12, shop_id: 1, staff_id: null, purchase_date: '4/15/18'},
        {id: 13, shop_id: 1, staff_id: null, purchase_date: '5/6/18'},
        {id: 14, shop_id: 1, staff_id: null, purchase_date: '2/3/18'},
        {id: 15, shop_id: 1, staff_id: null, purchase_date: '5/6/18'},
        {id: 16, shop_id: 1, staff_id: null, purchase_date: '2/9/18'},
        {id: 17, shop_id: 1, staff_id: null, purchase_date: '5/2/18'},
        {id: 18, shop_id: 1, staff_id: null, purchase_date: '4/8/18'},
        {id: 19, shop_id: 1, staff_id: null, purchase_date: '5/18/18'},
        {id: 20, shop_id: 1, staff_id: null, purchase_date: '5/26/18'}
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('purchases_id_seq', (SELECT MAX(id) FROM purchases));"
      );
    });
};
