# WrightStream BackEnd - 2
Deployed version: http://wrightstream.com/
Back-end for https://github.com/wrightaim/wrightstream

## Installation
- Fork and clone
- `npm install`
- Add your own .env file with a `SECRET` environment variable

## Database Setup
- Make sure you have PostgreSQL
- Create a database on your local called `wrightstream_db_dev`
- `npm run knex migrate:latest`
- `npm run knex seed:run`

## Running the tests

Go to the postman link and review tests being run on site

### Postman Documentation

Postman has already created tests built to test all routes. The documentation will show the results and I've also documented the BigO for each route too.
Routes: https://documenter.getpostman.com/view/4516090/RWaNQ6fV

## ERD
![alt text](http://i65.tinypic.com/2egdxed.png)
