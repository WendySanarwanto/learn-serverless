'use strict';

const ContactRepository = require(`../lib/contact.repository`);

module.exports.contactsFetch = (event, context, callback) => {
  try {
    const contactRepo = new ContactRepository();
    contactRepo.doGet()
      .then(doGetResponse => {
        let contacts = [];
        if (Array.isArray(doGetResponse.Items)) {
          contacts = doGetResponse.Items;
        }

        const response = {
          statusCode: 200,
          body: JSON.stringify(contacts),
        };
        callback(null, response);
      })
      .catch(err => callback(err))

  } catch(err) {
    callback(err);
  }
};
