import { Request, Response, NextFunction } from 'express';

import express from 'express';
import * as reimbursementDao from '../DAO/ReimbursementDao';
import { Reimbursement } from '../entities/Reimbursement';
import { ReimbursementDoc } from '../entities/ReimbursementDoc';
import { PromiseResult } from 'aws-sdk/lib/request';
import aws from 'aws-sdk';

export let reimbursementRouter = express.Router();

/**
 * POST /reimbursements
 * Create a new movie object
 */
reimbursementRouter.post('/', (req: Request, res: Response) => {
  // let reimbusementDoc: ReimbursementDoc;

  const params = {
    TableName: 'Table',
    Key: { HashKey : 'hashkey' },
    UpdateExpression: 'set #a = :x + :y',
    ConditionExpression: '#a < :MAX',
    ExpressionAttributeNames: {'#a' : 'Sum'},
    ExpressionAttributeValues: {
      ':x' : 20,
      ':y' : 45,
      ':MAX' : 100,
    }
  };

  const documentClient = new aws.DynamoDB.DocumentClient();

  documentClient.update(params, function(err, data) {
     if (err) console.log(err);
     else console.log(data);
  });




  // reimbursementDao.findByUsername('test').then(
  //   succ => {
  //     // reimbusementDoc = succ;
  //     console.log('retreived reimb doc ');
  //     console.log(JSON.stringify(succ));
  //     reimbusementDoc = succ.Item;
  //     if (reimbusementDoc.username === undefined) {
  //       console.log('no reimbursement document found for this month, creating new one');
  //       reimbusementDoc = new ReimbursementDoc();
  //       reimbusementDoc.username = 'test';
  //     }
  //     const reimbursement = new Reimbursement();
  //     reimbursement.amount = req.body.amount;
  //     reimbursement.type = req.body.type;
  //     reimbusementDoc.reimbursements.push(reimbursement);

  //     console.log(JSON.stringify(reimbusementDoc));
  //     reimbursementDao.save(reimbusementDoc);
  //     console.log('created reimbursement');
  //     res.end();
  //   },
  //   err => {
  //     console.log('error - ');
  //     res.status(500);
  //     res.end();
  //   }
  // );


});



