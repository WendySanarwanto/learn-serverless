'use strict';

const AWS = require("aws-sdk");

const TABLE_NAME = "Contacts";

module.exports = class ContactRepository {
  constructor() {
    this.db = new AWS.DynamoDB.DocumentClient();
  }

  doCreate(newContact) {
    // Call DynamoDB API to create a new Contact Record
    const putArg = {
      ConditionExpression: "attribute_not_exists(id) AND attribute_not_exists(email)",
      Item: newContact,
      TableName: TABLE_NAME
    };
    console.log(`[DEBUG] - <ContactRepository doCreate> - putArg: `, putArg);
    return this.db.put(putArg).promise();
  }

  doGet() {
    const scanArg = {
      TableName: TABLE_NAME,
      ScanIndexForward: false
    };

    return this.db.scan(scanArg).promise();
  }
}