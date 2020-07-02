#Japari

This is a demo project inspired by piggymetrics, which demonstrates the Microservice architecture pattern using go, react, mysql and docker. 

![](https://user-images.githubusercontent.com/12382740/86298862-d2a56a80-bbcc-11ea-9fee-fc150ba05ca6.png)

##Functional Services

Japari can be decomposed into three microservices. The frontend service provides UI for account login/registration. Backend service validates the user account and stores account info into database. Database service persistent store user account in MySQL database. All of them are deployable in docker containers. 

Method	| Path	| Description	| 
------------- | ------------------------- | ------------- |
POST	| /register	| Register new account	
POST	| /login	| Login to existing account	


##Deploy on local server
Before you start: download docker and docker-compose. 


'''bash
source .env
cd frontend
docker build --tag reactfrontend .

cd backend
docker build --tag gobackend-deploy -f Dockerfile.deploy .

cd database
docker build --tag mysqldatabase .

cd ..
docker-compose up
'''

After docker-compose sets up three docker containers running, you should be able to see the application at "http://localhost:3000". 
