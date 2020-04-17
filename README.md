# DynamicRestaurant 🍽


## About this Project

![WithoutCache](/assets/WithoutCache.jpeg)
![WithCache](/assets/WithCache.jpeg)
![CreateNewItem](/assets/CreateItem.jpeg)

This project is only the server side of the application, using websockets, cached responses, persistence in postgresDB, and RegEx. :D

The Insomnia Collection is in /insomnia-collection folder inside project, used to test the requests;

## Why ?

This project is part of my personal portfolio, and part of excercises to TAP classes.

## Some Observations about this App

I took too much time to learn about NodeJS and maybe some features need to be fixed, but I'm very happy with my progress :D

## Prerequisites

#### Install Node
Click in this link and install Node in LTS version: [https://nodejs.org/en/download/](https://nodejs.org/en/download/);

## Getting Started

**Cloning the Repository**

```
 $ git clone https://github.com/gabrielsiilva/DynamicRestaurant.git

```

After cloning the repository you have to do the commands below:

```
 $ cd DynamicRestaurant

```

And if you're using  _**yarn**_:

```
$ yarn

```

Or if you're using  _**npm**_:

```
$ npm install
```

### Running

To run the project make sure that you have the NodeJS in your computer, if you haven't, please read the section  [Prerequisites](https://github.com/gabrielsiilva/DynamicRestaurant/tree/master#prerequisites)

You can check if you have the NodeJS just running this command below in your terminal:

```
 $ node --version

```

If everything's okay, check if you have postgres and redis server running in your machine.
I used the docker to create the images of the containers and run these services,
and the ports used were the standards, (POSTGRES: 5432, REDIS: 6379)

The database settings are contained in the /config/database.js file.

After doing this, run the commands below to create the database, create the tables and populate the user table as a standard user administrator.

```
$ yarn sequelize db:migrate

```

```
$ yarn sequelize db:seed:all

```

Or if you're using npm:

```
$ npm sequelize db:migrate

```

```
$ npm sequelize db:seed:all

```

Finally, to start the server, run the command bellow:

```
$ yarn start

```

Or this command if you're using  _**npm**_:

```
$ npm start

```

This will start the server for you.


## Build with
- express
- ioredis
- socket.io
- jsonwebtoken
- pg
- sequelize
- youch
- yup
- bcryptjs
- @sentry/node
- cors
- express-async-errors
- express-handlebars


## Contributing

You can send how many PR's do you want, I'll be glad to analyse and accept them! And if you have any question about the project...

Email-me:  [gabrielp.siilva@gmail.com](mailto:gabrielp.siilva@gmail.com)

Connect with me at  [LinkedIn](https://www.linkedin.com/in/gabrielsiilva/)

Thank you!!! :D
