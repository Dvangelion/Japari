# Japari

This is a demo project inspired by piggymetrics, which demonstrates the Microservice architecture pattern using go, react, mysql and docker. 

![](https://user-images.githubusercontent.com/12382740/86407124-6ab15b80-bc82-11ea-918e-ec209ca5de6e.gif)

## Functional Services

Japari can be decomposed into three microservices. The frontend service provides UI for account login/registration. Backend service validates the user account and stores account info into database. Database service persistent store user account in MySQL database. All of them are deployable in docker containers. 

Method	| Path	| Description	| 
------------- | ------------------------- | ------------- |
POST	| /register	| Register new account	
POST	| /login	| Login to existing account	


## Deploy on local server
Before you start: download docker and docker-compose. 


```bash
source .env

cd frontend
docker build --tag reactfrontend .

cd backend
docker build --tag gobackend-deploy -f Dockerfile.deploy .

cd database
docker build --tag mysqldatabase .

cd ..
docker-compose up
```

After docker-compose sets up three docker containers running, you should be able to see the application at "http://localhost:3000". 


## Deploy on EC2 server

### 1. Install docker and docker-compose on EC2. 
On amazon linux, install docker

```bash
sudo yum install docker
```

Start the docker service
```bash
sudo service docker start
```

Add the ec2-user to docker group so you can execute Docker commands without using sudo 
```bash
sudo usermod -a -G docker ec2-user
```

Then logout and login again to ec2, to pick up new docker group permissions. Now you 
are able to login to docker on ec2 via
```bash
docker login
```

 To install docker-compose,

```bash
sudo pip install docker-compose
```


### 2. Change frontend code. 
When deploy on local server, frontend can fetch response from backend via localhost, however, this is not the case when 
deploying on ec2. You need to fetch the public DNS address of ec2 instance instead of localhost. (In actions/index.js)

### 3. Pull your images from the docker hub. 
From your local machine, you need to rebuild the docker images and push them to docker hub. 

```bash
docker push yourdockerusername/mysqldatabase 
docker push yourdockerusername/gobackend
docker push yourdockerusername/reactfrontend
```

Then pull images on ec2
```bash
docker pull yourdockerusername/mysqldatabase 
docker pull yourdockerusername/gobackend
docker pull yourdockerusername/reactfrontend
```

### 4. Expose ports for http and tcp connection
Modify the ec2 security group to accept http connection via port 80 (frontend) and tcp connection via port 8080 (backend). 

### 5. Copy .env and docker-compose file to ec2 server
You can directly copy/paste the code or using 
```bash
scp -i "path/to/pemfile" filetoupload ec2-user@ipaddress:pathtopastefile 
```
Remember to change the docker image names in docker-compose file! 

### 6. Docker-compose up
In your ec2 bash, simply type
```bash
docker-compose up
```
Now the application is accessible from anywhere on the internet! Just type your EC2 ip address in your browser to view it, enjoy! 
