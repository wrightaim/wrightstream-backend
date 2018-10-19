exports.seed = function(knex, Promise) {
  const tablesToClean = ['priority', 'purchases_bundles', 'purchases_items', 'purchases_statuses', 'statuses', 'comments', 'purchases_supplies', 'purchases', 'orders_supplies', 'orders', 'supply_statuses', 'order_statuses', 'lists_items', 'lists_bundles', 'lists', 'items_supplies', 'supplies', 'bundles_items', 'bundles', 'items', 'sources', 'types', 'kinds', 'categories', 'platforms', 'staff', 'shops', 'roles']
  return tablesToClean.reduce((acc, ele) => acc.then(() => knex(ele).del()), Promise.resolve())
};
