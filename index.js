const lambdafai = require('lambdafai');
const db = require('./lib/db');
const routes = require('./lib/routes');

lambdafai('beer', app => {
	// Define DynamoDB tables:
	app.table({
    'name': db.tableName,
    'fullSchema': db.fullSchema 
  });

	// Add middleware to authenticate the user.

	// Define Lambdas:
	app.lambda({ name: 'api', timeout: 60 })
  	.options('/beers', null, {'type': 'MOCK'})
  	.get('/beers', routes.getBeers);

});


/*
  AWS_PROFILE=personal node index.js create-resources dev
  AWS_PROFILE=personal node index.js invoke dev requests/beers-get.js
  AWS_PROFILE=personal node index.js deploy dev --lambda api
  AWS_PROFILE=personal node index.js promote dev prod
*/