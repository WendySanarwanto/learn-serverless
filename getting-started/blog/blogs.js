'use strict';

let DynamoDbDataService = require('./services').DynamoDbDataService;

module.exports.fetch = (event, context, callback) => {
  const TABLE_NAME = 'Blogs';
  const NUMBER_OF_ITEMS = 100;
  let dynamoDbDataService = new DynamoDbDataService(TABLE_NAME, NUMBER_OF_ITEMS);

  // let blogsRepo = new BlogsRepository(dynamoDbDataService);
  dynamoDbDataService.getAll()
    .then((results) => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(results),
      };

      callback(null, response);
    })
    .catch((error) => {
      callback(error);
    });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
