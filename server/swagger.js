const swaggerAutogen = require('swagger-autogen')

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/*.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "Message Service API",
        description: "Manage sending and receiving message"
    },
    host: "localhost:8888",
    basePath: "/api/message",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Message",
            "description": ""
        }
    ],
    definitions: {
        Message: {
            text: "Hello Hay",
            users: [1,2],
            sender: 1,
            timestamp: 13-22-2001,
        }
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js')
})