#Nanny_Scheduler
Nanny Scheduler app solves the problem of finding a nanny to watch your kids while you are at work, out on a date, etc

## Required Features

- User can sign up either as a nanny or a parent
- User can sign in
- Parent can view all nannies
- Parent can **search for nannies within a specific location**
- Parent can **request a nanny**
- Parent can **send messages to a nanny**
- Nannies can **accept or reject a request**

## Technologies

- Node JS
- Express
- Mocha & Chai
- ESLint
- Babel

## Requirements and Installation

To install and run this project you would need to have listed stack installed:

- Node Js
- Git

To run:

```sh
git clone <https://github.com/NannyScheduler/NannyScheduler-API-Adetola>
cd NANNYSCHEDULER-API-ADETOLA
npm install
npm start
```

## Testing

```sh
npm test
```

## API-ENDPOINTS

`- POST /api/parent/signup Sign up as a parent.`

`- POST /api/nannies/signup sign up as a nanny.`

`- POST /api/nannies/login nanny login.`

`- POST /api/parent/login parent login.`

`- GET api/nannies/ Get all nannies.`

`- GET api/nannies/nanny get nannies within a specific location.`

`-POST /api/parent/request/:id request for a nanny.`

`- PUT /api/nannie/approve/:id Approve or reject a request.`

`- POST api/parent/message/:nanny_email Approve or reject a loan application.`

### API

The API is currently is hosted at

[https://nany-scheduler.herokuapp.com/api/parent/signup](https://nany-scheduler.herokuapp.com/api/parent/signup)
[https://nany-scheduler.herokuapp.com/api/nannies/signup](https://nany-scheduler.herokuapp.com/api/nannies/signup)

## Author

Akere Adetola
