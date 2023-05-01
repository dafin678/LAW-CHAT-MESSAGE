const swaggerAutogen = require('swagger-autogen')

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/*.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "Contact Management API",
        description: "Manage User Contacts"
    },
    host: "localhost:5001",
    basePath: "",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Contact",
            "description": ""
        }
    ],
    definitions: {
        Contact: {
            user: "John Doe",
            contact: "Simon Doe",
        },
        ContactList: [{
            contact: "Simon Doe",
        }],
        Message: {
            message: "Message"
        }
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js')
})