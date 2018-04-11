import { Request, Response, NextFunction } from 'express';
import express from 'express';
import { Question } from '../model/Question';

export let QuestionController = express.Router();

/**
 * PUT /questions
 * Create a new question object
 */
QuestionController.put('/', (req: Request, res: Response) => {
  console.log('created question');
  const question: Question = req.body;
  res.sendStatus(201);
});

/**
 * GET /questions/question-bank/owner/:owner/title/:title
 * Retreive all questions for a certain question bank
 */
QuestionController.get('/question-bank/owner/:owner/title/:title', (req: Request, res: Response) => {
  console.log(`getting questions for question bank ${req.params.owner}-${req.params.title}`)
  res.send([]);
});

