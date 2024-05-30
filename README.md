# Task Manager

A simple task manager application built using Node.js and React.js. It uses MongoDB for the database and Redis for caching.


## Technologies Used

- **Node.js**: [Official Documentation](https://nodejs.org/en/docs/)
- **React.js**: [Official Documentation](https://reactjs.org/docs/getting-started.html)
- **MongoDB**: [Official Documentation](https://docs.mongodb.com/)
- **Redis**: [Official Documentation](https://redis.io/documentation)


## Prerequisits

**Node.js** : You can find the full Node js installation guide [here](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)

**MongoDB** : You can find the full MongoDB installation guide [here](https://www.mongodb.com/docs/manual/installation/)

**Redis** : You can find the full redis installation guide [here](https://redis.io/docs/latest/get-started/)



## Installation

1. Clone the repository and change directory:

```bash
git clone https://github.com/Pavankulal2002/Task-Manager-Application.git
cd Task-Manager-Application
```

2. Install dependencies:

```bash
npm run install
``` 

3. Start the Redis server (after installing Redis):

```bash
sudo service redis-server start
```
**Note** : Redis server should start at the default port (ie : 6379)

Yoy can ping the server using following command

```bash
redis-cli ping
```

4. Run the application:

```bash
npm run startapp
```

The website will be accessible at [http://localhost:3000/](http://localhost:3000/).


