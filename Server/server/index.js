import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import employee from 'routes/employee_r.js'
import http from 'http';
import { Server } from "socket.io";

const app = express()
    , httpServer = http.createServer(app)
    , io = new Server(httpServer,{
        cors:{
            origin: "*",
            methods: "*"
        }
});

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/employees', employee);

const URL = 'mongodb+srv://Jayani:gNdyH7YrkraCKbpF@onlineticketing.8bzhwcf.mongodb.net/Ticketing?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;

mongoose.connect(URL).then(() => {
    console.log(`Server is running on port`);
    httpServer.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));
}).catch((error) => {
    console.error(error)
})





