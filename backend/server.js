const express = require('express');
const app = express();
require('dotenv').config();
const routes = require('./routes/routes');
const cors = require('cors');
const DbConnect = require('./database');


const corsOption = {
    origin: ['http://localhost:3000'],
};

app.use(cors(corsOption));
app.use(express.json());
DbConnect();

app.use(routes);

app.get('/',(req,res)=>{
    res.status(200).send("Hello from server");
})


const PORT = process.env.PORT || 5500;

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})