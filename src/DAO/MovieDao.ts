import aws from 'aws-sdk';
import { ConfigurationOptions } from 'aws-sdk/lib/config';

const awsConfig: ConfigurationOptions = {
  region: 'us-west-2',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};
console.log(JSON.stringify(awsConfig));

aws.config.update(awsConfig);

const docClient = new aws.DynamoDB.DocumentClient();

export let findByName = (name: string) => {
  const params = {
    TableName: 'movies',
    Key: {
      id: name
    }
  };
  docClient.get(params, (err, data) => {
    if (err) {
      console.log(`error - ${JSON.stringify(err, undefined, 2)}`);
    } else {
      console.log(`success - ${JSON.stringify(data, undefined, 2)}`);
    }
  });
};

export let findByNameContains = (contains: string, succ?: ((data: any) => void), errCallback?: any) => {
  console.log('finding movies containing: ' + contains);
  const params = {
    TableName : 'movies',
    FilterExpression: 'contains(#id, :id)',
    ExpressionAttributeNames: {
      '#id': 'id'
    },
    ExpressionAttributeValues: {
        ':id': contains
    }
  };
  docClient.scan(params, function(err, data) {
    if (err) {
      console.log(`error - ${JSON.stringify(err, undefined, 2)}`);
      errCallback();
    } else {
      console.log(`success - ${JSON.stringify(data, undefined, 2)}`);
      succ(data);
    }
  });
};