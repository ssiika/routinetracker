import express, { Express, Request, Response } from 'express';
const { errorHandler } = require('./middleware/errorHandler')
import dotenv from 'dotenv';
import { error } from 'console';
const mongoose = require('mongoose');

dotenv.config();

const app: Express = express();

// mongoose setup 

const dev_db_url = process.env.MONGO_URL;
mongoose.connect(dev_db_url, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

app.use(express.json())

const port = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/timeslots', require('./routes/timeslotRoutes'))
app.use('/api/activities', require('./routes/activityRoutes'))
app.use('/api/records', require('./routes/recordRoutes'))

app.use(errorHandler)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});