import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { NextFunction } from 'express-serve-static-core';
import { QuestionController } from './controllers/QuestionController';

// Load environment variables from .env file, where API keys and passwords are configured
// dotenv.config({ path: '.env.example' });


const app = express();

console.log(process.env.PORT);
const port = process.env.PORT || 3000;
app.set('port', port);

/**
 * Allow express to serve up static content
 */
app.use(
  express.static(path.join(__dirname, 'public'))
);

/**
 * Allow the single page application to be served up
 */
app.get('/page', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


/**
 * Setup bodyParser so we can easily use the request body in controllers
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



/**
 * Logg the request being made
 */
app.use((req, res, next) => {
  console.log(`request made with path ${req.path} and type ${req.method}`);
  next();
});

/**
 * Set Headers to allow cors and set content type to json
 */
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


/************************************************************************
 * API ROUTES
 ***********************************************************************/
app.use('/questions', QuestionController);


app.listen(port, () => {
  console.log(
    'App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
  console.log('Press CTRL-C to stop\n');
});

