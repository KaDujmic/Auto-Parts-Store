# <a name="readme-top"></a>

<h1 align="center">Auto Parts Store Assignment</h1>

  <h3>Table of Contents</h3>
  <ol>
    <li>
      <a href="#about-the-app">About The App</a>
      <ul>
        <li><a href="#notable-backend-features">Backend</a></li>
        <li><a href="#notable-frontend-features">Frontend</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#api-description">API Description</a></li>
    <li><a href="#testing">Testing</a></li>
    <li><a href="#testing">Contributors</a></li>
  </ol>

## About The App

The Auto Parts Store is a group project assigned during the Agilathon 2023 dev internship.<br>
It features a store system where a customer can order different vehicle parts.

### Notable Backend Features:
* REST API
* PostgreSQL database
* Cron job scheduling for repeating functions (e.g. notifications, currency rate updates)
* Email notifications for both the customers, and employee in charge of item shipments
* Caching of commonly used data
* Ability for employees to place multiple item orders for specific customers
* Ability for items to be ordered to the shop, in the event that our stock of those items ran out
* Daily updates to our supported currencies and their rates, via a call to a third party API
* Authorization based on two roles, customer and sales person

#### Backend Built With:

* [![nodejs.shield]][nodejs.url]
* [![express.shield]][express.url]
* [![postgres.shield]][postgres.url]
* [![sequelize.shield]][sequelize.url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Notable Frontend Features:
* Authorization system enabling most features for Sales Person accounts only
* Dashboard displaying a high level of important information
* Creation of orders and users
* Review of all active orders for a sales person account, and customer specific orders for a logged in customer
* Review of pending items shipped to the store
* All visitors (even if not logged in) can view the list of available items in our store
* List of items supports advanced filtering based on manufacturer and/or category, in addition to an autocomplete search functionality

#### Frontend Built With:

* [![react.shield]][react.url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/en/)
* [Docker](https://www.docker.com/)
* Node Package Manager
  ```
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```
   git clone https://github.com/agilathon/auto_parts_store.git
   ```
2. Install NPM packages (In both the server and client subfolders)
   ```
   npm install
   ```
3. Rename and modify the .env.example file in the working directory, to suit your needs

4. In the server folder run the following command to setup the database containers and volumes:
   ```
   docker compose up
   ```

5. In the server folder run the following commands to migrate and seed the database:
   ```
    npm run migrate:{env}
    npm run seed:{env}
   ```
   
6. In the server folder run the following command to start the backend:
   ```
    npm run start:{env}
   ```

7. In the client folder run the following command to start the frontend:
   ```
    npm start
   ```
   
<p align="right">(<a href="#readme-top">back to top</a>)</p>


## API Description
There are two ways to review the API and its possibilities:
* <a href="#swagger-ui">Swagger UI</a>
* <a href="#postman-collection">Postman Collection</a>

Note that requests require authentication. Use the login route to authenticate as either a customer, or sales person.<br>
Login info is included in the API examples.

### Swagger UI
After starting the server (see -> <a href="#installation">Installation</a>), you simply need to navigate to the following URL:
   ```
    http://localhost:{port}/api-docs
   ```

### Postman Collection
A postman collection is included in the working directory. It contains a list of all possible requests that can be run as a whole.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Testing

Jest is used for testing.<br>
Use the following command to do a test run:
   ```
    npm run test
   ```
After tests are ran, the CLI report can be used to review test coverage. <br>
HTML generated reports can be found for test results/coverage as well. Test report in the main directory, and the coverage under coverage/lcov-report.

If sequelize logs are obstructing the command line review, you can go to db/config/config.js, and add the following property to the environment being used:
```
logging: false
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<ul>
  <li>Internship Team Members</li>
    <ul>
      <li><a href="https://github.com/KaDujmic">Dujmic Karlo</a></li>
      <li><a href="https://github.com/igaspa">Gasparov Ivana</a></li>
      <li><a href="https://github.com/Goran501">Stajduhar Goran</a></li>
    </ul>
  <li>Internship Team Mentors</li>
    <ul>
      <li><a href="https://github.com/antebircic">Bircic Ante</a></li>
      <li><a href="https://github.com/tkutlesa">Kutlesa Toni</a></li>
    </ul>
</ul>

Third Party API used for retrieving currency rates: <a href="https://exchangerate.host/#/">Exchange Rate</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[nodejs.shield]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[nodejs.url]: https://nodejs.org/en/
[express.shield]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[express.url]: https://expressjs.com
[postgres.shield]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[postgres.url]: https://www.postgresql.org/
[sequelize.shield]: https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white
[sequelize.url]: https://sequelize.org/
[react.shield]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[react.url]: https://reactjs.org/
