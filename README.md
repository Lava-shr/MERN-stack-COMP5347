# MERN-stack-COMP5347 Group Project- PhoneZone

PhoneZone is a web application where people can buy mobile phone. The website have feature to show you the best seller and sold out soon in the Homepage. Furthermore, shows you the reviews of the people who have already bought the phones before.

## Getting Started
We used MERN stack for developing this website. MERN stands for
- M: MongoDb
- E: Express Js
- R: React Js
- N: NodeJs

React is used for front end and runs in http://localhost:3000 and our Express backend server runs in http://localhost:8000. We have used cloud mongodb for the database. More information on this can be found on https://www.mongodb.com/cloud. 

To see how to deploy this in your local machine, please refer to the deployment notes below.

### Prerequisites
- Install node and npm from https://nodejs.org/en/ download/ and select your required OS.
- After installation of node run the following command in terminal to install Express and some of express libraries.
```
npm init
npm install express --save npm install body-parser –save npm install path --save
npm install ejs --save
npm install pug --save
```
- To install react run this in you Terminal
```
npm i -g create-react-app
```
- To install mongoDb go to https://docs.mongodb.com/manual/administration/install-community/ and select your OS.

#### Run this after downloading this repository in your local machine
- Go the the /WebDev_G41/phonezone in your terminal and run this command to install all the backend Dependencies
```
npm install
```
- Go to /WebDev_G41/PhoneZone/app/views/frontend and run this command to install all the frontend Dependencies
```
npm install
```
## Deployment in local machine
Once all dependencies are installed you will need two terminal
- In one terminal go to /WebDev_G41/phonezone and run 
```
node server.js
```
- In another go to /WebDev_G41/PhoneZone/app/views/frontend and run the following
```
npm start
```
- After this open your browser and go to the following link
```
http://localhost:3000
```

### Dependencies
- Back-end 
  - axios: 0.21.1
  - body-parser: 1.19.0
  - cors: 2.8.5
  - crypto-js: 4.0.0
  - ejs: 3.1.6
  - express": 4.17.1
  - express-session": 1.17.1
  - mongodb": 3.6.6
  - mongoose": 5.12.4
  - path": 0.12.7
  - pug: 3.0.2
 
- Front-end
    - @testing-library/jest-dom: 5.12.0
    - @testing-library/reac": 11.2.6 
    - @testing-library/user-event: 12.8.3
    - axios: 0.21.1
    - bootstrap": "^4.6.0",
    - history: 5.0.0
    - react": 17.0.2
    - react-bootstrap: 1.5.2
    - react-bootstrap-range-slider: 2.0.2
    - react-dom: 17.0.2
    - react-router-dom: 5.2.0
    - react-scripts: 4.0.3
    - web-vitals: 1.1.1
    - formik: 2.2.8

## Contributor
1. Lava Shrestha
2. Mark Denisov
3. Sharmin Alam

