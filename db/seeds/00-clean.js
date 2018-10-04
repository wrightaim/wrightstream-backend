exports.seed = function(knex, Promise) {
  const tablesToClean = ['items_supplies', 'supplies', 'bundles_items', 'bundles', 'items', 'sources', 'types', 'kinds', 'categories', 'platforms', 'staff', 'shops', 'roles']
  return tablesToClean.reduce((acc, ele) => acc.then(() => knex(ele).del()), Promise.resolve())
};
