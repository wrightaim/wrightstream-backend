exports.seed = function(knex, Promise) {
  return knex('staff').del()
    .then(function () {
      return knex('staff').insert([
        {id: 1, shop_id: 1, role_id: 1, first_name: 'Claudia', last_name: 'Ligidakis', email: 'claudia@test', password: '$2a$10$5yNsaFcMNnq69yzo88MN5O9GTg29K/wbwzDVz7HBQn/f7L9Rb6Lk6', photo: 'https://www.healthypawspetinsurance.com/Images/V3/DogAndPuppyInsurance/Dog_CTA_Desktop_HeroImage.jpg'},
        {id: 2, shop_id: 1, role_id: 2, first_name: 'Vika', last_name: 'Gonzales', email: 'vika@test', password: '$2a$10$5yNsaFcMNnq69yzo88MN5O9GTg29K/wbwzDVz7HBQn/f7L9Rb6Lk6', photo: 'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12222652/Yorkshire-Terrier-MP.jpg'},
        {id: 3, shop_id: 2, role_id: 1, first_name: 'Vikanda', last_name: 'O\'Brien', email: 'vikanda.obrien@gmail.com', password: '$2a$10$5yNsaFcMNnq69yzo88MN5O9GTg29K/wbwzDVz7HBQn/f7L9Rb6Lk6', photo: 'https://avatars1.githubusercontent.com/u/24664730?s=400&u=b4697621e081df8691aec0b6bd4b24484c1689bd&v=4'},
        {id: 4, shop_id: 2, role_id: 2, first_name: 'Claudia', last_name: 'Ligidakis', email: 'cligidakis@yahoo.com', password: '$2a$10$5yNsaFcMNnq69yzo88MN5O9GTg29K/wbwzDVz7HBQn/f7L9Rb6Lk6', photo: 'https://scontent-sea1-1.xx.fbcdn.net/v/t1.0-9/35971010_1179773772164535_8323280572470263808_o.jpg?_nc_cat=104&_nc_ht=scontent-sea1-1.xx&oh=10eb9f5fdb9627d2f1e8eb83933291d8&oe=5C96D7C5'},
        {id: 5, shop_id: 2, role_id: 2, first_name: 'Christian', last_name: 'Roach', email: 'cartroach@gmail.com', password: '$2a$10$5yNsaFcMNnq69yzo88MN5O9GTg29K/wbwzDVz7HBQn/f7L9Rb6Lk6', photo: 'https://avatars3.githubusercontent.com/u/26319086?s=460&v=4'},   
        {id: 6, shop_id: 2, role_id: 3, first_name: 'Sarah', last_name: 'Smith', email: 'sarahsmith@gmail.com', password: '$2a$10$5yNsaFcMNnq69yzo88MN5O9GTg29K/wbwzDVz7HBQn/f7L9Rb6Lk6', photo: 'https://media.wmagazine.com/photos/5a132ef9211524101287c574/4:3/w_1536/natalie-portman-sexual-harassment-in-hollywood.jpg'},          
        {id: 7, shop_id: 2, role_id: 3, first_name: 'Rory', last_name: 'Baker', email: 'rorybaker@gmail.com', password: '$2a$10$5yNsaFcMNnq69yzo88MN5O9GTg29K/wbwzDVz7HBQn/f7L9Rb6Lk6', photo: 'https://media4.s-nbcnews.com/i/newscms/2018_27/1351211/zac-efron-today-180706-tease_6fc497828aabf7dc2af06b2850f40ad8.jpg'},          
        {id: 8, shop_id: 2, role_id: 3, first_name: 'Laura', last_name: 'West', email: 'laurawest@gmail.com', password: '$2a$10$5yNsaFcMNnq69yzo88MN5O9GTg29K/wbwzDVz7HBQn/f7L9Rb6Lk6', photo: 'https://pbs.twimg.com/media/DhH5rhzW0AA1CYI.jpg'},   
        {id: 9, shop_id: 2, role_id: 4, first_name: 'Keeghan', last_name: 'O\'Brien', email: 'kobrien@gmail.com', password: '$2a$10$5yNsaFcMNnq69yzo88MN5O9GTg29K/wbwzDVz7HBQn/f7L9Rb6Lk6', photo: 'https://scontent-sea1-1.xx.fbcdn.net/v/t1.0-1/c50.50.621.621a/s320x320/1175030_628890210468471_838723854_n.jpg?_nc_cat=108&_nc_ht=scontent-sea1-1.xx&oh=c50ad438464744fc74b749d78a8c6745&oe=5CA5D752'}      
      
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('staff_id_seq', (SELECT MAX(id) FROM staff));"
      );
    });
};
