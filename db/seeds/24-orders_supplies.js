exports.seed = function(knex, Promise) {
  return knex('orders_supplies').del()
    .then(function () {
      return knex('orders_supplies').insert([
        {order_id: 1, supply_id: 1, supply_qty: 188.01, measure_unit:'cup', supply_status_id: 1},
        {order_id: 1, supply_id: 2, supply_qty: 323, measure_unit:'cup', supply_status_id: 1},
        {order_id: 1, supply_id: 3, supply_qty: 119.32, measure_unit:'tsp', supply_status_id: 1},
        {order_id: 1, supply_id: 4, supply_qty: 7.5, measure_unit:'cup', supply_status_id: 1},
        {order_id: 1, supply_id: 7, supply_qty: 15, measure_unit:'unit', supply_status_id: 1},
        {order_id: 1, supply_id: 8, supply_qty: 848, measure_unit:'unit', supply_status_id: 1},
        {order_id: 1, supply_id: 9, supply_qty: 140.5, measure_unit:'cup', supply_status_id: 1},
        {order_id: 1, supply_id: 10, supply_qty: 707.54, measure_unit:'Tbs', supply_status_id: 1},
        {order_id: 1, supply_id: 11, supply_qty: 112.5, measure_unit:'tsp', supply_status_id: 1},
        {order_id: 1, supply_id: 12, supply_qty: 3, measure_unit:'cup', supply_status_id: 1},
        {order_id: 1, supply_id: 13, supply_qty: 112.5, measure_unit:'tsp', supply_status_id: 1},
        {order_id: 1, supply_id: 14, supply_qty: 10.25, measure_unit:'tsp', supply_status_id: 1},
        {order_id: 1, supply_id: 15, supply_qty: 1890, measure_unit:'oz', supply_status_id: 1},
        {order_id: 1, supply_id: 16, supply_qty: 315, measure_unit:'oz', supply_status_id: 1},
        {order_id: 1, supply_id: 17, supply_qty: 103, measure_unit:'cup', supply_status_id: 1},
        {order_id: 1, supply_id: 18, supply_qty: 103, measure_unit:'cup', supply_status_id: 1},
        {order_id: 1, supply_id: 19, supply_qty: 6, measure_unit:'Tbs', supply_status_id: 1},

        {order_id: 2, supply_id: 1, supply_qty: 12.5625, measure_unit:'cup', supply_status_id: 1},
        {order_id: 2, supply_id: 2, supply_qty: 31.5, measure_unit:'cup', supply_status_id: 1},
        {order_id: 2, supply_id: 3, supply_qty: 10.5, measure_unit:'Tbs', supply_status_id: 1},
        {order_id: 2, supply_id: 8, supply_qty: 41, measure_unit:'unit', supply_status_id: 1},
        {order_id: 2, supply_id: 9, supply_qty: 13.25, measure_unit:'cup', supply_status_id: 1},
        {order_id: 2, supply_id: 10, supply_qty: 79.2, measure_unit:'tbs', supply_status_id: 1},
        {order_id: 2, supply_id: 11, supply_qty: 5.25, measure_unit:'tsp', supply_status_id: 1},
        {order_id: 2, supply_id: 13, supply_qty: 10.75, measure_unit:'tsp', supply_status_id: 1},
        {order_id: 2, supply_id: 19, supply_qty: 1, measure_unit:'Tbs', supply_status_id: 1},
      ]);
    });
};
