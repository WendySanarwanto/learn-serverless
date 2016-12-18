'use strict';

let AWS = require("aws-sdk");

class DynamoDbDataService {
    constructor(tableName, numberOfItems){
        this.tableName = tableName;
        this.numberOfItems = numberOfItems;

        const awsDefaultRegion = process.env.AWS_DEFAULT_REGION;

        let dynamoDbParams = {
            region: awsDefaultRegion
        };

        AWS.config.update(dynamoDbParams);
    }

    /**
     * Retrieve all items from table
     */
    getAll(){
        return new Promise((resolve, reject)=>{
            let docClient = new AWS.DynamoDB.DocumentClient();
            const params = { 
                TableName: this.tableName, 
                Limit: this.numberOfItems 
            };
            
            docClient.scan(params, (err, data) => {
                if (err){
                    reject(err);
                }
                else{
                    resolve(data.Items);
                }
            });
        });
    }
}

module.exports = DynamoDbDataService