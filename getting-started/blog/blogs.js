'use strict';

// I wish node.js 4.3.2 has supported destructuring assignment 
// so that I could destructure contents of repositoris using this code
// import { BlogsRepository, OtherRepositories } from './repositories';
let BlogsRepository = require('./repositories').BlogsRepository;

module.exports.fetch = (event, context, callback) => {
  let blogsRepo = new BlogsRepository();
  const results = blogsRepo.retrieveBlogs();

  const response = {
    statusCode: 200,
    body: JSON.stringify(results),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
