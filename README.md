# Q&A Microservice

A microservice dedicated to a questions and answers widget on an e-commerce website.

## Technologies Used

Back-End Development: Nodemon, Express, dotenv, Mongoose, MongoDB <br>
Deployment Tools: AWS (S3, EC2) <br>
Testing: Super Test, Jest, K6 (Local Testing), Loader.io (Deployed Testing)<br>
Debugging: New Relic

## Description

This microservice handled requests from a product page front-end, ran queries with Mongoose to the MongoDB, and returned questions and answers for specific products. 
It worked in tandem with two other services, product overview and ratings and reviews, to populate a relavent product page for an e-commerce website. 
<br>

This microservice, and its companion services, were created for two purposes; to migrate data from a legacy, monolith API and database as well as 
keep up with the performance of the newly created e-commerce [front-end](https://github.com/kgnwlf/fec). The creation of this service was as follows: 
ETL/Database, API, local testing, deployment, and deployed testing.

### ETL/Database

The ETL process was done to bring over existing product records to the new MongoDB. The process was done with a built in Mongo command, mongoimport,
to load the over twelve million questions and answers onto a local machine, formatted as CSV data. These entries were brought over into three collections,
questions, answers, and photos. 

### API

With the database populated, the API was created to interact with the data. This API was required to handle the existing routes that the legacy API had,
to ensure no gaps in service when the existing front-end made requests to the new API. The routes were to handle GET requests for all questions and answers
for a specific product id or answers for a specific question id, POST routes for creating a new question or a new answer for a question, as well as
several PUT routes for reporting or marking helpful a question or answer. The API made use of promises when interacting with the database through
Mongoose, then handling the resulting information or error appropriately.

### Local Testing

Local testing was done through the use of the local version of K6. All tests were run against the last ten percent of the dataset, which was randomly
generated each time a request was sent. Local testing was done in two phases, pre- and post- improvements. The most significant improvement brought
was indexing the database.
<br>

[Pre- and Post- Database Query Times](https://www.notion.so/SDC-Database-Query-Times-ea5da9e5520d4e10be88055cff7854e4)
<br>

[Pre-Improvement Route Results](https://www.notion.so/SDC-Local-Stress-Testing-before-Improvements-90e8ea3a78794e3aa500e2cd76942e33)
<br>

[Post-Improvement Route Results](https://www.notion.so/SDC-Local-Stress-Testing-with-Improvements-e9d52ade4c2147d8a69bb43534457a57)
<br>

### Deployment

Deployment was done through AWS and spanned multiple instances once completed. The first layer of it all was an NGINX load balancer, which also cached
frequent requests for the same data. 
This is the completed [NGINX configuration file](https://www.notion.so/SDC-NGINX-Configuration-46671de81197427fa688aa78be745c4d). 
The second layer to it all was a number of API instances, spanning six total at one point, for testing purposes. Thirdly was the Mongo database, fully 
indexed. 

### Deployed Testing

Deployed testing was done through Loader.io. All tests were run against the last ten percent of the dataset, which was randomly generated each time a request
was sent. Deployed testing was done in two phases, pre- and post- improvements. The improvements made at the end were the NGINX load balancer, caching on 
that load balancer, the use of extra API instances, and significant code optimization with database connection. 
<br>

[Pre-Improvement Route Results](https://www.notion.so/SDC-Deployed-Stress-Testing-844fd0b9f10649478c51978ba1eea1dd)
<br>

[Post-Improvement Route Results](https://www.notion.so/SDC-Final-Deployed-Stress-Test-ca91a92878414fc7b79540dbf6415072)

### Conclusion/Challenges



