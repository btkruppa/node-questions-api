import { Request, Response, NextFunction } from 'express';
import express from 'express';
import { User } from '../entities/User';
import * as movieDao from '../DAO/MovieDao';

export let userRouter = express.Router();

const users: Array<User> = [
  {
    id: 1,
    username: 'blake',
    password: 'pass',
    role: 'admin'
  },
  {
    id: 2,
    username: 'admin',
    password: 'pass',
    role: 'admin'
  },
  {
    id: 3,
    username: 'emp',
    password: 'pass',
    role: 'trainer'
  },
];

/**
 * POST /users
 * Create a new user object
 */
userRouter.post('/', (req: Request, res: Response) => {
  console.log('created user');
  res.end();
});


/**
 * GET /users
 * Retreives all users
 */
userRouter.get('/', (req: Request,   res: Response) => {
  console.log('getting all users');
  res.json(users);
});

userRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  console.log(`finding user with id ${req.params.id}`);
  res.end();
});
