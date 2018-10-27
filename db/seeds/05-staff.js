exports.seed = function(knex, Promise) {
  return knex('staff').del()
    .then(function () {
      return knex('staff').insert([
        {id: 1, shop_id: 1, role_id: 1, first_name: 'Claudia', last_name: 'Ligidakis', email: 'claudia@test', password: '$2a$10$M7BiKs2MPI97bz5CkSdkQehB.5gvK/zegIDlzSMIyJoPPnGPm6vwW', photo: 'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12222652/Yorkshire-Terrier-MP.jpg'},
        {id: 2, shop_id: 1, role_id: 2, first_name: 'Vika', last_name: 'Gonzales', email: 'vika@test', password: '$2a$10$M7BiKs2MPI97bz5CkSdkQehB.5gvK/zegIDlzSMIyJoPPnGPm6vwW', photo: 'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12222652/Yorkshire-Terrier-MP.jpg'},
        {id: 3, shop_id: 2, role_id: 1, first_name: 'Vika', last_name: 'Gonzales', email: 'vika@test', password: '$2a$10$M7BiKs2MPI97bz5CkSdkQehB.5gvK/zegIDlzSMIyJoPPnGPm6vwW', photo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/hsdogdog-profile_image-5550ade194780dfc-300x300.jpeg'},
        {id: 4, shop_id: 2, role_id: 2, first_name: 'Claudia', last_name: 'Ligidakis', email: 'claudia@test', password: '$2a$10$M7BiKs2MPI97bz5CkSdkQehB.5gvK/zegIDlzSMIyJoPPnGPm6vwW', photo: 'https://www.healthypawspetinsurance.com/Images/V3/DogAndPuppyInsurance/Dog_CTA_Desktop_HeroImage.jpg'}
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('staff_id_seq', (SELECT MAX(id) FROM staff));"
      );
    });
};
