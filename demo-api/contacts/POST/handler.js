'use strict';

const ContactRepository = require("../lib/contact.repository");

module.exports.contactCreate = function(event, context, callback) {
  try {
    // Get request's payload. At this point, the payload is received as in stringified state.
    // Therefore , we need to parse it to JSON here. 
    const payload = JSON.parse(event.body);
    console.log(`[DEBUG] - <contactCreate> payload: `, payload);

    // NOTE: Ideally, you should validate the request's payload at here.
    
    // Post the payload to DynamoDb
    const contactRepo = new ContactRepository();
    contactRepo.doCreate(payload)
      .then(_ => { 
        // We do not want to return doCreateResponse because it is empty.
        // Therefore, we'll return the payload back in the response's body field.
        const response = {
          statusCode: 200,
          body: event.body
        };
        callback(null, response);
      }).catch(err => {
        console.log(`[ERROR] - <contactCreate> - Details: `, err);
        callback(err);
      });
  } catch(err) {
    callback(err);
  }
};
