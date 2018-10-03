exports.seed = function(knex, Promise) {
  const tablesToClean = ['platforms', 'staff', 'shops', 'roles']
  return tablesToClean.reduce((acc, ele) => acc.then(() => knex(ele).del()), Promise.resolve())
};
