const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const contactRoutes = require("./routes/contactRoutes")
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json')

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("", contactRoutes)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`DB connection Succesfull`);
}).catch((err) => {
    console.log(err.message);
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port ${process.env.PORT}`);
});
