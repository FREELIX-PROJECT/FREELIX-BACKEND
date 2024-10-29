import express from "express";
import mongoose from "mongoose";
import cors from "cors";

await mongoose.connect(process.env.MONGO_URI);

const app = express();

app.use(express.json());
app.use(cors());


app.listen(5006, () => {
    console.log('App is listening on port 5006')
})