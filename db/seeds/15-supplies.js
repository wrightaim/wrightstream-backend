exports.seed = function(knex, Promise) {
  return knex('supplies').del()
    .then(function () {
      return knex('supplies').insert([
        {id: 1, name: 'Milk', stock_qty: 60, measure_unit: 'cup', measure_type: 'volume', shop_id: 1, source_id: 1, kind_id: 1},
        {id: 2, name: 'Flour', stock_qty: 60, measure_unit: 'cup', measure_type: 'volume', shop_id: 1, source_id: 3, kind_id: 4},
        {id: 3, name: 'Vanilla Extract', stock_qty: 6, measure_unit: 'tsp', measure_type: 'volume', shop_id: 1, source_id: 3, kind_id: 4},
        {id: 4, name: 'Frosting', stock_qty: 20, measure_unit: 'tsp', measure_type: 'volume', shop_id: 1, source_id: 2, kind_id: 2},
        {id: 5, name: 'Candle Stick', stock_qty: 40, measure_unit: 'unit', measure_type: 'unit', shop_id: 1, source_id: 3, kind_id: 3},
        {id: 6, name: 'Cutting Knife', stock_qty: 14, measure_unit: 'unit', measure_type: 'unit', shop_id: 1, source_id: 3, kind_id: 3},
        {id: 7, name: 'Cupcake Wrapper', stock_qty: 6, measure_unit: 'unit', measure_type: 'unit', shop_id: 1, source_id: 3, kind_id: 3},
        {id: 8, name: 'Eggs', stock_qty: 30, measure_unit: 'unit', measure_type: 'unit', shop_id: 1, source_id: 1, kind_id: 1},
        {id: 9, name: 'White Sugar', stock_qty: 45, measure_unit: 'cup', measure_type: 'volume', shop_id: 1, source_id: 3, kind_id: 4},
        {id: 10, name: 'Butter', stock_qty: 20, measure_unit: 'Tbs', measure_type: 'volume', shop_id: 1, source_id: 1, kind_id: 1},
        {id: 11, name: 'Salt', stock_qty: 10, measure_unit: 'tsp', measure_type: 'volume', shop_id: 1, source_id: 3, kind_id: 4},
        {id: 12, name: 'Cocoa Powder', stock_qty: 30, measure_unit: 'cup', measure_type: 'volume', shop_id: 1, source_id: 3, kind_id: 4},
        {id: 13, name: 'Baking Powder', stock_qty: 40, measure_unit: 'tsp', measure_type: 'volume', shop_id: 1, source_id: 3, kind_id: 4},
        {id: 14, name: 'Baking Soda', stock_qty: 40, measure_unit: 'tsp', measure_type: 'volume', shop_id: 1, source_id: 3, kind_id: 4},
        {id: 15, name: 'Cake Mix', stock_qty: 60, measure_unit: 'oz', measure_type: 'mass', shop_id: 1, source_id: 3, kind_id: 4},
        {id: 16, name: 'Strawberry Jello', stock_qty: 60, measure_unit: 'oz', measure_type: 'mass', shop_id: 1, source_id: 3, kind_id: 4},
        {id: 17, name: 'Strawberries', stock_qty: 60, measure_unit: 'cup', measure_type: 'volume', shop_id: 1, source_id: 3, kind_id: 4},
        {id: 18, name: 'Canola Oil', stock_qty: 60, measure_unit: 'cup', measure_type: 'volume', shop_id: 1, source_id: 3, kind_id: 4},
        {id: 19, name: 'Cinnamon', stock_qty: 60, measure_unit: 'Tbs', measure_type: 'volume', shop_id: 1, source_id: 3, kind_id: 4},
        {id: 20, name: 'Candle Stick', stock_qty: 60, measure_unit: 'unit', measure_type: 'unit', shop_id: 1, source_id: 3, kind_id: 3},
        {id: 21, name: 'Cutting Knife', stock_qty: 60, measure_unit: 'unit', measure_type: 'unit', shop_id: 1, source_id: 3, kind_id: 3},
        {id: 22, name: 'Chocolate Chips', stock_qty: 60, measure_unit: 'cup', measure_type: 'volume', shop_id: 1, source_id: 2, kind_id: 3},
        {id: 23, name: 'Glaze', stock_qty: 30, measure_unit: 'cup', measure_type: 'volume', shop_id: 1, source_id: 2, kind_id: 2},
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('supplies_id_seq', (SELECT MAX(id) FROM supplies));"
      );
    });
};
