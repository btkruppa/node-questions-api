import { Request, Response, NextFunction } from 'express';
import express from 'express';
import * as movieDao from '../DAO/MovieDao';

export let movieRouter = express.Router();

/**
 * POST /movies
 * Create a new movie object
 */
movieRouter.post('/', (req: Request, res: Response) => {
  console.log('created movie');
  res.end();
});


/**
 * GET /movies/name/:name
 * Find the movie with the given name
 */
movieRouter.get('/:name', (req: Request, res: Response) => {
  console.log('getting movie with name: ' + req.params.name);
  movieDao.findByName(req.params.name);
  res.end();
});


/**
 * GET /movies/name-contains/:pat
 * Find the movie where the name contains the given pattern
 */
movieRouter.get('/name-contains/:pat', (req: Request, res: Response, next: NextFunction) => {
  movieDao.findByNameContains(req.params.pat, (data) => {
    console.log('test');
    res.json(data);
  }, () => {
    res.status(400);
    res.end();
  });

});


