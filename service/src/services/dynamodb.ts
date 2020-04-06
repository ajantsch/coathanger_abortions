import { DocumentClient } from "aws-sdk/clients/dynamodb";

const { DYNAMO_ENDPOINT } = process.env;

let clientOptions = {};

if (DYNAMO_ENDPOINT) {
  clientOptions = {
    endpoint: DYNAMO_ENDPOINT,
  };
}

const client = new DocumentClient(clientOptions);

export default client;
