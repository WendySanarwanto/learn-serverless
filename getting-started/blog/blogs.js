'use strict';

const services = require('./services');
let DynamoDbDataService = services.DynamoDbDataService;
let BlogValidationService = services.BlogValidationService;

/**
 * Invoked when HTTP GET Event is triggered on /blogs/fetch endpoint.
 */
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

/**
 * Invoked when HTTP POST Event is triggered on /blogs/create endpoint.
 */
module.exports.create = (event, context, callback) => {
  const requestPayload = event.body;

  // Do simple validation to check title, categories & content
  const blogValidation = new BlogValidationService(requestPayload);
  if (!blogValidation.validate()){
    return callback(blogValidation.error);
  }

  // TODO: Implement creating a new record on AWS DynamoDB
  

  const response = {
    statusCode: 200,
    body: requestPayload,
  };  

  callback(null, response)
}
