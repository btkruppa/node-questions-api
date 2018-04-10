import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
// Load environment variables from .env file, where API keys and passwords are configured
// dotenv.config({ path: '.env.example' });


import { User } from './entities/User';
import { userRouter } from './controllers/UserController';
import { movieRouter } from './controllers/MovieController';
import { reimbursementRouter } from './controllers/ReimbursementController';
import { NextFunction } from 'express-serve-static-core';


const app = express();

console.log(process.env.PORT);
const port = process.env.PORT || 3000;
app.set('port', port);

app.use(
  express.static(path.join(__dirname, 'public'))
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
  console.log(`request made with path ${req.path} and type ${req.method}`);
  next();
});

/************************************************************************
 * API ROUTES
 ***********************************************************************/
app.get('/page', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


app.use('/users', userRouter);
app.use('/movies', movieRouter);
app.use('/reimbursements', reimbursementRouter);


app.listen(port, () => {
  console.log(
    'App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
  console.log('Press CTRL-C to stop\n');
});

