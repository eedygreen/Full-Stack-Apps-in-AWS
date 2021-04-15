import AWS = require('aws-sdk');
import { config } from './config/config';

//Configure AWS

const c = config.dev;

if(c.aws_profile !== "DEPLOYED") {
    var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
    AWS.config.credentials = credentials;
  }