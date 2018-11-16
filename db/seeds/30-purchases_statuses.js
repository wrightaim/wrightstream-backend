exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('purchases_statuses').del()
    .then(function () {
      // Inserts seed entries
      return knex('purchases_statuses').insert([
        {purchase_id: 1, status_id: 1, completed: false},
        {purchase_id: 1, status_id: 2, completed: false},
        {purchase_id: 1, status_id: 3, completed: false},
        {purchase_id: 1, status_id: 4, completed: false},
        {purchase_id: 1, status_id: 5, completed: false},

        {purchase_id: 2, status_id: 1, completed: false},
        {purchase_id: 2, status_id: 2, completed: false},
        {purchase_id: 2, status_id: 3, completed: false},
        {purchase_id: 2, status_id: 4, completed: false},
        {purchase_id: 2, status_id: 5, completed: false},

        {purchase_id: 3, status_id: 1, completed: false},
        {purchase_id: 3, status_id: 2, completed: false},
        {purchase_id: 3, status_id: 3, completed: false},
        {purchase_id: 3, status_id: 4, completed: false},
        {purchase_id: 3, status_id: 5, completed: false},

        {purchase_id: 4, status_id: 1, completed: false},
        {purchase_id: 4, status_id: 2, completed: false},
        {purchase_id: 4, status_id: 3, completed: false},
        {purchase_id: 4, status_id: 4, completed: false},
        {purchase_id: 4, status_id: 5, completed: false},

        {purchase_id: 5, status_id: 1, completed: false},
        {purchase_id: 5, status_id: 2, completed: false},
        {purchase_id: 5, status_id: 3, completed: false},
        {purchase_id: 5, status_id: 4, completed: false},
        {purchase_id: 5, status_id: 5, completed: false},

        {purchase_id: 6, status_id: 1, completed: true},
        {purchase_id: 6, status_id: 2, completed: false},
        {purchase_id: 6, status_id: 3, completed: false},
        {purchase_id: 6, status_id: 4, completed: false},
        {purchase_id: 6, status_id: 5, completed: false},

        {purchase_id: 7, status_id: 1, completed: true},
        {purchase_id: 7, status_id: 2, completed: false},
        {purchase_id: 7, status_id: 3, completed: false},
        {purchase_id: 7, status_id: 4, completed: false},
        {purchase_id: 7, status_id: 5, completed: false},

        {purchase_id: 8, status_id: 1, completed: true},
        {purchase_id: 8, status_id: 2, completed: false},
        {purchase_id: 8, status_id: 3, completed: false},
        {purchase_id: 8, status_id: 4, completed: false},
        {purchase_id: 8, status_id: 5, completed: false},

        {purchase_id: 9, status_id: 1, completed: true},
        {purchase_id: 9, status_id: 2, completed: true},
        {purchase_id: 9, status_id: 3, completed: true},
        {purchase_id: 9, status_id: 4, completed: false},
        {purchase_id: 9, status_id: 5, completed: false},

        {purchase_id: 10, status_id: 1, completed: true},
        {purchase_id: 10, status_id: 2, completed: false},
        {purchase_id: 10, status_id: 3, completed: false},
        {purchase_id: 10, status_id: 4, completed: false},
        {purchase_id: 10, status_id: 5, completed: false},

        {purchase_id: 11, status_id: 1, completed: true},
        {purchase_id: 11, status_id: 2, completed: false},
        {purchase_id: 11, status_id: 3, completed: false},
        {purchase_id: 11, status_id: 4, completed: false},
        {purchase_id: 11, status_id: 5, completed: false},

        {purchase_id: 12, status_id: 1, completed: true},
        {purchase_id: 12, status_id: 2, completed: false},
        {purchase_id: 12, status_id: 3, completed: false},
        {purchase_id: 12, status_id: 4, completed: false},
        {purchase_id: 12, status_id: 5, completed: false},

        {purchase_id: 13, status_id: 1, completed: true},
        {purchase_id: 13, status_id: 2, completed: false},
        {purchase_id: 13, status_id: 3, completed: false},
        {purchase_id: 13, status_id: 4, completed: false},
        {purchase_id: 13, status_id: 5, completed: false},

        {purchase_id: 14, status_id: 1, completed: true},
        {purchase_id: 14, status_id: 2, completed: true},
        {purchase_id: 14, status_id: 3, completed: true},
        {purchase_id: 14, status_id: 4, completed: false},
        {purchase_id: 14, status_id: 5, completed: false},

        {purchase_id: 15, status_id: 1, completed: true},
        {purchase_id: 15, status_id: 2, completed: false},
        {purchase_id: 15, status_id: 3, completed: false},
        {purchase_id: 15, status_id: 4, completed: false},
        {purchase_id: 15, status_id: 5, completed: false},

        {purchase_id: 16, status_id: 1, completed: true},
        {purchase_id: 16, status_id: 2, completed: false},
        {purchase_id: 16, status_id: 3, completed: false},
        {purchase_id: 16, status_id: 4, completed: false},
        {purchase_id: 16, status_id: 5, completed: false},

        {purchase_id: 17, status_id: 1, completed: true},
        {purchase_id: 17, status_id: 2, completed: true},
        {purchase_id: 17, status_id: 3, completed: true},
        {purchase_id: 17, status_id: 4, completed: false},
        {purchase_id: 17, status_id: 5, completed: false},

        {purchase_id: 18, status_id: 1, completed: true},
        {purchase_id: 18, status_id: 2, completed: true},
        {purchase_id: 18, status_id: 3, completed: true},
        {purchase_id: 18, status_id: 4, completed: false},
        {purchase_id: 18, status_id: 5, completed: false},

        {purchase_id: 19, status_id: 1, completed: true},
        {purchase_id: 19, status_id: 2, completed: true},
        {purchase_id: 19, status_id: 3, completed: true},
        {purchase_id: 19, status_id: 4, completed: false},
        {purchase_id: 19, status_id: 5, completed: false},

        {purchase_id: 20, status_id: 1, completed: true},
        {purchase_id: 20, status_id: 2, completed: true},
        {purchase_id: 20, status_id: 3, completed: true},
        {purchase_id: 20, status_id: 4, completed: false},
        {purchase_id: 20, status_id: 5, completed: false},
      ])
    })
};
