'use strict';

let Ajv = require('ajv');

class BlogValidationService {
    constructor(blog){
        this.blog = blog;
        //this.errors = [];
        this.error = null;

        // Each fields should be string typed value, minimum length is 1 char & whitespaces only is not allowed
        const fieldSchema = {
            "type": "string",
            "minLength": 1,
            "pattern": "\\S"
        };

        // Define Blog's JSON Schema
        this.schema = {
            "required": ["title", "categories", "content"],
            "properties": {
                "title": fieldSchema,
                "categories": fieldSchema,
                "content": fieldSchema
            }
        };
    }

    /**
     * Perform validation through using AJV library
     */
    validate(){
        let ajv = new Ajv();
        const validate = ajv.compile(this.schema);
        const isValid = validate(this.blog);
        this.error = null;
        if (!isValid) {
            // Transform each of 
            const errorMessage = 
                validate.errors.map( error => this.transformAjvError(error) )
                                .join('\n\r');
            this.error = new Error(errorMessage);
        }
        return isValid;
    }

    transformAjvError(ajvError){
        let errorMessage = '';
        const keyword = ajvError.keyword;
        if (keyword === 'pattern'){
            errorMessage = `"${ajvError.dataPath.replace(/[.]/g, "")}" should not be empty.`;                    
        }
        else if (keyword === 'required'){
            errorMessage = `"${ajvError.params.missingProperty}" is missing.`;
        }
        return errorMessage;
    }
}

module.exports = BlogValidationService;