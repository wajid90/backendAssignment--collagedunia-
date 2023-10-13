import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './router/userRouter.js';
import errors from './middleware/errors.js';
import cors from "cors";



dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
  
app.use(express.json({ limit: '10mb' }));
app.use('/user', userRouter);



app.use((req, res) =>
  res.status(404).json({ success: false, message: 'Not Found' })
);

// app.use(errors);

const startServer = async () => {
    try {
      await mongoose.connect(process.env.MONGO_CONNECT,{
        dbName: "collage",
      });
      app.listen(port, () => console.log(`Server is listening on port: ${port}`));
    } catch (error) {
      console.log(error);
    }
  };
  
  startServer();
