# tscircle/boilerplate 
This repository contains a boilerplate around the [tscircle framework](https://github.com/tscircle/framework).

[![CircleCI](https://circleci.com/gh/tscircle/framework.svg?style=svg)](https://circleci.com/gh/tscircle/framework)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=tscircle_framework&metric=alert_status)](https://sonarcloud.io/dashboard?id=tscircle_framework)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=tscircle_framework&metric=coverage)](https://sonarcloud.io/dashboard?id=tscircle_framework)
[![Known Vulnerabilities](https://snyk.io/test/github/tscircle/framework/badge.svg?targetFile=package.json)](https://snyk.io/test/github/tscircle/framework?targetFile=package.json)


##### Table of Contents  
[Summary](#summary)  
[Local development](#development)   
[Deployment](#deployment)  


## Summary
<a name="summary"/>

We are currently developing a boilerplate for hosting a typical nodejs applications serverless in the AWS Cloud. 
We have combined the serverless.com framework, some npm modules and some AWS Cloudformation scripts to accomplish this. 
All AWS resources have been written as Infrastructure as Code. They are being used natively without the need to access passwords or secrets by hand. 

All resources are defined as a Cloudformation template in the serverless.yml file:
```yml
 environment:
    APP_KEY: !Sub '{{resolve:secretsmanager:${self:custom.UUID}-APP_KEY}}'
    DB_HOST:
      Fn::GetAtt: [AuroraRDSCluster, Endpoint.Address]
    DB_PASSWORD: !Sub '{{resolve:secretsmanager:${self:custom.UUID}-DB_PASSWORD}}'
    DYNAMODB_CACHE_TABLE: !Ref DynamoDB
    AWS_BUCKET: !Ref S3Bucket
    SQS: !Ref SQSQueue
```

* AWS DynamoDB as a Cache driver
* AWS RDS Aurora serverless MySQL 5.6 as a Database
* AWS S3 as a Storage provider
* AWS SQS + Lambda Event for queueing processes

All resources have been paid for in a pay-as-you-go model. 

Since all resources are located in private subnets and hosted in a VPC, an EC2 instance is placed in a public subnet as a bastion host and NAT instance.
The NAT instance replaces a NAT gateway (~ 40€/month) with which Lambda functions can access the Internet. 
The instance type is t2.nano and costs about 5€ per month. 

In some places this project is still a bit raw, because it is still quite new, so **feel free to contribute!**

## Local development 
<a name="development"/>

```
docker-compose up -d 
docker-compose exec node bash
$docker:npm install
$docker:npm npm run sls:offline
```

## Deployment
<a name="deployment"/>

**Deployment**
Just clone this repository and connect it to circleci.
