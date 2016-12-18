'use strict';

class DynamoDbDataService {
    constructor(tableName, numberOfItems){
        this.tableName = tableName;
        this.numberOfItems = numberOfItems;
    }

    /**
     * Retrieve all items from table
     */
    getAll(){
        return new Promise((resolve, reject)=>{
            // TODO: Replace these hardcoded lines with calls to DynamoDb
            const result = [{
                title: 'My 1st Post',
                categories: 'General',
                content: 'Lorem ipsum dolor sit amet, \
                        consectetur adipiscing elit.'
            },{
                title: 'My 2nd Post',
                categories: 'General',
                content: 'Nam posuere eu enim id hendrerit. \
                        Donec gravida elit nec dui mattis mollis. \
                        Donec hendrerit augue vitae orci rhoncus pulvinar.'
            },{
                title: 'My 3rd Post',
                categories: 'General',
                content: 'Sed non sapien justo. Praesent non sem convallis, \
                        volutpat nulla in, volutpat justo. \
                        Aenean eget nunc malesuada, rhoncus dui nec, vehicula mauris.'
            }];
            resolve(result);            
        });
    }
}

module.exports = DynamoDbDataService