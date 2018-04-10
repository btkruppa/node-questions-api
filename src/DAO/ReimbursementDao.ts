import aws from 'aws-sdk';
import { ConfigurationOptions } from 'aws-sdk/lib/config';
import { ReimbursementDoc } from '../entities/ReimbursementDoc';
import { PromiseResult } from 'aws-sdk/lib/request';

const awsConfig: ConfigurationOptions = {
  region: 'us-west-2',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};
console.log(JSON.stringify(awsConfig));

aws.config.update(awsConfig);

const docClient = new aws.DynamoDB.DocumentClient();

export let save = (reimbursement: ReimbursementDoc) => {
  const params = {
    Item: reimbursement,
    ReturnConsumedCapacity: 'TOTAL',
    TableName: 'reimbursements'
   };
   docClient.put(params, function(err, data) {
     if (err) console.log(err, err.stack); // an error occurred
     else     console.log(data);           // successful response
     /*
     data = {
      ConsumedCapacity: {
       CapacityUnits: 1,
       TableName: "Music"
      }
     }
     */
   });
};

export let addReimbursement = (username: string) => {

};

export let findByUsername = (username: string): any => {
  const params = {
    TableName: 'reimbursements',
    Key: {
      username: username
    }
  };
  // docClient.get(params, (err, data) => {
  //   if (err) {
  //     console.log(`error - ${JSON.stringify(err, undefined, 2)}`);
  //   } else {
  //     console.log(`success - ${JSON.stringify(data, undefined, 2)}`);
  //     return data;
  //   }
  // });
  return docClient.get(params).promise();
};
